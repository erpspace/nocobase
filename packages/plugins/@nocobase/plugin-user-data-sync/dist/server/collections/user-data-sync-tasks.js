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
var user_data_sync_tasks_exports = {};
__export(user_data_sync_tasks_exports, {
  default: () => user_data_sync_tasks_default
});
module.exports = __toCommonJS(user_data_sync_tasks_exports);
var import_database = require("@nocobase/database");
var user_data_sync_tasks_default = (0, import_database.defineCollection)({
  dumpRules: {
    group: "third-party"
  },
  migrationRules: ["schema-only", "overwrite"],
  name: "userDataSyncTasks",
  title: '{{t("Sync Tasks")}}',
  sortable: "sort",
  model: "SyncTaskModel",
  createdBy: true,
  updatedBy: true,
  createdAt: true,
  updatedAt: true,
  logging: true,
  shared: true,
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
      name: "batch",
      interface: "input",
      type: "string",
      allowNull: false,
      unique: true,
      uiSchema: {
        type: "string",
        title: '{{t("Batch")}}',
        "x-component": "Input",
        required: true
      }
    },
    {
      name: "source",
      interface: "input",
      type: "belongsTo",
      target: "userDataSyncSources",
      targetKey: "id",
      foreignKey: "sourceId",
      allowNull: false,
      uiSchema: {
        type: "object",
        title: '{{t("Source")}}',
        "x-component": "AssociationField",
        "x-component-props": {
          fieldNames: {
            value: "id",
            label: "name"
          }
        },
        required: true,
        "x-read-pretty": true
      }
    },
    {
      name: "status",
      interface: "Select",
      type: "string",
      allowNull: false,
      uiSchema: {
        type: "string",
        title: '{{t("Status")}}',
        "x-component": "Select",
        required: true
      }
    },
    {
      name: "message",
      interface: "input",
      type: "string",
      allowNull: true,
      uiSchema: {
        type: "string",
        title: '{{t("Message")}}',
        "x-component": "Input",
        required: false
      }
    },
    {
      name: "cost",
      interface: "input",
      type: "integer",
      allowNull: true,
      uiSchema: {
        type: "integer",
        title: '{{t("Cost")}}',
        "x-component": "InputNumber",
        "x-component-props": {
          precision: 0
        },
        required: false
      }
    }
  ]
});
