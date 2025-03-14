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
var uiSchemaServerHooks_exports = {};
__export(uiSchemaServerHooks_exports, {
  default: () => uiSchemaServerHooks_default
});
module.exports = __toCommonJS(uiSchemaServerHooks_exports);
var uiSchemaServerHooks_default = {
  dumpRules: "required",
  migrationRules: ["overwrite", "schema-only"],
  name: "uiSchemaServerHooks",
  model: "ServerHookModel",
  // autoGenId: false,
  timestamps: false,
  fields: [
    { type: "belongsTo", name: "uiSchema", target: "uiSchemas", foreignKey: "uid" },
    { type: "string", name: "type" },
    {
      type: "string",
      name: "collection"
    },
    {
      type: "string",
      name: "field"
    },
    {
      type: "string",
      name: "method"
    },
    {
      type: "json",
      name: "params"
    }
  ]
};
