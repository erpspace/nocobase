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
var pub_sub_manager_exports = {};
__export(pub_sub_manager_exports, {
  PubSubManager: () => PubSubManager,
  createPubSubManager: () => createPubSubManager
});
module.exports = __toCommonJS(pub_sub_manager_exports);
var import_utils = require("@nocobase/utils");
var import_handler_manager = require("./handler-manager");
let ClusterModeManager = null;
let RedisPubSubAdapter = null;
try {
  const clusterMode = require("../cluster-mode/cluster-mode-manager");
  ClusterModeManager = clusterMode.ClusterModeManager;
  const redisPubSub = require("../cluster-mode/redis-pub-sub-adapter");
  RedisPubSubAdapter = redisPubSub.RedisPubSubAdapter;
} catch (error) {
}
const createPubSubManager = /* @__PURE__ */ __name((app, options) => {
  const pubSubManager = new PubSubManager(options);
  app.on("afterStart", async () => {
    await pubSubManager.connect();
  });
  app.on("afterStop", async () => {
    await pubSubManager.close();
  });
  return pubSubManager;
}, "createPubSubManager");
const _PubSubManager = class _PubSubManager {
  constructor(options = {}) {
    this.options = options;
    this.publisherId = (0, import_utils.uid)();
    this.handlerManager = new import_handler_manager.HandlerManager(this.publisherId);
    this.initializeAdapter();
  }
  publisherId;
  adapter;
  handlerManager;
  initializeAdapter() {
    if (process.env.CLUSTER_MODE === "max" && RedisPubSubAdapter) {
      this.setAdapter(new RedisPubSubAdapter());
    }
  }
  get channelPrefix() {
    var _a;
    return ((_a = this.options) == null ? void 0 : _a.channelPrefix) ? `${this.options.channelPrefix}.` : "";
  }
  setAdapter(adapter) {
    this.adapter = adapter;
  }
  async isConnected() {
    if (this.adapter) {
      return this.adapter.isConnected();
    }
    return false;
  }
  async connect() {
    if (!this.adapter) {
      return;
    }
    await this.adapter.connect();
    await this.handlerManager.each(async (channel, headler) => {
      await this.adapter.subscribe(`${this.channelPrefix}${channel}`, headler);
    });
  }
  async close() {
    if (!this.adapter) {
      return;
    }
    return await this.adapter.close();
  }
  async subscribe(channel, callback, options = {}) {
    await this.unsubscribe(channel, callback);
    const handler = this.handlerManager.set(channel, callback, options);
    if (await this.isConnected()) {
      await this.adapter.subscribe(`${this.channelPrefix}${channel}`, handler);
    }
  }
  async unsubscribe(channel, callback) {
    const handler = this.handlerManager.delete(channel, callback);
    if (!this.adapter || !handler) {
      return;
    }
    return this.adapter.unsubscribe(`${this.channelPrefix}${channel}`, handler);
  }
  async publish(channel, message, options) {
    var _a;
    if (!((_a = this.adapter) == null ? void 0 : _a.isConnected())) {
      return;
    }
    const wrappedMessage = JSON.stringify({
      publisherId: this.publisherId,
      ...options,
      message
    });
    return this.adapter.publish(`${this.channelPrefix}${channel}`, wrappedMessage);
  }
};
__name(_PubSubManager, "PubSubManager");
let PubSubManager = _PubSubManager;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PubSubManager,
  createPubSubManager
});
