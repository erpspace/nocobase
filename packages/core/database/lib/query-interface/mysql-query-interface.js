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
var mysql_query_interface_exports = {};
__export(mysql_query_interface_exports, {
  default: () => MysqlQueryInterface
});
module.exports = __toCommonJS(mysql_query_interface_exports);
var import_sql_parser = __toESM(require("../sql-parser"));
var import_query_interface = __toESM(require("./query-interface"));
/* istanbul ignore file -- @preserve */
const _MysqlQueryInterface = class _MysqlQueryInterface extends import_query_interface.default {
  constructor(db) {
    super(db);
  }
  async collectionTableExists(collection, options) {
    const transaction = options == null ? void 0 : options.transaction;
    const tableName = collection.model.tableName;
    const databaseName = this.db.options.database;
    const sql = `SELECT TABLE_NAME
                 FROM INFORMATION_SCHEMA.TABLES
                 WHERE TABLE_SCHEMA = '${databaseName}'
                   AND TABLE_NAME = '${tableName}'`;
    const results = await this.db.sequelize.query(sql, { type: "SELECT", transaction });
    return results.length > 0;
  }
  async listViews() {
    const sql = `SELECT TABLE_NAME as name, VIEW_DEFINITION as definition
                 FROM information_schema.views
                 WHERE TABLE_SCHEMA = DATABASE()
                 ORDER BY TABLE_NAME;`;
    return await this.db.sequelize.query(sql, { type: "SELECT" });
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
    const viewDefinition = await this.db.sequelize.query(`SHOW CREATE VIEW ${viewName}`, { type: "SELECT" });
    const createView = viewDefinition[0]["Create View"];
    const regex = /(?<=AS\s)([\s\S]*)/i;
    const match = createView.match(regex);
    const sql = match[0];
    return sql;
  }
  async showTableDefinition(tableInfo) {
    const { tableName } = tableInfo;
    const sql = `SHOW CREATE TABLE ${this.db.utils.quoteTable(tableName)}`;
    const results = await this.db.sequelize.query(sql, { type: "SELECT" });
    return results[0]["Create Table"];
  }
  async getAutoIncrementInfo(options) {
    const { tableInfo, fieldName, transaction } = options;
    const sql = `SELECT AUTO_INCREMENT as currentVal
                 FROM information_schema.tables
                 WHERE table_schema = DATABASE()
                   AND table_name = '${tableInfo.tableName}';`;
    const results = await this.db.sequelize.query(sql, { type: "SELECT", transaction });
    let currentVal = results[0]["currentVal"];
    if (currentVal === null) {
      const maxSql = `SELECT MAX(\`${fieldName}\`) as currentVal
                      FROM \`${tableInfo.tableName}\`;`;
      const maxResults = await this.db.sequelize.query(maxSql, { type: "SELECT", transaction });
      currentVal = maxResults[0]["currentVal"];
    }
    return {
      currentVal
    };
  }
  async setAutoIncrementVal(options) {
    const { tableInfo, columnName, seqName, currentVal, transaction } = options;
    if (currentVal) {
      const sql = `ALTER TABLE ${this.quoteIdentifier(tableInfo.tableName)} AUTO_INCREMENT = ${currentVal};`;
      await this.db.sequelize.query(sql, { transaction });
    }
  }
  generateJoinOnForJSONArray(left, right) {
    return this.db.sequelize.literal(`JSON_CONTAINS(${right}, JSON_ARRAY(${left}))`);
  }
};
__name(_MysqlQueryInterface, "MysqlQueryInterface");
let MysqlQueryInterface = _MysqlQueryInterface;
