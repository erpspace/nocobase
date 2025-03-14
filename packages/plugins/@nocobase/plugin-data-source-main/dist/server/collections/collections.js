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
var collections_exports = {};
__export(collections_exports, {
  default: () => collections_default
});
module.exports = __toCommonJS(collections_exports);
var collections_default = {
  dumpRules: "required",
  migrationRules: ["overwrite", "schema-only"],
  shared: true,
  name: "collections",
  sortable: "sort",
  autoGenId: false,
  model: "CollectionModel",
  repository: "CollectionRepository",
  timestamps: false,
  filterTargetKey: "name",
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
      required: true,
      translation: true
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
      type: "string",
      name: "description",
      allowNull: true
    },
    {
      type: "hasMany",
      name: "fields",
      target: "fields",
      sourceKey: "name",
      targetKey: "name",
      foreignKey: "collectionName",
      sortBy: "sort"
    },
    {
      type: "belongsToMany",
      name: "category",
      target: "collectionCategories",
      sourceKey: "name",
      foreignKey: "collectionName",
      otherKey: "categoryId",
      targetKey: "id",
      sortBy: "sort",
      through: "collectionCategory"
    }
  ]
};
