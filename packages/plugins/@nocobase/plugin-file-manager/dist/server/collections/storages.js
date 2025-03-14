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
var storages_exports = {};
__export(storages_exports, {
  default: () => storages_default
});
module.exports = __toCommonJS(storages_exports);
var import_database = require("@nocobase/database");
var storages_default = (0, import_database.defineCollection)({
  dumpRules: "required",
  migrationRules: ["overwrite", "schema-only"],
  name: "storages",
  shared: true,
  fields: [
    {
      title: "\u5B58\u50A8\u5F15\u64CE\u540D\u79F0",
      comment: "\u5B58\u50A8\u5F15\u64CE\u540D\u79F0",
      type: "string",
      name: "title",
      translation: true
    },
    {
      title: "\u82F1\u6587\u6807\u8BC6",
      // comment: '英文标识，用于代码层面配置',
      type: "uid",
      name: "name",
      unique: true
    },
    {
      comment: "\u7C7B\u578B\u6807\u8BC6\uFF0C\u5982 local/ali-oss \u7B49",
      type: "string",
      name: "type"
    },
    {
      comment: "\u914D\u7F6E\u9879",
      type: "jsonb",
      name: "options",
      defaultValue: {}
    },
    {
      comment: "\u6587\u4EF6\u89C4\u5219",
      type: "jsonb",
      name: "rules",
      defaultValue: {}
    },
    {
      comment: "\u5B58\u50A8\u76F8\u5BF9\u8DEF\u5F84\u6A21\u677F",
      type: "text",
      name: "path",
      defaultValue: ""
    },
    {
      comment: "\u8BBF\u95EE\u5730\u5740\u524D\u7F00",
      type: "string",
      name: "baseUrl",
      defaultValue: ""
    },
    // TODO(feature): 需要使用一个实现了可设置默认值的字段
    {
      comment: "\u9ED8\u8BA4\u5F15\u64CE",
      type: "radio",
      name: "default",
      defaultValue: false
    },
    {
      type: "boolean",
      name: "paranoid",
      defaultValue: false
    }
  ]
});
