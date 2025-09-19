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
var redis_websocket_manager_exports = {};
__export(redis_websocket_manager_exports, {
  RedisWebSocketManager: () => RedisWebSocketManager,
  default: () => redis_websocket_manager_default
});
module.exports = __toCommonJS(redis_websocket_manager_exports);
var import_ioredis = require("ioredis");
var import_events = require("events");
var import_cluster_mode_manager = require("./cluster-mode-manager");
const _RedisWebSocketManager = class _RedisWebSocketManager extends import_events.EventEmitter {
  redis;
  subscriber;
  connected = false;
  instanceId;
  clients = /* @__PURE__ */ new Map();
  constructor(instanceId) {
    super();
    this.instanceId = instanceId;
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
      import_cluster_mode_manager.ClusterModeManager.log("Redis WebSocket manager publisher connected");
    });
    this.redis.on("error", (error) => {
      import_cluster_mode_manager.ClusterModeManager.error("Redis WebSocket manager publisher error", error);
    });
    this.subscriber.on("connect", () => {
      import_cluster_mode_manager.ClusterModeManager.log("Redis WebSocket manager subscriber connected");
    });
    this.subscriber.on("error", (error) => {
      import_cluster_mode_manager.ClusterModeManager.error("Redis WebSocket manager subscriber error", error);
    });
    this.subscriber.on("message", (channel, message) => {
      this.handleMessage(channel, message);
    });
  }
  handleMessage(channel, message) {
    try {
      const data = JSON.parse(message);
      if (data.instanceId === this.instanceId) {
        return;
      }
      switch (channel) {
        case "ws:client:connected":
          this.handleClientConnected(data);
          break;
        case "ws:client:disconnected":
          this.handleClientDisconnected(data);
          break;
        case "ws:message":
          this.handleWebSocketMessage(data);
          break;
        case "ws:broadcast":
          this.handleBroadcastMessage(data);
          break;
      }
    } catch (error) {
      import_cluster_mode_manager.ClusterModeManager.error(`Error handling WebSocket message from channel ${channel}`, error);
    }
  }
  handleClientConnected(data) {
    const { app, clientId, clientData } = data;
    import_cluster_mode_manager.ClusterModeManager.log(`Client connected on another instance: ${clientId}`, { app });
    this.emit("clientConnected", { app, clientId, clientData });
  }
  handleClientDisconnected(data) {
    const { app, clientId } = data;
    import_cluster_mode_manager.ClusterModeManager.log(`Client disconnected on another instance: ${clientId}`, { app });
    this.emit("clientDisconnected", { app, clientId });
  }
  handleWebSocketMessage(data) {
    const { app, message, targetClientId, targetTags } = data;
    import_cluster_mode_manager.ClusterModeManager.log(`WebSocket message from another instance`, { app, targetClientId });
    this.emit("websocketMessage", { app, message, targetClientId, targetTags });
  }
  handleBroadcastMessage(data) {
    const { app, message, targetTags } = data;
    import_cluster_mode_manager.ClusterModeManager.log(`Broadcast message from another instance`, { app });
    this.emit("broadcastMessage", { app, message, targetTags });
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
      await Promise.all([
        this.subscriber.subscribe("ws:client:connected"),
        this.subscriber.subscribe("ws:client:disconnected"),
        this.subscriber.subscribe("ws:message"),
        this.subscriber.subscribe("ws:broadcast")
      ]);
      this.connected = true;
      import_cluster_mode_manager.ClusterModeManager.log("Redis WebSocket manager connected");
    } catch (error) {
      import_cluster_mode_manager.ClusterModeManager.error("Failed to connect Redis WebSocket manager", error);
      throw error;
    }
  }
  async close() {
    if (!this.connected) {
      return;
    }
    try {
      await Promise.all([
        this.subscriber.unsubscribe("ws:client:connected"),
        this.subscriber.unsubscribe("ws:client:disconnected"),
        this.subscriber.unsubscribe("ws:message"),
        this.subscriber.unsubscribe("ws:broadcast")
      ]);
      await Promise.all([
        this.redis.quit(),
        this.subscriber.quit()
      ]);
      this.connected = false;
      this.clients.clear();
      import_cluster_mode_manager.ClusterModeManager.log("Redis WebSocket manager closed");
    } catch (error) {
      import_cluster_mode_manager.ClusterModeManager.error("Error closing Redis WebSocket manager", error);
    }
  }
  async addConnection(client) {
    if (!this.connected) {
      throw new Error("Redis WebSocket manager not connected");
    }
    try {
      const clientData = {
        id: client.id,
        tags: Array.from(client.tags),
        url: client.url,
        headers: client.headers,
        app: client.app,
        timestamp: Date.now()
      };
      this.clients.set(client.id, client);
      const clientKey = import_cluster_mode_manager.ClusterModeManager.createKey("ws:clients", client.app);
      await this.redis.hset(clientKey, client.id, JSON.stringify(clientData));
      await this.redis.publish("ws:client:connected", JSON.stringify({
        instanceId: this.instanceId,
        app: client.app,
        clientId: client.id,
        clientData
      }));
      import_cluster_mode_manager.ClusterModeManager.log(`Added WebSocket connection: ${client.id}`, { app: client.app });
    } catch (error) {
      import_cluster_mode_manager.ClusterModeManager.error(`Failed to add WebSocket connection: ${client.id}`, error);
      throw error;
    }
  }
  async removeConnection(clientId, app) {
    if (!this.connected) {
      return;
    }
    try {
      this.clients.delete(clientId);
      const clientKey = import_cluster_mode_manager.ClusterModeManager.createKey("ws:clients", app);
      await this.redis.hdel(clientKey, clientId);
      await this.redis.publish("ws:client:disconnected", JSON.stringify({
        instanceId: this.instanceId,
        app,
        clientId
      }));
      import_cluster_mode_manager.ClusterModeManager.log(`Removed WebSocket connection: ${clientId}`, { app });
    } catch (error) {
      import_cluster_mode_manager.ClusterModeManager.error(`Failed to remove WebSocket connection: ${clientId}`, error);
      throw error;
    }
  }
  async sendToClient(app, clientId, message) {
    if (!this.connected) {
      throw new Error("Redis WebSocket manager not connected");
    }
    try {
      await this.redis.publish("ws:message", JSON.stringify({
        instanceId: this.instanceId,
        app,
        message,
        targetClientId: clientId
      }));
      import_cluster_mode_manager.ClusterModeManager.log(`Sent WebSocket message to client: ${clientId}`, { app });
    } catch (error) {
      import_cluster_mode_manager.ClusterModeManager.error(`Failed to send WebSocket message to client: ${clientId}`, error);
      throw error;
    }
  }
  async sendToClientsByTag(app, tagKey, tagValue, message) {
    if (!this.connected) {
      throw new Error("Redis WebSocket manager not connected");
    }
    try {
      await this.redis.publish("ws:message", JSON.stringify({
        instanceId: this.instanceId,
        app,
        message,
        targetTags: [`${tagKey}#${tagValue}`]
      }));
      import_cluster_mode_manager.ClusterModeManager.log(`Sent WebSocket message to clients with tag: ${tagKey}#${tagValue}`, { app });
    } catch (error) {
      import_cluster_mode_manager.ClusterModeManager.error(`Failed to send WebSocket message to clients with tag: ${tagKey}#${tagValue}`, error);
      throw error;
    }
  }
  async broadcastToApp(app, message) {
    if (!this.connected) {
      throw new Error("Redis WebSocket manager not connected");
    }
    try {
      await this.redis.publish("ws:broadcast", JSON.stringify({
        instanceId: this.instanceId,
        app,
        message
      }));
      import_cluster_mode_manager.ClusterModeManager.log(`Broadcasted WebSocket message to app: ${app}`);
    } catch (error) {
      import_cluster_mode_manager.ClusterModeManager.error(`Failed to broadcast WebSocket message to app: ${app}`, error);
      throw error;
    }
  }
  async getConnectedClients(app) {
    if (!this.connected) {
      return [];
    }
    try {
      const clientKey = import_cluster_mode_manager.ClusterModeManager.createKey("ws:clients", app);
      const clients = await this.redis.hgetall(clientKey);
      return Object.values(clients).map((clientData) => {
        const data = JSON.parse(clientData);
        return {
          id: data.id,
          tags: new Set(data.tags),
          url: data.url,
          headers: data.headers,
          app: data.app,
          timestamp: data.timestamp
        };
      });
    } catch (error) {
      import_cluster_mode_manager.ClusterModeManager.error(`Failed to get connected clients for app: ${app}`, error);
      return [];
    }
  }
  async getClientCount(app) {
    if (!this.connected) {
      return 0;
    }
    try {
      const clientKey = import_cluster_mode_manager.ClusterModeManager.createKey("ws:clients", app);
      return await this.redis.hlen(clientKey);
    } catch (error) {
      import_cluster_mode_manager.ClusterModeManager.error(`Failed to get client count for app: ${app}`, error);
      return 0;
    }
  }
  /**
   * Get all clients from this instance
   */
  getLocalClients() {
    return Array.from(this.clients.values());
  }
  /**
   * Get client by ID from this instance
   */
  getLocalClient(clientId) {
    return this.clients.get(clientId);
  }
  /**
   * Check if client exists in this instance
   */
  hasLocalClient(clientId) {
    return this.clients.has(clientId);
  }
};
__name(_RedisWebSocketManager, "RedisWebSocketManager");
let RedisWebSocketManager = _RedisWebSocketManager;
var redis_websocket_manager_default = RedisWebSocketManager;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RedisWebSocketManager
});
