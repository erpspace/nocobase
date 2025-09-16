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
var sqlite_query_interface_exports = {};
__export(sqlite_query_interface_exports, {
  default: () => SqliteQueryInterface
});
module.exports = __toCommonJS(sqlite_query_interface_exports);
var import_sql_parser = __toESM(require("../sql-parser"));
var import_query_interface = __toESM(require("./query-interface"));
/* istanbul ignore file -- @preserve */
const _SqliteQueryInterface = class _SqliteQueryInterface extends import_query_interface.default {
  constructor(db) {
    super(db);
  }
  async collectionTableExists(collection, options) {
    const transaction = options == null ? void 0 : options.transaction;
    const tableName = collection.model.tableName;
    const sql = `SELECT name
                 FROM sqlite_master
                 WHERE type = 'table'
                   AND name = '${tableName}';`;
    const results = await this.db.sequelize.query(sql, { type: "SELECT", transaction });
    return results.length > 0;
  }
  async listViews() {
    const sql = `
      SELECT name, sql as definition
      FROM sqlite_master
      WHERE type = 'view'
      ORDER BY name;
    `;
    return await this.db.sequelize.query(sql, {
      type: "SELECT"
    });
  }
  async viewColumnUsage(options) {
    try {
      const { ast } = this.parseSQL(await this.viewDef(options.viewName));
      const columns = ast.columns;
      const results = [];
      for (const column of columns) {
        if (column.expr.type === "column_ref") {
          results.push([
            column.as || column.expr.column,
            {
              column_name: column.expr.column,
              table_name: column.expr.table
            }
          ]);
        }
      }
      return Object.fromEntries(results);
    } catch (e) {
      this.db.logger.warn(e);
      return {};
    }
  }
  parseSQL(sql) {
    return import_sql_parser.default.parse(sql);
  }
  async viewDef(viewName) {
    const viewDefinition = await this.db.sequelize.query(
      `SELECT sql
       FROM sqlite_master
       WHERE name = '${viewName}' AND type = 'view'`,
      {
        type: "SELECT"
      }
    );
    const createView = viewDefinition[0]["sql"];
    const regex = /(?<=AS\s)([\s\S]*)/i;
    const match = createView.match(regex);
    const sql = match[0];
    return sql;
  }
  showTableDefinition(tableInfo) {
    return Promise.resolve(void 0);
  }
  async getAutoIncrementInfo(options) {
    const { tableInfo, transaction } = options;
    const tableName = tableInfo.tableName;
    const sql = `SELECT seq
                 FROM sqlite_sequence
                 WHERE name = '${tableName}';`;
    const results = await this.db.sequelize.query(sql, { type: "SELECT", transaction });
    const row = results[0];
    if (!row) {
      return {
        currentVal: 0
      };
    }
    return {
      currentVal: row["seq"]
    };
  }
  async setAutoIncrementVal(options) {
    const { tableInfo, columnName, seqName, currentVal, transaction } = options;
    const tableName = tableInfo.tableName;
    const sql = `UPDATE sqlite_sequence
                 SET seq = ${currentVal}
                 WHERE name = '${tableName}';`;
    await this.db.sequelize.query(sql, { transaction });
  }
  generateJoinOnForJSONArray(left, right) {
    return this.db.sequelize.literal(`${left} in (SELECT value from json_each(${right}))`);
  }
};
__name(_SqliteQueryInterface, "SqliteQueryInterface");
let SqliteQueryInterface = _SqliteQueryInterface;
