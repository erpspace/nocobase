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
var token_controller_exports = {};
__export(token_controller_exports, {
  TokenController: () => TokenController
});
module.exports = __toCommonJS(token_controller_exports);
var import_auth = require("@nocobase/auth");
var import_crypto = require("crypto");
var import_ms = __toESM(require("ms"));
var import_constants = require("../constants");
const JTICACHEKEY = "token-jti";
class TokenController {
  cache;
  app;
  db;
  logger;
  constructor({ cache, app, logger }) {
    this.cache = cache;
    this.app = app;
    this.logger = logger;
  }
  async setTokenInfo(id, value) {
    const repo = this.app.db.getRepository(import_constants.issuedTokensCollectionName);
    await repo.updateOrCreate({ filterKeys: ["id"], values: value });
    return;
  }
  getConfig() {
    return this.cache.wrap("config", async () => {
      const repo = this.app.db.getRepository(import_constants.tokenPolicyCollectionName);
      const configRecord = await repo.findOne({ filterByTk: import_constants.tokenPolicyRecordKey });
      if (!configRecord) return null;
      const config = configRecord.config;
      return {
        tokenExpirationTime: (0, import_ms.default)(config.tokenExpirationTime),
        sessionExpirationTime: (0, import_ms.default)(config.sessionExpirationTime),
        expiredTokenRenewLimit: (0, import_ms.default)(config.expiredTokenRenewLimit)
      };
    });
  }
  setConfig(config) {
    return this.cache.set("config", {
      tokenExpirationTime: (0, import_ms.default)(config.tokenExpirationTime),
      sessionExpirationTime: (0, import_ms.default)(config.sessionExpirationTime),
      expiredTokenRenewLimit: (0, import_ms.default)(config.expiredTokenRenewLimit)
    });
  }
  async removeSessionExpiredTokens(userId) {
    const config = await this.getConfig();
    const issuedTokenRepo = this.app.db.getRepository(import_constants.issuedTokensCollectionName);
    const currTS = Date.now();
    return issuedTokenRepo.destroy({
      filter: {
        userId,
        signInTime: {
          $lt: currTS - config.sessionExpirationTime
        }
      }
    });
  }
  async add({ userId }) {
    const jti = (0, import_crypto.randomUUID)();
    const currTS = Date.now();
    const data = {
      jti,
      issuedTime: currTS,
      signInTime: currTS,
      renewed: false,
      userId
    };
    await this.setTokenInfo(jti, data);
    try {
      if (process.env.DB_DIALECT === "sqlite") {
        await this.removeSessionExpiredTokens(userId);
      } else {
        this.removeSessionExpiredTokens(userId);
      }
    } catch (err) {
      this.logger.error(err, { module: "auth", submodule: "token-controller", method: "removeSessionExpiredTokens" });
    }
    return data;
  }
  renew = async (jti) => {
    const repo = this.app.db.getRepository(import_constants.issuedTokensCollectionName);
    const model = this.app.db.getModel(import_constants.issuedTokensCollectionName);
    const newId = (0, import_crypto.randomUUID)();
    const issuedTime = Date.now();
    const [count] = await model.update(
      { jti: newId, issuedTime },
      { where: { jti } }
    );
    if (count === 1) {
      await this.cache.set(`jti-renewed-cahce:${jti}`, { jti: newId, issuedTime }, import_constants.RENEWED_JTI_CACHE_MS);
      this.logger.info("jti renewed", { oldJti: jti, newJti: newId, issuedTime });
      return { jti: newId, issuedTime };
    } else {
      const cachedJtiData = await this.cache.get(`jti-renewed-cahce:${jti}`);
      if (cachedJtiData) {
        return cachedJtiData;
      }
      this.logger.error("jti renew failed", {
        module: "auth",
        submodule: "token-controller",
        method: "renew",
        jti,
        code: import_auth.AuthErrorCode.TOKEN_RENEW_FAILED
      });
      throw new import_auth.AuthError({
        message: "Your session has expired. Please sign in again.",
        code: import_auth.AuthErrorCode.TOKEN_RENEW_FAILED
      });
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TokenController
});
