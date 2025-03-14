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
var theme_config_exports = {};
__export(theme_config_exports, {
  default: () => theme_config_default
});
module.exports = __toCommonJS(theme_config_exports);
var import_database = require("@nocobase/database");
var theme_config_default = (0, import_database.defineCollection)({
  name: "themeConfig",
  dumpRules: "required",
  migrationRules: ["overwrite", "schema-only"],
  fields: [
    // 主题配置内容，一个 JSON 字符串
    {
      type: "json",
      name: "config"
    },
    // 主题是否可选
    {
      type: "boolean",
      name: "optional"
    },
    {
      type: "boolean",
      name: "isBuiltIn"
    },
    {
      type: "uid",
      name: "uid"
    },
    {
      type: "radio",
      name: "default",
      defaultValue: false
    }
  ]
});
