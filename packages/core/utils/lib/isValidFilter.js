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
var isValidFilter_exports = {};
__export(isValidFilter_exports, {
  isValidFilter: () => isValidFilter
});
module.exports = __toCommonJS(isValidFilter_exports);
function isValidFilter(condition) {
  if (!condition) {
    return false;
  }
  const groups = [condition.$and, condition.$or].filter(Boolean);
  if (groups.length == 0) {
    return Object.keys(condition).length > 0;
  }
  return groups.some((item) => {
    if (Array.isArray(item)) {
      return item.some(isValidFilter);
    }
    if (item.$and || item.$or) {
      return isValidFilter(item);
    }
    const [name] = Object.keys(item);
    if (!name || !item[name]) {
      return false;
    }
    const [op] = Object.keys(item[name]);
    if (!op || typeof item[name][op] === "undefined") {
      return false;
    }
    return true;
  });
}
__name(isValidFilter, "isValidFilter");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isValidFilter
});
