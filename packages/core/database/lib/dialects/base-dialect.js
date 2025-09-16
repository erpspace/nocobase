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
var base_dialect_exports = {};
__export(base_dialect_exports, {
  BaseDialect: () => BaseDialect
});
module.exports = __toCommonJS(base_dialect_exports);
var import_semver = __toESM(require("semver"));
const _BaseDialect = class _BaseDialect {
  getSequelizeOptions(options) {
    return options;
  }
  async checkDatabaseVersion(db) {
    var _a;
    const versionGuard = this.getVersionGuard();
    const result = await db.sequelize.query(versionGuard.sql, {
      type: "SELECT"
    });
    const version = versionGuard.get((_a = result == null ? void 0 : result[0]) == null ? void 0 : _a.version);
    const versionResult = import_semver.default.satisfies(version, versionGuard.version);
    if (!versionResult) {
      throw new Error(
        `to use ${this.constructor.dialectName}, please ensure the version is ${versionGuard.version}, current version is ${version}`
      );
    }
    return true;
  }
  getVersionGuard() {
    throw new Error("not implemented");
  }
};
__name(_BaseDialect, "BaseDialect");
__publicField(_BaseDialect, "dialectName");
let BaseDialect = _BaseDialect;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseDialect
});
