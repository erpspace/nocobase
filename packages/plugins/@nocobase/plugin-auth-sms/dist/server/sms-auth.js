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
var sms_auth_exports = {};
__export(sms_auth_exports, {
  SMSAuth: () => SMSAuth
});
module.exports = __toCommonJS(sms_auth_exports);
var import_auth = require("@nocobase/auth");
var import_constants = require("../constants");
class SMSAuth extends import_auth.BaseAuth {
  constructor(config) {
    const { ctx } = config;
    super({
      ...config,
      userCollection: ctx.db.getCollection("users")
    });
  }
  async validate() {
    const ctx = this.ctx;
    const verificationPlugin = ctx.app.getPlugin("verification");
    if (!verificationPlugin) {
      throw new Error("auth-sms: @nocobase/plugin-verification is required");
    }
    let user;
    await verificationPlugin.intercept(ctx, async () => {
      var _a;
      const {
        values: { phone }
      } = ctx.action.params;
      try {
        user = await this.userRepository.findOne({
          filter: { phone }
        });
        if (user) {
          await this.authenticator.addUser(user, {
            through: {
              uuid: phone
            }
          });
          return;
        }
        const { autoSignup } = ((_a = this.authenticator.options) == null ? void 0 : _a.public) || {};
        const authenticator = this.authenticator;
        if (autoSignup) {
          user = await authenticator.findOrCreateUser(phone, {
            nickname: phone,
            phone
          });
          return;
        }
        user = await authenticator.findUser(phone);
        if (!user) {
          throw new Error(ctx.t("The phone number is not registered, please register first", { ns: import_constants.namespace }));
        }
      } catch (err) {
        console.log(err);
        throw new Error(err.message);
      }
    });
    return user;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SMSAuth
});
