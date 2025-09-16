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
var workflowCcTasks_exports = {};
__export(workflowCcTasks_exports, {
  default: () => workflowCcTasks_default
});
module.exports = __toCommonJS(workflowCcTasks_exports);
var import_constants = require("../constants");
var workflowCcTasks_default = {
  name: "workflowCcTasks",
  dumpRules: {
    group: "log"
  },
  migrationRules: ["schema-only"],
  shared: true,
  createdAt: true,
  updatedAt: true,
  fields: [
    {
      type: "bigInt",
      name: "id",
      primaryKey: true,
      autoIncrement: true
    },
    {
      type: "belongsTo",
      name: "job",
      target: "jobs",
      foreignKey: "jobId",
      primaryKey: false
    },
    {
      type: "belongsTo",
      name: "user",
      target: "users",
      foreignKey: "userId",
      primaryKey: false
    },
    {
      type: "string",
      name: "title",
      interface: "input",
      uiSchema: {
        type: "string",
        title: `{{t("Task title", { ns: "${import_constants.NAMESPACE}" })}}`,
        "x-component": "Input"
      }
    },
    {
      type: "belongsTo",
      name: "execution",
      onDelete: "CASCADE"
    },
    {
      type: "belongsTo",
      name: "node",
      target: "flow_nodes"
    },
    {
      type: "belongsTo",
      name: "workflow",
      target: "workflows",
      foreignKey: "workflowId",
      onDelete: "CASCADE",
      interface: "m2o",
      uiSchema: {
        type: "object",
        title: `{{t("Workflow", { ns: "workflow" })}}`,
        "x-component": "AssociationField",
        "x-component-props": {
          fieldNames: {
            label: "title",
            value: "id"
          }
        }
      }
    },
    {
      type: "integer",
      name: "status",
      interface: "select",
      uiSchema: {
        type: "number",
        title: `{{t("Status", { ns: "${import_constants.NAMESPACE}" })}}`,
        "x-component": "Select",
        enum: [
          {
            label: `{{t("Unread", { ns: "${import_constants.NAMESPACE}" })}}`,
            value: 0,
            color: "gold"
          },
          {
            label: `{{t("Read", { ns: "${import_constants.NAMESPACE}" })}}`,
            value: 1,
            color: "green"
          }
        ]
      },
      defaultValue: 0
    },
    {
      type: "date",
      name: "readAt",
      interface: "datetime",
      uiSchema: {
        type: "string",
        title: `{{t("Read at", { ns: "${import_constants.NAMESPACE}" })}}`,
        "x-component": "DatePicker",
        "x-component-props": {
          showTime: true
        }
      }
    },
    {
      type: "date",
      name: "createdAt",
      interface: "createdAt",
      uiSchema: {
        type: "datetime",
        title: '{{t("Created at")}}',
        "x-component": "DatePicker",
        "x-component-props": {
          showTime: true
        }
      }
    },
    {
      type: "date",
      name: "updatedAt",
      interface: "updatedAt",
      uiSchema: {
        type: "datetime",
        title: '{{t("Updated at")}}',
        "x-component": "DatePicker",
        "x-component-props": {
          showTime: true
        }
      }
    }
  ]
};
