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
var authenticators_exports = {};
__export(authenticators_exports, {
  default: () => authenticators_default
});
module.exports = __toCommonJS(authenticators_exports);
var import_database = require("@nocobase/database");
var authenticators_default = (0, import_database.defineCollection)({
  dumpRules: {
    group: "third-party"
  },
  migrationRules: ["overwrite", "schema-only"],
  shared: true,
  name: "authenticators",
  sortable: true,
  model: "AuthModel",
  createdBy: true,
  updatedBy: true,
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
      interface: "input",
      type: "string",
      name: "name",
      allowNull: false,
      unique: true,
      uiSchema: {
        type: "string",
        title: '{{t("Name")}}',
        "x-component": "Input",
        required: true
      }
    },
    {
      interface: "input",
      type: "string",
      name: "authType",
      allowNull: false,
      uiSchema: {
        type: "string",
        title: '{{t("Auth Type")}}',
        "x-component": "Input",
        required: true
      }
    },
    {
      interface: "input",
      type: "string",
      name: "title",
      uiSchema: {
        type: "string",
        title: '{{t("Title")}}',
        "x-component": "Input"
      },
      translation: true
    },
    {
      interface: "textarea",
      type: "string",
      name: "description",
      allowNull: false,
      defaultValue: "",
      uiSchema: {
        type: "string",
        title: '{{t("Description")}}',
        "x-component": "Input",
        required: true
      }
    },
    {
      type: "json",
      name: "options",
      allowNull: false,
      defaultValue: {}
    },
    {
      type: "boolean",
      name: "enabled",
      defaultValue: false
    },
    {
      interface: "m2m",
      type: "belongsToMany",
      name: "users",
      target: "users",
      foreignKey: "authenticator",
      otherKey: "userId",
      onDelete: "CASCADE",
      sourceKey: "name",
      targetKey: "id",
      through: "usersAuthenticators"
    }
  ]
});
