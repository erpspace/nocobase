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
var lock_counter_exports = {};
__export(lock_counter_exports, {
  LockCounter: () => LockCounter
});
module.exports = __toCommonJS(lock_counter_exports);
const _LockCounter = class _LockCounter {
  cache;
  lockManager;
  constructor(cache, lockManager) {
    this.cache = cache;
    this.lockManager = lockManager;
  }
  async get(key) {
    return await this.cache.get(key) || 0;
  }
  async incr(key, ttl) {
    return this.incrby(key, 1, ttl);
  }
  async incrby(key, value, ttl) {
    const lockKey = `lock:${key}`;
    const release = await this.lockManager.acquire(lockKey, 3e3);
    try {
      const v = await this.cache.get(key);
      const n = v || 0;
      const newValue = n + value;
      await this.cache.set(key, newValue, ttl);
      return newValue;
    } catch (error) {
      throw error;
    } finally {
      await release();
    }
  }
  async reset(key) {
    return this.cache.del(key);
  }
};
__name(_LockCounter, "LockCounter");
let LockCounter = _LockCounter;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LockCounter
});
