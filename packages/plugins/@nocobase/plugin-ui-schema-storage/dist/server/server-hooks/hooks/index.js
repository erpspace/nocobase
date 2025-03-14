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
var hooks_exports = {};
__export(hooks_exports, {
  hooks: () => hooks
});
module.exports = __toCommonJS(hooks_exports);
var import_bind_menu_to_role = require("./bind-menu-to-role");
var import_factory = require("./factory");
var import_remove_parents_if_no_children = require("./remove-parents-if-no-children");
var import_remove_schema = require("./remove-schema");
const hooks = [
  (0, import_factory.hookFactory)("onCollectionDestroy", "removeSchema", import_remove_schema.removeSchema),
  (0, import_factory.hookFactory)("onCollectionFieldDestroy", "removeSchema", import_remove_schema.removeSchema),
  (0, import_factory.hookFactory)("onSelfCreate", "bindMenuToRole", import_bind_menu_to_role.bindMenuToRole),
  (0, import_factory.hookFactory)("onSelfMove", "removeParentsIfNoChildren", import_remove_parents_if_no_children.removeParentsIfNoChildren)
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  hooks
});
