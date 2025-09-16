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
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var auth_exports = {};
__export(auth_exports, {
  Auth: () => Auth,
  AuthError: () => AuthError,
  AuthErrorCode: () => AuthErrorCode
});
module.exports = __toCommonJS(auth_exports);
const AuthErrorCode = {
  EMPTY_TOKEN: "EMPTY_TOKEN",
  EXPIRED_TOKEN: "EXPIRED_TOKEN",
  INVALID_TOKEN: "INVALID_TOKEN",
  TOKEN_RENEW_FAILED: "TOKEN_RENEW_FAILED",
  BLOCKED_TOKEN: "BLOCKED_TOKEN",
  EXPIRED_SESSION: "EXPIRED_SESSION",
  NOT_EXIST_USER: "NOT_EXIST_USER",
  SKIP_TOKEN_RENEW: "SKIP_TOKEN_RENEW"
};
const _AuthError = class _AuthError extends Error {
  code;
  constructor(options) {
    super(options.message);
    this.code = options.code;
  }
};
__name(_AuthError, "AuthError");
let AuthError = _AuthError;
const _Auth = class _Auth {
  authenticator;
  options;
  ctx;
  constructor(config) {
    const { authenticator, options, ctx } = config;
    this.authenticator = authenticator;
    this.options = options;
    this.ctx = ctx;
  }
  async skipCheck() {
    if (this.ctx.skipAuthCheck === true) {
      return true;
    }
    const token = this.ctx.getBearerToken();
    if (!token && this.ctx.app.options.acl === false) {
      return true;
    }
    const { resourceName, actionName } = this.ctx.action;
    const acl = this.ctx.dataSource.acl;
    const isPublic = await acl.allowManager.isAllowed(resourceName, actionName, this.ctx);
    return isPublic;
  }
  // The following methods are mainly designed for user authentications.
  async signIn() {
  }
  async signUp() {
  }
  async signOut() {
  }
};
__name(_Auth, "Auth");
/**
 * options keys that are not allowed to use environment variables
 */
__publicField(_Auth, "optionsKeysNotAllowedInEnv");
let Auth = _Auth;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Auth,
  AuthError,
  AuthErrorCode
});
