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
  getLoggerFilePath: () => getLoggerFilePath,
  getLoggerFormat: () => getLoggerFormat,
  getLoggerLevel: () => getLoggerLevel,
  getLoggerTransport: () => getLoggerTransport
});
module.exports = __toCommonJS(config_exports);
var import_path = __toESM(require("path"));
const getLoggerLevel = /* @__PURE__ */ __name(() => process.env.LOGGER_LEVEL || (process.env.APP_ENV === "development" ? "debug" : "info"), "getLoggerLevel");
const getLoggerFilePath = /* @__PURE__ */ __name((...paths) => {
  return import_path.default.resolve(process.env.LOGGER_BASE_PATH || import_path.default.resolve(process.cwd(), "storage", "logs"), ...paths);
}, "getLoggerFilePath");
const getLoggerTransport = /* @__PURE__ */ __name(() => (process.env.LOGGER_TRANSPORT || "console,dailyRotateFile").split(","), "getLoggerTransport");
const getLoggerFormat = /* @__PURE__ */ __name(() => process.env.LOGGER_FORMAT || (process.env.APP_ENV === "development" ? "console" : "json"), "getLoggerFormat");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getLoggerFilePath,
  getLoggerFormat,
  getLoggerLevel,
  getLoggerTransport
});
