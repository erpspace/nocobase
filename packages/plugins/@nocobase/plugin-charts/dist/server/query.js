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
var query_exports = {};
__export(query_exports, {
  default: () => query_default,
  query: () => query
});
module.exports = __toCommonJS(query_exports);
const query = {
  api: async (options) => {
    return [];
  },
  json: async (options) => {
    return options.data || [];
  },
  sql: async (options, {
    db,
    transaction,
    skipError,
    validateSQL
  }) => {
    try {
      const sql = options.sql.trim().split(";").shift();
      if (!sql) {
        throw new Error("SQL is empty");
      }
      if (!/^select/i.test(sql) && !/^with([\s\S]+)select([\s\S]+)/i.test(sql)) {
        throw new Error("Only select query allowed");
      }
      const [data] = await db.sequelize.query(sql, { transaction });
      return data;
    } catch (error) {
      if (skipError) {
        return [];
      }
      throw error;
    }
  }
};
var query_default = query;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  query
});
