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
var plugin_exports = {};
__export(plugin_exports, {
  PluginMobileServer: () => PluginMobileServer,
  default: () => plugin_default
});
module.exports = __toCommonJS(plugin_exports);
var import_server = require("@nocobase/server");
var import_path = require("path");
class PluginMobileServer extends import_server.Plugin {
  afterAdd() {
  }
  async load() {
    this.db.addMigrations({
      namespace: "client",
      directory: (0, import_path.resolve)(__dirname, "./migrations"),
      context: {
        plugin: this
      }
    });
  }
  async install() {
    const uiSchemas = this.db.getRepository("uiSchemas");
    await uiSchemas.insert({
      type: "void",
      "x-uid": "nocobase-mobile-container",
      "x-component": "MContainer",
      "x-designer": "MContainer.Designer",
      "x-component-props": {},
      properties: {
        page: {
          type: "void",
          "x-component": "MPage",
          "x-designer": "MPage.Designer",
          "x-component-props": {},
          properties: {
            grid: {
              type: "void",
              "x-component": "Grid",
              "x-initializer": "mobilePage:addBlock",
              "x-component-props": {
                showDivider: false
              }
            }
          }
        }
      }
    });
  }
  async afterEnable() {
  }
  async afterDisable() {
  }
  async remove() {
  }
}
var plugin_default = PluginMobileServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginMobileServer
});
