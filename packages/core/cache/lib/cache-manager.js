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
var cache_manager_exports = {};
__export(cache_manager_exports, {
  CacheManager: () => CacheManager
});
module.exports = __toCommonJS(cache_manager_exports);
var import_cache_manager = require("cache-manager");
var import_cache = require("./cache");
var import_lodash = __toESM(require("lodash"));
var import_cache_manager_redis_yet = require("cache-manager-redis-yet");
var import_deepmerge = __toESM(require("deepmerge"));
var import_memory_bloom_filter = require("./bloom-filter/memory-bloom-filter");
var import_redis_bloom_filter = require("./bloom-filter/redis-bloom-filter");
var import_counter = require("./counter");
const _CacheManager = class _CacheManager {
  defaultStore;
  prefix;
  stores = /* @__PURE__ */ new Map();
  /**
   * @internal
   */
  storeTypes = /* @__PURE__ */ new Map();
  /**
   * @internal
   */
  caches = /* @__PURE__ */ new Map();
  constructor(options) {
    const defaultOptions = {
      defaultStore: "memory",
      stores: {
        memory: {
          store: "memory",
          // global config
          max: 2e3
        },
        redis: {
          store: import_cache_manager_redis_yet.redisStore,
          close: /* @__PURE__ */ __name(async (redis) => {
            var _a;
            if (!((_a = redis.client) == null ? void 0 : _a.isOpen)) {
              return;
            }
            await redis.client.quit();
          }, "close")
        }
      }
    };
    const cacheOptions = (0, import_deepmerge.default)(defaultOptions, options || {});
    const { defaultStore = "memory", stores, prefix } = cacheOptions;
    this.defaultStore = defaultStore;
    this.prefix = prefix;
    for (const [name, store] of Object.entries(stores)) {
      const { store: s, ...globalConfig } = store;
      this.registerStore({ name, store: s, ...globalConfig });
    }
  }
  async createStore(options) {
    const { name, storeType: type, ...config } = options;
    const storeType = this.storeTypes.get(type);
    if (!storeType) {
      throw new Error(`Create cache failed, store type [${type}] is unavailable or not registered`);
    }
    const { store: s, close, ...globalConfig } = storeType;
    const store = await (0, import_cache_manager.caching)(s, { ...globalConfig, ...config });
    this.stores.set(name, { close, store });
    return store;
  }
  registerStore(options) {
    const { name, ...rest } = options;
    this.storeTypes.set(name, rest);
  }
  newCache(options) {
    const { name, prefix, store } = options;
    const cache = new import_cache.Cache({ name, prefix, store });
    this.caches.set(name, cache);
    return cache;
  }
  async createCache(options) {
    const { name, store = this.defaultStore, ...config } = options;
    let { prefix } = options;
    prefix = this.prefix ? prefix ? `${this.prefix}:${prefix}` : this.prefix : prefix;
    if (!import_lodash.default.isEmpty(config) || store === "memory") {
      const newStore = await this.createStore({ name, storeType: store, ...config });
      return this.newCache({ name, prefix, store: newStore });
    }
    const s = this.stores.get(store);
    if (!s) {
      const defaultStore = await this.createStore({ name: store, storeType: store });
      return this.newCache({ name, prefix, store: defaultStore });
    }
    return this.newCache({ name, prefix, store: s.store });
  }
  getCache(name) {
    const cache = this.caches.get(name);
    if (!cache) {
      throw new Error(`Get cache failed, ${name} is not found`);
    }
    return cache;
  }
  async flushAll() {
    const promises = [];
    for (const cache of this.caches.values()) {
      promises.push(cache.reset());
    }
    await Promise.all(promises);
  }
  async close() {
    const promises = [];
    for (const s of this.stores.values()) {
      const { close, store } = s;
      close && promises.push(close(store.store));
    }
    await Promise.all(promises);
  }
  /**
   * @experimental
   */
  async createBloomFilter(options) {
    const name = "bloom-filter";
    const { store = this.defaultStore } = options || {};
    let cache;
    try {
      cache = this.getCache(name);
    } catch (error) {
      cache = await this.createCache({ name, store });
    }
    switch (store) {
      case "memory":
        return new import_memory_bloom_filter.MemoryBloomFilter(cache);
      case "redis":
        return new import_redis_bloom_filter.RedisBloomFilter(cache);
      default:
        throw new Error(`BloomFilter store [${store}] is not supported`);
    }
  }
  /**
   * @experimental
   */
  async createCounter(options, lockManager) {
    const { store = this.defaultStore, name, prefix } = options || {};
    let cache;
    if (store !== "memory") {
      try {
        cache = this.getCache(name);
      } catch (error) {
        cache = await this.createCache({ name, store, prefix });
      }
    }
    switch (store) {
      case "memory":
        return new import_counter.MemoryCounter();
      case "redis":
        return new import_counter.RedisCounter(cache);
      default:
        if (!lockManager) {
          throw new Error(`Counter store [${store}] is not supported`);
        }
        return new import_counter.LockCounter(cache, lockManager);
    }
  }
};
__name(_CacheManager, "CacheManager");
let CacheManager = _CacheManager;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CacheManager
});
