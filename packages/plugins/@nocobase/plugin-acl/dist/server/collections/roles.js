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
var roles_exports = {};
__export(roles_exports, {
  default: () => roles_default
});
module.exports = __toCommonJS(roles_exports);
var import_database = require("@nocobase/database");
var roles_default = (0, import_database.defineCollection)({
  origin: "@nocobase/plugin-acl",
  dumpRules: "required",
  description: "Role data",
  migrationRules: ["overwrite", "schema-only"],
  name: "roles",
  title: '{{t("Roles")}}',
  autoGenId: false,
  model: "RoleModel",
  filterTargetKey: "name",
  // targetKey: 'name',
  sortable: true,
  fields: [
    {
      type: "uid",
      name: "name",
      prefix: "r_",
      primaryKey: true,
      interface: "input",
      uiSchema: {
        type: "string",
        title: '{{t("Role UID")}}',
        "x-component": "Input"
      }
    },
    {
      type: "string",
      name: "title",
      unique: true,
      interface: "input",
      uiSchema: {
        type: "string",
        title: '{{t("Role name")}}',
        "x-component": "Input"
      },
      translation: true
    },
    {
      type: "boolean",
      name: "default"
    },
    {
      type: "string",
      name: "description"
    },
    {
      type: "json",
      name: "strategy"
    },
    {
      type: "boolean",
      name: "default",
      defaultValue: false
    },
    {
      type: "boolean",
      name: "hidden",
      defaultValue: false
    },
    {
      type: "boolean",
      name: "allowConfigure"
    },
    {
      type: "boolean",
      name: "allowNewMenu"
    },
    {
      type: "belongsToMany",
      name: "menuUiSchemas",
      target: "uiSchemas",
      targetKey: "x-uid"
    },
    {
      type: "hasMany",
      name: "resources",
      target: "dataSourcesRolesResources",
      sourceKey: "name",
      foreignKey: "roleName"
    },
    {
      type: "set",
      name: "snippets",
      defaultValue: ["!ui.*", "!pm", "!pm.*"]
    },
    {
      type: "belongsToMany",
      name: "users",
      target: "users",
      foreignKey: "roleName",
      otherKey: "userId",
      onDelete: "CASCADE",
      sourceKey: "name",
      targetKey: "id",
      through: "rolesUsers"
    }
  ]
});
