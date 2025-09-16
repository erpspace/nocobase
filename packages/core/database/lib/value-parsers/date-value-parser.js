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
var date_value_parser_exports = {};
__export(date_value_parser_exports, {
  DateValueParser: () => DateValueParser
});
module.exports = __toCommonJS(date_value_parser_exports);
var import_utils = require("@nocobase/utils");
var import_dayjs = __toESM(require("dayjs"));
var import_excel_date_to_js = require("excel-date-to-js");
var import_base_value_parser = require("./base-value-parser");
function isNumeric(str) {
  if (typeof str === "number") return true;
  if (typeof str != "string") return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}
__name(isNumeric, "isNumeric");
const _DateValueParser = class _DateValueParser extends import_base_value_parser.BaseValueParser {
  async setValue(value) {
    if (typeof value === "string") {
      const match = /^(\d{4})[-/]?(\d{2})[-/]?(\d{2})$/.exec(value);
      if (match) {
        const m = (0, import_dayjs.default)(`${match[1]}-${match[2]}-${match[3]} 00:00:00.000`);
        this.value = m.toISOString();
        return;
      }
    }
    if (import_dayjs.default.isDayjs(value)) {
      this.value = value;
    } else if (isDate(value)) {
      this.value = value;
    } else if (isNumeric(value)) {
      try {
        this.value = (0, import_excel_date_to_js.getJsDateFromExcel)(value).toISOString();
      } catch (error) {
        this.errors.push(`Invalid date - ${error.message}`);
      }
    } else if (typeof value === "string") {
      const props = this.getProps();
      const m = (0, import_dayjs.default)(value);
      if (m.isValid()) {
        this.value = (0, import_utils.moment2str)(m, props);
      } else {
        this.errors.push("Invalid date");
      }
    }
  }
  getProps() {
    var _a, _b;
    return ((_b = (_a = this.field.options) == null ? void 0 : _a.uiSchema) == null ? void 0 : _b["x-component-props"]) || {};
  }
};
__name(_DateValueParser, "DateValueParser");
let DateValueParser = _DateValueParser;
function isDate(v) {
  return v instanceof Date;
}
__name(isDate, "isDate");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DateValueParser
});
