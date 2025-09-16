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
var system_logger_exports = {};
__export(system_logger_exports, {
  createSystemLogger: () => createSystemLogger,
  logger: () => logger
});
module.exports = __toCommonJS(system_logger_exports);
var import_triple_beam = require("triple-beam");
var import_winston = __toESM(require("winston"));
var import_winston_transport = __toESM(require("winston-transport"));
var import_config = require("./config");
var import_format = require("./format");
var import_logger = require("./logger");
const _SystemLoggerTransport = class _SystemLoggerTransport extends import_winston_transport.default {
  logger;
  errorLogger;
  constructor({ seperateError, filename, ...options }) {
    super({ ...options, format: null });
    this.logger = (0, import_logger.createLogger)({
      ...options,
      filename,
      format: import_winston.default.format.combine(
        (0, import_winston.format)((info) => seperateError && info.level === "error" ? false : info)(),
        (0, import_format.getFormat)(options.format)
      )
    });
    if (seperateError) {
      this.errorLogger = (0, import_logger.createLogger)({
        ...options,
        filename: `${filename}_error`,
        level: "error"
      });
    }
  }
  log(info, callback) {
    const { level, message, reqId, app, dataSourceKey, stack, cause, [import_triple_beam.SPLAT]: args } = info;
    const logger2 = level === "error" && this.errorLogger ? this.errorLogger : this.logger;
    const { module: module2, submodule, method, ...meta } = (args == null ? void 0 : args[0]) || {};
    if (!(cause == null ? void 0 : cause.onlyLogCause)) {
      logger2.log({
        level,
        message,
        stack,
        meta,
        module: module2 || info["module"] || "",
        submodule: submodule || info["submodule"] || "",
        method: method || "",
        app,
        reqId,
        dataSourceKey: dataSourceKey || "main"
      });
    }
    if (cause) {
      logger2.log({
        level,
        message: cause.message,
        stack: cause.stack,
        app,
        reqId
      });
    }
    callback(null, true);
  }
  close() {
    this.logger.close();
    if (this.errorLogger) {
      this.errorLogger.close();
    }
  }
};
__name(_SystemLoggerTransport, "SystemLoggerTransport");
let SystemLoggerTransport = _SystemLoggerTransport;
function child(defaultRequestMetadata) {
  const logger2 = this;
  return Object.create(logger2, {
    write: {
      value: /* @__PURE__ */ __name(function(info) {
        const infoClone = Object.assign({}, defaultRequestMetadata, info);
        if (info instanceof Error) {
          infoClone.stack = info.stack;
          infoClone.message = info.message;
          infoClone.cause = info.cause;
        }
        logger2.write(infoClone);
      }, "value")
    }
  });
}
__name(child, "child");
const createSystemLogger = /* @__PURE__ */ __name((options) => {
  const transport = new SystemLoggerTransport(options);
  transport.once("unpipe", () => {
    transport.close();
  });
  const logger2 = import_winston.default.createLogger({
    levels: import_logger.levels,
    transports: [transport]
    // Due to the use of custom log levels,
    // we have to use the any type until Winston updates the type definitions.
  });
  return new Proxy(logger2, {
    get(target, prop) {
      if (prop === "child") {
        return child.bind(target);
      }
      return Reflect.get(target, prop);
    }
  });
}, "createSystemLogger");
const logger = createSystemLogger({
  dirname: (0, import_config.getLoggerFilePath)("main"),
  filename: "system",
  defaultMeta: {
    app: "main",
    module: "cli"
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createSystemLogger,
  logger
});
