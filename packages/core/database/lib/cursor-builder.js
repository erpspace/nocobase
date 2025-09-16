/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var cursor_builder_exports = {};
__export(cursor_builder_exports, {
  SmartCursorBuilder: () => SmartCursorBuilder
});
module.exports = __toCommonJS(cursor_builder_exports);
var import_sequelize = require("sequelize");
var import_lodash = __toESM(require("lodash"));
const _SmartCursorBuilder = class _SmartCursorBuilder {
  sequelize;
  tableName;
  collection;
  constructor(sequelize, tableName, collection) {
    this.sequelize = sequelize;
    this.tableName = tableName;
    this.collection = collection;
  }
  /**
   * 根据表结构自动选择最优游标策略
   */
  async getBestCursorStrategy() {
    let indexInfoSql = "";
    const dialect = this.sequelize.getDialect();
    if (dialect === "postgres") {
      indexInfoSql = `
      SELECT 
        t.relname AS table_name,
        i.relname AS index_name,
        a.attname AS column_name,
        array_position(ix.indkey, a.attnum) + 1 AS seq_in_index,
        CASE 
          WHEN ix.indisprimary THEN 1
          WHEN ix.indisunique THEN 2
          ELSE 3
        END AS index_type,
        -- \u5224\u65AD\u7D22\u5F15\u6392\u5E8F\u65B9\u5411 (0=ASC, 1=DESC)
        CASE WHEN (ix.indoption[array_position(ix.indkey, a.attnum) - 1] & 1) = 1 
             THEN 'DESC' ELSE 'ASC' 
        END AS direction
      FROM 
        pg_class t,
        pg_class i,
        pg_index ix,
        pg_attribute a,
        pg_namespace n
      WHERE 
        t.oid = ix.indrelid
        AND i.oid = ix.indexrelid
        AND a.attrelid = t.oid
        AND t.relnamespace = n.oid
        AND a.attnum = ANY(ix.indkey)
        AND t.relkind = 'r'
        AND n.nspname = current_schema()
        AND t.relname = ?
      ORDER BY 
        i.relname, 
        array_position(ix.indkey, a.attnum)
    `;
    } else if (dialect === "mariadb" || dialect === "mysql") {
      indexInfoSql = `
      SELECT 
        i.TABLE_NAME, 
        i.INDEX_NAME, 
        i.COLUMN_NAME,
        i.SEQ_IN_INDEX,
        CASE 
          WHEN i.INDEX_NAME = 'PRIMARY' THEN 1
          WHEN i.NON_UNIQUE = 0 THEN 2
          ELSE 3 
        END as INDEX_TYPE
      FROM 
        information_schema.STATISTICS i
      WHERE 
        i.TABLE_SCHEMA = DATABASE() 
        AND i.TABLE_NAME = ?
      ORDER BY 
        i.INDEX_NAME, 
        i.SEQ_IN_INDEX;
    `;
    }
    const indexRows = await this.sequelize.query(indexInfoSql, {
      type: import_sequelize.QueryTypes.SELECT,
      replacements: [this.tableName],
      raw: true
    });
    const indexes = /* @__PURE__ */ new Map();
    const indexDirections = /* @__PURE__ */ new Map();
    if (!indexRows || indexRows.length === 0) {
      if (Array.isArray(this.collection.filterTargetKey)) {
        return new CompositeKeyCursorStrategy(this.collection.filterTargetKey);
      }
      return new SingleColumnCursorStrategy(this.collection.filterTargetKey);
    }
    for (const row of indexRows) {
      const indexName = dialect === "postgres" ? row.index_name : row.INDEX_NAME;
      const columnName = dialect === "postgres" ? row.column_name : row.COLUMN_NAME;
      const indexType = dialect === "postgres" ? row.index_type : row.INDEX_TYPE;
      if (dialect === "postgres" && row.direction) {
        if (!indexDirections.has(indexName)) {
          indexDirections.set(indexName, /* @__PURE__ */ new Map());
        }
        indexDirections.get(indexName).set(columnName, row.direction);
      }
      if (!indexes.has(indexName)) {
        indexes.set(indexName, {
          name: indexName,
          columns: [],
          isPrimary: dialect === "postgres" ? indexType === 1 : indexName === "PRIMARY",
          isUnique: indexType < 3
        });
      }
      const seqInIndex = dialect === "postgres" ? row.seq_in_index : row.SEQ_IN_INDEX;
      const index = indexes.get(indexName);
      index.columns[seqInIndex - 1] = columnName;
    }
    for (const index of indexes.values()) {
      if (index.isPrimary) {
        if (index.columns.length === 1) {
          return new SingleColumnCursorStrategy(index.columns[0]);
        } else {
          if (dialect === "postgres" && indexDirections.has(index.name)) {
            const directions = index.columns.map((col) => indexDirections.get(index.name).get(col) || "ASC");
            return new CompositeKeyCursorStrategy(index.columns, directions);
          } else {
            return new CompositeKeyCursorStrategy(index.columns);
          }
        }
      }
    }
    let singleColumnUniqueIndex = null;
    let multiColumnUniqueIndex = null;
    for (const index of indexes.values()) {
      if (index.isUnique && !index.isPrimary) {
        if (index.columns.length === 1 && !singleColumnUniqueIndex) {
          singleColumnUniqueIndex = index;
        } else if (index.columns.length > 1 && !multiColumnUniqueIndex) {
          multiColumnUniqueIndex = index;
        }
      }
    }
    if (singleColumnUniqueIndex) {
      return new SingleColumnCursorStrategy(singleColumnUniqueIndex.columns[0]);
    }
    if (multiColumnUniqueIndex) {
      return new CompositeKeyCursorStrategy(multiColumnUniqueIndex.columns);
    }
    let anyIndex = null;
    for (const index of indexes.values()) {
      if (index.columns.length > 0 && !index.isPrimary && !index.isUnique) {
        anyIndex = index;
        break;
      }
    }
    if (anyIndex) {
      if (anyIndex.columns.length === 1) {
        return new SingleColumnCursorStrategy(anyIndex.columns[0]);
      } else {
        return new CompositeKeyCursorStrategy(anyIndex.columns);
      }
    }
  }
  /**
   * Cursor-based pagination query function.
   * Ideal for large datasets (e.g., millions of rows)
   * Note:
   *  1. does not support jumping to arbitrary pages (e.g., "Page 5")
   *  2. Requires a stable, indexed sort field (e.g. ID, createdAt)
   *  3. If custom orderBy is used, it must match the cursor field(s) and direction, otherwise results may be incorrect or unstable.
   * @param options
   */
  async chunk(options) {
    const cursorStrategy = await this.getBestCursorStrategy();
    let cursorRecord = null;
    let hasMoreData = true;
    let isFirst = true;
    options.order = cursorStrategy.buildSort();
    options["parseSort"] = false;
    while (hasMoreData) {
      if (!isFirst) {
        options.where = cursorStrategy.buildWhere(options.where, cursorRecord);
      }
      if (isFirst) {
        isFirst = false;
      }
      options.limit = options.chunkSize || 1e3;
      if (options.beforeFind) {
        await options.beforeFind(options);
      }
      const records = await options.find(import_lodash.default.omit(options, "callback", "beforeFind", "afterFind", "chunkSize", "find"));
      if (options.afterFind) {
        await options.afterFind(records, options);
      }
      if (records.length === 0) {
        hasMoreData = false;
        continue;
      }
      await options.callback(records, options);
      cursorRecord = records[records.length - 1];
    }
  }
};
__name(_SmartCursorBuilder, "SmartCursorBuilder");
let SmartCursorBuilder = _SmartCursorBuilder;
const _SingleColumnCursorStrategy = class _SingleColumnCursorStrategy {
  columnName;
  constructor(columnName) {
    this.columnName = columnName;
  }
  buildSort() {
    return [[this.columnName, "ASC"]];
  }
  buildWhere(baseWhere, record) {
    if (!record) {
      return baseWhere;
    }
    return { ...baseWhere, [this.columnName]: { [import_sequelize.Op.gt]: record[this.columnName] } };
  }
};
__name(_SingleColumnCursorStrategy, "SingleColumnCursorStrategy");
let SingleColumnCursorStrategy = _SingleColumnCursorStrategy;
const _CompositeKeyCursorStrategy = class _CompositeKeyCursorStrategy {
  columns;
  directions;
  constructor(columns, directions) {
    this.columns = columns;
    this.directions = directions || Array(columns.length).fill("ASC");
  }
  buildSort() {
    const orderBy = [];
    for (let i = 0; i < this.columns.length; i++) {
      orderBy.push([this.columns[i], this.directions[i]]);
    }
    return orderBy;
  }
  buildWhere(baseWhere, record) {
    if (!record) {
      return baseWhere;
    }
    const whereConditions = [];
    for (let i = 0; i < this.columns.length; i++) {
      const column = this.columns[i];
      if (i > 0) {
        const equalConditions = {};
        for (let j = 0; j < i; j++) {
          equalConditions[this.columns[j]] = record[this.columns[j]];
        }
        whereConditions.push({
          ...equalConditions,
          [column]: {
            [import_sequelize.Op.gt]: record[column]
          }
        });
      } else {
        whereConditions.push({
          [column]: {
            [import_sequelize.Op.gt]: record[column]
          }
        });
      }
    }
    const cursorCondition = {
      [import_sequelize.Op.or]: whereConditions
    };
    return baseWhere ? { [import_sequelize.Op.and]: [baseWhere, cursorCondition] } : cursorCondition;
  }
};
__name(_CompositeKeyCursorStrategy, "CompositeKeyCursorStrategy");
let CompositeKeyCursorStrategy = _CompositeKeyCursorStrategy;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartCursorBuilder
});
