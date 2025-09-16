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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var dateRangeUtils_exports = {};
__export(dateRangeUtils_exports, {
  getDayRangeByParams: () => getDayRangeByParams,
  getOffsetRangeByParams: () => getOffsetRangeByParams
});
module.exports = __toCommonJS(dateRangeUtils_exports);
var import_dayjs2 = require("./dayjs");
const getNow = /* @__PURE__ */ __name((tz) => {
  if (!tz) return (0, import_dayjs2.dayjs)();
  if (/^[+-]\d{2}:\d{2}$/.test(tz)) {
    const [sign, hour, minute] = tz.match(/([+-])(\d{2}):(\d{2})/).slice(1);
    const offset = (parseInt(hour) * 60 + parseInt(minute)) * (sign === "+" ? 1 : -1);
    return (0, import_dayjs2.dayjs)().utcOffset(offset);
  }
  return (0, import_dayjs2.dayjs)().tz(tz);
}, "getNow");
const getOffsetRangeByParams = /* @__PURE__ */ __name((params) => {
  const { type, unit = "day", number = 1, timezone } = params;
  const now = getNow(timezone);
  const actualUnit = unit === "week" ? "isoWeek" : unit;
  let start;
  let end;
  if (type === "past") {
    const base = now.startOf(actualUnit);
    start = base.subtract(number, unit).startOf(actualUnit);
    end = base.subtract(1, unit).endOf(actualUnit);
  } else if (type === "next") {
    const base = now.startOf(actualUnit);
    start = base.add(1, unit).startOf(actualUnit);
    end = start.add(number - 1, unit).endOf(actualUnit);
  } else {
    throw new Error(`Unsupported type: ${type}`);
  }
  return [start.format("YYYY-MM-DD HH:mm:ss"), end.format("YYYY-MM-DD HH:mm:ss")];
}, "getOffsetRangeByParams");
const getStart = /* @__PURE__ */ __name((offset, unit, tz) => {
  const actualUnit = unit === "isoWeek" ? "week" : unit;
  return getNow(tz).add(offset, actualUnit).startOf(unit);
}, "getStart");
const getEnd = /* @__PURE__ */ __name((offset, unit, tz) => {
  const actualUnit = unit === "isoWeek" ? "week" : unit;
  return getNow(tz).add(offset, actualUnit).endOf(unit);
}, "getEnd");
const strategies = {
  today: /* @__PURE__ */ __name((params) => [getStart(0, "day", params == null ? void 0 : params.timezone), getEnd(0, "day", params == null ? void 0 : params.timezone)], "today"),
  yesterday: /* @__PURE__ */ __name((params) => [getStart(-1, "day", params == null ? void 0 : params.timezone), getEnd(-1, "day", params == null ? void 0 : params.timezone)], "yesterday"),
  tomorrow: /* @__PURE__ */ __name((params) => [getStart(1, "day", params == null ? void 0 : params.timezone), getEnd(1, "day", params == null ? void 0 : params.timezone)], "tomorrow"),
  thisWeek: /* @__PURE__ */ __name((params) => [getStart(0, "isoWeek", params == null ? void 0 : params.timezone), getEnd(0, "isoWeek", params == null ? void 0 : params.timezone)], "thisWeek"),
  lastWeek: /* @__PURE__ */ __name((params) => [getStart(-1, "isoWeek", params == null ? void 0 : params.timezone), getEnd(-1, "isoWeek", params == null ? void 0 : params.timezone)], "lastWeek"),
  nextWeek: /* @__PURE__ */ __name((params) => [getStart(1, "isoWeek", params == null ? void 0 : params.timezone), getEnd(1, "isoWeek", params == null ? void 0 : params.timezone)], "nextWeek"),
  thisMonth: /* @__PURE__ */ __name((params) => [getStart(0, "month", params == null ? void 0 : params.timezone), getEnd(0, "month", params == null ? void 0 : params.timezone)], "thisMonth"),
  lastMonth: /* @__PURE__ */ __name((params) => [getStart(-1, "month", params == null ? void 0 : params.timezone), getEnd(-1, "month", params == null ? void 0 : params.timezone)], "lastMonth"),
  nextMonth: /* @__PURE__ */ __name((params) => [getStart(1, "month", params == null ? void 0 : params.timezone), getEnd(1, "month", params == null ? void 0 : params.timezone)], "nextMonth"),
  thisQuarter: /* @__PURE__ */ __name((params) => [getStart(0, "quarter", params == null ? void 0 : params.timezone), getEnd(0, "quarter", params == null ? void 0 : params.timezone)], "thisQuarter"),
  lastQuarter: /* @__PURE__ */ __name((params) => [getStart(-1, "quarter", params == null ? void 0 : params.timezone), getEnd(-1, "quarter", params == null ? void 0 : params.timezone)], "lastQuarter"),
  nextQuarter: /* @__PURE__ */ __name((params) => [getStart(1, "quarter", params == null ? void 0 : params.timezone), getEnd(1, "quarter", params == null ? void 0 : params.timezone)], "nextQuarter"),
  thisYear: /* @__PURE__ */ __name((params) => [getStart(0, "year", params == null ? void 0 : params.timezone), getEnd(0, "year", params == null ? void 0 : params.timezone)], "thisYear"),
  lastYear: /* @__PURE__ */ __name((params) => [getStart(-1, "year", params == null ? void 0 : params.timezone), getEnd(-1, "year", params == null ? void 0 : params.timezone)], "lastYear"),
  nextYear: /* @__PURE__ */ __name((params) => [getStart(1, "year", params == null ? void 0 : params.timezone), getEnd(1, "year", params == null ? void 0 : params.timezone)], "nextYear")
};
const getDayRangeByParams = /* @__PURE__ */ __name((params) => {
  if (params.type === "past" || params.type === "next") {
    return getOffsetRangeByParams(params);
  }
  const fn = strategies[params.type];
  if (!fn) throw new Error(`Unsupported type: ${params.type}`);
  const [start, end] = fn(params);
  return [start.format("YYYY-MM-DD HH:mm:ss"), end.format("YYYY-MM-DD HH:mm:ss")];
}, "getDayRangeByParams");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getDayRangeByParams,
  getOffsetRangeByParams
});
