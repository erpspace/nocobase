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
var format_exports = {};
__export(format_exports, {
  colorFormat: () => colorFormat,
  consoleFormat: () => consoleFormat,
  delimiterFormat: () => delimiterFormat,
  escapeFormat: () => escapeFormat,
  getFormat: () => getFormat,
  logfmtFormat: () => logfmtFormat,
  sortFormat: () => sortFormat,
  stripColorFormat: () => stripColorFormat
});
module.exports = __toCommonJS(format_exports);
var import_chalk = __toESM(require("chalk"));
var import_winston = __toESM(require("winston"));
var import_config = require("./config");
var import_lodash = require("lodash");
const DEFAULT_DELIMITER = "|";
const colorize = {};
const getFormat = /* @__PURE__ */ __name((format) => {
  const configFormat = format || (0, import_config.getLoggerFormat)();
  let logFormat;
  switch (configFormat) {
    case "console":
      logFormat = import_winston.default.format.combine(consoleFormat);
      break;
    case "logfmt":
      logFormat = logfmtFormat;
      break;
    case "delimiter":
      logFormat = import_winston.default.format.combine(escapeFormat, delimiterFormat);
      break;
    case "json":
      logFormat = import_winston.default.format.combine(import_winston.default.format.json({ deterministic: false }));
      break;
    default:
      return import_winston.default.format.combine(format);
  }
  return import_winston.default.format.combine(sortFormat, logFormat);
}, "getFormat");
const colorFormat = import_winston.default.format((info) => {
  Object.entries(info).forEach(([k, v]) => {
    var _a;
    const level = info["level"];
    if (colorize[k]) {
      info[k] = colorize[k](v);
      return;
    }
    if ((_a = colorize[level]) == null ? void 0 : _a[k]) {
      info[k] = colorize[level][k](v);
      return;
    }
  });
  return info;
})();
const stripColorFormat = import_winston.default.format((info) => {
  Object.entries(info).forEach(([k, v]) => {
    if (typeof v !== "string") {
      return;
    }
    const regex = new RegExp(`\\x1b\\[\\d+m`, "g");
    info[k] = v.replace(regex, "");
  });
  return info;
})();
const logfmtFormat = import_winston.default.format.printf(
  (info) => Object.entries(info).map(([k, v]) => {
    if (typeof v === "object") {
      try {
        v = JSON.stringify(v);
      } catch (error) {
        v = String(v);
      }
    }
    if (v === void 0 || v === null) {
      v = "";
    }
    return `${k}=${v}`;
  }).join(" ")
);
const consoleFormat = import_winston.default.format.printf((info) => {
  const keys = ["level", "timestamp", "message"];
  Object.entries(info).forEach(([k, v]) => {
    if (typeof v === "object") {
      if ((0, import_lodash.isEmpty)(v)) {
        info[k] = "";
        return;
      }
      try {
        info[k] = JSON.stringify(v);
      } catch (error) {
        info[k] = String(v);
      }
    }
    if (v === void 0 || v === null) {
      info[k] = "";
    }
  });
  const tags = Object.entries(info).filter(([k, v]) => !keys.includes(k) && v).map(([k, v]) => `${k}=${v}`).join(" ");
  const level = `[${info.level}]`.padEnd(7, " ");
  const message = info.message.padEnd(44, " ");
  const color = {
    error: import_chalk.default.red,
    warn: import_chalk.default.yellow,
    info: import_chalk.default.green,
    debug: import_chalk.default.blue,
    trace: import_chalk.default.cyan
  }[info.level] || import_chalk.default.white;
  const colorized = message.startsWith("Executing") ? color(`${info.timestamp} ${level}`) + ` ${message}` : color(`${info.timestamp} ${level} ${message}`);
  return `${colorized} ${tags}`;
});
const delimiterFormat = import_winston.default.format.printf(
  (info) => Object.entries(info).map(([, v]) => {
    if (typeof v === "object") {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return String(v);
      }
    }
    return v;
  }).join(DEFAULT_DELIMITER)
);
const escapeFormat = import_winston.default.format((info) => {
  let { message } = info;
  if (typeof message === "string" && message.includes(DEFAULT_DELIMITER)) {
    message = message.replace(/"/g, '\\"');
    message = `"${message}"`;
  }
  return { ...info, message };
})();
const sortFormat = import_winston.default.format((info) => ({ level: info.level, ...info }))();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  colorFormat,
  consoleFormat,
  delimiterFormat,
  escapeFormat,
  getFormat,
  logfmtFormat,
  sortFormat,
  stripColorFormat
});
