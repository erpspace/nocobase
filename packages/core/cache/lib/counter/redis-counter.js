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
var redis_counter_exports = {};
__export(redis_counter_exports, {
  RedisCounter: () => RedisCounter
});
module.exports = __toCommonJS(redis_counter_exports);
const script = `
local key = KEYS[1]
local value = tonumber(ARGV[1]) or 1
local ttl = tonumber(ARGV[2])
local current = redis.call('INCRBY', key, value)
if tonumber(current) == value and ttl then
  redis.call('PEXPIRE', key, ttl)
end
return current
`;
const _RedisCounter = class _RedisCounter {
  cache;
  scriptSha;
  constructor(cache) {
    this.cache = cache;
  }
  get store() {
    return this.cache.store.store;
  }
  async get(key) {
    return await this.cache.get(key) || 0;
  }
  async incr(key, ttl) {
    return this.incrby(key, 1, ttl);
  }
  async incrby(key, value, ttl) {
    if (!this.scriptSha) {
      this.scriptSha = await this.store.client.scriptLoad(script);
    }
    const result = await this.store.client.evalSha(this.scriptSha, {
      keys: [this.cache.key(key)],
      arguments: [value, ttl].map((v) => v ? v.toString() : "")
    });
    return Number(result);
  }
  async reset(key) {
    return this.cache.del(key);
  }
};
__name(_RedisCounter, "RedisCounter");
let RedisCounter = _RedisCounter;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RedisCounter
});
