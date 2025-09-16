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
var memory_bloom_filter_exports = {};
__export(memory_bloom_filter_exports, {
  MemoryBloomFilter: () => MemoryBloomFilter
});
module.exports = __toCommonJS(memory_bloom_filter_exports);
var import_bloom_filters = require("bloom-filters");
const _MemoryBloomFilter = class _MemoryBloomFilter {
  cache;
  constructor(cache) {
    this.cache = cache;
  }
  async reserve(key, errorRate, capacity) {
    const filter = import_bloom_filters.BloomFilter.create(capacity, errorRate);
    await this.cache.set(key, filter);
  }
  async add(key, value) {
    const filter = await this.cache.get(key);
    if (!filter) {
      return;
    }
    filter.add(value);
  }
  async mAdd(key, values) {
    const filter = await this.cache.get(key);
    if (!filter) {
      return;
    }
    values.forEach((value) => filter.add(value));
  }
  async exists(key, value) {
    const filter = await this.cache.get(key);
    if (!filter) {
      return false;
    }
    return filter.has(value);
  }
};
__name(_MemoryBloomFilter, "MemoryBloomFilter");
let MemoryBloomFilter = _MemoryBloomFilter;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MemoryBloomFilter
});
