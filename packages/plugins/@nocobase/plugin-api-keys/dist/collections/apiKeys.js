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
var apiKeys_exports = {};
__export(apiKeys_exports, {
  default: () => apiKeys_default
});
module.exports = __toCommonJS(apiKeys_exports);
var import_locale = require("../locale");
var apiKeys_default = {
  dumpRules: {
    group: "user"
  },
  migrationRules: ["schema-only"],
  shared: true,
  name: "apiKeys",
  sortable: "sort",
  createdBy: true,
  updatedAt: false,
  updatedBy: false,
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
      type: "string",
      name: "name",
      interface: "input",
      uiSchema: {
        type: "string",
        title: '{{t("name")}}',
        "x-component": "Input"
      }
    },
    {
      interface: "obo",
      type: "belongsTo",
      name: "role",
      target: "roles",
      foreignKey: "roleName",
      uiSchema: {
        type: "object",
        title: '{{t("Roles")}}',
        "x-component": "Select",
        "x-component-props": {
          fieldNames: {
            label: "title",
            value: "name"
          },
          objectValue: true,
          options: "{{ currentRoles }}"
        }
      }
    },
    {
      name: "expiresIn",
      type: "string",
      uiSchema: {
        type: "string",
        title: (0, import_locale.generateNTemplate)("Expires"),
        "x-component": "ExpiresSelect",
        enum: [
          {
            label: (0, import_locale.generateNTemplate)("1 Day"),
            value: "1d"
          },
          {
            label: (0, import_locale.generateNTemplate)("7 Days"),
            value: "7d"
          },
          {
            label: (0, import_locale.generateNTemplate)("30 Days"),
            value: "30d"
          },
          {
            label: (0, import_locale.generateNTemplate)("90 Days"),
            value: "90d"
          },
          {
            label: (0, import_locale.generateNTemplate)("Custom"),
            value: "custom"
          },
          {
            label: (0, import_locale.generateNTemplate)("Never"),
            value: "never"
          }
        ]
      }
    },
    {
      name: "token",
      type: "string",
      hidden: true
    }
  ]
};
