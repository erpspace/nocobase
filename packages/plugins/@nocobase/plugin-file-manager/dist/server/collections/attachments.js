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
var attachments_exports = {};
__export(attachments_exports, {
  default: () => attachments_default
});
module.exports = __toCommonJS(attachments_exports);
var import_database = require("@nocobase/database");
var attachments_default = (0, import_database.defineCollection)({
  dumpRules: {
    group: "user"
  },
  migrationRules: ["schema-only", "overwrite"],
  asStrategyResource: true,
  shared: true,
  name: "attachments",
  createdBy: true,
  updatedBy: true,
  template: "file",
  fields: [
    {
      comment: "\u7528\u6237\u6587\u4EF6\u540D\uFF08\u4E0D\u542B\u6269\u5C55\u540D\uFF09",
      type: "string",
      name: "title"
    },
    {
      comment: "\u7CFB\u7EDF\u6587\u4EF6\u540D\uFF08\u542B\u6269\u5C55\u540D\uFF09",
      type: "string",
      name: "filename"
    },
    {
      comment: "\u6269\u5C55\u540D\uFF08\u542B\u201C.\u201D\uFF09",
      type: "string",
      name: "extname"
    },
    {
      comment: "\u6587\u4EF6\u4F53\u79EF\uFF08\u5B57\u8282\uFF09",
      type: "integer",
      name: "size"
    },
    // TODO: 使用暂不明确，以后再考虑
    // {
    //   comment: '文件类型（mimetype 前半段，通常用于预览）',
    //   type: 'string',
    //   name: 'type',
    // },
    {
      type: "string",
      name: "mimetype"
    },
    {
      comment: "\u5B58\u50A8\u5F15\u64CE",
      type: "belongsTo",
      name: "storage"
    },
    {
      comment: "\u76F8\u5BF9\u8DEF\u5F84\uFF08\u542B\u201C/\u201D\u524D\u7F00\uFF09",
      type: "text",
      name: "path"
    },
    {
      comment: "\u5176\u4ED6\u6587\u4EF6\u4FE1\u606F\uFF08\u5982\u56FE\u7247\u7684\u5BBD\u9AD8\uFF09",
      type: "jsonb",
      name: "meta",
      defaultValue: {}
    },
    {
      comment: "\u7F51\u7EDC\u8BBF\u95EE\u5730\u5740",
      type: "text",
      name: "url"
      // formula: '{{ storage.baseUrl }}{{ path }}/{{ filename }}'
    }
  ]
});
