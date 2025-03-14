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
var mysql_formatter_exports = {};
__export(mysql_formatter_exports, {
  MySQLFormatter: () => MySQLFormatter
});
module.exports = __toCommonJS(mysql_formatter_exports);
var import_formatter = require("./formatter");
var import_moment_timezone = __toESM(require("moment-timezone"));
class MySQLFormatter extends import_formatter.Formatter {
  convertFormat(format) {
    return format.replace(/YYYY/g, "%Y").replace(/MM/g, "%m").replace(/DD/g, "%d").replace(/hh/g, "%H").replace(/mm/g, "%i").replace(/ss/g, "%S");
  }
  formatDate(field, format, timezoneOffset) {
    const tz = import_moment_timezone.default.tz(process.env.TZ || "UTC").format("Z");
    format = this.convertFormat(format);
    if (timezoneOffset && tz !== timezoneOffset) {
      return this.sequelize.fn("date_format", this.sequelize.fn("convert_tz", field, tz, timezoneOffset), format);
    }
    return this.sequelize.fn("date_format", field, format);
  }
  formatUnixTimeStamp(field, format, accuracy = "second", timezoneOffset) {
    const col = this.sequelize.getQueryInterface().quoteIdentifiers(field);
    const timezone = this.getTimezoneByOffset(timezoneOffset);
    format = this.convertFormat(format);
    if (timezone) {
      if (accuracy === "millisecond") {
        return this.sequelize.fn(
          "date_format",
          this.sequelize.fn(
            "convert_tz",
            this.sequelize.fn("from_unixtime", this.sequelize.literal(`ROUND(${col} / 1000)`)),
            process.env.TZ || "UTC",
            timezone
          ),
          format
        );
      }
      return this.sequelize.fn(
        "date_format",
        this.sequelize.fn(
          "convert_tz",
          this.sequelize.fn("from_unixtime", this.sequelize.col(field)),
          process.env.TZ || "UTC",
          timezone
        ),
        format
      );
    }
    if (accuracy === "millisecond") {
      return this.sequelize.fn("from_unixtime", this.sequelize.literal(`ROUND(${col} / 1000)`), format);
    }
    return this.sequelize.fn("from_unixtime", this.sequelize.col(field), format);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MySQLFormatter
});
