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
var redis_event_queue_adapter_exports = {};
__export(redis_event_queue_adapter_exports, {
  RedisEventQueueAdapter: () => RedisEventQueueAdapter
});
module.exports = __toCommonJS(redis_event_queue_adapter_exports);
var import_ioredis = require("ioredis");
class RedisEventQueueAdapter {
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
      console.log("[Multicore] Redis EventQueue adapter connected");
      this.connected = true;
    });
    this.redis.on("error", (error) => {
      console.error("[Multicore] Redis EventQueue adapter error", error);
      this.connected = false;
    });
  }
  async connect() {
    if (this.connected) {
      return;
    }
    try {
      await this.redis.connect();
      this.connected = true;
      console.log("[Multicore] Redis EventQueue adapter connected");
    } catch (error) {
      console.error("[Multicore] Failed to connect Redis EventQueue adapter", error);
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
      console.log("[Multicore] Redis EventQueue adapter closed");
    } catch (error) {
      console.error("[Multicore] Error closing Redis EventQueue adapter", error);
    }
  }
  isConnected() {
    return this.connected && this.redis.status === "ready";
  }
  async push(channel, event) {
    try {
      const eventStr = typeof event === "string" ? event : JSON.stringify(event);
      await this.redis.lpush(`nocobase:queue:${channel}`, eventStr);
      console.log(`[Multicore] Pushed event to queue: ${channel}`);
    } catch (error) {
      console.error(`[Multicore] Error pushing event to queue ${channel}:`, error);
      throw error;
    }
  }
  async pop(channel, timeout = 0) {
    try {
      const result = await this.redis.brpop(`nocobase:queue:${channel}`, timeout);
      if (result && result[1]) {
        const message = JSON.parse(result[1]);
        console.log(`[Multicore] Popped message from queue: ${channel}`);
        return message;
      }
      return null;
    } catch (error) {
      console.error(`[Multicore] Error popping from queue ${channel}:`, error);
      throw error;
    }
  }
  async length(channel) {
    try {
      const len = await this.redis.llen(`nocobase:queue:${channel}`);
      return len;
    } catch (error) {
      console.error(`[Multicore] Error getting queue length for ${channel}:`, error);
      throw error;
    }
  }
  async clear(channel) {
    try {
      await this.redis.del(`nocobase:queue:${channel}`);
      console.log(`[Multicore] Cleared queue: ${channel}`);
    } catch (error) {
      console.error(`[Multicore] Error clearing queue ${channel}:`, error);
      throw error;
    }
  }
  subscribe(channel, event) {
    console.log(`[Multicore] Subscribed to queue: ${channel}`);
  }
  unsubscribe(channel) {
    console.log(`[Multicore] Unsubscribed from queue: ${channel}`);
  }
  async publish(channel, message, options = {}) {
    try {
      const messageWithOptions = {
        id: `msg_${Date.now()}_${Math.random()}`,
        // Generate a unique ID if not provided
        content: message,
        options: {
          retried: options.retried || 0,
          timestamp: options.timestamp || Date.now()
        }
      };
      const messageStr = JSON.stringify(messageWithOptions);
      await this.redis.lpush(`nocobase:queue:${channel}`, messageStr);
      console.log(`[Multicore] Published message to queue: ${channel}`);
    } catch (error) {
      console.error(`[Multicore] Error publishing to queue ${channel}:`, error);
      throw error;
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RedisEventQueueAdapter
});
