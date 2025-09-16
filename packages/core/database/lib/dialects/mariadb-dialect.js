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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var mariadb_dialect_exports = {};
__export(mariadb_dialect_exports, {
  MariadbDialect: () => MariadbDialect
});
module.exports = __toCommonJS(mariadb_dialect_exports);
var import_base_dialect = require("./base-dialect");
const _MariadbDialect = class _MariadbDialect extends import_base_dialect.BaseDialect {
  getSequelizeOptions(options) {
    options.dialectOptions = { ...options.dialectOptions || {}, supportBigNumbers: true, bigNumberStrings: true };
    return options;
  }
  getVersionGuard() {
    return {
      sql: "select version() as version",
      get: /* @__PURE__ */ __name((v) => {
        const m = /([\d+.]+)/.exec(v);
        return m[0];
      }, "get"),
      version: ">=10.9"
    };
  }
};
__name(_MariadbDialect, "MariadbDialect");
__publicField(_MariadbDialect, "dialectName", "mariadb");
let MariadbDialect = _MariadbDialect;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MariadbDialect
});
