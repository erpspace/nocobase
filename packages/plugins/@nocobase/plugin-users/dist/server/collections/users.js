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
var users_exports = {};
__export(users_exports, {
  default: () => users_default
});
module.exports = __toCommonJS(users_exports);
var import_database = require("@nocobase/database");
var users_default = (0, import_database.defineCollection)({
  origin: "@nocobase/plugin-users",
  dumpRules: {
    group: "user"
  },
  migrationRules: ["schema-only", "overwrite"],
  name: "users",
  title: '{{t("Users")}}',
  sortable: "sort",
  model: "UserModel",
  createdBy: true,
  updatedBy: true,
  logging: true,
  shared: true,
  fields: [
    {
      name: "id",
      type: "bigInt",
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      uiSchema: { type: "number", title: '{{t("ID")}}', "x-component": "InputNumber", "x-read-pretty": true },
      interface: "id"
    },
    {
      interface: "input",
      type: "string",
      name: "nickname",
      uiSchema: {
        type: "string",
        title: '{{t("Nickname")}}',
        "x-component": "Input"
      }
    },
    {
      interface: "input",
      type: "string",
      name: "username",
      unique: true,
      uiSchema: {
        type: "string",
        title: '{{t("Username")}}',
        "x-component": "Input",
        "x-validator": { username: true },
        required: true
      }
    },
    {
      interface: "email",
      type: "string",
      name: "email",
      unique: true,
      uiSchema: {
        type: "string",
        title: '{{t("Email")}}',
        "x-component": "Input",
        "x-validator": "email",
        required: true
      }
    },
    {
      interface: "input",
      type: "string",
      name: "phone",
      unique: true,
      uiSchema: {
        type: "string",
        title: '{{t("Phone")}}',
        "x-component": "Input",
        required: true
      }
    },
    {
      interface: "password",
      type: "password",
      name: "password",
      hidden: true,
      uiSchema: {
        type: "string",
        title: '{{t("Password")}}',
        "x-component": "Password",
        "x-validator": { password: true }
      }
    },
    {
      name: "passwordChangeTz",
      type: "bigInt"
    },
    {
      type: "string",
      name: "appLang"
    },
    {
      type: "string",
      name: "resetToken",
      unique: true,
      hidden: true
    },
    {
      type: "json",
      name: "systemSettings",
      defaultValue: {}
    },
    {
      uiSchema: {
        "x-component-props": {
          dateFormat: "YYYY-MM-DD"
        },
        type: "datetime",
        title: '{{t("Created at")}}',
        "x-component": "DatePicker",
        "x-read-pretty": true
      },
      name: "createdAt",
      type: "date",
      field: "createdAt",
      interface: "createdAt"
    },
    {
      uiSchema: {
        "x-component-props": {
          dateFormat: "YYYY-MM-DD"
        },
        type: "datetime",
        title: '{{t("Last updated at")}}',
        "x-component": "DatePicker",
        "x-read-pretty": true
      },
      name: "updatedAt",
      type: "date",
      field: "updatedAt",
      interface: "updatedAt"
    }
  ]
});
