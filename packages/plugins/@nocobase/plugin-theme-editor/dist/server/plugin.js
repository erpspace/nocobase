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
  PluginThemeEditorServer: () => PluginThemeEditorServer,
  default: () => plugin_default
});
module.exports = __toCommonJS(plugin_exports);
var import_server = require("@nocobase/server");
var import_builtinThemes = require("./builtinThemes");
var import_update_user_theme = require("./actions/update-user-theme");
class PluginThemeEditorServer extends import_server.Plugin {
  theme;
  afterAdd() {
  }
  async beforeLoad() {
  }
  async load() {
    this.app.resourceManager.registerActionHandler("users:updateTheme", import_update_user_theme.updateTheme);
    this.app.acl.allow("users", "updateTheme", "loggedIn");
    this.app.acl.allow("themeConfig", "list", "public");
    this.app.acl.registerSnippet({
      name: `pm.${this.name}.themes`,
      actions: ["themeConfig:*"]
    });
  }
  async install(options) {
    const themeRepo = this.db.getRepository("themeConfig");
    if (!themeRepo) {
      throw new Error(`themeConfig repository does not exist`);
    }
    if (await themeRepo.count() === 0) {
      await themeRepo.create({
        values: [import_builtinThemes.defaultTheme, import_builtinThemes.dark, import_builtinThemes.compact, import_builtinThemes.compactDark]
      });
    }
  }
  async afterEnable() {
  }
  async afterDisable() {
  }
  async remove() {
  }
}
var plugin_default = PluginThemeEditorServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginThemeEditorServer
});
