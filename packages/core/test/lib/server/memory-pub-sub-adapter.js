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
var memory_pub_sub_adapter_exports = {};
__export(memory_pub_sub_adapter_exports, {
  MemoryPubSubAdapter: () => MemoryPubSubAdapter
});
module.exports = __toCommonJS(memory_pub_sub_adapter_exports);
var import_utils = require("@nocobase/utils");
var import_events = require("events");
const sleep = /* @__PURE__ */ __name((ms) => new Promise((resolve) => setTimeout(resolve, ms)), "sleep");
const _TestEventEmitter = class _TestEventEmitter extends import_events.EventEmitter {
};
__name(_TestEventEmitter, "TestEventEmitter");
let TestEventEmitter = _TestEventEmitter;
(0, import_utils.applyMixins)(TestEventEmitter, [import_utils.AsyncEmitter]);
const _MemoryPubSubAdapter = class _MemoryPubSubAdapter {
  constructor(options = {}) {
    this.options = options;
    this.emitter = new TestEventEmitter();
  }
  emitter;
  connected = false;
  static create(name, options) {
    if (!name) {
      name = (0, import_utils.uid)();
    }
    if (!this.instances.has(name)) {
      this.instances.set(name, new _MemoryPubSubAdapter(options));
    }
    return this.instances.get(name);
  }
  async connect() {
    this.connected = true;
  }
  async close() {
    this.connected = false;
  }
  async isConnected() {
    return this.connected;
  }
  async subscribe(channel, callback) {
    this.emitter.on(channel, callback);
  }
  async unsubscribe(channel, callback) {
    this.emitter.off(channel, callback);
  }
  async publish(channel, message) {
    console.log(this.connected, { channel, message });
    if (!this.connected) {
      return;
    }
    await this.emitter.emitAsync(channel, message);
    await this.emitter.emitAsync("__publish__", channel, message);
    if (this.options.debounce) {
      await sleep(Number(this.options.debounce));
    }
  }
  async subscribeAll(callback) {
    this.emitter.on("__publish__", callback);
  }
};
__name(_MemoryPubSubAdapter, "MemoryPubSubAdapter");
__publicField(_MemoryPubSubAdapter, "instances", /* @__PURE__ */ new Map());
let MemoryPubSubAdapter = _MemoryPubSubAdapter;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MemoryPubSubAdapter
});
