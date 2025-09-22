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
var server_exports = {};
__export(server_exports, {
  PluginMulticore: () => PluginMulticore,
  default: () => server_default
});
module.exports = __toCommonJS(server_exports);
var import_server = require("@nocobase/server");
var import_redis_pub_sub_adapter = require("./adapters/redis-pub-sub-adapter");
var import_redis_event_queue_adapter = require("./adapters/redis-event-queue-adapter");
var import_redis_lock_adapter = require("./adapters/redis-lock-adapter");
var import_redis_websocket_manager = require("./adapters/redis-websocket-manager");
class PluginMulticore extends import_server.Plugin {
  redisUrl;
  redisPubSubAdapter;
  redisEventQueueAdapter;
  redisLockAdapter;
  wsManager;
  constructor(app, options) {
    console.log("[Multicore] PluginMulticore constructor called");
    super(app, options);
    this.redisUrl = process.env.REDIS_URL || process.env.REDIS_HOST ? `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT || 6379}` : "redis://localhost:6379";
    if (process.env.REDIS_PASSWORD) {
      this.redisUrl = this.redisUrl.replace("redis://", `redis://:${process.env.REDIS_PASSWORD}@`);
    }
    if (process.env.REDIS_DB) {
      this.redisUrl += `/${process.env.REDIS_DB}`;
    }
  }
  async afterAdd() {
    console.log("[Multicore] Plugin added - creating Redis adapters");
    this.createAdapters();
  }
  async beforeLoad() {
    console.log("[Multicore] Plugin beforeLoad called");
    console.log("[Multicore] Plugin loading - configuring cache manager");
    this.configureCacheManager();
    this.defineAPI();
  }
  async afterLoad() {
    console.log("[Multicore] Plugin afterLoad called");
  }
  async afterStart() {
    console.log("[Multicore] Plugin afterStart called");
    console.log("[Multicore] Plugin started - switching to Redis adapters");
    await this.switchToRedisAdapters();
  }
  async beforeStop() {
    console.log("[Multicore] Plugin stopping - cleaning up");
    if (this.redisPubSubAdapter) {
      await this.redisPubSubAdapter.close();
    }
  }
  createAdapters() {
    try {
      this.redisPubSubAdapter = new import_redis_pub_sub_adapter.RedisPubSubAdapter(this.redisUrl);
      this.redisEventQueueAdapter = new import_redis_event_queue_adapter.RedisEventQueueAdapter(this.redisUrl);
      this.redisLockAdapter = new import_redis_lock_adapter.RedisLockAdapter(this.redisUrl);
      console.log("[Multicore] Created Redis adapter instances");
    } catch (error) {
      console.error("[Multicore] Error creating adapters:", error);
    }
  }
  configureCacheManager() {
    try {
      if (this.app.cacheManager) {
        this.app.cacheManager.defaultStore = "redis";
        console.log("[Multicore] Configured cache manager for Redis");
      }
    } catch (error) {
      console.error("[Multicore] Error configuring cache manager:", error);
    }
  }
  defineAPI() {
    try {
      this.app.resourceManager.define({
        name: "multicore",
        actions: {
          info: {
            handler: async (ctx) => {
              const info = await this.getInstanceInfo();
              ctx.body = { data: info };
            },
            middleware: ["auth"]
          },
          broadcast: {
            handler: async (ctx) => {
              const { type, data, targetInstance } = ctx.request.body;
              const wsManager = this.getWebSocketManager();
              if (wsManager) {
                await wsManager.broadcast(type, data, targetInstance);
                ctx.body = { status: "ok", message: `Message of type "${type}" broadcasted.` };
              } else {
                ctx.throw(500, "WebSocket manager not initialized");
              }
            },
            middleware: ["auth"]
          }
        }
      });
      console.log("[Multicore] Defined API routes");
    } catch (error) {
      console.error("[Multicore] Error defining API routes:", error);
    }
  }
  async switchToRedisAdapters() {
    try {
      if (this.app.pubSubManager && this.redisPubSubAdapter) {
        this.app.pubSubManager.setAdapter(this.redisPubSubAdapter);
        console.log("[Multicore] Switched PubSub manager to Redis");
      }
      if (this.app.eventQueue && this.redisEventQueueAdapter) {
        this.app.eventQueue.setAdapter(this.redisEventQueueAdapter);
        console.log("[Multicore] Switched EventQueue to Redis");
      }
      if (this.app.lockManager && this.redisLockAdapter) {
        this.app.redisLockAdapter = this.redisLockAdapter;
        console.log("[Multicore] Stored Redis Lock adapter");
      }
      this.initializeWebSocketManager();
      if (this.wsManager) {
        await this.wsManager.connect();
        console.log("[Multicore] Connected WebSocket manager");
      }
      console.log("[Multicore] Successfully switched all adapters to Redis");
    } catch (error) {
      console.error("[Multicore] Error switching to Redis adapters:", error);
      throw error;
    }
  }
  initializeWebSocketManager() {
    try {
      this.wsManager = new import_redis_websocket_manager.RedisWebSocketManager(this.app.instanceId, this.redisUrl);
      this.app.wsManager = this.wsManager;
      console.log("[Multicore] Initialized WebSocket manager");
    } catch (error) {
      console.error("[Multicore] Error initializing WebSocket manager:", error);
    }
  }
  // Public API methods
  getRedisUrl() {
    return this.redisUrl;
  }
  getWebSocketManager() {
    return this.wsManager;
  }
  async getInstanceInfo() {
    if (this.wsManager) {
      const clients = await this.wsManager.getClients();
      const instances = await this.wsManager.getAllInstances();
      return {
        instanceId: this.app.instanceId,
        redisUrl: this.redisUrl,
        clientCount: clients.size,
        totalInstances: instances.length,
        instances
      };
    }
    return {
      instanceId: this.app.instanceId,
      redisUrl: this.redisUrl,
      clientCount: 0,
      totalInstances: 1,
      instances: [this.app.instanceId]
    };
  }
}
console.log("[Multicore] Plugin module loaded");
var server_default = PluginMulticore;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginMulticore
});
