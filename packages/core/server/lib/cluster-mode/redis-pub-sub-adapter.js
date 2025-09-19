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
var redis_pub_sub_adapter_exports = {};
__export(redis_pub_sub_adapter_exports, {
  RedisPubSubAdapter: () => RedisPubSubAdapter,
  default: () => redis_pub_sub_adapter_default
});
module.exports = __toCommonJS(redis_pub_sub_adapter_exports);
var import_ioredis = require("ioredis");
var import_events = require("events");
var import_cluster_mode_manager = require("./cluster-mode-manager");
const _RedisPubSubAdapter = class _RedisPubSubAdapter {
  redis;
  subscriber;
  connected = false;
  subscriptions = /* @__PURE__ */ new Map();
  eventEmitter = new import_events.EventEmitter();
  constructor() {
    this.redis = new import_ioredis.Redis(import_cluster_mode_manager.ClusterModeManager.getRedisUrl(), {
      maxRetriesPerRequest: 3,
      lazyConnect: true
    });
    this.subscriber = new import_ioredis.Redis(import_cluster_mode_manager.ClusterModeManager.getRedisUrl(), {
      maxRetriesPerRequest: 3,
      lazyConnect: true
    });
    this.setupEventHandlers();
  }
  setupEventHandlers() {
    this.redis.on("connect", () => {
      import_cluster_mode_manager.ClusterModeManager.log("Redis PubSub publisher connected");
    });
    this.redis.on("error", (error) => {
      import_cluster_mode_manager.ClusterModeManager.error("Redis PubSub publisher error", error);
    });
    this.subscriber.on("connect", () => {
      import_cluster_mode_manager.ClusterModeManager.log("Redis PubSub subscriber connected");
    });
    this.subscriber.on("error", (error) => {
      import_cluster_mode_manager.ClusterModeManager.error("Redis PubSub subscriber error", error);
    });
    this.subscriber.on("message", (channel, message) => {
      this.handleMessage(channel, message);
    });
  }
  handleMessage(channel, message) {
    try {
      const callbacks = this.subscriptions.get(channel);
      if (callbacks) {
        const parsedMessage = JSON.parse(message);
        callbacks.forEach((callback) => {
          callback(parsedMessage).catch((error) => {
            import_cluster_mode_manager.ClusterModeManager.error(`Error in PubSub callback for channel ${channel}`, error);
          });
        });
      }
    } catch (error) {
      import_cluster_mode_manager.ClusterModeManager.error(`Error parsing PubSub message for channel ${channel}`, error);
    }
  }
  async connect() {
    if (this.connected) {
      return;
    }
    try {
      await Promise.all([
        this.redis.connect(),
        this.subscriber.connect()
      ]);
      this.connected = true;
      import_cluster_mode_manager.ClusterModeManager.log("Redis PubSub adapter connected");
    } catch (error) {
      import_cluster_mode_manager.ClusterModeManager.error("Failed to connect Redis PubSub adapter", error);
      throw error;
    }
  }
  async close() {
    if (!this.connected) {
      return;
    }
    try {
      await Promise.all([
        this.redis.quit(),
        this.subscriber.quit()
      ]);
      this.connected = false;
      this.subscriptions.clear();
      import_cluster_mode_manager.ClusterModeManager.log("Redis PubSub adapter closed");
    } catch (error) {
      import_cluster_mode_manager.ClusterModeManager.error("Error closing Redis PubSub adapter", error);
    }
  }
  async isConnected() {
    return this.connected && this.redis.status === "ready" && this.subscriber.status === "ready";
  }
  async subscribe(channel, callback) {
    if (!this.connected) {
      throw new Error("Redis PubSub adapter not connected");
    }
    try {
      if (!this.subscriptions.has(channel)) {
        this.subscriptions.set(channel, /* @__PURE__ */ new Set());
      }
      this.subscriptions.get(channel).add(callback);
      if (this.subscriptions.get(channel).size === 1) {
        await this.subscriber.subscribe(channel);
        import_cluster_mode_manager.ClusterModeManager.log(`Subscribed to Redis channel: ${channel}`);
      }
    } catch (error) {
      import_cluster_mode_manager.ClusterModeManager.error(`Failed to subscribe to channel ${channel}`, error);
      throw error;
    }
  }
  async unsubscribe(channel, callback) {
    if (!this.connected) {
      return;
    }
    try {
      const callbacks = this.subscriptions.get(channel);
      if (callbacks) {
        callbacks.delete(callback);
        if (callbacks.size === 0) {
          await this.subscriber.unsubscribe(channel);
          this.subscriptions.delete(channel);
          import_cluster_mode_manager.ClusterModeManager.log(`Unsubscribed from Redis channel: ${channel}`);
        }
      }
    } catch (error) {
      import_cluster_mode_manager.ClusterModeManager.error(`Failed to unsubscribe from channel ${channel}`, error);
      throw error;
    }
  }
  async publish(channel, message) {
    if (!this.connected) {
      throw new Error("Redis PubSub adapter not connected");
    }
    try {
      await this.redis.publish(channel, message);
      import_cluster_mode_manager.ClusterModeManager.log(`Published message to Redis channel: ${channel}`);
    } catch (error) {
      import_cluster_mode_manager.ClusterModeManager.error(`Failed to publish to channel ${channel}`, error);
      throw error;
    }
  }
  /**
   * Get subscription count for a channel
   */
  getSubscriptionCount(channel) {
    var _a;
    return ((_a = this.subscriptions.get(channel)) == null ? void 0 : _a.size) || 0;
  }
  /**
   * Get all subscribed channels
   */
  getSubscribedChannels() {
    return Array.from(this.subscriptions.keys());
  }
};
__name(_RedisPubSubAdapter, "RedisPubSubAdapter");
let RedisPubSubAdapter = _RedisPubSubAdapter;
var redis_pub_sub_adapter_default = RedisPubSubAdapter;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RedisPubSubAdapter
});
