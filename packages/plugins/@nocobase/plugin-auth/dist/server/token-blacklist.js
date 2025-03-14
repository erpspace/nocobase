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
var token_blacklist_exports = {};
__export(token_blacklist_exports, {
  TokenBlacklistService: () => TokenBlacklistService
});
module.exports = __toCommonJS(token_blacklist_exports);
class TokenBlacklistService {
  constructor(plugin) {
    this.plugin = plugin;
    this.repo = plugin.db.getRepository("tokenBlacklist");
    plugin.app.on("beforeStart", async () => {
      try {
        this.bloomFilter = await plugin.app.cacheManager.createBloomFilter();
        await this.bloomFilter.reserve(this.cacheKey, 1e-3, 1e6);
        const data = await this.repo.find({
          fields: ["token"],
          filter: {
            expiration: {
              $dateAfter: /* @__PURE__ */ new Date()
            }
          },
          raw: true
        });
        const tokens = data.map((item) => item.token);
        if (!tokens.length) {
          return;
        }
        await this.bloomFilter.mAdd(this.cacheKey, tokens);
      } catch (error) {
        plugin.app.logger.warn("token-blacklist: create bloom filter failed", error);
        this.bloomFilter = null;
      }
    });
  }
  repo;
  cronJob;
  bloomFilter;
  cacheKey = "token-black-list";
  get app() {
    return this.plugin.app;
  }
  async has(token) {
    if (this.bloomFilter) {
      const exists = await this.bloomFilter.exists(this.cacheKey, token);
      if (!exists) {
        return false;
      }
    }
    return !!await this.repo.findOne({
      filter: {
        token
      }
    });
  }
  async add(values) {
    await this.deleteExpiredTokens();
    const { token } = values;
    if (this.bloomFilter) {
      await this.bloomFilter.add(this.cacheKey, token);
    }
    return this.repo.model.findOrCreate({
      defaults: values,
      where: {
        token
      }
    });
  }
  async deleteExpiredTokens() {
    return this.repo.destroy({
      filter: {
        expiration: {
          $dateNotAfter: /* @__PURE__ */ new Date()
        }
      }
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TokenBlacklistService
});
