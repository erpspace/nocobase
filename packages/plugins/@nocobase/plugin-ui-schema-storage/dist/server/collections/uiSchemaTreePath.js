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
var uiSchemaTreePath_exports = {};
__export(uiSchemaTreePath_exports, {
  default: () => uiSchemaTreePath_default
});
module.exports = __toCommonJS(uiSchemaTreePath_exports);
var uiSchemaTreePath_default = {
  dumpRules: "required",
  migrationRules: ["overwrite", "schema-only"],
  name: "uiSchemaTreePath",
  autoGenId: false,
  timestamps: false,
  indexes: [
    {
      fields: ["descendant"]
    }
  ],
  fields: [
    {
      type: "string",
      name: "ancestor",
      primaryKey: true
    },
    {
      type: "string",
      name: "descendant",
      primaryKey: true,
      index: true
    },
    {
      type: "integer",
      name: "depth"
    },
    {
      type: "boolean",
      name: "async"
    },
    {
      type: "string",
      name: "type",
      comment: "type of node"
    },
    {
      type: "integer",
      name: "sort",
      comment: "sort of node in adjacency"
    }
  ]
};
