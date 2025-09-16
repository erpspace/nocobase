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
var collection_group_manager_exports = {};
__export(collection_group_manager_exports, {
  CollectionGroupManager: () => CollectionGroupManager
});
module.exports = __toCommonJS(collection_group_manager_exports);
const _CollectionGroupManager = class _CollectionGroupManager {
  constructor(db) {
    this.db = db;
  }
  static unifyDumpRules(dumpRules) {
    if (!dumpRules) {
      return void 0;
    }
    if (typeof dumpRules === "string") {
      return {
        group: dumpRules
      };
    }
    if ("required" in dumpRules && dumpRules.required) {
      return {
        ...dumpRules,
        group: "required"
      };
    }
    if ("skipped" in dumpRules && dumpRules.skipped) {
      return {
        ...dumpRules,
        group: "skipped"
      };
    }
    return dumpRules;
  }
};
__name(_CollectionGroupManager, "CollectionGroupManager");
let CollectionGroupManager = _CollectionGroupManager;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CollectionGroupManager
});
