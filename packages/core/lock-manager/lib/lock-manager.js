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
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var lock_manager_exports = {};
__export(lock_manager_exports, {
  LockAbortError: () => LockAbortError,
  LockAcquireError: () => LockAcquireError,
  LockManager: () => LockManager,
  default: () => lock_manager_default
});
module.exports = __toCommonJS(lock_manager_exports);
var import_utils = require("@nocobase/utils");
var import_async_mutex = require("async-mutex");
const _LockAbortError = class _LockAbortError extends Error {
  constructor(message, options) {
    super(message, options);
  }
};
__name(_LockAbortError, "LockAbortError");
let LockAbortError = _LockAbortError;
const _LockAcquireError = class _LockAcquireError extends Error {
  constructor(message, options) {
    super(message, options);
  }
};
__name(_LockAcquireError, "LockAcquireError");
let LockAcquireError = _LockAcquireError;
const _LocalLockAdapter = class _LocalLockAdapter {
  async connect() {
  }
  async close() {
  }
  getLock(key) {
    let lock = this.constructor.locks.get(key);
    if (!lock) {
      lock = new import_async_mutex.Mutex();
      this.constructor.locks.set(key, lock);
    }
    return lock;
  }
  async acquire(key, ttl) {
    const lock = this.getLock(key);
    const release = await lock.acquire();
    const timer = setTimeout(() => {
      if (lock.isLocked()) {
        release();
      }
    }, ttl);
    return () => {
      release();
      clearTimeout(timer);
    };
  }
  async runExclusive(key, fn, ttl) {
    const lock = this.getLock(key);
    let timer;
    try {
      timer = setTimeout(() => {
        if (lock.isLocked()) {
          lock.release();
        }
      }, ttl);
      return lock.runExclusive(fn);
    } catch (e) {
      if (e === import_async_mutex.E_CANCELED) {
        throw new LockAbortError("Lock aborted", { cause: import_async_mutex.E_CANCELED });
      } else {
        throw e;
      }
    } finally {
      clearTimeout(timer);
    }
  }
  async tryAcquire(key) {
    const lock = this.getLock(key);
    if (lock.isLocked()) {
      throw new LockAcquireError("lock is locked");
    }
    return {
      acquire: /* @__PURE__ */ __name(async (ttl) => {
        return this.acquire(key, ttl);
      }, "acquire"),
      runExclusive: /* @__PURE__ */ __name(async (fn, ttl) => {
        return this.runExclusive(key, fn, ttl);
      }, "runExclusive")
    };
  }
};
__name(_LocalLockAdapter, "LocalLockAdapter");
__publicField(_LocalLockAdapter, "locks", /* @__PURE__ */ new Map());
let LocalLockAdapter = _LocalLockAdapter;
const _LockManager = class _LockManager {
  constructor(options = {}) {
    this.options = options;
    this.registry.register("local", {
      Adapter: LocalLockAdapter
    });
  }
  registry = new import_utils.Registry();
  adapters = /* @__PURE__ */ new Map();
  registerAdapter(name, adapterConfig) {
    this.registry.register(name, adapterConfig);
  }
  async getAdapter() {
    const type = this.options.defaultAdapter || "local";
    let client = this.adapters.get(type);
    if (!client) {
      const adapter = this.registry.get(type);
      if (!adapter) {
        throw new Error(`Lock adapter "${type}" not registered`);
      }
      const { Adapter, options } = adapter;
      client = new Adapter(options);
      await client.connect();
      this.adapters.set(type, client);
    }
    return client;
  }
  async close() {
    for (const client of this.adapters.values()) {
      await client.close();
    }
  }
  async acquire(key, ttl = 500) {
    const client = await this.getAdapter();
    return client.acquire(key, ttl);
  }
  async runExclusive(key, fn, ttl = 500) {
    const client = await this.getAdapter();
    return client.runExclusive(key, fn, ttl);
  }
  async tryAcquire(key) {
    const client = await this.getAdapter();
    return client.tryAcquire(key);
  }
};
__name(_LockManager, "LockManager");
let LockManager = _LockManager;
var lock_manager_default = LockManager;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LockAbortError,
  LockAcquireError,
  LockManager
});
