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
var parse_date_exports = {};
__export(parse_date_exports, {
  parseDate: () => parseDate,
  parseWeek: () => parseWeek
});
module.exports = __toCommonJS(parse_date_exports);
var import_date = require("./date");
var import_dayjs = require("./dayjs");
var import_dateRangeUtils = require("./dateRangeUtils");
function parseUTC(value) {
  var _a;
  if (value instanceof Date || import_dayjs.dayjs.isDayjs(value)) {
    return {
      unit: "utc",
      start: value.toISOString()
    };
  }
  if ((_a = value == null ? void 0 : value.endsWith) == null ? void 0 : _a.call(value, "Z")) {
    return {
      unit: "utc",
      start: value
    };
  }
}
__name(parseUTC, "parseUTC");
function parseYear(value) {
  if (/^\d\d\d\d$/.test(value)) {
    return {
      unit: "year",
      start: `${value}-01-01 00:00:00`
    };
  }
}
__name(parseYear, "parseYear");
function parseQuarter(value) {
  if (/^\d\d\d\dQ\d$/.test(value)) {
    const [year, q] = value.split("Q");
    return {
      unit: "quarter",
      start: (0, import_dayjs.dayjs)(year, "YYYY").quarter(q).format("YYYY-MM-DD HH:mm:ss")
    };
  }
}
__name(parseQuarter, "parseQuarter");
function parseWeek(value) {
  if (/^\d\d\d\d[W]\d\d$/.test(value)) {
    const arr = value.split("W");
    const year = (0, import_dayjs.dayjs)(arr[0], "YYYY").format("GGGG");
    if (year !== arr[0]) {
      return {
        unit: "isoWeek",
        start: (0, import_dayjs.dayjs)(arr[0], "YYYY").add(1, "week").startOf("isoWeek").isoWeek(Number(arr[1])).format("YYYY-MM-DD HH:mm:ss")
      };
    }
    return {
      unit: "isoWeek",
      start: (0, import_dayjs.dayjs)(arr[0], "YYYY").isoWeek(Number(arr[1])).format("YYYY-MM-DD HH:mm:ss")
    };
  }
  if (/^\d\d\d\d[w]\d\d$/.test(value)) {
    const arr = value.split("w");
    const year = (0, import_dayjs.dayjs)(arr[0], "YYYY").format("gggg");
    if (year !== arr[0]) {
      return {
        unit: "week",
        start: (0, import_dayjs.dayjs)(arr[0], "YYYY").add(1, "week").startOf("week").week(Number(arr[1])).format("YYYY-MM-DD HH:mm:ss")
      };
    }
    return {
      unit: "week",
      start: (0, import_dayjs.dayjs)(arr[0], "YYYY").week(Number(arr[1])).format("YYYY-MM-DD HH:mm:ss")
    };
  }
}
__name(parseWeek, "parseWeek");
function parseMonth(value) {
  if (/^\d\d\d\d-\d\d$/.test(value)) {
    return {
      unit: "month",
      start: `${value}-01 00:00:00`
    };
  }
}
__name(parseMonth, "parseMonth");
function parseDay(value) {
  if (/^\d\d\d\d-\d\d-\d\d$/.test(value)) {
    return {
      unit: "day",
      start: `${value} 00:00:00`
    };
  }
}
__name(parseDay, "parseDay");
function parseHour(value) {
  if (/^\d\d\d\d-\d\d-\d\d(T|\s)\d\d$/.test(value)) {
    return {
      unit: "hour",
      start: `${value}:00:00`
    };
  }
}
__name(parseHour, "parseHour");
function parseMinute(value) {
  if (/^\d\d\d\d-\d\d-\d\d(T|\s)\d\d:\d\d$/.test(value)) {
    return {
      unit: "minute",
      start: `${value}:00`
    };
  }
}
__name(parseMinute, "parseMinute");
function parseSecond(value) {
  if (/^\d\d\d\d-\d\d-\d\d(T|\s)\d\d:\d\d:\d\d$/.test(value)) {
    return {
      unit: "second",
      start: `${value}`
    };
  }
}
__name(parseSecond, "parseSecond");
function parseMillisecond(value) {
  if (/^\d\d\d\d-\d\d-\d\d(T|\s)\d\d:\d\d:\d\d\.\d\d\d$/.test(value)) {
    return {
      unit: "millisecond",
      start: `${value}`
    };
  }
}
__name(parseMillisecond, "parseMillisecond");
const parsers = [
  parseUTC,
  parseYear,
  parseQuarter,
  parseWeek,
  parseMonth,
  parseDay,
  parseHour,
  parseMinute,
  parseSecond,
  parseMillisecond
];
function toISOString(m) {
  return m.toISOString();
}
__name(toISOString, "toISOString");
function dateRange(r) {
  if (!r.timezone) {
    r.timezone = "+00:00";
  }
  let m;
  if (r.unit === "utc") {
    return (0, import_dayjs.dayjs)(r == null ? void 0 : r.start).toISOString();
  } else {
    m = (0, import_dayjs.dayjs)(`${r == null ? void 0 : r.start}${r == null ? void 0 : r.timezone}`);
  }
  m = m.utcOffset((0, import_date.offsetFromString)(r.timezone));
  return [m = m.startOf(r.unit), m.add(1, r.unit === "isoWeek" ? "weeks" : r.unit).startOf(r.unit)].map(toISOString);
}
__name(dateRange, "dateRange");
function parseDate(value, options = {}) {
  if (!value) {
    return;
  }
  if (value.type) {
    value = (0, import_dateRangeUtils.getDayRangeByParams)({ ...value, ...options });
  }
  if (Array.isArray(value)) {
    return parseDateBetween(value, options);
  }
  let timezone = options.timezone || "+00:00";
  const input = value;
  if (typeof value === "string") {
    const match = /(.+)((\+|-)\d\d:\d\d)$/.exec(value);
    if (match) {
      value = match[1];
      timezone = match[2];
    }
    if (/^(\(|\[)/.test(value)) {
      return parseDateBetween(input, options);
    }
  }
  for (const parse of parsers) {
    const r = parse(value);
    if (r) {
      r["input"] = input;
      if (!r["timezone"]) {
        r["timezone"] = timezone;
      }
      return dateRange(r);
    }
  }
}
__name(parseDate, "parseDate");
function parseDateBetween(value, options = {}) {
  if (Array.isArray(value) && value.length > 1) {
    const [startValue, endValue, op = "[]", timezone2] = value;
    const r0 = parseDate(startValue, { timezone: options.timezone || timezone2 });
    const r1 = parseDate(endValue, { timezone: options.timezone || timezone2 });
    let start;
    let startOp;
    let end;
    let endOp;
    if (typeof r0 === "string") {
      start = r0;
      startOp = op[0];
    } else {
      start = op.startsWith("(") ? r0[1] : r0[0];
      startOp = "[";
    }
    if (typeof r1 === "string") {
      end = r1;
      endOp = op[1];
    } else {
      end = op.endsWith(")") ? r1[0] : r1[1];
      endOp = ")";
    }
    const newOp = startOp + endOp;
    return newOp === "[)" ? [start, end] : [start, end, newOp];
  }
  if (typeof value !== "string") {
    return;
  }
  const match = /(.+)((\+|-)\d\d:\d\d)$/.exec(value);
  let timezone = options.timezone || "+00:00";
  if (match) {
    value = match[1];
    timezone = match[2];
  }
  const m = /^(\(|\[)(.+),(.+)(\)|\])$/.exec(value);
  if (!m) {
    return;
  }
  return parseDateBetween([m[2], m[3], `${m[1]}${m[4]}`, timezone]);
}
__name(parseDateBetween, "parseDateBetween");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  parseDate,
  parseWeek
});
