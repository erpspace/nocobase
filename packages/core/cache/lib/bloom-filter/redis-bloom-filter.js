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
var redis_bloom_filter_exports = {};
__export(redis_bloom_filter_exports, {
  RedisBloomFilter: () => RedisBloomFilter
});
module.exports = __toCommonJS(redis_bloom_filter_exports);
/* istanbul ignore file -- @preserve */
const _RedisBloomFilter = class _RedisBloomFilter {
  cache;
  constructor(cache) {
    this.cache = cache;
  }
  get store() {
    return this.cache.store.store;
  }
  async reserve(key, errorRate, capacity) {
    try {
      await this.store.client.bf.reserve(key, errorRate, capacity);
    } catch (error) {
      if (error.message.includes("ERR item exists")) {
        return;
      }
      throw error;
    }
  }
  async add(key, value) {
    await this.store.client.bf.add(key, value);
  }
  async mAdd(key, values) {
    await this.store.client.bf.mAdd(key, values);
  }
  async exists(key, value) {
    return this.store.client.bf.exists(key, value);
  }
};
__name(_RedisBloomFilter, "RedisBloomFilter");
let RedisBloomFilter = _RedisBloomFilter;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RedisBloomFilter
});
