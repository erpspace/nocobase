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
var parse_filter_exports = {};
__export(parse_filter_exports, {
  flatten: () => flatten,
  getDateVars: () => getDateVars,
  getDayRange: () => getDayRange,
  parseFilter: () => parseFilter,
  splitPathToTwoParts: () => splitPathToTwoParts,
  toUnit: () => toUnit,
  unflatten: () => unflatten,
  utc2unit: () => utc2unit
});
module.exports = __toCommonJS(parse_filter_exports);
var import_lodash = __toESM(require("lodash"));
var import_set = __toESM(require("lodash/set"));
var import_moment = __toESM(require("moment"));
var import_date = require("./date");
var import_dayjs = require("./dayjs");
var import_getValuesByPath = require("./getValuesByPath");
var import_dateRangeUtils = require("./dateRangeUtils");
const re = /^\s*\{\{([\s\S]*)\}\}\s*$/;
function isBuffer(obj) {
  return obj && obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj);
}
__name(isBuffer, "isBuffer");
function keyIdentity(key) {
  return key;
}
__name(keyIdentity, "keyIdentity");
function flatten(target, opts) {
  opts = opts || {};
  const delimiter = opts.delimiter || ".";
  const maxDepth = opts.maxDepth;
  const transformKey = opts.transformKey || keyIdentity;
  const transformValue = opts.transformValue || keyIdentity;
  const output = {};
  function step(object, prev, currentDepth) {
    currentDepth = currentDepth || 1;
    if (import_lodash.default.isObjectLike(object)) {
      Object.keys(object).forEach(function(key) {
        var _a;
        const value = object[key];
        const isarray = opts.safe && Array.isArray(value);
        const type = Object.prototype.toString.call(value);
        const isbuffer = isBuffer(value);
        const isobject = type === "[object Object]" || type === "[object Array]";
        const newKey = prev ? prev + delimiter + transformKey(key) : transformKey(key);
        if ((_a = opts.breakOn) == null ? void 0 : _a.call(opts, { key, value, path: newKey })) {
          output[newKey] = transformValue(value, newKey);
          return;
        }
        if (!isarray && !isbuffer && isobject && Object.keys(value).length && (!opts.maxDepth || currentDepth < maxDepth)) {
          return step(value, newKey, currentDepth + 1);
        }
        output[newKey] = transformValue(value, newKey);
      });
    }
  }
  __name(step, "step");
  step(target);
  return output;
}
__name(flatten, "flatten");
function unflatten(obj, opts = {}) {
  const parsed = {};
  const transformValue = opts.transformValue || keyIdentity;
  for (const key of Object.keys(obj)) {
    (0, import_set.default)(parsed, key, transformValue(obj[key], key));
  }
  return parsed;
}
__name(unflatten, "unflatten");
const parsePath = /* @__PURE__ */ __name((path) => {
  let operator = path.split(".").pop() || "";
  if (!operator.startsWith("$")) {
    operator = "";
  }
  return { operator };
}, "parsePath");
const isDateOperator = /* @__PURE__ */ __name((op) => {
  return [
    "$dateOn",
    "$dateNotOn",
    "$dateBefore",
    "$dateAfter",
    "$dateNotBefore",
    "$dateNotAfter",
    "$dateBetween"
  ].includes(op);
}, "isDateOperator");
function isDate(input) {
  return input instanceof Date || Object.prototype.toString.call(input) === "[object Date]";
}
__name(isDate, "isDate");
const dateValueWrapper = /* @__PURE__ */ __name((value, timezone) => {
  if (!value) {
    return null;
  }
  if (value.type) {
    value = (0, import_dateRangeUtils.getDayRangeByParams)({ ...value, timezone });
  }
  if (Array.isArray(value)) {
    if (value.length === 2) {
      value.push("[]", timezone);
    } else if (value.length === 3) {
      value.push(timezone);
    }
    return value;
  }
  if (typeof value === "string") {
    if (!timezone || /(\+|-)\d\d:\d\d$/.test(value)) {
      return value;
    }
    return value + timezone;
  }
  if (isDate(value)) {
    return value.toISOString();
  }
}, "dateValueWrapper");
const parseFilter = /* @__PURE__ */ __name(async (filter, opts = {}) => {
  const userFieldsSet = /* @__PURE__ */ new Set();
  const vars = opts.vars || {};
  const timezone = opts.timezone;
  const now = opts.now;
  const getField = opts.getField;
  const flat = flatten(filter, {
    breakOn({ key }) {
      return key.startsWith("$") && key !== "$and" && key !== "$or";
    },
    transformValue(value) {
      if (typeof value !== "string") {
        return value;
      }
      const match = re.exec(value);
      if (match) {
        const key = match[1].trim();
        if (key.startsWith("$user")) {
          userFieldsSet.add(key.substring(6));
        }
      }
      return value;
    }
  });
  if (userFieldsSet.size > 0) {
    const $user = await vars.$user({ fields: [...userFieldsSet.values()] });
    Object.assign(vars, { $user });
  }
  return unflatten(flat, {
    transformValue(value, path) {
      const { operator } = parsePath(path);
      if (typeof value === "string") {
        const match = re.exec(value);
        if (match) {
          const key = match[1].trim();
          const val = (0, import_getValuesByPath.getValuesByPath)(vars, key, null);
          const field = getField == null ? void 0 : getField(path);
          value = typeof val === "function" ? val == null ? void 0 : val({ field, operator, timezone, now }) : val;
        }
      }
      if (isDateOperator(operator)) {
        const field = getField == null ? void 0 : getField(path);
        if ((field == null ? void 0 : field.constructor.name) === "DateOnlyField" || (field == null ? void 0 : field.constructor.name) === "DatetimeNoTzField") {
          if (value.type) {
            return (0, import_dateRangeUtils.getDayRangeByParams)({ ...value, timezone: (field == null ? void 0 : field.timezone) || timezone });
          }
          return value;
        }
        return dateValueWrapper(value, (field == null ? void 0 : field.timezone) || timezone);
      }
      return value;
    }
  });
}, "parseFilter");
function getDayRange(options) {
  const { now, timezone = "+00:00", offset } = options;
  let m = toMoment(now).utcOffset((0, import_date.offsetFromString)(timezone));
  if (offset > 0) {
    return [
      // 第二天开始计算
      (m = m.add(1, "day").startOf("day")).format("YYYY-MM-DD"),
      // 第九天开始前结束
      m.clone().add(offset, "day").startOf("day").format("YYYY-MM-DD"),
      "[)",
      timezone
    ];
  }
  return [
    // 今天开始前
    m.clone().subtract(-1 * offset - 1, "day").startOf("day").format("YYYY-MM-DD"),
    // 明天开始前
    m.clone().add(1, "day").startOf("day").format("YYYY-MM-DD"),
    "[)",
    timezone
  ];
}
__name(getDayRange, "getDayRange");
function toMoment(value, useMoment = false) {
  if (!value) {
    return useMoment ? (0, import_moment.default)() : (0, import_dayjs.dayjs)();
  }
  if (import_dayjs.dayjs.isDayjs(value)) {
    return value;
  }
  return useMoment ? (0, import_moment.default)(value) : (0, import_dayjs.dayjs)(value);
}
__name(toMoment, "toMoment");
function utc2unit(options) {
  var _a;
  const { now, unit, timezone = "+00:00", offset } = options;
  let m = toMoment(now, unit === "isoWeek");
  m = m.utcOffset((0, import_date.offsetFromString)(timezone));
  m = m.startOf(unit);
  if (offset > 0) {
    m = m.add(offset, unit);
  } else if (offset < 0) {
    m = m.subtract(-1 * offset, unit);
  }
  const fn = {
    year: /* @__PURE__ */ __name(() => m.format("YYYY"), "year"),
    quarter: /* @__PURE__ */ __name(() => m.format("YYYY[Q]Q"), "quarter"),
    month: /* @__PURE__ */ __name(() => m.format("YYYY-MM"), "month"),
    week: /* @__PURE__ */ __name(() => m.format("gggg[w]ww"), "week"),
    isoWeek: /* @__PURE__ */ __name(() => m.format("GGGG[W]WW"), "isoWeek"),
    day: /* @__PURE__ */ __name(() => m.format("YYYY-MM-DD"), "day")
  };
  const r = (_a = fn[unit]) == null ? void 0 : _a.call(fn);
  return timezone ? r + timezone : r;
}
__name(utc2unit, "utc2unit");
const toUnit = /* @__PURE__ */ __name((unit, offset) => {
  return ({ now, timezone, field }) => {
    if (field == null ? void 0 : field.timezone) {
      timezone = field == null ? void 0 : field.timezone;
    }
    return utc2unit({ now, timezone, unit, offset });
  };
}, "toUnit");
const toDays = /* @__PURE__ */ __name((offset) => {
  return ({ now, timezone, field }) => {
    if (field == null ? void 0 : field.timezone) {
      timezone = field == null ? void 0 : field.timezone;
    }
    return getDayRange({ now, timezone, offset });
  };
}, "toDays");
function getDateVars() {
  return {
    now: (/* @__PURE__ */ new Date()).toISOString(),
    today: toUnit("day"),
    yesterday: toUnit("day", -1),
    tomorrow: toUnit("day", 1),
    thisWeek: toUnit("week"),
    lastWeek: toUnit("week", -1),
    nextWeek: toUnit("week", 1),
    thisIsoWeek: toUnit("isoWeek"),
    lastIsoWeek: toUnit("isoWeek", -1),
    nextIsoWeek: toUnit("isoWeek", 1),
    thisMonth: toUnit("month"),
    lastMonth: toUnit("month", -1),
    nextMonth: toUnit("month", 1),
    thisQuarter: toUnit("quarter"),
    lastQuarter: toUnit("quarter", -1),
    nextQuarter: toUnit("quarter", 1),
    thisYear: toUnit("year"),
    lastYear: toUnit("year", -1),
    nextYear: toUnit("year", 1),
    last7Days: toDays(-7),
    next7Days: toDays(7),
    last30Days: toDays(-30),
    next30Days: toDays(30),
    last90Days: toDays(-90),
    next90Days: toDays(90)
  };
}
__name(getDateVars, "getDateVars");
function splitPathToTwoParts(path) {
  const parts = path.split(".");
  return [parts.shift(), parts.join(".")];
}
__name(splitPathToTwoParts, "splitPathToTwoParts");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  flatten,
  getDateVars,
  getDayRange,
  parseFilter,
  splitPathToTwoParts,
  toUnit,
  unflatten,
  utc2unit
});
