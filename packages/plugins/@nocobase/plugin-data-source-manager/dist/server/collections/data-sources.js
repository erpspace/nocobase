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
var data_sources_exports = {};
__export(data_sources_exports, {
  default: () => data_sources_default
});
module.exports = __toCommonJS(data_sources_exports);
var import_database = require("@nocobase/database");
var data_sources_default = (0, import_database.defineCollection)({
  name: "dataSources",
  model: "DataSourceModel",
  autoGenId: false,
  shared: true,
  dumpRules: "required",
  migrationRules: ["overwrite", "schema-only"],
  fields: [
    {
      type: "string",
      name: "key",
      primaryKey: true
    },
    {
      type: "string",
      name: "displayName"
    },
    {
      type: "string",
      name: "type"
    },
    {
      type: "json",
      name: "options"
    },
    {
      type: "boolean",
      name: "enabled",
      defaultValue: true
    },
    {
      type: "boolean",
      name: "fixed",
      defaultValue: false
    },
    {
      type: "hasMany",
      name: "collections",
      target: "dataSourcesCollections",
      foreignKey: "dataSourceKey",
      targetKey: "name"
    },
    {
      type: "hasMany",
      name: "rolesResourcesScopes",
      target: "dataSourcesRolesResourcesScopes",
      foreignKey: "dataSourceKey"
    }
  ]
});
