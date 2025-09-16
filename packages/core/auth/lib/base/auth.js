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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var auth_exports = {};
__export(auth_exports, {
  BaseAuth: () => BaseAuth
});
module.exports = __toCommonJS(auth_exports);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_auth = require("../auth");
const localeNamespace = "auth";
const _BaseAuth = class _BaseAuth extends import_auth.Auth {
  userCollection;
  constructor(config) {
    const { userCollection } = config;
    super(config);
    this.userCollection = userCollection;
  }
  get userRepository() {
    return this.userCollection.repository;
  }
  /**
   * @internal
   */
  get jwt() {
    return this.ctx.app.authManager.jwt;
  }
  get tokenController() {
    return this.ctx.app.authManager.tokenController;
  }
  set user(user) {
    this.ctx.state.currentUser = user;
  }
  get user() {
    return this.ctx.state.currentUser;
  }
  /**
   * @internal
   */
  getCacheKey(userId) {
    return `auth:${userId}`;
  }
  /**
   * @internal
   */
  validateUsername(username) {
    return /^[^@.<>"'/]{1,50}$/.test(username);
  }
  async checkToken() {
    var _a, _b, _c;
    const cache = this.ctx.cache;
    const token = this.ctx.getBearerToken();
    if (!token) {
      this.ctx.throw(401, {
        message: this.ctx.t("Unauthenticated. Please sign in to continue.", { ns: localeNamespace }),
        code: import_auth.AuthErrorCode.EMPTY_TOKEN
      });
    }
    let tokenStatus;
    let payload;
    try {
      payload = await this.jwt.decode(token);
      tokenStatus = "valid";
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        tokenStatus = "expired";
        payload = import_jsonwebtoken.default.decode(token);
      } else {
        this.ctx.logger.error(err, { method: "jwt.decode" });
        this.ctx.throw(401, {
          message: this.ctx.t("Your session has expired. Please sign in again.", { ns: localeNamespace }),
          code: import_auth.AuthErrorCode.INVALID_TOKEN
        });
      }
    }
    const { userId, roleName, iat, temp, jti, exp, signInTime } = payload ?? {};
    const user = userId ? await cache.wrap(
      this.getCacheKey(userId),
      () => this.userRepository.findOne({
        filter: {
          id: userId
        },
        raw: true
      })
    ) : null;
    if (!user) {
      this.ctx.throw(401, {
        message: this.ctx.t("User not found. Please sign in again to continue.", { ns: localeNamespace }),
        code: import_auth.AuthErrorCode.NOT_EXIST_USER
      });
    }
    if (roleName) {
      this.ctx.headers["x-role"] = roleName;
    }
    const blocked = await this.jwt.blacklist.has(jti ?? token);
    if (blocked) {
      this.ctx.throw(401, {
        message: this.ctx.t("Your session has expired. Please sign in again.", { ns: localeNamespace }),
        code: import_auth.AuthErrorCode.BLOCKED_TOKEN
      });
    }
    if (!temp) {
      if (tokenStatus === "valid") {
        return { tokenStatus, user, temp };
      } else {
        this.ctx.throw(401, {
          message: this.ctx.t("Your session has expired. Please sign in again.", { ns: localeNamespace }),
          code: import_auth.AuthErrorCode.INVALID_TOKEN
        });
      }
    }
    const tokenPolicy = await this.tokenController.getConfig();
    if (signInTime && Date.now() - signInTime > tokenPolicy.sessionExpirationTime) {
      this.ctx.throw(401, {
        message: this.ctx.t("Your session has expired. Please sign in again.", { ns: localeNamespace }),
        code: import_auth.AuthErrorCode.EXPIRED_SESSION
      });
    }
    if (tokenStatus === "valid" && Date.now() - iat * 1e3 > tokenPolicy.tokenExpirationTime) {
      tokenStatus = "expired";
    }
    if (tokenStatus === "valid" && user.passwordChangeTz && iat * 1e3 < user.passwordChangeTz) {
      this.ctx.throw(401, {
        message: this.ctx.t("User password changed, please signin again.", { ns: localeNamespace }),
        code: import_auth.AuthErrorCode.INVALID_TOKEN
      });
    }
    if (tokenStatus === "expired") {
      if (tokenPolicy.expiredTokenRenewLimit > 0 && Date.now() - exp * 1e3 > tokenPolicy.expiredTokenRenewLimit) {
        this.ctx.throw(401, {
          message: this.ctx.t("Your session has expired. Please sign in again.", { ns: localeNamespace }),
          code: import_auth.AuthErrorCode.EXPIRED_SESSION
        });
      }
      this.ctx.logger.info("token renewing", {
        method: "auth.check",
        url: this.ctx.originalUrl,
        currentJti: jti
      });
      const isStreamRequest = ((_c = (_b = (_a = this.ctx) == null ? void 0 : _a.req) == null ? void 0 : _b.headers) == null ? void 0 : _c.accept) === "text/event-stream";
      if (isStreamRequest) {
        this.ctx.throw(401, {
          message: "Stream api not allow renew token.",
          code: import_auth.AuthErrorCode.SKIP_TOKEN_RENEW
        });
      }
      if (!jti) {
        this.ctx.throw(401, {
          message: this.ctx.t("Your session has expired. Please sign in again.", { ns: localeNamespace }),
          code: import_auth.AuthErrorCode.INVALID_TOKEN
        });
      }
      return { tokenStatus, user, jti, signInTime, temp };
    }
    return { tokenStatus, user, jti, signInTime, temp };
  }
  async check() {
    var _a, _b, _c;
    const { tokenStatus, user, jti, temp, signInTime, roleName } = await this.checkToken();
    if (tokenStatus === "expired") {
      const tokenPolicy = await this.tokenController.getConfig();
      try {
        this.ctx.logger.info("token renewing", {
          method: "auth.check",
          jti
        });
        const isStreamRequest = ((_c = (_b = (_a = this.ctx) == null ? void 0 : _a.req) == null ? void 0 : _b.headers) == null ? void 0 : _c.accept) === "text/event-stream";
        if (isStreamRequest) {
          this.ctx.throw(401, {
            message: "Stream api not allow renew token.",
            code: import_auth.AuthErrorCode.SKIP_TOKEN_RENEW
          });
        }
        if (!jti) {
          this.ctx.throw(401, {
            message: this.ctx.t("Your session has expired. Please sign in again.", { ns: localeNamespace }),
            code: import_auth.AuthErrorCode.INVALID_TOKEN
          });
        }
        const renewedResult = await this.tokenController.renew(jti);
        this.ctx.logger.info("token renewed", {
          method: "auth.check",
          oldJti: jti,
          newJti: renewedResult.jti
        });
        const expiresIn = Math.floor(tokenPolicy.tokenExpirationTime / 1e3);
        const newToken = this.jwt.sign(
          { userId: user.id, roleName, temp, signInTime, iat: Math.floor(renewedResult.issuedTime / 1e3) },
          { jwtid: renewedResult.jti, expiresIn }
        );
        this.ctx.res.setHeader("x-new-token", newToken);
      } catch (err) {
        this.ctx.logger.error("token renew failed", {
          method: "auth.check",
          jti
        });
        const options = err instanceof import_auth.AuthError ? { code: err.code, message: err.message } : { message: err.message, code: err.code ?? import_auth.AuthErrorCode.INVALID_TOKEN };
        this.ctx.throw(401, {
          message: this.ctx.t(options.message, { ns: localeNamespace }),
          code: options.code
        });
      }
    }
    return user;
  }
  async validate() {
    return null;
  }
  async signNewToken(userId) {
    const tokenInfo = await this.tokenController.add({ userId });
    const expiresIn = Math.floor((await this.tokenController.getConfig()).tokenExpirationTime / 1e3);
    const token = this.jwt.sign(
      {
        userId,
        temp: true,
        iat: Math.floor(tokenInfo.issuedTime / 1e3),
        signInTime: tokenInfo.signInTime
      },
      {
        jwtid: tokenInfo.jti,
        expiresIn
      }
    );
    return token;
  }
  async signIn() {
    let user;
    try {
      user = await this.validate();
    } catch (err) {
      this.ctx.throw(err.status || 401, err.message, {
        ...err
      });
    }
    if (!user) {
      this.ctx.throw(401, {
        message: this.ctx.t("User not found. Please sign in again to continue.", { ns: localeNamespace }),
        code: import_auth.AuthErrorCode.NOT_EXIST_USER
      });
    }
    const token = await this.signNewToken(user.id);
    return {
      user,
      token
    };
  }
  async signOut() {
    const token = this.ctx.getBearerToken();
    if (!token) {
      return;
    }
    const { userId } = await this.jwt.decode(token);
    await this.ctx.app.emitAsync("cache:del:roles", { userId });
    await this.ctx.cache.del(this.getCacheKey(userId));
    return await this.jwt.block(token);
  }
};
__name(_BaseAuth, "BaseAuth");
let BaseAuth = _BaseAuth;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseAuth
});
