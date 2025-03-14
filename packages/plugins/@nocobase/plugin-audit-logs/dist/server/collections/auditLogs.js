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
var auditLogs_exports = {};
__export(auditLogs_exports, {
  default: () => auditLogs_default
});
module.exports = __toCommonJS(auditLogs_exports);
var import_database = require("@nocobase/database");
var auditLogs_default = (0, import_database.defineCollection)({
  dumpRules: {
    group: "log"
  },
  migrationRules: ["schema-only", "skip"],
  name: "auditLogs",
  createdBy: false,
  updatedBy: false,
  updatedAt: false,
  shared: true,
  fields: [
    {
      type: "date",
      name: "createdAt"
    },
    {
      type: "string",
      name: "type"
    },
    {
      type: "string",
      name: "recordId",
      index: true
    },
    {
      type: "string",
      name: "collectionName"
    },
    {
      type: "belongsTo",
      name: "collection",
      target: "collections",
      targetKey: "name",
      sourceKey: "id",
      foreignKey: "collectionName",
      constraints: false
    },
    {
      type: "hasMany",
      name: "changes",
      target: "auditChanges",
      foreignKey: "auditLogId"
    },
    {
      type: "belongsTo",
      name: "user",
      target: "users"
    }
  ]
});
