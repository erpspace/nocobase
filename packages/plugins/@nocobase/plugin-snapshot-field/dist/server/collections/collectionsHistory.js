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
var collectionsHistory_exports = {};
__export(collectionsHistory_exports, {
  default: () => collectionsHistory_default
});
module.exports = __toCommonJS(collectionsHistory_exports);
var import_database = require("@nocobase/database");
var collectionsHistory_default = (0, import_database.defineCollection)({
  dumpRules: "required",
  name: "collectionsHistory",
  sortable: "sort",
  autoGenId: false,
  model: "CollectionModel",
  repository: "CollectionRepository",
  timestamps: false,
  filterTargetKey: "name",
  shared: true,
  fields: [
    {
      type: "uid",
      name: "key",
      primaryKey: true
    },
    {
      type: "uid",
      name: "name",
      unique: true,
      prefix: "t_"
    },
    {
      type: "string",
      name: "title",
      required: true
    },
    {
      type: "boolean",
      name: "inherit",
      defaultValue: false
    },
    {
      type: "boolean",
      name: "hidden",
      defaultValue: false
    },
    {
      type: "json",
      name: "options",
      defaultValue: {}
    },
    {
      type: "hasMany",
      name: "fields",
      target: "fieldsHistory",
      sourceKey: "name",
      targetKey: "name",
      foreignKey: "collectionName",
      onDelete: "CASCADE",
      sortBy: "sort"
    }
  ]
});
