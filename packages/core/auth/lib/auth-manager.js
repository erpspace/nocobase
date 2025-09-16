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
var auth_manager_exports = {};
__export(auth_manager_exports, {
  AuthManager: () => AuthManager
});
module.exports = __toCommonJS(auth_manager_exports);
var import_utils = require("@nocobase/utils");
var import_jwt_service = require("./base/jwt-service");
const _AuthManager = class _AuthManager {
  /**
   * @internal
   */
  jwt;
  tokenController;
  options;
  authTypes = new import_utils.Registry();
  // authenticators collection manager.
  storer;
  constructor(options) {
    this.options = options;
    this.jwt = new import_jwt_service.JwtService(options.jwt);
  }
  setStorer(storer) {
    this.storer = storer;
  }
  setTokenBlacklistService(service) {
    this.jwt.blacklist = service;
  }
  setTokenControlService(service) {
    this.tokenController = service;
  }
  /**
   * registerTypes
   * @description Add a new authenticate type and the corresponding authenticator.
   * The types will show in the authenticators list of the admin panel.
   *
   * @param authType - The type of the authenticator. It is required to be unique.
   * @param authConfig - Configurations of the kind of authenticator.
   */
  registerTypes(authType, authConfig) {
    this.authTypes.register(authType, authConfig);
  }
  listTypes() {
    return Array.from(this.authTypes.getEntities()).map(([authType, authConfig]) => ({
      name: authType,
      title: authConfig.title
    }));
  }
  getAuthConfig(authType) {
    return this.authTypes.get(authType);
  }
  /**
   * get
   * @description Get authenticator instance by name.
   * @param name - The name of the authenticator.
   * @return authenticator instance.
   */
  async get(name, ctx) {
    if (!this.storer) {
      throw new Error("AuthManager.storer is not set.");
    }
    const authenticator = await this.storer.get(name);
    if (!authenticator) {
      throw new Error(`Authenticator [${name}] is not found.`);
    }
    const { auth } = this.authTypes.get(authenticator.authType) || {};
    if (!auth) {
      throw new Error(`AuthType [${authenticator.authType}] is not found.`);
    }
    return new auth({ authenticator, options: authenticator.options, ctx });
  }
  /**
   * middleware
   * @description Auth middleware, used to check the user status.
   */
  middleware() {
    const self = this;
    return /* @__PURE__ */ __name(async function AuthManagerMiddleware(ctx, next) {
      const name = ctx.get(self.options.authKey) || self.options.default;
      let authenticator;
      try {
        authenticator = await ctx.app.authManager.get(name, ctx);
        ctx.auth = authenticator;
      } catch (err) {
        ctx.auth = {};
        ctx.logger.warn(err.message, { method: "check", authenticator: name });
        return next();
      }
      if (!authenticator) {
        return next();
      }
      if (await ctx.auth.skipCheck()) {
        return next();
      }
      const user = await ctx.auth.check();
      if (user) {
        ctx.auth.user = user;
      }
      await next();
    }, "AuthManagerMiddleware");
  }
};
__name(_AuthManager, "AuthManager");
let AuthManager = _AuthManager;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AuthManager
});
