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
var flow_nodes_exports = {};
__export(flow_nodes_exports, {
  default: () => flow_nodes_default
});
module.exports = __toCommonJS(flow_nodes_exports);
var flow_nodes_default = {
  dumpRules: "required",
  migrationRules: ["overwrite", "schema-only"],
  name: "flow_nodes",
  shared: true,
  fields: [
    {
      type: "uid",
      name: "key"
    },
    {
      type: "string",
      name: "title"
    },
    // which workflow belongs to
    {
      name: "workflow",
      type: "belongsTo"
    },
    {
      name: "upstream",
      type: "belongsTo",
      target: "flow_nodes"
    },
    {
      name: "branches",
      type: "hasMany",
      target: "flow_nodes",
      sourceKey: "id",
      foreignKey: "upstreamId"
    },
    // only works when upstream node is branching type, such as condition and parallel.
    // put here because the design of flow-links model is not really necessary for now.
    // or it should be put into flow-links model.
    {
      name: "branchIndex",
      type: "integer"
    },
    // Note: for reasons:
    // 1. redirect type node to solve cycle flow.
    // 2. recognize as real next node after branches.
    {
      name: "downstream",
      type: "belongsTo",
      target: "flow_nodes"
    },
    {
      type: "string",
      name: "type"
    },
    {
      type: "json",
      name: "config",
      defaultValue: {}
    }
  ]
};
