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
var redis_event_queue_adapter_exports = {};
__export(redis_event_queue_adapter_exports, {
  RedisEventQueueAdapter: () => RedisEventQueueAdapter,
  default: () => redis_event_queue_adapter_default
});
module.exports = __toCommonJS(redis_event_queue_adapter_exports);
var import_ioredis = require("ioredis");
var import_crypto = require("crypto");
var import_cluster_mode_manager = require("./cluster-mode-manager");
const _RedisEventQueueAdapter = class _RedisEventQueueAdapter {
  redis;
  connected = false;
  events = /* @__PURE__ */ new Map();
  processing = /* @__PURE__ */ new Map();
  isProcessing = false;
  constructor() {
    this.redis = new import_ioredis.Redis(import_cluster_mode_manager.ClusterModeManager.getRedisUrl(), {
      maxRetriesPerRequest: 3,
      lazyConnect: true
    });
    this.setupEventHandlers();
  }
  setupEventHandlers() {
    this.redis.on("connect", () => {
      import_cluster_mode_manager.ClusterModeManager.log("Redis EventQueue adapter connected");
    });
    this.redis.on("error", (error) => {
      import_cluster_mode_manager.ClusterModeManager.error("Redis EventQueue adapter error", error);
    });
  }
  async connect() {
    if (this.connected) {
      return;
    }
    try {
      await this.redis.connect();
      this.connected = true;
      this.startProcessing();
      import_cluster_mode_manager.ClusterModeManager.log("Redis EventQueue adapter connected");
    } catch (error) {
      import_cluster_mode_manager.ClusterModeManager.error("Failed to connect Redis EventQueue adapter", error);
      throw error;
    }
  }
  async close() {
    if (!this.connected) {
      return;
    }
    try {
      this.isProcessing = false;
      await this.redis.quit();
      this.connected = false;
      this.events.clear();
      this.processing.clear();
      import_cluster_mode_manager.ClusterModeManager.log("Redis EventQueue adapter closed");
    } catch (error) {
      import_cluster_mode_manager.ClusterModeManager.error("Error closing Redis EventQueue adapter", error);
    }
  }
  isConnected() {
    return this.connected && this.redis.status === "ready";
  }
  subscribe(channel, event) {
    if (!this.connected) {
      throw new Error("Redis EventQueue adapter not connected");
    }
    this.events.set(channel, event);
    import_cluster_mode_manager.ClusterModeManager.log(`Subscribed to Redis event queue channel: ${channel}`);
  }
  unsubscribe(channel) {
    if (!this.connected) {
      return;
    }
    this.events.delete(channel);
    import_cluster_mode_manager.ClusterModeManager.log(`Unsubscribed from Redis event queue channel: ${channel}`);
  }
  async publish(channel, content, options = {}) {
    if (!this.connected) {
      throw new Error("Redis EventQueue adapter not connected");
    }
    const event = this.events.get(channel);
    if (!event) {
      import_cluster_mode_manager.ClusterModeManager.warn(`No event handler found for channel: ${channel}`);
      return;
    }
    try {
      const queueKey = import_cluster_mode_manager.ClusterModeManager.createKey("queue", channel);
      const messageData = {
        id: (0, import_crypto.randomUUID)(),
        content,
        options: {
          timestamp: Date.now(),
          ...options
        }
      };
      await this.redis.lpush(queueKey, JSON.stringify(messageData));
      import_cluster_mode_manager.ClusterModeManager.log(`Published message to Redis queue: ${channel}`, { messageId: messageData.id });
    } catch (error) {
      import_cluster_mode_manager.ClusterModeManager.error(`Failed to publish to queue ${channel}`, error);
      throw error;
    }
  }
  startProcessing() {
    if (this.isProcessing) {
      return;
    }
    this.isProcessing = true;
    this.processQueues();
  }
  async processQueues() {
    while (this.isProcessing && this.connected) {
      try {
        for (const [channel, event] of this.events.entries()) {
          if (event.idle()) {
            await this.processChannel(channel, event);
          }
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
      } catch (error) {
        import_cluster_mode_manager.ClusterModeManager.error("Error processing Redis event queues", error);
        await new Promise((resolve) => setTimeout(resolve, 1e3));
      }
    }
  }
  async processChannel(channel, event) {
    const queueKey = import_cluster_mode_manager.ClusterModeManager.createKey("queue", channel);
    const concurrency = event.concurrency || 1;
    const currentProcessing = this.processing.get(channel) || [];
    if (currentProcessing.length >= concurrency) {
      return;
    }
    try {
      const messages = await this.getMessagesFromQueue(queueKey, concurrency - currentProcessing.length);
      for (const message of messages) {
        const processingPromise = this.processMessage(channel, event, message);
        currentProcessing.push(processingPromise);
        processingPromise.finally(() => {
          const index = currentProcessing.indexOf(processingPromise);
          if (index > -1) {
            currentProcessing.splice(index, 1);
          }
        });
      }
      this.processing.set(channel, currentProcessing);
    } catch (error) {
      import_cluster_mode_manager.ClusterModeManager.error(`Error processing channel ${channel}`, error);
    }
  }
  async getMessagesFromQueue(queueKey, count) {
    const messages = [];
    for (let i = 0; i < count; i++) {
      const result = await this.redis.rpop(queueKey);
      if (!result) {
        break;
      }
      try {
        messages.push(JSON.parse(result));
      } catch (error) {
        import_cluster_mode_manager.ClusterModeManager.error(`Error parsing message from queue ${queueKey}`, error);
      }
    }
    return messages;
  }
  async processMessage(channel, event, message) {
    const { id, content, options } = message;
    const { timeout = 15e3, maxRetries = 0, retried = 0 } = options || {};
    try {
      import_cluster_mode_manager.ClusterModeManager.log(`Processing message ${id} from channel ${channel}`);
      await event.process(content, {
        id,
        retried,
        signal: AbortSignal.timeout(timeout)
      });
      import_cluster_mode_manager.ClusterModeManager.log(`Successfully processed message ${id} from channel ${channel}`);
    } catch (error) {
      import_cluster_mode_manager.ClusterModeManager.error(`Error processing message ${id} from channel ${channel}`, error);
      if (maxRetries > 0 && retried < maxRetries) {
        const retryMessage = {
          ...message,
          options: {
            ...options,
            retried: retried + 1
          }
        };
        setTimeout(async () => {
          try {
            const queueKey = import_cluster_mode_manager.ClusterModeManager.createKey("queue", channel);
            await this.redis.lpush(queueKey, JSON.stringify(retryMessage));
            import_cluster_mode_manager.ClusterModeManager.log(`Retrying message ${id} (attempt ${retried + 1}/${maxRetries})`);
          } catch (retryError) {
            import_cluster_mode_manager.ClusterModeManager.error(`Failed to retry message ${id}`, retryError);
          }
        }, 500);
      }
    }
  }
  /**
   * Get processing status for a channel
   */
  getProcessingStatus(channel) {
    var _a;
    const processing = ((_a = this.processing.get(channel)) == null ? void 0 : _a.length) || 0;
    return { processing, queued: 0 };
  }
  /**
   * Get all subscribed channels
   */
  getSubscribedChannels() {
    return Array.from(this.events.keys());
  }
};
__name(_RedisEventQueueAdapter, "RedisEventQueueAdapter");
let RedisEventQueueAdapter = _RedisEventQueueAdapter;
var redis_event_queue_adapter_default = RedisEventQueueAdapter;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RedisEventQueueAdapter
});
