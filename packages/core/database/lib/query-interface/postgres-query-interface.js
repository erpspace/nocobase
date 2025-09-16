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
var postgres_query_interface_exports = {};
__export(postgres_query_interface_exports, {
  default: () => PostgresQueryInterface
});
module.exports = __toCommonJS(postgres_query_interface_exports);
var import_lodash = __toESM(require("lodash"));
var import_sql_parser = __toESM(require("../sql-parser"));
var import_query_interface = __toESM(require("./query-interface"));
const _PostgresQueryInterface = class _PostgresQueryInterface extends import_query_interface.default {
  constructor(db) {
    super(db);
  }
  async setAutoIncrementVal(options) {
    const { tableInfo, columnName, seqName, currentVal, transaction } = options;
    if (!seqName) {
      throw new Error("seqName is required to set auto increment val in postgres");
    }
    await this.db.sequelize.query(
      `alter table ${this.db.utils.quoteTable({
        tableName: tableInfo.tableName,
        schema: tableInfo.schema
      })}
            alter column "${columnName}" set default nextval('${seqName}')`,
      {
        transaction
      }
    );
    if (currentVal) {
      await this.db.sequelize.query(`select setval('${seqName}', ${currentVal})`, {
        transaction
      });
    }
  }
  async getAutoIncrementInfo(options) {
    const fieldName = options.fieldName || "id";
    const tableInfo = options.tableInfo;
    const transaction = options.transaction;
    const sequenceNameResult = await this.db.sequelize.query(
      `SELECT column_default
           FROM information_schema.columns
           WHERE table_name = '${tableInfo.tableName}'
             and table_schema = '${tableInfo.schema || "public"}'
             and "column_name" = '${fieldName}';`,
      {
        transaction
      }
    );
    const columnDefault = sequenceNameResult[0][0]["column_default"];
    const regex = new RegExp(/nextval\('(.*)'::regclass\)/);
    const match = regex.exec(columnDefault);
    const sequenceName = match[1];
    const sequenceCurrentValResult = await this.db.sequelize.query(
      `select last_value
           from ${sequenceName}`,
      {
        transaction
      }
    );
    const sequenceCurrentVal = parseInt(sequenceCurrentValResult[0][0]["last_value"]);
    return {
      seqName: sequenceName,
      currentVal: sequenceCurrentVal
    };
  }
  async collectionTableExists(collection, options) {
    const transaction = options == null ? void 0 : options.transaction;
    const tableName = collection.model.tableName;
    const schema = collection.collectionSchema() || "public";
    const sql = `SELECT EXISTS(SELECT 1
                               FROM information_schema.tables
                               WHERE table_schema = '${schema}'
                                 AND table_name = '${tableName}')`;
    const results = await this.db.sequelize.query(sql, { type: "SELECT", transaction });
    return results[0]["exists"];
  }
  async listViews(options) {
    var _a;
    const targetSchema = (options == null ? void 0 : options.schema) || ((_a = this.db.options) == null ? void 0 : _a.schema) || "public";
    const sql = targetSchema ? `
      SELECT viewname as name, definition, schemaname as schema
      FROM pg_views
      WHERE schemaname = '${targetSchema}'
      ORDER BY viewname;
    ` : `
      SELECT viewname as name, definition, schemaname as schema
      FROM pg_views
      WHERE schemaname NOT IN ('pg_catalog', 'information_schema')
      ORDER BY viewname;
    `;
    return await this.db.sequelize.query(sql, { type: "SELECT" });
  }
  async viewDef(viewName) {
    const [schema, name] = viewName.split(".");
    const viewDefQuery = await this.db.sequelize.query(
      `
    select pg_get_viewdef(format('%I.%I', '${schema}', '${name}')::regclass, true) as definition
    `,
      { type: "SELECT" }
    );
    return import_lodash.default.trim(viewDefQuery[0]["definition"]);
  }
  parseSQL(sql) {
    return import_sql_parser.default.parse(sql, {
      database: "Postgresql"
    });
  }
  async viewColumnUsage(options) {
    const { viewName, schema = "public" } = options;
    const sql = `
      SELECT *
      FROM information_schema.view_column_usage
      WHERE view_schema = '${schema}'
        AND view_name = '${viewName}';
    `;
    const columnUsages = await this.db.sequelize.query(sql, { type: "SELECT" });
    const def = await this.viewDef(`${schema}.${viewName}`);
    try {
      const { ast } = this.parseSQL(def);
      const columns = ast[0].columns;
      const usages = columns.map((column) => {
        const fieldAlias = column.as || column.expr.column;
        const columnUsage = columnUsages.find((columnUsage2) => {
          let columnExprTable = column.expr.table;
          const from = ast[0].from;
          if (columnExprTable === null && column.expr.type === "column_ref") {
            columnExprTable = from[0].table;
          } else {
            const findAs = from.find((from2) => from2.as === columnExprTable);
            if (findAs) {
              columnExprTable = findAs.table;
            }
          }
          return columnUsage2.column_name === column.expr.column && columnUsage2.table_name === columnExprTable;
        });
        return [
          fieldAlias,
          columnUsage ? {
            ...columnUsage
          } : null
        ];
      }).filter(([, columnUsage]) => columnUsage !== null);
      return Object.fromEntries(usages);
    } catch (e) {
      console.log(e);
      return {};
    }
  }
  async showTableDefinition(tableInfo) {
    const showFunc = `
CREATE OR REPLACE FUNCTION show_create_table(p_schema text, p_table_name text)
RETURNS text AS
$BODY$
SELECT 'CREATE TABLE ' || quote_ident(p_schema) || '.' || quote_ident(p_table_name) || ' (' || E'\\n' || '' ||
    string_agg(column_list.column_expr, ', ' || E'\\n' || '') ||
    '' || E'\\n' || ');'
FROM (
  SELECT '    ' || quote_ident(column_name) || ' ' || data_type ||
       coalesce('(' || character_maximum_length || ')', '') ||
       case when is_nullable = 'YES' then '' else ' NOT NULL' end as column_expr
  FROM information_schema.columns
  WHERE table_schema = p_schema AND table_name = p_table_name
  ORDER BY ordinal_position) column_list;
$BODY$
  LANGUAGE SQL STABLE;
    `;
    await this.db.sequelize.query(showFunc, { type: "RAW" });
    const res = await this.db.sequelize.query(
      `SELECT show_create_table('${tableInfo.schema || "public"}', '${tableInfo.tableName}')`,
      {
        type: "SELECT"
      }
    );
    return res[0]["show_create_table"];
  }
  generateJoinOnForJSONArray(left, right) {
    return this.db.sequelize.literal(`${left}=any(${right})`);
  }
};
__name(_PostgresQueryInterface, "PostgresQueryInterface");
let PostgresQueryInterface = _PostgresQueryInterface;
