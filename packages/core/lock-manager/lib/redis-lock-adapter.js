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
var redis_lock_adapter_exports = {};
__export(redis_lock_adapter_exports, {
  RedisLockAdapter: () => RedisLockAdapter,
  default: () => redis_lock_adapter_default
});
module.exports = __toCommonJS(redis_lock_adapter_exports);
var import_ioredis = require("ioredis");
var import_crypto = require("crypto");
var import_lock_manager = require("./lock-manager");
const _RedisLockAdapter = class _RedisLockAdapter {
  redis;
  connected = false;
  constructor(redisUrl = "redis://localhost:6379") {
    this.redis = new import_ioredis.Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      lazyConnect: true
    });
    this.setupEventHandlers();
  }
  setupEventHandlers() {
    this.redis.on("connect", () => {
      console.log("Redis Lock adapter connected");
    });
    this.redis.on("error", (error) => {
      console.error("Redis Lock adapter error", error);
    });
  }
  async connect() {
    if (this.connected) {
      return;
    }
    try {
      await this.redis.connect();
      this.connected = true;
      console.log("Redis Lock adapter connected");
    } catch (error) {
      console.error("Failed to connect Redis Lock adapter", error);
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
      console.log("Redis Lock adapter closed");
    } catch (error) {
      console.error("Error closing Redis Lock adapter", error);
    }
  }
  async acquire(key, ttl) {
    if (!this.connected) {
      throw new Error("Redis Lock adapter not connected");
    }
    const lockKey = `nocobase:lock:${key}`;
    const lockValue = (0, import_crypto.randomUUID)();
    try {
      const result = await this.redis.set(lockKey, lockValue, "PX", ttl, "NX");
      if (!result) {
        throw new import_lock_manager.LockAcquireError(`Failed to acquire lock for key: ${key}`);
      }
      console.log(`Acquired lock for key: ${key}`, { lockValue, ttl });
      return async () => {
        await this.releaseLock(lockKey, lockValue);
      };
    } catch (error) {
      if (error instanceof import_lock_manager.LockAcquireError) {
        throw error;
      }
      console.error(`Error acquiring lock for key: ${key}`, error);
      throw new import_lock_manager.LockAcquireError(`Failed to acquire lock for key: ${key}`);
    }
  }
  async runExclusive(key, fn, ttl) {
    const release = await this.acquire(key, ttl);
    try {
      return await fn();
    } catch (error) {
      throw error;
    } finally {
      await release();
    }
  }
  async tryAcquire(key) {
    if (!this.connected) {
      throw new Error("Redis Lock adapter not connected");
    }
    const lockKey = `nocobase:lock:${key}`;
    try {
      const exists = await this.redis.exists(lockKey);
      if (exists) {
        throw new import_lock_manager.LockAcquireError(`Lock already exists for key: ${key}`);
      }
      return {
        acquire: /* @__PURE__ */ __name((ttl) => this.acquire(key, ttl), "acquire"),
        runExclusive: /* @__PURE__ */ __name((fn, ttl) => this.runExclusive(key, fn, ttl), "runExclusive")
      };
    } catch (error) {
      if (error instanceof import_lock_manager.LockAcquireError) {
        throw error;
      }
      console.error(`Error checking lock for key: ${key}`, error);
      throw new import_lock_manager.LockAcquireError(`Failed to check lock for key: ${key}`);
    }
  }
  async releaseLock(lockKey, lockValue) {
    try {
      const script = `
                if redis.call("get", KEYS[1]) == ARGV[1] then
                    return redis.call("del", KEYS[1])
                else
                    return 0
                end
            `;
      const result = await this.redis.eval(script, 1, lockKey, lockValue);
      if (result === 1) {
        console.log(`Released lock: ${lockKey}`);
      } else {
        console.warn(`Lock was not released (may have expired): ${lockKey}`);
      }
    } catch (error) {
      console.error(`Error releasing lock: ${lockKey}`, error);
      throw error;
    }
  }
  /**
   * Check if a lock exists
   */
  async isLocked(key) {
    if (!this.connected) {
      return false;
    }
    try {
      const lockKey = `nocobase:lock:${key}`;
      const exists = await this.redis.exists(lockKey);
      return exists === 1;
    } catch (error) {
      console.error(`Error checking if lock exists for key: ${key}`, error);
      return false;
    }
  }
  /**
   * Get lock TTL
   */
  async getLockTTL(key) {
    if (!this.connected) {
      return -1;
    }
    try {
      const lockKey = `nocobase:lock:${key}`;
      const ttl = await this.redis.pttl(lockKey);
      return ttl;
    } catch (error) {
      console.error(`Error getting lock TTL for key: ${key}`, error);
      return -1;
    }
  }
  /**
   * Extend lock TTL
   */
  async extendLock(key, additionalTtl) {
    if (!this.connected) {
      return false;
    }
    try {
      const lockKey = `nocobase:lock:${key}`;
      const currentTtl = await this.redis.pttl(lockKey);
      if (currentTtl === -2) {
        return false;
      }
      if (currentTtl === -1) {
        return false;
      }
      const newTtl = currentTtl + additionalTtl;
      const result = await this.redis.pexpire(lockKey, newTtl);
      if (result) {
        console.log(`Extended lock TTL for key: ${key}`, { newTtl });
      }
      return result === 1;
    } catch (error) {
      console.error(`Error extending lock TTL for key: ${key}`, error);
      return false;
    }
  }
};
__name(_RedisLockAdapter, "RedisLockAdapter");
let RedisLockAdapter = _RedisLockAdapter;
var redis_lock_adapter_default = RedisLockAdapter;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RedisLockAdapter
});
