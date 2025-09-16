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
var filter_match_exports = {};
__export(filter_match_exports, {
  filterMatch: () => filterMatch
});
module.exports = __toCommonJS(filter_match_exports);
var import_moment = __toESM(require("moment"));
function filterMatch(model, where) {
  const operatorFunctions = {
    // string
    $eq: /* @__PURE__ */ __name((value, condition) => value === condition, "$eq"),
    $not: /* @__PURE__ */ __name((value, condition) => !filterMatch(model, condition), "$not"),
    $includes: /* @__PURE__ */ __name((value, condition) => value.includes(condition), "$includes"),
    $notIncludes: /* @__PURE__ */ __name((value, condition) => !value.includes(condition), "$notIncludes"),
    $empty: /* @__PURE__ */ __name((value) => value === null || value === void 0 || value === "" || Array.isArray(value) && value.length === 0, "$empty"),
    $notEmpty: /* @__PURE__ */ __name((value) => value !== null && value !== void 0 && value !== "" || Array.isArray(value) && value.length > 0, "$notEmpty"),
    // array
    $match: /* @__PURE__ */ __name((value, condition) => value.some((item) => filterMatch(item, condition)), "$match"),
    $notMatch: /* @__PURE__ */ __name((value, condition) => !value.some((item) => filterMatch(item, condition)), "$notMatch"),
    $anyOf: /* @__PURE__ */ __name((value, condition) => value.some((item) => condition.includes(item)), "$anyOf"),
    $noneOf: /* @__PURE__ */ __name((value, condition) => !value.some((item) => condition.includes(item)), "$noneOf"),
    // datetime
    $dateOn: /* @__PURE__ */ __name((value, condition) => (0, import_moment.default)(value).isSame(condition, "day"), "$dateOn"),
    $dateNotOn: /* @__PURE__ */ __name((value, condition) => !(0, import_moment.default)(value).isSame(condition, "day"), "$dateNotOn"),
    $dateBefore: /* @__PURE__ */ __name((value, condition) => (0, import_moment.default)(value).isBefore(condition, "day"), "$dateBefore"),
    $dateAfter: /* @__PURE__ */ __name((value, condition) => (0, import_moment.default)(value).isAfter(condition, "day"), "$dateAfter"),
    $dateNotBefore: /* @__PURE__ */ __name((value, condition) => !(0, import_moment.default)(value).isBefore(condition, "day"), "$dateNotBefore"),
    $dateNotAfter: /* @__PURE__ */ __name((value, condition) => !(0, import_moment.default)(value).isAfter(condition, "day"), "$dateNotAfter"),
    $gt: /* @__PURE__ */ __name((value, condition) => value > condition, "$gt"),
    $gte: /* @__PURE__ */ __name((value, condition) => value >= condition, "$gte"),
    $lt: /* @__PURE__ */ __name((value, condition) => value < condition, "$lt"),
    $lte: /* @__PURE__ */ __name((value, condition) => value <= condition, "$lte"),
    $ne: /* @__PURE__ */ __name((value, condition) => value !== condition, "$ne"),
    $in: /* @__PURE__ */ __name((value, condition) => condition.includes(value), "$in"),
    $or: /* @__PURE__ */ __name((model2, conditions) => Object.values(conditions).some((condition) => filterMatch(model2, condition)), "$or"),
    $and: /* @__PURE__ */ __name((model2, conditions) => Object.values(conditions).every((condition) => filterMatch(model2, condition)), "$and"),
    // boolean
    $isFalsy: /* @__PURE__ */ __name((value) => !value, "$isFalsy")
  };
  for (const [key, value] of Object.entries(where)) {
    if (operatorFunctions[key] !== void 0) {
      if (!operatorFunctions[key](model, value)) {
        return false;
      }
    } else {
      if (typeof value === "object") {
        for (const [operator, condition] of Object.entries(value)) {
          if (!operatorFunctions[operator](model[key], condition)) {
            return false;
          }
        }
      } else {
        if (!operatorFunctions["$eq"](model[key], value)) {
          return false;
        }
      }
    }
  }
  return true;
}
__name(filterMatch, "filterMatch");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  filterMatch
});
