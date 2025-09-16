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
var inherit_collection_tree_exports = {};
__export(inherit_collection_tree_exports, {
  default: () => inherit_collection_tree_default
});
module.exports = __toCommonJS(inherit_collection_tree_exports);
var import_collection_tree = __toESM(require("./20240802141435-collection-tree"));
class inherit_collection_tree_default extends import_collection_tree.default {
  on = "afterLoad";
  // 'beforeLoad' or 'afterLoad'
  appVersion = "<=1.3.36-beta";
  async getTreeCollections({ transaction }) {
    const treeCollections = await this.app.db.getRepository("collections").find({
      appends: ["fields"],
      filter: {
        "options.tree": "adjacencyList"
      },
      transaction
    });
    return treeCollections.filter((collection) => {
      var _a;
      return ((_a = collection.options.inherits) == null ? void 0 : _a.length) > 0;
    });
  }
}
