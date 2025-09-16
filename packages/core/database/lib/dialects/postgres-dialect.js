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
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var postgres_dialect_exports = {};
__export(postgres_dialect_exports, {
  PostgresDialect: () => PostgresDialect
});
module.exports = __toCommonJS(postgres_dialect_exports);
var import_semver = __toESM(require("semver"));
var import_base_dialect = require("./base-dialect");
const _PostgresDialect = class _PostgresDialect extends import_base_dialect.BaseDialect {
  getSequelizeOptions(options) {
    if (!options.hooks) {
      options.hooks = {};
    }
    if (!options.hooks["afterConnect"]) {
      options.hooks["afterConnect"] = [];
    }
    options.hooks["afterConnect"].push(async (connection) => {
      await connection.query("SET search_path TO public;");
    });
    return options;
  }
  getVersionGuard() {
    return {
      sql: "select version() as version",
      get: /* @__PURE__ */ __name((v) => {
        const m = /([\d+.]+)/.exec(v);
        return import_semver.default.minVersion(m[0]).version;
      }, "get"),
      version: ">=10"
    };
  }
};
__name(_PostgresDialect, "PostgresDialect");
__publicField(_PostgresDialect, "dialectName", "postgres");
let PostgresDialect = _PostgresDialect;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PostgresDialect
});
