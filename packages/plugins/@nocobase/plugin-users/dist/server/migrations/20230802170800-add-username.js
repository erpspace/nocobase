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
var add_username_exports = {};
__export(add_username_exports, {
  default: () => AddUserNameMigration
});
module.exports = __toCommonJS(add_username_exports);
var import_server = require("@nocobase/server");
class AddUserNameMigration extends import_server.Migration {
  appVersion = "<0.13.0-alpha.1";
  async up() {
    const Field = this.context.db.getRepository("fields");
    const existed = await Field.count({
      filter: {
        name: "username",
        collectionName: "users"
      }
    });
    if (!existed) {
      await Field.create({
        values: {
          name: "username",
          collectionName: "users",
          type: "string",
          unique: true,
          interface: "input",
          uiSchema: {
            type: "string",
            title: '{{t("Username")}}',
            "x-component": "Input",
            "x-validator": { username: true },
            required: true
          }
        }
      });
    }
  }
}
