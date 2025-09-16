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
var tree_collection_exports = {};
__export(tree_collection_exports, {
  TreeCollection: () => TreeCollection
});
module.exports = __toCommonJS(tree_collection_exports);
var import_database = require("@nocobase/database");
var import_adjacency_list_repository = require("./adjacency-list-repository");
class TreeCollection extends import_database.Collection {
  setRepository() {
    this.repository = new import_adjacency_list_repository.AdjacencyListRepository(this);
  }
  get treeForeignKey() {
    var _a;
    return ((_a = this.treeParentField) == null ? void 0 : _a.options.foreignKey) || "parent";
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TreeCollection
});
