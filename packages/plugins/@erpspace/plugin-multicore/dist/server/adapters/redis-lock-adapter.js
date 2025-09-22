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
var redis_lock_adapter_exports = {};
__export(redis_lock_adapter_exports, {
  LockAbortError: () => LockAbortError,
  LockAcquireError: () => LockAcquireError,
  RedisLockAdapter: () => RedisLockAdapter
});
module.exports = __toCommonJS(redis_lock_adapter_exports);
var import_ioredis = require("ioredis");
var import_crypto = require("crypto");
class LockAcquireError extends Error {
  constructor(message) {
    super(message);
    this.name = "LockAcquireError";
  }
}
class LockAbortError extends Error {
  constructor(message) {
    super(message);
    this.name = "LockAbortError";
  }
}
class RedisLockAdapter {
  constructor(redisUrl = "redis://localhost:6379") {
    this.redisUrl = redisUrl;
    this.redis = new import_ioredis.Redis(this.redisUrl, {
      maxRetriesPerRequest: 3,
      lazyConnect: true
    });
    this.setupEventHandlers();
  }
  redis;
  connected = false;
  setupEventHandlers() {
    this.redis.on("connect", () => {
      console.log("[Multicore] Redis Lock adapter connected");
    });
    this.redis.on("error", (error) => {
      console.error("[Multicore] Redis Lock adapter error", error);
    });
  }
  async connect() {
    if (this.connected) {
      return;
    }
    try {
      await this.redis.connect();
      this.connected = true;
      console.log("[Multicore] Redis Lock adapter connected");
    } catch (error) {
      console.error("[Multicore] Failed to connect Redis Lock adapter", error);
      throw error;
    }
  }
  async close() {
    if (!this.connected) {
      return;
    }
    try {
      await this.redis.quit();
      this.connected = false;
      console.log("[Multicore] Redis Lock adapter closed");
    } catch (error) {
      console.error("[Multicore] Error closing Redis Lock adapter", error);
    }
  }
  async acquire(key, ttl = 5e3) {
    const lockValue = (0, import_crypto.randomUUID)();
    const lockKey = `nocobase:lock:${key}`;
    const startTime = Date.now();
    while (Date.now() - startTime < ttl) {
      try {
        const result = await this.redis.set(lockKey, lockValue, "PX", ttl, "NX");
        if (result === "OK") {
          console.log(`[Multicore] Acquired lock for key: ${key}`, { lockValue, ttl });
          return lockValue;
        }
      } catch (error) {
        console.error(`[Multicore] Error acquiring lock for key: ${key}`, error);
        throw new LockAcquireError(`Failed to acquire lock for key: ${key}`);
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    throw new LockAcquireError(`Failed to acquire lock for key: ${key} within ${ttl}ms`);
  }
  async release(key, lockValue) {
    const lockKey = `nocobase:lock:${key}`;
    const script = `
      if redis.call("get",KEYS[1]) == ARGV[1] then
        return redis.call("del",KEYS[1])
      else
        return 0
      end
    `;
    try {
      const result = await this.redis.eval(script, 1, lockKey, lockValue);
      if (result === 1) {
        console.log(`[Multicore] Released lock: ${lockKey}`);
      } else {
        console.warn(`[Multicore] Lock was not released (may have expired): ${lockKey}`);
      }
    } catch (error) {
      console.error(`[Multicore] Error releasing lock: ${lockKey}`, error);
      throw error;
    }
  }
  async exists(key) {
    const lockKey = `nocobase:lock:${key}`;
    try {
      const result = await this.redis.exists(lockKey);
      return result === 1;
    } catch (error) {
      console.error(`[Multicore] Error checking if lock exists for key: ${key}`, error);
      throw error;
    }
  }
  async getTtl(key) {
    const lockKey = `nocobase:lock:${key}`;
    try {
      const ttl = await this.redis.pttl(lockKey);
      return ttl > 0 ? ttl : 0;
    } catch (error) {
      console.error(`[Multicore] Error getting lock TTL for key: ${key}`, error);
      throw error;
    }
  }
  async extend(key, lockValue, newTtl) {
    const lockKey = `nocobase:lock:${key}`;
    const script = `
      if redis.call("get",KEYS[1]) == ARGV[1] then
        return redis.call("pexpire",KEYS[1],ARGV[2])
      else
        return 0
      end
    `;
    try {
      const result = await this.redis.eval(script, 1, lockKey, lockValue, newTtl);
      if (result) {
        console.log(`[Multicore] Extended lock TTL for key: ${key}`, { newTtl });
        return true;
      }
      return false;
    } catch (error) {
      console.error(`[Multicore] Error extending lock TTL for key: ${key}`, error);
      throw error;
    }
  }
  async runExclusive(key, fn, ttl) {
    const lockValue = await this.acquire(key, ttl);
    try {
      return await fn();
    } finally {
      await this.release(key, lockValue);
    }
  }
  async tryAcquire(key, timeout = 1e3) {
    const lockValue = (0, import_crypto.randomUUID)();
    const lockKey = `nocobase:lock:${key}`;
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
      try {
        const result = await this.redis.set(lockKey, lockValue, "PX", timeout, "NX");
        if (result === "OK") {
          console.log(`[Multicore] Acquired lock for key: ${key}`, { lockValue, timeout });
          return {
            acquire: async (ttl) => {
              return async () => {
                await this.release(key, lockValue);
              };
            },
            runExclusive: async (fn, ttl) => {
              try {
                return await fn();
              } finally {
                await this.release(key, lockValue);
              }
            }
          };
        }
      } catch (error) {
        console.error(`[Multicore] Error acquiring lock for key: ${key}`, error);
        throw new LockAcquireError(`Failed to acquire lock for key: ${key}`);
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    throw new LockAcquireError(`Failed to acquire lock for key: ${key} within ${timeout}ms`);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LockAbortError,
  LockAcquireError,
  RedisLockAdapter
});
