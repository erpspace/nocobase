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
var datetime_interface_exports = {};
__export(datetime_interface_exports, {
  DatetimeInterface: () => DatetimeInterface
});
module.exports = __toCommonJS(datetime_interface_exports);
var import_base_interface = require("./base-interface");
var import_utils = require("@nocobase/utils");
var import_dayjs = __toESM(require("dayjs"));
var import_excel_date_to_js = require("excel-date-to-js");
function isDate(v) {
  return v instanceof Date;
}
__name(isDate, "isDate");
function isNumeric(str) {
  if (typeof str === "number") return true;
  if (typeof str != "string") return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}
__name(isNumeric, "isNumeric");
function resolveTimeZoneFromCtx(ctx) {
  if ((ctx == null ? void 0 : ctx.get) && (ctx == null ? void 0 : ctx.get("X-Timezone"))) {
    return ctx.get("X-Timezone");
  }
  return 0;
}
__name(resolveTimeZoneFromCtx, "resolveTimeZoneFromCtx");
const _DatetimeInterface = class _DatetimeInterface extends import_base_interface.BaseInterface {
  parseDateString(value) {
    const dateOnlyMatch = /^(\d{4})[-/]?(\d{2})[-/]?(\d{2})$/.exec(value);
    const dateTimeMatch = /^(\d{4})(\d{2})(\d{2})\s+(\d{2}):(\d{2}):(\d{2})$/.exec(value);
    if (dateTimeMatch) {
      const [_, year, month, day, hour, minute, second] = dateTimeMatch;
      return { year, month, day, hour, minute, second };
    }
    if (dateOnlyMatch) {
      const [_, year, month, day] = dateOnlyMatch;
      return { year, month, day };
    }
    return null;
  }
  formatDateTimeToISO(dateInfo) {
    const { year, month, day, hour = "00", minute = "00", second = "00" } = dateInfo;
    const m = (0, import_dayjs.default)(`${year}-${month}-${day} ${hour}:${minute}:${second}.000`);
    return m.toISOString();
  }
  async toValue(value, ctx = {}) {
    if (!value) {
      return null;
    }
    if (typeof value === "number") {
      const valueStr = value.toString();
      const dateOnlyMatch = /^(\d{4})[-/]?(\d{2})[-/]?(\d{2})$/.exec(valueStr);
      if (dateOnlyMatch) {
        value = valueStr;
      }
    }
    if (typeof value === "string") {
      const dateInfo = this.parseDateString(value);
      if (dateInfo) {
        return this.formatDateTimeToISO(dateInfo);
      }
    }
    if (import_dayjs.default.isDayjs(value)) {
      return value;
    } else if (isDate(value)) {
      return value;
    } else if (isNumeric(value)) {
      return (0, import_excel_date_to_js.getJsDateFromExcel)(value).toISOString();
    } else if (typeof value === "string") {
      return value;
    }
    throw new Error(`Invalid date - ${value}`);
  }
  toString(value, ctx) {
    var _a, _b;
    const utcOffset = resolveTimeZoneFromCtx(ctx);
    const props = ((_b = (_a = this.options) == null ? void 0 : _a.uiSchema) == null ? void 0 : _b["x-component-props"]) ?? {};
    const format = (0, import_utils.getDefaultFormat)(props);
    const m = (0, import_utils.str2moment)(value, { ...props, utcOffset });
    return m ? m.format(format) : "";
  }
};
__name(_DatetimeInterface, "DatetimeInterface");
let DatetimeInterface = _DatetimeInterface;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DatetimeInterface
});
