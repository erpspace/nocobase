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
var fix_target_option_in_tree_collection_exports = {};
__export(fix_target_option_in_tree_collection_exports, {
  default: () => fix_target_option_in_tree_collection_default
});
module.exports = __toCommonJS(fix_target_option_in_tree_collection_exports);
var import_server = require("@nocobase/server");
class fix_target_option_in_tree_collection_default extends import_server.Migration {
  on = "afterLoad";
  // 'beforeLoad' or 'afterLoad'
  appVersion = "<1.0.0-alpha.15";
  async up() {
    const treeCollections = await this.app.db.getRepository("collections").find({
      appends: ["fields"],
      filter: {
        "options.tree": "adjacencyList"
      }
    });
    for (const treeCollection of treeCollections) {
      const fields = treeCollection.get("fields");
      for (const field of fields) {
        if (!["belongsTo", "hasMany", "belongsToMany", "hasOne"].includes(field.get("type")) && field.get("target")) {
          field.set("target", void 0);
          await field.save();
        }
      }
    }
  }
}
