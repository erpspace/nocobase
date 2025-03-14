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
var sms_authenticator_exports = {};
__export(sms_authenticator_exports, {
  default: () => AddBasicAuthMigration
});
module.exports = __toCommonJS(sms_authenticator_exports);
var import_server = require("@nocobase/server");
var import_constants = require("../../constants");
class AddBasicAuthMigration extends import_server.Migration {
  appVersion = "<0.10.0-alpha.2";
  async up() {
    const SystemSetting = this.context.db.getRepository("systemSettings");
    const setting = await SystemSetting.findOne();
    const smsAuthEnabled = setting.get("smsAuthEnabled");
    if (!smsAuthEnabled) {
      return;
    }
    const repo = this.context.db.getRepository("authenticators");
    const existed = await repo.count({
      filter: {
        authType: import_constants.authType
      }
    });
    if (existed) {
      return;
    }
    await repo.create({
      values: {
        name: "sms",
        authType: import_constants.authType,
        description: "Sign in with SMS.",
        enabled: true
      }
    });
  }
  async down() {
  }
}
