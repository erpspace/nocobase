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
var redis_pub_sub_adapter_exports = {};
__export(redis_pub_sub_adapter_exports, {
  RedisPubSubAdapter: () => RedisPubSubAdapter
});
module.exports = __toCommonJS(redis_pub_sub_adapter_exports);
var import_ioredis = require("ioredis");
class RedisPubSubAdapter {
  constructor(redisUrl = "redis://localhost:6379") {
    this.redisUrl = redisUrl;
    this.redis = new import_ioredis.Redis(this.redisUrl, {
      maxRetriesPerRequest: 3,
      lazyConnect: true
    });
    this.subscriber = new import_ioredis.Redis(this.redisUrl, {
      maxRetriesPerRequest: 3,
      lazyConnect: true
    });
    this.setupEventHandlers();
  }
  redis;
  subscriber;
  connected = false;
  setupEventHandlers() {
    this.redis.on("connect", () => {
      console.log("[Multicore] Redis PubSub adapter connected");
      this.connected = true;
    });
    this.redis.on("error", (error) => {
      console.error("[Multicore] Redis PubSub adapter error", error);
      this.connected = false;
    });
    this.subscriber.on("connect", () => {
      console.log("[Multicore] Redis PubSub subscriber connected");
    });
    this.subscriber.on("error", (error) => {
      console.error("[Multicore] Redis PubSub subscriber error", error);
    });
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
      console.log("[Multicore] Redis PubSub adapter connected");
    } catch (error) {
      console.error("[Multicore] Failed to connect Redis PubSub adapter", error);
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
      console.log("[Multicore] Redis PubSub adapter closed");
    } catch (error) {
      console.error("[Multicore] Error closing Redis PubSub adapter", error);
    }
  }
  isConnected() {
    return this.connected && this.redis.status === "ready" && this.subscriber.status === "ready";
  }
  async publish(channel, message) {
    try {
      const messageStr = typeof message === "string" ? message : JSON.stringify(message);
      await this.redis.publish(channel, messageStr);
      console.log(`[Multicore] Published message to channel: ${channel}`);
    } catch (error) {
      console.error(`[Multicore] Error publishing to channel ${channel}:`, error);
      throw error;
    }
  }
  async subscribe(channel, callback) {
    try {
      await this.subscriber.subscribe(channel);
      this.subscriber.on("message", (receivedChannel, message) => {
        if (receivedChannel === channel) {
          try {
            const parsedMessage = JSON.parse(message);
            callback(parsedMessage);
          } catch (error) {
            callback(message);
          }
        }
      });
      console.log(`[Multicore] Subscribed to channel: ${channel}`);
    } catch (error) {
      console.error(`[Multicore] Error subscribing to channel ${channel}:`, error);
      throw error;
    }
  }
  async unsubscribe(channel) {
    try {
      await this.subscriber.unsubscribe(channel);
      console.log(`[Multicore] Unsubscribed from channel: ${channel}`);
    } catch (error) {
      console.error(`[Multicore] Error unsubscribing from channel ${channel}:`, error);
      throw error;
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RedisPubSubAdapter
});
