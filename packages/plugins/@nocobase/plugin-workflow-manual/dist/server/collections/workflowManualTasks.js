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
var workflowManualTasks_exports = {};
__export(workflowManualTasks_exports, {
  default: () => workflowManualTasks_default
});
module.exports = __toCommonJS(workflowManualTasks_exports);
var import_database = require("@nocobase/database");
var import_constants = require("../../common/constants");
var workflowManualTasks_default = (0, import_database.defineCollection)({
  name: "workflowManualTasks",
  dumpRules: {
    group: "log"
  },
  migrationRules: ["schema-only"],
  shared: true,
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
      name: "execution"
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
      name: "status"
    },
    {
      type: "jsonb",
      name: "result"
    }
  ]
});
