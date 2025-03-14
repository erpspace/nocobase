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
var storer_exports = {};
__export(storer_exports, {
  Storer: () => Storer
});
module.exports = __toCommonJS(storer_exports);
class Storer {
  db;
  cache;
  app;
  authManager;
  key = "authenticators";
  constructor({
    app,
    db,
    cache,
    authManager
  }) {
    this.app = app;
    this.db = db;
    this.cache = cache;
    this.authManager = authManager;
    this.db.on("authenticators.afterSave", async (model) => {
      if (!model.enabled) {
        await this.cache.delValueInObject(this.key, model.name);
        return;
      }
      await this.cache.setValueInObject(this.key, model.name, this.renderJsonTemplate(model));
    });
    this.db.on("authenticators.afterDestroy", async (model) => {
      await this.cache.delValueInObject(this.key, model.name);
    });
  }
  renderJsonTemplate(authenticator) {
    var _a, _b;
    if (!authenticator) {
      return authenticator;
    }
    const $env = (_a = this.app) == null ? void 0 : _a.environment;
    if (!$env) {
      return authenticator;
    }
    const config = this.authManager.getAuthConfig(authenticator.authType);
    authenticator.dataValues.options = $env.renderJsonTemplate(authenticator.dataValues.options, {
      omit: (_b = config == null ? void 0 : config.auth) == null ? void 0 : _b["optionsKeysNotAllowedInEnv"]
    });
    return authenticator;
  }
  async getCache() {
    const authenticators = await this.cache.get(this.key);
    if (!authenticators) {
      return [];
    }
    return Object.values(authenticators);
  }
  async setCache(authenticators) {
    const obj = authenticators.reduce((obj2, authenticator) => {
      obj2[authenticator.name] = this.renderJsonTemplate(authenticator);
      return obj2;
    }, {});
    await this.cache.set(this.key, obj);
  }
  async get(name) {
    let authenticators = await this.getCache();
    if (!authenticators.length) {
      const repo = this.db.getRepository("authenticators");
      authenticators = await repo.find({ filter: { enabled: true } });
      await this.setCache(authenticators);
      authenticators = await this.getCache();
    }
    const authenticator = authenticators.find((authenticator2) => authenticator2.name === name);
    return authenticator || authenticators[0];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Storer
});
