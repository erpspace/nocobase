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
var listeners_exports = {};
__export(listeners_exports, {
  registerBuiltInListeners: () => registerBuiltInListeners
});
module.exports = __toCommonJS(listeners_exports);
var import_adjacency_list = require("./adjacency-list");
var import_append_child_collection_name_after_repository_find = require("./append-child-collection-name-after-repository-find");
const registerBuiltInListeners = /* @__PURE__ */ __name((db) => {
  db.on("beforeDefineCollection", import_adjacency_list.beforeDefineAdjacencyListCollection);
  db.on("afterRepositoryFind", (0, import_append_child_collection_name_after_repository_find.appendChildCollectionNameAfterRepositoryFind)(db));
}, "registerBuiltInListeners");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  registerBuiltInListeners
});
