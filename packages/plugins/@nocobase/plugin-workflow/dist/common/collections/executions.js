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
var executions_exports = {};
__export(executions_exports, {
  default: () => executions_default
});
module.exports = __toCommonJS(executions_exports);
var import_constants = require("../constants");
var executions_default = {
  dumpRules: {
    group: "log"
  },
  migrationRules: ["schema-only"],
  name: "executions",
  shared: true,
  fields: [
    {
      type: "bigInt",
      name: "id",
      interface: "id",
      uiSchema: {
        type: "number",
        title: '{{t("ID")}}',
        "x-component": "Input",
        "x-component-props": {},
        "x-read-pretty": true
      },
      primaryKey: true,
      autoIncrement: true
    },
    {
      type: "belongsTo",
      name: "workflow",
      target: "workflows",
      foreignKey: "workflowId",
      interface: "m2o",
      uiSchema: {
        type: "object",
        title: `{{t("Version", { ns: "${import_constants.NAMESPACE}" })}}`,
        "x-component": "AssociationField",
        "x-component-props": {
          fieldNames: {
            label: "id",
            value: "id"
          }
        },
        "x-read-pretty": true
      }
    },
    {
      type: "string",
      name: "key"
    },
    {
      type: "string",
      name: "eventKey",
      unique: true
    },
    {
      type: "hasMany",
      name: "jobs",
      onDelete: "CASCADE"
    },
    {
      type: "json",
      name: "context"
    },
    {
      type: "integer",
      name: "status",
      interface: "select",
      uiSchema: {
        title: `{{t("Status", { ns: "${import_constants.NAMESPACE}" })}}`,
        type: "string",
        "x-component": "Select",
        "x-decorator": "FormItem",
        enum: "{{ExecutionStatusOptions}}"
      }
    },
    {
      type: "json",
      name: "stack"
    },
    {
      type: "json",
      name: "output"
    },
    {
      interface: "createdAt",
      type: "datetime",
      name: "createdAt",
      uiSchema: {
        type: "datetime",
        title: `{{t("Triggered at", { ns: "${import_constants.NAMESPACE}" })}}`,
        "x-component": "DatePicker",
        "x-component-props": {},
        "x-read-pretty": true
      }
    }
  ]
};
