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
var formatter_exports = {};
__export(formatter_exports, {
  Formatter: () => Formatter
});
module.exports = __toCommonJS(formatter_exports);
var import_moment_timezone = __toESM(require("moment-timezone"));
class Formatter {
  sequelize;
  constructor(sequelize) {
    this.sequelize = sequelize;
  }
  getTimezoneByOffset(offset) {
    if (!/^[+-]\d{1,2}:\d{2}$/.test(offset)) {
      return offset;
    }
    const offsetMinutes = import_moment_timezone.default.duration(offset).asMinutes();
    return import_moment_timezone.default.tz.names().find((timezone) => {
      return import_moment_timezone.default.tz(timezone).utcOffset() === offsetMinutes;
    });
  }
  convertFormat(format) {
    return format;
  }
  format(options) {
    var _a, _b;
    const { type, field, format, timezone, options: fieldOptions } = options;
    const col = this.sequelize.col(field);
    switch (type) {
      case "date":
      case "datetime":
      case "datetimeTz":
        return this.formatDate(col, format, timezone);
      case "datetimeNoTz":
      case "dateOnly":
      case "time":
        return this.formatDate(col, format);
      case "unixTimestamp": {
        const accuracy = ((_b = (_a = fieldOptions == null ? void 0 : fieldOptions.uiSchema) == null ? void 0 : _a["x-component-props"]) == null ? void 0 : _b.accuracy) || (fieldOptions == null ? void 0 : fieldOptions.accuracy) || "second";
        return this.formatUnixTimeStamp(field, format, accuracy, timezone);
      }
      default:
        return this.sequelize.col(field);
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Formatter
});
