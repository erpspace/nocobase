/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var basic_auth_exports = {};
__export(basic_auth_exports, {
  BasicAuth: () => BasicAuth
});
module.exports = __toCommonJS(basic_auth_exports);
var import_auth = require("@nocobase/auth");
var import_crypto = __toESM(require("crypto"));
var import_preset = require("../preset");
var import_lodash = __toESM(require("lodash"));
class BasicAuth extends import_auth.BaseAuth {
  constructor(config) {
    const userCollection = config.ctx.db.getCollection("users");
    super({ ...config, userCollection });
  }
  async validate() {
    const ctx = this.ctx;
    const {
      account,
      // Username or email
      email,
      // Old parameter, compatible with old api
      password
    } = ctx.action.params.values || {};
    if (!account && !email) {
      ctx.throw(400, ctx.t("Please enter your username or email", { ns: import_preset.namespace }));
    }
    const filter = email ? { email } : {
      $or: [{ username: account }, { email: account }]
    };
    const user = await this.userRepository.findOne({
      filter
    });
    if (!user) {
      ctx.throw(401, ctx.t("The username/email or password is incorrect, please re-enter", { ns: import_preset.namespace }));
    }
    const field = this.userCollection.getField("password");
    const valid = await field.verify(password, user.password);
    if (!valid) {
      ctx.throw(401, ctx.t("The username/email or password is incorrect, please re-enter", { ns: import_preset.namespace }), {
        code: "INCORRECT_PASSWORD",
        user
      });
    }
    return user;
  }
  getSignupFormSettings() {
    var _a;
    const options = ((_a = this.authenticator.options) == null ? void 0 : _a.public) || {};
    let { signupForm = [] } = options;
    signupForm = signupForm.filter((item) => item.show);
    if (!(signupForm.length && signupForm.some(
      (item) => ["username", "email"].includes(item.field) && item.show && item.required
    ))) {
      signupForm.push({ field: "username", show: true, required: true });
    }
    return signupForm;
  }
  verfiySignupParams(signupFormSettings, values) {
    const { username, email } = values;
    const usernameSetting = signupFormSettings.find((item) => item.field === "username");
    if (usernameSetting && usernameSetting.show) {
      if (username && !this.validateUsername(username) || usernameSetting.required && !username) {
        throw new Error("Please enter a valid username");
      }
    }
    const emailSetting = signupFormSettings.find((item) => item.field === "email");
    if (emailSetting && emailSetting.show) {
      if (email && !/^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email)) {
        throw new Error("Please enter a valid email address");
      }
      if (emailSetting.required && !email) {
        throw new Error("Please enter a valid email address");
      }
    }
    const requiredFields = signupFormSettings.filter((item) => item.show && item.required);
    requiredFields.forEach((item) => {
      if (!values[item.field]) {
        throw new Error(`Please enter ${item.field}`);
      }
    });
  }
  async signUp() {
    var _a;
    const ctx = this.ctx;
    const options = ((_a = this.authenticator.options) == null ? void 0 : _a.public) || {};
    if (!options.allowSignUp) {
      ctx.throw(403, ctx.t("Not allowed to sign up", { ns: import_preset.namespace }));
    }
    const User = ctx.db.getRepository("users");
    const { values } = ctx.action.params;
    const { password, confirm_password } = values;
    const signupFormSettings = this.getSignupFormSettings();
    try {
      this.verfiySignupParams(signupFormSettings, values);
    } catch (error) {
      ctx.throw(400, this.ctx.t(error.message, { ns: import_preset.namespace }));
    }
    if (!password) {
      ctx.throw(400, ctx.t("Please enter a password", { ns: import_preset.namespace }));
    }
    if (password !== confirm_password) {
      ctx.throw(400, ctx.t("The password is inconsistent, please re-enter", { ns: import_preset.namespace }));
    }
    const fields = signupFormSettings.map((item) => item.field);
    const userValues = import_lodash.default.pick(values, fields);
    const user = await User.create({ values: { ...userValues, password } });
    return user;
  }
  /* istanbul ignore next -- @preserve */
  async lostPassword() {
    const ctx = this.ctx;
    const {
      values: { email }
    } = ctx.action.params;
    if (!email) {
      ctx.throw(400, ctx.t("Please fill in your email address", { ns: import_preset.namespace }));
    }
    const user = await this.userRepository.findOne({
      where: {
        email
      }
    });
    if (!user) {
      ctx.throw(401, ctx.t("The email is incorrect, please re-enter", { ns: import_preset.namespace }));
    }
    user.resetToken = import_crypto.default.randomBytes(20).toString("hex");
    await user.save();
    return user;
  }
  /* istanbul ignore next -- @preserve */
  async resetPassword() {
    const ctx = this.ctx;
    const {
      values: { email, password, resetToken }
    } = ctx.action.params;
    const user = await this.userRepository.findOne({
      where: {
        email,
        resetToken
      }
    });
    if (!user) {
      ctx.throw(404);
    }
    user.token = null;
    user.resetToken = null;
    user.password = password;
    await user.save();
    return user;
  }
  /* istanbul ignore next -- @preserve */
  async getUserByResetToken() {
    const ctx = this.ctx;
    const { token } = ctx.action.params;
    const user = await this.userRepository.findOne({
      where: {
        resetToken: token
      }
    });
    if (!user) {
      ctx.throw(401);
    }
    return user;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BasicAuth
});
