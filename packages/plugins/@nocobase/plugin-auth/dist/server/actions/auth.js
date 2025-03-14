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
var auth_exports = {};
__export(auth_exports, {
  default: () => auth_default
});
module.exports = __toCommonJS(auth_exports);
var import_preset = require("../../preset");
/* istanbul ignore file -- @preserve */
var auth_default = {
  // lostPassword: async (ctx: Context, next: Next) => {
  //   ctx.body = await ctx.auth.lostPassword();
  //   await next();
  // },
  // resetPassword: async (ctx: Context, next: Next) => {
  //   ctx.body = await ctx.auth.resetPassword();
  //   await next();
  // },
  // getUserByResetToken: async (ctx: Context, next: Next) => {
  //   ctx.body = await ctx.auth.getUserByResetToken();
  //   await next();
  // },
  changePassword: async (ctx, next) => {
    const systemSettings = ctx.db.getRepository("systemSettings");
    const settings = await systemSettings.findOne();
    const enableChangePassword = settings.get("enableChangePassword");
    if (enableChangePassword === false) {
      ctx.throw(403, ctx.t("Password is not allowed to be changed", { ns: import_preset.namespace }));
    }
    const {
      values: { oldPassword, newPassword, confirmPassword }
    } = ctx.action.params;
    if (newPassword !== confirmPassword) {
      ctx.throw(400, ctx.t("The password is inconsistent, please re-enter", { ns: import_preset.namespace }));
    }
    const currentUser = ctx.auth.user;
    if (!currentUser) {
      ctx.throw(401);
    }
    let key;
    if (currentUser.username) {
      key = "username";
    } else {
      key = "email";
    }
    const UserRepo = ctx.db.getRepository("users");
    const user = await UserRepo.findOne({
      where: {
        [key]: currentUser[key]
      }
    });
    const pwd = ctx.db.getCollection("users").getField("password");
    const isValid = await pwd.verify(oldPassword, user.password);
    if (!isValid) {
      ctx.throw(401, ctx.t("The password is incorrect, please re-enter", { ns: import_preset.namespace }));
    }
    await UserRepo.update({
      filterByTk: user.id,
      values: {
        password: newPassword
      }
    });
    ctx.body = currentUser;
    await next();
  }
};
