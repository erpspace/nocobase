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
var helpers_exports = {};
__export(helpers_exports, {
  getDialect: () => getDialect,
  isMysql: () => isMysql,
  isPg: () => isPg,
  isSqlite: () => isSqlite,
  joinComma: () => joinComma,
  toValue: () => toValue
});
module.exports = __toCommonJS(helpers_exports);
const joinComma = (value) => {
  if (!value) return null;
  return `(${value.join(",")})`;
};
const toValue = (value) => {
  if (!value) return null;
  return JSON.parse(value.replace(/\(/g, "[").replace(/\)/g, "]"));
};
const getDialect = (ctx) => {
  return (ctx.db || ctx.database).sequelize.getDialect();
};
const isPg = (ctx) => {
  return getDialect(ctx) === "postgres";
};
const isSqlite = (ctx) => {
  return getDialect(ctx) === "sqlite";
};
const isMysql = (ctx) => {
  return getDialect(ctx) === "mysql";
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getDialect,
  isMysql,
  isPg,
  isSqlite,
  joinComma,
  toValue
});
