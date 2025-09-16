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
var memory_counter_exports = {};
__export(memory_counter_exports, {
  MemoryCounter: () => MemoryCounter
});
module.exports = __toCommonJS(memory_counter_exports);
const _Cache = class _Cache {
  data = /* @__PURE__ */ new Map();
  timers = /* @__PURE__ */ new Map();
  set(k, v, ttl) {
    if (ttl) {
      if (this.timers.has(k)) {
        clearTimeout(this.timers.get(k));
      }
      this.timers.set(
        k,
        setTimeout(() => this.del(k), ttl)
      );
    }
    this.data.set(k, v);
  }
  get(k) {
    return this.data.get(k);
  }
  del(k) {
    if (this.timers.has(k)) {
      clearTimeout(this.timers.get(k));
    }
    this.timers.delete(k);
    return this.data.delete(k);
  }
};
__name(_Cache, "Cache");
let Cache = _Cache;
const _MemoryCounter = class _MemoryCounter {
  cache = new Cache();
  async get(key) {
    return this.cache.get(key) || 0;
  }
  async incr(key, ttl) {
    return this.incrby(key, 1, ttl);
  }
  async incrby(key, value, ttl) {
    const v = this.cache.get(key);
    const n = v || 0;
    const newValue = n + value;
    if (!v) {
      this.cache.set(key, newValue, ttl);
    } else {
      this.cache.set(key, newValue);
    }
    return newValue;
  }
  async reset(key) {
    this.cache.del(key);
  }
};
__name(_MemoryCounter, "MemoryCounter");
let MemoryCounter = _MemoryCounter;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MemoryCounter
});
