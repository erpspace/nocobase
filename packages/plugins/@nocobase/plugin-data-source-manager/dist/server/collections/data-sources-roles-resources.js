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
var data_sources_roles_resources_exports = {};
__export(data_sources_roles_resources_exports, {
  default: () => data_sources_roles_resources_default
});
module.exports = __toCommonJS(data_sources_roles_resources_exports);
var import_database = require("@nocobase/database");
var data_sources_roles_resources_default = (0, import_database.defineCollection)({
  dumpRules: "required",
  migrationRules: ["overwrite", "schema-only"],
  name: "dataSourcesRolesResources",
  model: "DataSourcesRolesResourcesModel",
  fields: [
    {
      name: "dataSourceKey",
      type: "string",
      defaultValue: "main"
    },
    {
      type: "belongsTo",
      name: "dataSources",
      foreignKey: "dataSourceKey",
      onDelete: "CASCADE"
    },
    {
      type: "belongsTo",
      name: "role",
      target: "roles",
      foreignKey: "roleName",
      onDelete: "CASCADE"
    },
    {
      type: "string",
      name: "name"
    },
    {
      type: "boolean",
      name: "usingActionsConfig"
    },
    {
      type: "hasMany",
      name: "actions",
      target: "dataSourcesRolesResourcesActions",
      foreignKey: "rolesResourceId"
    }
  ]
});
