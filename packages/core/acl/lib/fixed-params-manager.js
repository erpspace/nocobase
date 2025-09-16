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
var fixed_params_manager_exports = {};
__export(fixed_params_manager_exports, {
  default: () => FixedParamsManager
});
module.exports = __toCommonJS(fixed_params_manager_exports);
var import_utils = require("@nocobase/utils");
const SPLIT = ":";
const _FixedParamsManager = class _FixedParamsManager {
  merger = /* @__PURE__ */ new Map();
  addParams(resource, action, merger) {
    const path = this.getActionPath(resource, action);
    this.merger.set(path, [...this.getParamsMerger(resource, action), merger]);
  }
  getParamsMerger(resource, action) {
    const path = this.getActionPath(resource, action);
    return this.merger.get(path) || [];
  }
  getActionPath(resource, action) {
    return `${resource}${SPLIT}${action}`;
  }
  getParams(resource, action, extraParams = {}) {
    const results = {};
    for (const merger of this.getParamsMerger(resource, action)) {
      _FixedParamsManager.mergeParams(results, merger());
    }
    if (extraParams) {
      _FixedParamsManager.mergeParams(results, extraParams);
    }
    return results;
  }
  static mergeParams(a, b) {
    (0, import_utils.assign)(a, b, {
      filter: "andMerge",
      fields: "intersect",
      appends: "union",
      except: "union",
      whitelist: "intersect",
      blacklist: "intersect",
      sort: "overwrite"
    });
  }
};
__name(_FixedParamsManager, "FixedParamsManager");
let FixedParamsManager = _FixedParamsManager;
