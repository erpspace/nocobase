/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var event_queue_exports = {};
__export(event_queue_exports, {
  EventQueue: () => EventQueue,
  MemoryEventQueueAdapter: () => MemoryEventQueueAdapter,
  QUEUE_DEFAULT_ACK_TIMEOUT: () => QUEUE_DEFAULT_ACK_TIMEOUT,
  QUEUE_DEFAULT_CONCURRENCY: () => QUEUE_DEFAULT_CONCURRENCY,
  QUEUE_DEFAULT_INTERVAL: () => QUEUE_DEFAULT_INTERVAL,
  default: () => event_queue_default
});
module.exports = __toCommonJS(event_queue_exports);
var import_crypto = require("crypto");
var import_events = require("events");
var import_path = __toESM(require("path"));
var import_promises = __toESM(require("fs/promises"));
var import_utils = require("@nocobase/utils");
let ClusterModeManager = null;
let RedisEventQueueAdapter = null;
try {
  const clusterMode = require("./cluster-mode/cluster-mode-manager");
  ClusterModeManager = clusterMode.ClusterModeManager;
  const redisEventQueue = require("./cluster-mode/redis-event-queue-adapter");
  RedisEventQueueAdapter = redisEventQueue.RedisEventQueueAdapter;
} catch (error) {
}
const QUEUE_DEFAULT_INTERVAL = 250;
const QUEUE_DEFAULT_CONCURRENCY = 1;
const QUEUE_DEFAULT_ACK_TIMEOUT = 15e3;
const _MemoryEventQueueAdapter = class _MemoryEventQueueAdapter {
  constructor(options) {
    this.options = options;
    this.emitter.setMaxListeners(0);
  }
  connected = false;
  emitter = new import_events.EventEmitter();
  reading = /* @__PURE__ */ new Map();
  events = /* @__PURE__ */ new Map();
  queues = /* @__PURE__ */ new Map();
  get processing() {
    const processing = Array.from(this.reading.values());
    if (processing.length > 0) {
      return Promise.all(processing);
    }
    return null;
  }
  get storagePath() {
    return import_path.default.resolve(process.cwd(), "storage", "apps", this.options.appName, "event-queue.json");
  }
  listen = /* @__PURE__ */ __name((channel) => {
    if (!this.connected) {
      return;
    }
    const { logger } = this.options;
    const event = this.events.get(channel);
    if (!event) {
      logger.warn(`memory queue (${channel}) not found, skipping...`);
      return;
    }
    if (!event.idle()) {
      return;
    }
    const reading = this.reading.get(channel) || [];
    const count = (event.concurrency || QUEUE_DEFAULT_CONCURRENCY) - reading.length;
    if (count <= 0) {
      return;
    }
    logger.debug(`reading more from queue (${channel}), count: ${count}`);
    this.read(channel, count).forEach((promise) => {
      reading.push(promise);
      promise.finally(() => {
        const index = reading.indexOf(promise);
        if (index > -1) {
          reading.splice(index, 1);
        }
      });
    });
    this.reading.set(channel, reading);
  }, "listen");
  isConnected() {
    return this.connected;
  }
  setConnected(connected) {
    this.connected = connected;
  }
  async loadFromStorage() {
    let queues = {};
    let exists = false;
    const { logger } = this.options;
    try {
      await import_promises.default.stat(this.storagePath);
      exists = true;
    } catch (ex) {
      logger.info(`memory queue storage file not found, skip`);
    }
    if (exists) {
      try {
        const queueJson = await import_promises.default.readFile(this.storagePath);
        queues = JSON.parse(queueJson.toString());
        logger.debug("memory queue loaded from storage", queues);
        await import_promises.default.unlink(this.storagePath);
      } catch (ex) {
        logger.error("failed to load queue from storage", ex);
      }
    }
    this.queues = new Map(Object.entries(queues));
  }
  async saveToStorage() {
    const queues = Array.from(this.queues.entries()).reduce((acc, [channel, queue]) => {
      if (queue == null ? void 0 : queue.length) {
        acc[channel] = queue;
      }
      return acc;
    }, {});
    const { logger } = this.options;
    if (Object.keys(queues).length) {
      await import_promises.default.mkdir(import_path.default.dirname(this.storagePath), { recursive: true });
      await import_promises.default.writeFile(this.storagePath, JSON.stringify(queues));
      logger.debug("memory queue saved to storage", queues);
    } else {
      logger.debug("memory queue empty, no need to save to storage");
    }
  }
  async connect() {
    if (this.connected) {
      return;
    }
    await this.loadFromStorage();
    this.connected = true;
    setImmediate(() => {
      for (const channel of this.events.keys()) {
        this.consume(channel);
      }
    });
  }
  async close() {
    if (!this.connected) {
      return;
    }
    const { logger } = this.options;
    this.connected = false;
    if (this.processing) {
      logger.info("memory queue waiting for processing job...");
      await this.processing;
      logger.info("memory queue job cleaned");
    }
    logger.info("memory queue gracefully shutting down...");
    await this.saveToStorage();
  }
  subscribe(channel, options) {
    if (this.events.has(channel)) {
      return;
    }
    this.events.set(channel, options);
    if (!this.queues.has(channel)) {
      this.queues.set(channel, []);
    }
    this.emitter.on(channel, this.listen);
    if (this.connected) {
      this.consume(channel);
    }
  }
  unsubscribe(channel) {
    if (!this.events.has(channel)) {
      return;
    }
    this.events.delete(channel);
    this.emitter.off(channel, this.listen);
  }
  publish(channel, content, options = { timestamp: Date.now() }) {
    const event = this.events.get(channel);
    if (!event) {
      return;
    }
    if (!this.queues.get(channel)) {
      this.queues.set(channel, []);
    }
    const queue = this.queues.get(channel);
    const message = { id: (0, import_crypto.randomUUID)(), content, options };
    queue.push(message);
    const { logger } = this.options;
    logger.debug(`memory queue (${channel}) published message`, content);
    setImmediate(() => {
      this.emitter.emit(channel, channel);
    });
  }
  async consume(channel, once = false) {
    while (this.connected && this.events.get(channel)) {
      const event = this.events.get(channel);
      const interval = event.interval || QUEUE_DEFAULT_INTERVAL;
      const queue = this.queues.get(channel);
      if (event.idle() && (queue == null ? void 0 : queue.length)) {
        this.listen(channel);
      }
      if (once) {
        break;
      }
      await (0, import_utils.sleep)(interval);
    }
  }
  read(channel, n) {
    const queue = this.queues.get(channel);
    if (!(queue == null ? void 0 : queue.length)) {
      return [];
    }
    const { logger } = this.options;
    const messages = queue.slice(0, n);
    logger.debug(`memory queue (${channel}) read ${messages.length} messages`, messages);
    queue.splice(0, messages.length);
    const batch = messages.map(({ id, ...message }) => this.process(channel, { id, message }));
    return batch;
  }
  async process(channel, { id, message }) {
    const event = this.events.get(channel);
    const { content, options: { timeout = QUEUE_DEFAULT_ACK_TIMEOUT, maxRetries = 0, retried = 0 } = {} } = message;
    const { logger } = this.options;
    logger.debug(`memory queue (${channel}) processing message (${id})...`, content);
    return (async () => event.process(content, {
      id,
      retried,
      signal: AbortSignal.timeout(timeout)
    }))().then(() => {
      logger.debug(`memory queue (${channel}) consumed message (${id})`);
    }).catch((ex) => {
      if (maxRetries > 0 && retried < maxRetries) {
        const currentRetry = retried + 1;
        logger.warn(
          `memory queue (${channel}) consum message (${id}) failed, retrying (${currentRetry} / ${maxRetries})...`,
          ex
        );
        setTimeout(() => {
          this.publish(channel, content, { timeout, maxRetries, retried: currentRetry, timestamp: Date.now() });
        }, 500);
      } else {
        logger.error(ex);
      }
    });
  }
};
__name(_MemoryEventQueueAdapter, "MemoryEventQueueAdapter");
let MemoryEventQueueAdapter = _MemoryEventQueueAdapter;
const _EventQueue = class _EventQueue {
  constructor(app, options = {}) {
    this.app = app;
    this.options = options;
    this.initializeAdapter();
    app.on("afterStart", async () => {
      await this.connect();
    });
    app.on("beforeStop", async () => {
      app.logger.info("[queue] gracefully shutting down...");
      await this.close();
    });
  }
  adapter;
  events = /* @__PURE__ */ new Map();
  get channelPrefix() {
    var _a;
    return (_a = this.options) == null ? void 0 : _a.channelPrefix;
  }
  initializeAdapter() {
    if ((ClusterModeManager == null ? void 0 : ClusterModeManager.isEnabled()) && RedisEventQueueAdapter) {
      this.setAdapter(new RedisEventQueueAdapter());
    } else {
      this.setAdapter(new MemoryEventQueueAdapter({ appName: this.app.name, logger: this.app.logger }));
    }
  }
  getFullChannel(channel) {
    return [this.app.name, this.channelPrefix, channel].filter(Boolean).join(".");
  }
  setAdapter(adapter) {
    this.adapter = adapter;
  }
  isConnected() {
    if (!this.adapter) {
      return false;
    }
    return this.adapter.isConnected();
  }
  async connect() {
    if (!this.adapter) {
      throw new Error("no adapter set, cannot connect");
    }
    await this.adapter.connect();
    for (const [channel, event] of this.events.entries()) {
      this.adapter.subscribe(this.getFullChannel(channel), event);
    }
  }
  async close() {
    if (!this.adapter) {
      return;
    }
    await this.adapter.close();
    for (const channel of this.events.keys()) {
      this.adapter.unsubscribe(this.getFullChannel(channel));
    }
  }
  subscribe(channel, options) {
    if (this.events.has(channel)) {
      this.app.logger.warn(`event queue already subscribed on channel "${channel}", new subscription will be ignored`);
      return;
    }
    this.events.set(channel, options);
    if (this.isConnected()) {
      this.adapter.subscribe(this.getFullChannel(channel), options);
    }
  }
  unsubscribe(channel) {
    if (!this.events.has(channel)) {
      return;
    }
    this.events.delete(channel);
    if (this.isConnected()) {
      this.adapter.unsubscribe(this.getFullChannel(channel));
    }
  }
  async publish(channel, message, options = {}) {
    if (!this.adapter) {
      throw new Error("no adapter set, cannot publish");
    }
    if (!this.isConnected()) {
      throw new Error("event queue not connected, cannot publish");
    }
    const c = this.getFullChannel(channel);
    this.app.logger.debug("event queue publishing:", { channel: c, message });
    await this.adapter.publish(c, message, {
      timeout: QUEUE_DEFAULT_ACK_TIMEOUT,
      ...options,
      timestamp: Date.now()
    });
  }
};
__name(_EventQueue, "EventQueue");
let EventQueue = _EventQueue;
var event_queue_default = EventQueue;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EventQueue,
  MemoryEventQueueAdapter,
  QUEUE_DEFAULT_ACK_TIMEOUT,
  QUEUE_DEFAULT_CONCURRENCY,
  QUEUE_DEFAULT_INTERVAL
});
