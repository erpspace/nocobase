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
var config_exports = {};
__export(config_exports, {
  getConfig: () => getConfig
});
module.exports = __toCommonJS(config_exports);
var import_cache = require("./cache");
var import_database = require("./database");
var import_logger = __toESM(require("./logger"));
var import_plugins = __toESM(require("./plugins"));
var import_resourcer = __toESM(require("./resourcer"));
var import_telemetry = require("./telemetry");
async function getConfig() {
  return {
    database: await (0, import_database.parseDatabaseOptions)(),
    resourcer: import_resourcer.default,
    plugins: import_plugins.default,
    cacheManager: import_cache.cacheManager,
    logger: import_logger.default,
    telemetry: import_telemetry.telemetry,
    perfHooks: process.env.ENABLE_PERF_HOOKS ? true : false
  };
}
__name(getConfig, "getConfig");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getConfig
});
