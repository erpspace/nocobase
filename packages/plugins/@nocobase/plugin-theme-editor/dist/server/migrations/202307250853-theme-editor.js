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
var theme_editor_exports = {};
__export(theme_editor_exports, {
  default: () => theme_editor_default
});
module.exports = __toCommonJS(theme_editor_exports);
var import_server = require("@nocobase/server");
var import_utils = require("@nocobase/utils");
var import_builtinThemes = require("../builtinThemes");
class theme_editor_default extends import_server.Migration {
  appVersion = "<0.14.0-alpha.8";
  async up() {
    const result = await this.app.version.satisfies("<0.14.0-alpha.8");
    if (!result) {
      return;
    }
    const repository = this.db.getRepository("themeConfig");
    if (!repository) {
      return;
    }
    const collection = this.db.getCollection("themeConfig");
    await collection.sync();
    const themes = {
      [import_builtinThemes.defaultTheme.uid]: import_builtinThemes.defaultTheme,
      [import_builtinThemes.dark.uid]: import_builtinThemes.dark,
      [import_builtinThemes.compact.uid]: import_builtinThemes.compact,
      [import_builtinThemes.compactDark.uid]: import_builtinThemes.compactDark
    };
    const items = await repository.find();
    for (const item of items) {
      if (item.uid) {
        if (themes[item.uid]) {
          delete themes[item.uid];
        }
        continue;
      }
      const config = item.get("config");
      if (config.name === "Default theme of antd") {
        item.set("uid", import_builtinThemes.defaultTheme.uid);
        config.name = import_builtinThemes.defaultTheme.config.name;
        item.set("config", config);
        item.changed("config", true);
        delete themes[import_builtinThemes.defaultTheme.uid];
      } else if (config.name === import_builtinThemes.dark.config.name) {
        item.set("uid", import_builtinThemes.dark.uid);
        delete themes[import_builtinThemes.dark.uid];
      } else if (config.name === import_builtinThemes.compact.config.name) {
        item.set("uid", import_builtinThemes.compact.uid);
        delete themes[import_builtinThemes.compact.uid];
      } else if (config.name === import_builtinThemes.compactDark.config.name) {
        item.set("uid", import_builtinThemes.compactDark.uid);
        delete themes[import_builtinThemes.compactDark.uid];
      } else {
        item.set("uid", (0, import_utils.uid)());
      }
      await item.save();
    }
    if (Object.values(themes).length > 0) {
      await repository.create({ values: Object.values(themes) });
    }
  }
  async down() {
  }
}
