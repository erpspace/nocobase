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
var move_sort_field_to_plugin_exports = {};
__export(move_sort_field_to_plugin_exports, {
  default: () => move_sort_field_to_plugin_default
});
module.exports = __toCommonJS(move_sort_field_to_plugin_exports);
var import_server = require("@nocobase/server");
const _move_sort_field_to_plugin_default = class _move_sort_field_to_plugin_default extends import_server.Migration {
  on = "beforeLoad";
  // 'beforeLoad' or 'afterLoad'
  async up() {
    const existed = await this.pm.repository.findOne({
      filter: {
        packageName: "@nocobase/plugin-field-sort"
      }
    });
    if (!existed) {
      await this.pm.repository.create({
        values: {
          name: "field-sort",
          packageName: "@nocobase/plugin-field-sort",
          version: this.appVersion,
          enabled: true,
          installed: true,
          builtIn: true
        }
      });
    }
  }
};
__name(_move_sort_field_to_plugin_default, "default");
let move_sort_field_to_plugin_default = _move_sort_field_to_plugin_default;
