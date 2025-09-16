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
var mysql_dialect_exports = {};
__export(mysql_dialect_exports, {
  MysqlDialect: () => MysqlDialect
});
module.exports = __toCommonJS(mysql_dialect_exports);
var import_utils = require("@nocobase/utils");
var import_base_dialect = require("./base-dialect");
const _MysqlDialect = class _MysqlDialect extends import_base_dialect.BaseDialect {
  getVersionGuard() {
    return {
      sql: "select version() as version",
      get: /* @__PURE__ */ __name((v) => {
        const m = /([\d+.]+)/.exec(v);
        return m[0];
      }, "get"),
      version: ">=8.0.17"
    };
  }
  getSequelizeOptions(options) {
    import_utils.lodash.set(options, "dialectOptions.multipleStatements", true);
    return options;
  }
};
__name(_MysqlDialect, "MysqlDialect");
__publicField(_MysqlDialect, "dialectName", "mysql");
let MysqlDialect = _MysqlDialect;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MysqlDialect
});
