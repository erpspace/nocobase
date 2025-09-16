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
var blockTemplates_exports = {};
__export(blockTemplates_exports, {
  default: () => blockTemplates_default
});
module.exports = __toCommonJS(blockTemplates_exports);
var import_database = require("@nocobase/database");
var blockTemplates_default = (0, import_database.defineCollection)({
  dumpRules: "required",
  name: "blockTemplates",
  autoGenId: false,
  migrationRules: ["overwrite", "schema-only"],
  fields: [
    {
      type: "uid",
      name: "key",
      primaryKey: true
    },
    {
      type: "string",
      name: "title"
    },
    {
      type: "string",
      name: "description"
    },
    {
      type: "string",
      name: "type",
      defaultValue: "Desktop"
    },
    {
      type: "belongsTo",
      name: "uiSchema",
      target: "uiSchemas",
      foreignKey: "uid"
    },
    {
      type: "boolean",
      name: "configured",
      defaultValue: false
    },
    {
      type: "string",
      name: "collection"
    },
    {
      type: "string",
      name: "dataSource"
    },
    {
      type: "string",
      name: "componentType"
    },
    {
      type: "string",
      name: "menuName"
    },
    {
      type: "hasMany",
      name: "links",
      target: "blockTemplateLinks",
      foreignKey: "templateKey",
      targetKey: "key"
    }
  ]
});
