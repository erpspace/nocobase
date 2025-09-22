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
var redis_websocket_manager_exports = {};
__export(redis_websocket_manager_exports, {
  RedisWebSocketManager: () => RedisWebSocketManager
});
module.exports = __toCommonJS(redis_websocket_manager_exports);
var import_ioredis = require("ioredis");
class RedisWebSocketManager {
  constructor(instanceId, redisUrl = "redis://localhost:6379") {
    this.instanceId = instanceId;
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
  clients = /* @__PURE__ */ new Map();
  setupEventHandlers() {
    this.redis.on("connect", () => {
      console.log("[Multicore] Redis WebSocket manager connected");
      this.connected = true;
    });
    this.redis.on("error", (error) => {
      console.error("[Multicore] Redis WebSocket manager error", error);
      this.connected = false;
    });
    this.subscriber.on("connect", () => {
      console.log("[Multicore] Redis WebSocket subscriber connected");
    });
    this.subscriber.on("error", (error) => {
      console.error("[Multicore] Redis WebSocket subscriber error", error);
    });
    this.subscriber.on("message", (channel, message) => {
      if (channel.startsWith("nocobase:websocket:")) {
        this.handleWebSocketMessage(channel, message);
      }
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
      await this.subscriber.subscribe(`nocobase:websocket:${this.instanceId}`);
      await this.subscriber.subscribe("nocobase:websocket:broadcast");
      this.connected = true;
      console.log("[Multicore] Redis WebSocket manager connected");
    } catch (error) {
      console.error("[Multicore] Failed to connect Redis WebSocket manager", error);
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
      console.log("[Multicore] Redis WebSocket manager closed");
    } catch (error) {
      console.error("[Multicore] Error closing Redis WebSocket manager", error);
    }
  }
  isConnected() {
    return this.connected && this.redis.status === "ready" && this.subscriber.status === "ready";
  }
  async addClient(clientId, clientInfo) {
    try {
      const clientData = {
        ...clientInfo,
        instanceId: this.instanceId,
        connectedAt: Date.now()
      };
      await this.redis.hset(
        `nocobase:websocket:clients:${this.instanceId}`,
        clientId,
        JSON.stringify(clientData)
      );
      this.clients.set(clientId, clientData);
      console.log(`[Multicore] Added WebSocket client: ${clientId}`);
    } catch (error) {
      console.error(`[Multicore] Error adding WebSocket client ${clientId}:`, error);
      throw error;
    }
  }
  async removeClient(clientId) {
    try {
      await this.redis.hdel(
        `nocobase:websocket:clients:${this.instanceId}`,
        clientId
      );
      this.clients.delete(clientId);
      console.log(`[Multicore] Removed WebSocket client: ${clientId}`);
    } catch (error) {
      console.error(`[Multicore] Error removing WebSocket client ${clientId}:`, error);
      throw error;
    }
  }
  async broadcast(type, data, targetInstance) {
    try {
      const message = {
        type,
        data,
        from: this.instanceId,
        timestamp: Date.now()
      };
      if (targetInstance) {
        await this.redis.publish(
          `nocobase:websocket:${targetInstance}`,
          JSON.stringify(message)
        );
        console.log(`[Multicore] Broadcasted message to instance ${targetInstance}: ${type}`);
      } else {
        await this.redis.publish(
          "nocobase:websocket:broadcast",
          JSON.stringify(message)
        );
        console.log(`[Multicore] Broadcasted message to all instances: ${type}`);
      }
    } catch (error) {
      console.error(`[Multicore] Error broadcasting message:`, error);
      throw error;
    }
  }
  async getClients() {
    try {
      const clients = await this.redis.hgetall(`nocobase:websocket:clients:${this.instanceId}`);
      const clientMap = /* @__PURE__ */ new Map();
      for (const [clientId, clientData] of Object.entries(clients)) {
        clientMap.set(clientId, JSON.parse(clientData));
      }
      return clientMap;
    } catch (error) {
      console.error("[Multicore] Error getting WebSocket clients:", error);
      return /* @__PURE__ */ new Map();
    }
  }
  async getAllInstances() {
    try {
      const keys = await this.redis.keys("nocobase:websocket:clients:*");
      const instances = keys.map((key) => key.replace("nocobase:websocket:clients:", ""));
      return instances;
    } catch (error) {
      console.error("[Multicore] Error getting all instances:", error);
      return [];
    }
  }
  handleWebSocketMessage(channel, message) {
    try {
      const parsedMessage = JSON.parse(message);
      console.log(`[Multicore] Received WebSocket message on ${channel}:`, parsedMessage.type);
    } catch (error) {
      console.error("[Multicore] Error handling WebSocket message:", error);
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RedisWebSocketManager
});
