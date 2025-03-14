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
var fields_exports = {};
__export(fields_exports, {
  default: () => fields_default
});
module.exports = __toCommonJS(fields_exports);
var fields_default = {
  dumpRules: "required",
  migrationRules: ["overwrite", "schema-only"],
  shared: true,
  name: "fields",
  autoGenId: false,
  model: "FieldModel",
  timestamps: false,
  sortable: {
    name: "sort",
    scopeKey: "collectionName"
  },
  indexes: [
    {
      type: "UNIQUE",
      fields: ["collectionName", "name"]
    }
  ],
  fields: [
    {
      type: "uid",
      name: "key",
      primaryKey: true
    },
    {
      type: "uid",
      name: "name",
      prefix: "f_"
    },
    {
      type: "string",
      name: "type"
    },
    {
      type: "string",
      name: "interface",
      allowNull: true
    },
    {
      type: "string",
      name: "description",
      allowNull: true
    },
    {
      type: "belongsTo",
      name: "collection",
      target: "collections",
      foreignKey: "collectionName",
      targetKey: "name",
      onDelete: "CASCADE"
    },
    {
      type: "hasMany",
      name: "children",
      target: "fields",
      sourceKey: "key",
      foreignKey: "parentKey"
    },
    {
      type: "hasOne",
      name: "reverseField",
      target: "fields",
      sourceKey: "key",
      foreignKey: "reverseKey"
    },
    {
      type: "json",
      name: "options",
      defaultValue: {},
      translation: true
    }
  ]
};
