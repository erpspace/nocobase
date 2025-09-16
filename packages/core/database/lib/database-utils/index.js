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
var database_utils_exports = {};
__export(database_utils_exports, {
  default: () => DatabaseUtils
});
module.exports = __toCommonJS(database_utils_exports);
var import_lodash = __toESM(require("lodash"));
const _DatabaseUtils = class _DatabaseUtils {
  constructor(db) {
    this.db = db;
  }
  addSchema(tableName, schema) {
    if (!this.db.inDialect("postgres")) return tableName;
    if (this.db.options.schema && !schema) {
      schema = this.db.options.schema;
    }
    if (schema) {
      tableName = this.db.sequelize.getQueryInterface().queryGenerator.addSchema({
        tableName,
        _schema: schema
      });
    }
    return tableName;
  }
  quoteTable(tableName) {
    const queryGenerator = this.db.sequelize.getQueryInterface().queryGenerator;
    tableName = queryGenerator.quoteTable(import_lodash.default.isPlainObject(tableName) ? tableName : this.addSchema(tableName));
    return tableName;
  }
  schema() {
    if (!this.db.inDialect("postgres")) {
      return void 0;
    }
    return this.db.options.schema || "public";
  }
};
__name(_DatabaseUtils, "DatabaseUtils");
let DatabaseUtils = _DatabaseUtils;
