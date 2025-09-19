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
var cluster_mode_manager_exports = {};
__export(cluster_mode_manager_exports, {
  ClusterModeManager: () => ClusterModeManager,
  default: () => cluster_mode_manager_default
});
module.exports = __toCommonJS(cluster_mode_manager_exports);
const _ClusterModeManager = class _ClusterModeManager {
  _redisConfig = null;
  constructor() {
  }
  static getInstance() {
    if (!this._instance) {
      this._instance = new _ClusterModeManager();
    }
    return this._instance;
  }
  /**
   * Check if cluster mode is enabled
   */
  static isEnabled() {
    return process.env.CLUSTER_MODE === "max";
  }
  /**
   * Get Redis configuration for cluster mode
   */
  static getRedisConfig() {
    if (!this.isEnabled()) {
      return null;
    }
    const instance = this.getInstance();
    if (!instance._redisConfig) {
      instance._redisConfig = {
        url: process.env.REDIS_URL || "redis://localhost:6379",
        keyPrefix: process.env.REDIS_KEY_PREFIX || "nocobase:",
        ttl: parseInt(process.env.REDIS_TTL || "3600")
      };
    }
    return instance._redisConfig;
  }
  /**
   * Get Redis URL
   */
  static getRedisUrl() {
    const config = this.getRedisConfig();
    return (config == null ? void 0 : config.url) || "redis://localhost:6379";
  }
  /**
   * Get Redis key prefix
   */
  static getRedisKeyPrefix() {
    const config = this.getRedisConfig();
    return (config == null ? void 0 : config.keyPrefix) || "nocobase:";
  }
  /**
   * Get Redis TTL
   */
  static getRedisTTL() {
    const config = this.getRedisConfig();
    return (config == null ? void 0 : config.ttl) || 3600;
  }
  /**
   * Create a namespaced Redis key
   */
  static createKey(namespace, key) {
    const prefix = this.getRedisKeyPrefix();
    return `${prefix}${namespace}:${key}`;
  }
  /**
   * Log cluster mode messages
   */
  static log(message, data) {
    if (this.isEnabled()) {
      console.log(`[CLUSTER] ${message}`, data || "");
    }
  }
  /**
   * Log cluster mode errors
   */
  static error(message, error) {
    if (this.isEnabled()) {
      console.error(`[CLUSTER ERROR] ${message}`, error || "");
    }
  }
  /**
   * Log cluster mode warnings
   */
  static warn(message, data) {
    if (this.isEnabled()) {
      console.warn(`[CLUSTER WARN] ${message}`, data || "");
    }
  }
};
__name(_ClusterModeManager, "ClusterModeManager");
__publicField(_ClusterModeManager, "_instance");
let ClusterModeManager = _ClusterModeManager;
var cluster_mode_manager_default = ClusterModeManager;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ClusterModeManager
});
