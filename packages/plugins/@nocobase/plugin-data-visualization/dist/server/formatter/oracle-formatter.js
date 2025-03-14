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
var oracle_formatter_exports = {};
__export(oracle_formatter_exports, {
  OracleFormatter: () => OracleFormatter
});
module.exports = __toCommonJS(oracle_formatter_exports);
var import_formatter = require("./formatter");
class OracleFormatter extends import_formatter.Formatter {
  convertFormat(format) {
    return format.replace(/hh/g, "HH24").replace(/mm/g, "MI").replace(/ss/g, "SS");
  }
  formatDate(field, format, timezoneOffset) {
    format = this.convertFormat(format);
    const timezone = this.getTimezoneByOffset(timezoneOffset);
    if (timezone) {
      const col = this.sequelize.getQueryInterface().quoteIdentifiers(field.col);
      const fieldWithTZ = this.sequelize.literal(`(${col} AT TIME ZONE '${timezone}')`);
      return this.sequelize.fn("to_char", fieldWithTZ, format);
    }
    return this.sequelize.fn("to_char", field, format);
  }
  formatUnixTimeStamp(field, format, accuracy = "second", timezoneOffset) {
    format = this.convertFormat(format);
    const col = this.sequelize.getQueryInterface().quoteIdentifiers(field);
    const timezone = this.getTimezoneByOffset(timezoneOffset);
    if (timezone) {
      if (accuracy === "millisecond") {
        return this.sequelize.fn(
          "to_char",
          this.sequelize.literal(`to_timestamp(ROUND(${col} / 1000)) AT TIME ZONE '${timezone}'`),
          format
        );
      }
      return this.sequelize.fn(
        "to_char",
        this.sequelize.literal(`to_timestamp(${col}) AT TIME ZONE '${timezone}'`),
        format
      );
    }
    if (accuracy === "millisecond") {
      return this.sequelize.fn("to_char", this.sequelize.literal(`to_timestamp(ROUND(${col} / 1000)`), format);
    }
    return this.sequelize.fn("to_char", this.sequelize.literal(`to_timestamp(${col})`), format);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OracleFormatter
});
