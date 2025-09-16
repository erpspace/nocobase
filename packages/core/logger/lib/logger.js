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
var logger_exports = {};
__export(logger_exports, {
  createConsoleLogger: () => createConsoleLogger,
  createLogger: () => createLogger,
  levels: () => levels
});
module.exports = __toCommonJS(logger_exports);
var import_winston = __toESM(require("winston"));
var import_winston_daily_rotate_file = require("winston-daily-rotate-file");
var import_config = require("./config");
var import_format = require("./format");
var import_transports = require("./transports");
const levels = {
  trace: 4,
  debug: 3,
  info: 2,
  warn: 1,
  error: 0
};
const createLogger = /* @__PURE__ */ __name((options) => {
  if (process.env.GITHUB_ACTIONS) {
    return createConsoleLogger();
  }
  const { format, ...rest } = options;
  const winstonOptions = {
    levels,
    level: (0, import_config.getLoggerLevel)(),
    ...rest,
    transports: (0, import_transports.getTransports)(options)
  };
  return import_winston.default.createLogger(winstonOptions);
}, "createLogger");
const createConsoleLogger = /* @__PURE__ */ __name((options) => {
  const { format, ...rest } = options || {};
  return import_winston.default.createLogger({
    levels,
    level: (0, import_config.getLoggerLevel)(),
    format: import_winston.default.format.combine(
      import_winston.default.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss"
      }),
      format || import_format.consoleFormat
    ),
    ...rest || {},
    transports: [new import_winston.default.transports.Console()]
  });
}, "createConsoleLogger");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createConsoleLogger,
  createLogger,
  levels
});
