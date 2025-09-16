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
var cache_exports = {};
__export(cache_exports, {
  Cache: () => Cache
});
module.exports = __toCommonJS(cache_exports);
const _Cache = class _Cache {
  name;
  prefix;
  store;
  constructor({ name, prefix, store }) {
    this.name = name;
    this.prefix = prefix;
    this.store = store;
  }
  key(key) {
    return this.prefix ? `${this.prefix}:${key}` : key;
  }
  async set(key, value, ttl) {
    await this.store.set(this.key(key), value, ttl);
  }
  async get(key) {
    return await this.store.get(this.key(key));
  }
  async del(key) {
    await this.store.del(this.key(key));
  }
  async reset() {
    await this.store.reset();
  }
  async wrap(key, fn, ttl) {
    return await this.store.wrap(this.key(key), fn, ttl);
  }
  async wrapWithCondition(key, fn, options) {
    const { useCache, isCacheable, ttl } = options || {};
    if (useCache === false) {
      return await fn();
    }
    const value = await this.get(key);
    if (value) {
      return value;
    }
    const result = await fn();
    const cacheable = isCacheable ? await isCacheable(result) : result;
    if (!cacheable) {
      return result;
    }
    await this.set(key, result, ttl);
    return result;
  }
  async mset(args, ttl) {
    await this.store.store.mset(
      args.map(([key, value]) => [this.key(key), value]),
      ttl
    );
  }
  async mget(...args) {
    args = args.map((key) => this.key(key));
    return await this.store.store.mget(...args);
  }
  async mdel(...args) {
    args = args.map((key) => this.key(key));
    await this.store.store.mdel(...args);
  }
  async keys(pattern) {
    const keys = await this.store.store.keys(pattern);
    return keys.map((key) => key.replace(`${this.name}:`, ""));
  }
  async ttl(key) {
    return await this.store.store.ttl(this.key(key));
  }
  async setValueInObject(key, objectKey, value) {
    const object = await this.get(key) || {};
    object[objectKey] = value;
    await this.set(key, object);
  }
  async getValueInObject(key, objectKey) {
    const object = await this.get(key) || {};
    return object[objectKey];
  }
  async delValueInObject(key, objectKey) {
    const object = await this.get(key) || {};
    delete object[objectKey];
    await this.set(key, object);
  }
};
__name(_Cache, "Cache");
let Cache = _Cache;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Cache
});
