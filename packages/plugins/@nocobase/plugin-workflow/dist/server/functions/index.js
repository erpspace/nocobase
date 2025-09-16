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
var functions_exports = {};
__export(functions_exports, {
  dateRangeFns: () => dateRangeFns,
  default: () => functions_default
});
module.exports = __toCommonJS(functions_exports);
var import_utils = require("@nocobase/utils");
function getTimezone() {
  const offset = (/* @__PURE__ */ new Date()).getTimezoneOffset();
  const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0");
  const minutes = String(Math.abs(offset) % 60).padStart(2, "0");
  const sign = offset <= 0 ? "+" : "-";
  return `${sign}${hours}:${minutes}`;
}
const getRangeByDay = (offset) => (0, import_utils.utc2unit)({ now: /* @__PURE__ */ new Date(), unit: "day", offset, timezone: getTimezone() });
const getOffsetFromMS = (start, end) => Math.floor((end - start) / 1e3 / 60 / 60 / 24);
function now() {
  return /* @__PURE__ */ new Date();
}
const dateVars = (0, import_utils.getDateVars)();
const dateRangeFns = {
  yesterday() {
    return dateVars.yesterday({ now: /* @__PURE__ */ new Date(), timezone: getTimezone() });
  },
  today() {
    return dateVars.today({ now: /* @__PURE__ */ new Date(), timezone: getTimezone() });
  },
  tomorrow() {
    return dateVars.tomorrow({ now: /* @__PURE__ */ new Date(), timezone: getTimezone() });
  },
  lastWeek() {
    return dateVars.lastWeek({ now: /* @__PURE__ */ new Date(), timezone: getTimezone() });
  },
  thisWeek() {
    return dateVars.thisWeek({ now: /* @__PURE__ */ new Date(), timezone: getTimezone() });
  },
  nextWeek() {
    return dateVars.nextWeek({ now: /* @__PURE__ */ new Date(), timezone: getTimezone() });
  },
  lastMonth() {
    return dateVars.lastMonth({ now: /* @__PURE__ */ new Date(), timezone: getTimezone() });
  },
  thisMonth() {
    return dateVars.thisMonth({ now: /* @__PURE__ */ new Date(), timezone: getTimezone() });
  },
  nextMonth() {
    return dateVars.nextMonth({ now: /* @__PURE__ */ new Date(), timezone: getTimezone() });
  },
  lastQuarter() {
    return dateVars.lastQuarter({ now: /* @__PURE__ */ new Date(), timezone: getTimezone() });
  },
  thisQuarter() {
    return dateVars.thisQuarter({ now: /* @__PURE__ */ new Date(), timezone: getTimezone() });
  },
  nextQuarter() {
    return dateVars.nextQuarter({ now: /* @__PURE__ */ new Date(), timezone: getTimezone() });
  },
  lastYear() {
    return dateVars.lastYear({ now: /* @__PURE__ */ new Date(), timezone: getTimezone() });
  },
  thisYear() {
    return dateVars.thisYear({ now: /* @__PURE__ */ new Date(), timezone: getTimezone() });
  },
  nextYear() {
    return dateVars.nextYear({ now: /* @__PURE__ */ new Date(), timezone: getTimezone() });
  },
  last7Days() {
    return dateVars.last7Days({ now: /* @__PURE__ */ new Date(), timezone: getTimezone() });
  },
  next7Days() {
    return dateVars.next7Days({ now: /* @__PURE__ */ new Date(), timezone: getTimezone() });
  },
  last30Days() {
    return dateVars.last30Days({ now: /* @__PURE__ */ new Date(), timezone: getTimezone() });
  },
  next30Days() {
    return dateVars.next30Days({ now: /* @__PURE__ */ new Date(), timezone: getTimezone() });
  },
  last90Days() {
    return dateVars.last90Days({ now: /* @__PURE__ */ new Date(), timezone: getTimezone() });
  },
  next90Days() {
    return dateVars.next90Days({ now: /* @__PURE__ */ new Date(), timezone: getTimezone() });
  }
};
function functions_default({ functions }, more = {}) {
  functions.register("now", now);
  Object.keys(dateRangeFns).forEach((key) => {
    functions.register(`dateRange.${key}`, dateRangeFns[key]);
  });
  for (const [name, fn] of Object.entries(more)) {
    functions.register(name, fn);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  dateRangeFns
});
