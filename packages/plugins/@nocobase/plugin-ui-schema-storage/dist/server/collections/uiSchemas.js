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
var uiSchemas_exports = {};
__export(uiSchemas_exports, {
  default: () => uiSchemas_default
});
module.exports = __toCommonJS(uiSchemas_exports);
var uiSchemas_default = {
  dumpRules: "required",
  name: "uiSchemas",
  migrationRules: ["overwrite", "schema-only"],
  autoGenId: false,
  timestamps: false,
  repository: "UiSchemaRepository",
  model: "UiSchemaModel",
  magicAttribute: "schema",
  fields: [
    {
      type: "uid",
      name: "x-uid",
      primaryKey: true
    },
    {
      type: "string",
      name: "name"
    },
    {
      type: "hasMany",
      name: "serverHooks",
      target: "uiSchemaServerHooks",
      foreignKey: "uid"
    },
    {
      type: "json",
      name: "schema",
      defaultValue: {}
    },
    {
      type: "belongsToMany",
      name: "roles",
      onDelete: "CASCADE",
      through: "uiButtonSchemasRoles",
      target: "roles",
      foreignKey: "uid",
      otherKey: "roleName",
      sourceKey: "x-uid",
      targetKey: "name"
    }
  ]
};
