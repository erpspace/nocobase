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
var user_data_sync_records_exports = {};
__export(user_data_sync_records_exports, {
  default: () => user_data_sync_records_default
});
module.exports = __toCommonJS(user_data_sync_records_exports);
var import_database = require("@nocobase/database");
var user_data_sync_records_default = (0, import_database.defineCollection)({
  dumpRules: {
    group: "third-party"
  },
  migrationRules: ["schema-only", "overwrite"],
  shared: true,
  name: "userDataSyncRecords",
  createdAt: true,
  updatedAt: true,
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
      name: "sourceName",
      interface: "Input",
      type: "string",
      allowNull: false
    },
    {
      name: "sourceUk",
      interface: "Input",
      type: "string",
      allowNull: false
    },
    {
      name: "dataType",
      interface: "Select",
      type: "string",
      allowNull: false
    },
    {
      name: "resources",
      type: "hasMany",
      target: "userDataSyncRecordsResources",
      sourceKey: "id",
      foreignKey: "recordId"
    },
    {
      type: "json",
      name: "metaData"
    },
    {
      type: "json",
      name: "lastMetaData"
    }
  ]
});
