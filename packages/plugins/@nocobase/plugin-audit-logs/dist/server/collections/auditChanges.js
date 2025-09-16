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
var auditChanges_exports = {};
__export(auditChanges_exports, {
  default: () => auditChanges_default
});
module.exports = __toCommonJS(auditChanges_exports);
var import_database = require("@nocobase/database");
var auditChanges_default = (0, import_database.defineCollection)({
  dumpRules: {
    group: "log"
  },
  name: "auditChanges",
  title: "\u53D8\u52A8\u503C",
  createdBy: false,
  updatedBy: false,
  createdAt: false,
  updatedAt: false,
  shared: true,
  fields: [
    {
      type: "json",
      name: "field"
    },
    {
      type: "json",
      name: "before"
    },
    {
      type: "json",
      name: "after"
    },
    {
      type: "belongsTo",
      name: "log",
      target: "auditLogs",
      foreignKey: "auditLogId"
    }
  ]
});
