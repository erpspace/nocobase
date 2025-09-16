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
var date_exports = {};
__export(date_exports, {
  getDateTimeFormat: () => getDateTimeFormat,
  getDefaultFormat: () => getDefaultFormat,
  getFormatFromDateStr: () => getFormatFromDateStr,
  getPickerFormat: () => getPickerFormat,
  moment2str: () => moment2str,
  offsetFromString: () => offsetFromString,
  str2moment: () => str2moment,
  toGmt: () => toGmt,
  toLocal: () => toLocal
});
module.exports = __toCommonJS(date_exports);
var import_lodash = __toESM(require("lodash"));
var import_dayjs = require("./dayjs");
const getDefaultFormat = /* @__PURE__ */ __name((props) => {
  if (props.format) {
    return props.format;
  }
  if (props.dateFormat) {
    if (props["showTime"]) {
      return `${props.dateFormat} ${props.timeFormat || "HH:mm:ss"}`;
    }
    return props.dateFormat;
  }
  if (props["picker"] === "month") {
    return "YYYY-MM";
  } else if (props["picker"] === "quarter") {
    return "YYYY-\\QQ";
  } else if (props["picker"] === "year") {
    return "YYYY";
  } else if (props["picker"] === "week") {
    return "YYYY[W]W";
  }
  return props["showTime"] ? "YYYY-MM-DD HH:mm:ss" : "YYYY-MM-DD";
}, "getDefaultFormat");
const toGmt = /* @__PURE__ */ __name((value) => {
  if (!value || !import_dayjs.dayjs.isDayjs(value)) {
    return value;
  }
  return `${value.format("YYYY-MM-DD")}T${value.format("HH:mm:ss.SSS")}Z`;
}, "toGmt");
const toLocal = /* @__PURE__ */ __name((value) => {
  if (!value) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((val) => val.startOf("second").toISOString());
  }
  if (import_dayjs.dayjs.isDayjs(value)) {
    return value.startOf("second").toISOString();
  }
}, "toLocal");
const convertQuarterToFirstDay = /* @__PURE__ */ __name((quarterStr) => {
  try {
    const year = parseInt(quarterStr.slice(0, 4));
    const quarter = parseInt(quarterStr.slice(-1));
    return (0, import_dayjs.dayjs)().quarter(quarter).year(year);
  } catch (error) {
    return null;
  }
}, "convertQuarterToFirstDay");
const toMoment = /* @__PURE__ */ __name((val, options) => {
  if (!val) {
    return;
  }
  const offset = options.utcOffset;
  const { gmt, picker, utc = true, dateOnly } = options;
  if ((0, import_dayjs.dayjs)(val).isValid()) {
    if (dateOnly) {
      const date = (0, import_dayjs.dayjs)(val);
      if (!date.isValid()) return val;
      const dateString = date.format("YYYY-MM-DD");
      return import_dayjs.dayjs.utc(dateString, "YYYY-MM-DD");
    }
    if (!utc) {
      return import_dayjs.dayjs.utc(val);
    }
    if (import_dayjs.dayjs.isDayjs(val)) {
      return offset ? val.utcOffset(offsetFromString(offset)) : val;
    }
    if (gmt) {
      return (0, import_dayjs.dayjs)(val).utcOffset(0);
    }
    return offset ? (0, import_dayjs.dayjs)(val).utcOffset(offsetFromString(offset)) : (0, import_dayjs.dayjs)(val);
  } else {
    return convertQuarterToFirstDay(val);
  }
}, "toMoment");
const str2moment = /* @__PURE__ */ __name((value, options = {}) => {
  return Array.isArray(value) ? value.map((val) => {
    return toMoment(val, options);
  }) : value ? toMoment(value, options) : value;
}, "str2moment");
const toStringByPicker = /* @__PURE__ */ __name((value, picker) => {
  if (picker === "year") {
    return value.format("YYYY") + "-01-01T00:00:00.000Z";
  }
  if (picker === "month") {
    return value.format("YYYY-MM") + "-01T00:00:00.000Z";
  }
  if (picker === "quarter") {
    return value.format("YYYY-MM") + "-01T00:00:00.000Z";
  }
  if (picker === "week") {
    return value.format("YYYY-MM-DD") + "T00:00:00.000Z";
  }
  return value.format("YYYY-MM-DD") + "T00:00:00.000Z";
}, "toStringByPicker");
const toGmtByPicker = /* @__PURE__ */ __name((value, picker) => {
  if (!value) {
    return value;
  }
  if (Array.isArray(value)) {
    return value.map((val) => toStringByPicker(val, picker));
  }
  if (import_dayjs.dayjs.isDayjs(value)) {
    return toStringByPicker(value, picker);
  }
}, "toGmtByPicker");
const moment2str = /* @__PURE__ */ __name((value, options = {}) => {
  const { showTime, gmt, picker } = options;
  if (!value) {
    return value;
  }
  if (showTime) {
    return gmt ? toGmt(value) : toLocal(value);
  }
  return toGmtByPicker(value, picker);
}, "moment2str");
function offsetFromString(string) {
  if (!import_lodash.default.isString(string)) {
    return string;
  }
  const chunkOffset = /([+-]|\d\d)/gi;
  const matchShortOffset = /Z|[+-]\d\d(?::?\d\d)?/gi, matchTimestamp = /[+-]?\d+(\.\d{1,3})?/;
  let matches = (string || "").match(matchShortOffset);
  if (matches === null) {
    matches = (string || "").match(matchTimestamp);
  }
  if (matches === null) {
    return null;
  }
  const chunk = matches[matches.length - 1] || [];
  const parts = (chunk + "").match(chunkOffset) || ["-", 0, 0];
  const minutes = +(Number(parts[1]) * 60) + toInt(parts[2]);
  return minutes === 0 ? 0 : parts[0] === "+" ? minutes : -minutes;
}
__name(offsetFromString, "offsetFromString");
function toInt(argumentForCoercion) {
  let coercedNumber = +argumentForCoercion, value = 0;
  if (coercedNumber !== 0 && isFinite(coercedNumber)) {
    value = absFloor(coercedNumber);
  }
  return value;
}
__name(toInt, "toInt");
function absFloor(number) {
  if (number < 0) {
    return Math.ceil(number) || 0;
  } else {
    return Math.floor(number);
  }
}
__name(absFloor, "absFloor");
const getPickerFormat = /* @__PURE__ */ __name((picker) => {
  switch (picker) {
    case "week":
      return "YYYY[W]W";
    case "month":
      return "YYYY-MM";
    case "quarter":
      return "YYYY[Q]Q";
    case "year":
      return "YYYY";
    default:
      return "YYYY-MM-DD";
  }
}, "getPickerFormat");
const getDateTimeFormat = /* @__PURE__ */ __name((picker, format, showTime, timeFormat) => {
  if (picker === "date") {
    if (showTime) {
      return `${format} ${timeFormat || "HH:mm:ss"}`;
    }
    return format;
  }
  return format;
}, "getDateTimeFormat");
function getFormatFromDateStr(dateStr) {
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(dateStr)) return "YYYY-MM-DD HH:mm:ss";
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return "YYYY-MM-DD";
  if (/^\d{4}-\d{2}$/.test(dateStr)) return "YYYY-MM";
  if (/^\d{4}$/.test(dateStr)) return "YYYY";
  if (/^\d{4}Q[1-4]$/.test(dateStr)) return "YYYY[Q]Q";
  if (/^\d{4}-\d{2}-\d{2}T/.test(dateStr)) return "YYYY-MM-DDTHH:mm:ss.SSSZ";
  return null;
}
__name(getFormatFromDateStr, "getFormatFromDateStr");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getDateTimeFormat,
  getDefaultFormat,
  getFormatFromDateStr,
  getPickerFormat,
  moment2str,
  offsetFromString,
  str2moment,
  toGmt,
  toLocal
});
