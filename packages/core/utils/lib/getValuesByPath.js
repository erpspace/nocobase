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
var getValuesByPath_exports = {};
__export(getValuesByPath_exports, {
  getValuesByPath: () => getValuesByPath
});
module.exports = __toCommonJS(getValuesByPath_exports);
const getValuesByPath = /* @__PURE__ */ __name((obj, path, defaultValue) => {
  if (!obj) {
    return defaultValue;
  }
  const keys = path.split(".");
  let result = [];
  let currentValue = obj;
  let shouldReturnArray = false;
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (Array.isArray(currentValue)) {
      shouldReturnArray = true;
      for (const element of currentValue) {
        const value = getValuesByPath(element, keys.slice(i).join("."), defaultValue);
        result = result.concat(value);
      }
      break;
    }
    if ((currentValue == null ? void 0 : currentValue[key]) === void 0) {
      break;
    }
    currentValue = currentValue[key];
    if (i === keys.length - 1) {
      result.push(currentValue);
    }
  }
  result = result.filter((item) => item !== void 0);
  if (result.length === 0) {
    return defaultValue;
  }
  if (shouldReturnArray) {
    return result.filter((item) => item !== null);
  }
  return result[0];
}, "getValuesByPath");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getValuesByPath
});
