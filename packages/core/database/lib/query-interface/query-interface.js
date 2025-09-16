/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var query_interface_exports = {};
__export(query_interface_exports, {
  default: () => QueryInterface
});
module.exports = __toCommonJS(query_interface_exports);
const _QueryInterface = class _QueryInterface {
  constructor(db) {
    this.db = db;
    this.sequelizeQueryInterface = db.sequelize.getQueryInterface();
  }
  sequelizeQueryInterface;
  async dropAll(options) {
    if (options.drop !== true) return;
    const views = await this.listViews();
    for (const view of views) {
      let removeSql;
      if (view.schema) {
        removeSql = `DROP VIEW IF EXISTS "${view.schema}"."${view.name}"`;
      } else {
        removeSql = `DROP VIEW IF EXISTS ${view.name}`;
      }
      try {
        await this.db.sequelize.query(removeSql, { transaction: options.transaction });
      } catch (e) {
        console.log(`can not drop view ${view.name}, ${e.message}`);
      }
    }
    await this.db.sequelize.getQueryInterface().dropAllTables(options);
  }
  quoteIdentifier(identifier) {
    return this.db.sequelize.getQueryInterface().queryGenerator.quoteIdentifier(identifier);
  }
  generateJoinOnForJSONArray(left, right) {
    const dialect = this.db.sequelize.getDialect();
    throw new Error(`Filtering by many to many (array) associations is not supported on ${dialect}`);
  }
};
__name(_QueryInterface, "QueryInterface");
let QueryInterface = _QueryInterface;
