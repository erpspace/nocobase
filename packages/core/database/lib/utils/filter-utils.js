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
var filter_utils_exports = {};
__export(filter_utils_exports, {
  valuesToFilter: () => valuesToFilter
});
module.exports = __toCommonJS(filter_utils_exports);
var import_lodash = __toESM(require("lodash"));
var import_flat = require("flat");
function valuesToFilter(values = {}, filterKeys) {
  const removeArrayIndexInKey = /* @__PURE__ */ __name((key) => {
    const chunks = key.split(".");
    return chunks.filter((chunk) => {
      return !chunk.match(/\d+/);
    }).join(".");
  }, "removeArrayIndexInKey");
  const filterAnd = [];
  const flattedValues = (0, import_flat.flatten)(values);
  const flattedValuesObject = {};
  for (const key in flattedValues) {
    const keyWithoutArrayIndex = removeArrayIndexInKey(key);
    if (flattedValuesObject[keyWithoutArrayIndex]) {
      if (!Array.isArray(flattedValuesObject[keyWithoutArrayIndex])) {
        flattedValuesObject[keyWithoutArrayIndex] = [flattedValuesObject[keyWithoutArrayIndex]];
      }
      flattedValuesObject[keyWithoutArrayIndex].push(flattedValues[key]);
    } else {
      flattedValuesObject[keyWithoutArrayIndex] = [flattedValues[key]];
    }
  }
  for (const filterKey of filterKeys) {
    const filterValue = flattedValuesObject[filterKey] ? flattedValuesObject[filterKey] : import_lodash.default.get(values, filterKey);
    if (filterValue) {
      filterAnd.push({
        [filterKey]: filterValue
      });
    } else {
      filterAnd.push({
        [filterKey]: null
      });
    }
  }
  return {
    $and: filterAnd
  };
}
__name(valuesToFilter, "valuesToFilter");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  valuesToFilter
});
