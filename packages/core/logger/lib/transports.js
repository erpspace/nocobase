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
var transports_exports = {};
__export(transports_exports, {
  Transports: () => Transports,
  getTransports: () => getTransports
});
module.exports = __toCommonJS(transports_exports);
var import_winston = __toESM(require("winston"));
var import_config = require("./config");
var import_path = __toESM(require("path"));
var import_format = require("./format");
const Transports = {
  console: /* @__PURE__ */ __name((options) => new import_winston.default.transports.Console(options), "console"),
  file: /* @__PURE__ */ __name((options) => new import_winston.default.transports.File({
    maxsize: Number(process.env.LOGGER_MAX_SIZE) || 1024 * 1024 * 20,
    maxFiles: Number(process.env.LOGGER_MAX_FILES) || 10,
    ...options
  }), "file"),
  dailyRotateFile: /* @__PURE__ */ __name((options) => new import_winston.default.transports.DailyRotateFile({
    maxSize: Number(process.env.LOGGER_MAX_SIZE),
    maxFiles: Number(process.env.LOGGER_MAX_FILES) || "14d",
    ...options
  }), "dailyRotateFile")
};
const getTransports = /* @__PURE__ */ __name((options) => {
  const { filename, format: _format, transports: _transports } = options;
  let { dirname } = options;
  const configTransports = _transports || (0, import_config.getLoggerTransport)();
  const configFormat = _format || (0, import_config.getLoggerFormat)();
  dirname = dirname || (0, import_config.getLoggerFilePath)();
  if (!import_path.default.isAbsolute(dirname)) {
    dirname = import_path.default.resolve(process.cwd(), dirname);
  }
  const format = import_winston.default.format.combine(
    import_winston.default.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    (0, import_format.getFormat)(configFormat)
  );
  const transports = {
    console: /* @__PURE__ */ __name(() => Transports.console({
      format: import_winston.default.format.combine(format)
    }), "console"),
    file: /* @__PURE__ */ __name(() => Transports.file({
      dirname,
      filename: filename.includes(".log") ? filename : `${filename}.log`,
      format
    }), "file"),
    dailyRotateFile: /* @__PURE__ */ __name(() => Transports.dailyRotateFile({
      dirname,
      filename: filename.includes("%DATE%") || filename.includes(".log") ? filename : `${filename}_%DATE%.log`,
      format
    }), "dailyRotateFile")
  };
  return (configTransports == null ? void 0 : configTransports.map((t) => typeof t === "string" ? transports[t]() : t)) || transports["console"]();
}, "getTransports");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Transports,
  getTransports
});
