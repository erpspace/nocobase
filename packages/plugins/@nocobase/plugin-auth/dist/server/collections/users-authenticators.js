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
var users_authenticators_exports = {};
__export(users_authenticators_exports, {
  default: () => users_authenticators_default
});
module.exports = __toCommonJS(users_authenticators_exports);
var import_database = require("@nocobase/database");
var users_authenticators_default = (0, import_database.defineCollection)({
  dumpRules: {
    group: "user"
  },
  shared: true,
  migrationRules: ["schema-only", "overwrite"],
  name: "usersAuthenticators",
  model: "UserAuthModel",
  createdBy: true,
  updatedBy: true,
  logging: true,
  fields: [
    /**
     * uuid:
     * Unique user id of the authentication method, such as wechat openid, phone number, etc.
     */
    {
      name: "uuid",
      interface: "input",
      type: "string",
      allowNull: false,
      uiSchema: {
        type: "string",
        title: '{{t("UUID")}}',
        "x-component": "Input",
        required: true
      }
    },
    {
      interface: "input",
      type: "string",
      name: "nickname",
      allowNull: false,
      defaultValue: "",
      uiSchema: {
        type: "string",
        title: '{{t("Nickname")}}',
        "x-component": "Input"
      }
    },
    {
      interface: "attachment",
      type: "string",
      name: "avatar",
      allowNull: false,
      defaultValue: "",
      uiSchema: {
        type: "string",
        title: '{{t("Avatar")}}',
        "x-component": "Upload"
      }
    },
    /**
     * meta:
     * Metadata, some other information of the authentication method.
     */
    {
      type: "json",
      name: "meta",
      defaultValue: {}
    }
  ]
});
