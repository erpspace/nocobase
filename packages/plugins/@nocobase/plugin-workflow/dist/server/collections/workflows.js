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
var workflows_exports = {};
__export(workflows_exports, {
  default: () => workflows_default
});
module.exports = __toCommonJS(workflows_exports);
function workflows_default() {
  return {
    dumpRules: "required",
    migrationRules: ["overwrite", "schema-only"],
    name: "workflows",
    shared: true,
    repository: "WorkflowRepository",
    fields: [
      {
        name: "key",
        type: "uid"
      },
      {
        type: "string",
        name: "title",
        interface: "input",
        uiSchema: {
          title: '{{t("Name")}}',
          type: "string",
          "x-component": "Input",
          required: true
        }
      },
      {
        type: "boolean",
        name: "enabled",
        defaultValue: false
      },
      {
        type: "text",
        name: "description"
      },
      {
        type: "string",
        name: "type",
        required: true
      },
      {
        type: "string",
        name: "triggerTitle"
      },
      {
        type: "jsonb",
        name: "config",
        required: true,
        defaultValue: {}
      },
      {
        type: "hasMany",
        name: "nodes",
        target: "flow_nodes",
        onDelete: "CASCADE"
      },
      {
        type: "hasMany",
        name: "executions"
      },
      {
        type: "integer",
        name: "executed",
        defaultValue: 0
      },
      {
        type: "integer",
        name: "allExecuted",
        defaultValue: 0
      },
      {
        type: "boolean",
        name: "current"
      },
      {
        type: "boolean",
        name: "sync",
        defaultValue: false
      },
      {
        type: "hasMany",
        name: "revisions",
        target: "workflows",
        foreignKey: "key",
        sourceKey: "key",
        // NOTE: no constraints needed here because tricky self-referencing
        constraints: false,
        onDelete: "NO ACTION"
      },
      {
        type: "jsonb",
        name: "options",
        defaultValue: {}
      }
    ],
    // NOTE: use unique index for avoiding deadlock in mysql when setCurrent
    indexes: [
      {
        unique: true,
        fields: ["key", "current"]
      }
    ]
  };
}
