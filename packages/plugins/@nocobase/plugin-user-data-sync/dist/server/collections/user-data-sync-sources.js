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
var user_data_sync_sources_exports = {};
__export(user_data_sync_sources_exports, {
  default: () => user_data_sync_sources_default
});
module.exports = __toCommonJS(user_data_sync_sources_exports);
var import_database = require("@nocobase/database");
var user_data_sync_sources_default = (0, import_database.defineCollection)({
  dumpRules: {
    group: "third-party"
  },
  shared: true,
  migrationRules: ["overwrite", "schema-only"],
  name: "userDataSyncSources",
  title: '{{t("Sync Sources")}}',
  sortable: true,
  model: "SyncSourceModel",
  createdBy: true,
  updatedBy: true,
  logging: true,
  fields: [
    {
      name: "id",
      type: "bigInt",
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      interface: "id"
    },
    {
      interface: "input",
      type: "string",
      name: "name",
      allowNull: false,
      unique: true,
      uiSchema: {
        type: "string",
        title: '{{t("Source name")}}',
        "x-component": "Input",
        required: true
      }
    },
    {
      interface: "input",
      type: "string",
      name: "sourceType",
      allowNull: false,
      uiSchema: {
        type: "string",
        title: '{{t("Source Type")}}',
        "x-component": "Input",
        required: true
      }
    },
    {
      interface: "input",
      type: "string",
      name: "displayName",
      uiSchema: {
        type: "string",
        title: '{{t("Source display name")}}',
        "x-component": "Input"
      },
      translation: true
    },
    {
      type: "boolean",
      name: "enabled",
      defaultValue: false
    },
    {
      type: "json",
      name: "options",
      allowNull: false,
      defaultValue: {}
    },
    {
      type: "hasMany",
      name: "tasks",
      target: "userDataSyncTasks",
      sourceKey: "id",
      foreignKey: "sourceId"
    }
  ]
});
