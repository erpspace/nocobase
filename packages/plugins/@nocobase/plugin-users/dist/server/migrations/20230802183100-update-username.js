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
var update_username_exports = {};
__export(update_username_exports, {
  default: () => UpdateUserNameMigration
});
module.exports = __toCommonJS(update_username_exports);
var import_server = require("@nocobase/server");
class UpdateUserNameMigration extends import_server.Migration {
  appVersion = "<0.13.0-alpha.1";
  async up() {
    const repo = this.context.db.getRepository("users");
    const user = await repo.findOne({
      filter: {
        email: "admin@nocobase.com",
        username: null
      }
    });
    if (user) {
      await repo.update({
        values: {
          username: process.env.INIT_ROOT_USERNAME || "nocobase"
        },
        filter: {
          id: user.id
        }
      });
    }
  }
  async down() {
  }
}
