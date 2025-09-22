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
var background_job_manager_exports = {};
__export(background_job_manager_exports, {
  BackgroundJobManager: () => BackgroundJobManager,
  default: () => background_job_manager_default
});
module.exports = __toCommonJS(background_job_manager_exports);
const _BackgroundJobManager = class _BackgroundJobManager {
  constructor(app, options = {}) {
    this.app = app;
    this.options = options;
    this.app.on("afterStart", this.onAfterStart);
    this.app.on("beforeStop", this.onBeforeStop);
  }
  subscriptions = /* @__PURE__ */ new Map();
  // topic -> handler
  processing = null;
  /**
   * In cluster mode, log background job operations for debugging
   */
  isClusterMode() {
    return process.env.CLUSTER_MODE === "max" || process.env.CLUSTER_MODE === "true";
  }
  get channel() {
    return this.options.channel ?? _BackgroundJobManager.DEFAULT_CHANNEL;
  }
  onAfterStart = /* @__PURE__ */ __name(() => {
    this.app.eventQueue.subscribe(this.channel, {
      idle: /* @__PURE__ */ __name(() => this.idle, "idle"),
      process: this.process
    });
  }, "onAfterStart");
  onBeforeStop = /* @__PURE__ */ __name(() => {
    this.app.eventQueue.unsubscribe(this.channel);
  }, "onBeforeStop");
  process = /* @__PURE__ */ __name(async ({ topic, payload }, options) => {
    const event = this.subscriptions.get(topic);
    if (!event) {
      this.app.logger.warn(`No handler found for topic: ${topic}, event skipped.`);
      return;
    }
    this.processing = event.process(payload, options);
    try {
      await this.processing;
      this.app.logger.debug(`Completed background job ${topic}:${options.id}`);
    } catch (error) {
      this.app.logger.error(`Failed to process background job ${topic}:${options.id}`, error);
      throw error;
    } finally {
      this.processing = null;
    }
  }, "process");
  get idle() {
    return !this.processing && [...this.subscriptions.values()].every((event) => event.idle());
  }
  /**
   * 订阅指定主题的任务处理器
   * @param options 订阅选项
   */
  subscribe(topic, options) {
    if (this.subscriptions.has(topic)) {
      this.app.logger.warn(`Topic "${topic}" already has a handler, skip...`);
      return;
    }
    this.subscriptions.set(topic, options);
    this.app.logger.debug(`Subscribed to background job topic: ${topic}`);
    if (this.isClusterMode()) {
      console.log(`[CLUSTER] Subscribed to background job topic: ${topic}`);
    }
  }
  /**
   * 取消订阅指定主题
   * @param topic 主题名称
   */
  unsubscribe(topic) {
    if (this.subscriptions.has(topic)) {
      this.subscriptions.delete(topic);
      this.app.logger.debug(`Unsubscribed from background job topic: ${topic}`);
    }
  }
  async publish(topic, payload, options) {
    await this.app.eventQueue.publish(this.channel, { topic, payload }, options);
  }
};
__name(_BackgroundJobManager, "BackgroundJobManager");
__publicField(_BackgroundJobManager, "DEFAULT_CHANNEL", "background-jobs");
let BackgroundJobManager = _BackgroundJobManager;
var background_job_manager_default = BackgroundJobManager;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BackgroundJobManager
});
