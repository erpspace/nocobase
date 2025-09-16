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
var trace_exports = {};
__export(trace_exports, {
  Trace: () => Trace
});
module.exports = __toCommonJS(trace_exports);
var import_utils = require("@nocobase/utils");
var import_sdk_trace_base = require("@opentelemetry/sdk-trace-base");
var import_sdk_trace_node = require("@opentelemetry/sdk-trace-node");
const _Trace = class _Trace {
  processorName;
  processors = new import_utils.Registry();
  tracerName;
  version;
  provider;
  constructor(options) {
    const { processorName, tracerName, version } = options || {};
    this.processorName = processorName || "console";
    this.tracerName = tracerName || "nocobase-trace";
    this.version = version || "";
    this.registerProcessor("console", () => new import_sdk_trace_base.BatchSpanProcessor(new import_sdk_trace_base.ConsoleSpanExporter()));
  }
  init(resource) {
    this.provider = new import_sdk_trace_node.NodeTracerProvider({
      resource
    });
    this.provider.register();
  }
  registerProcessor(name, processor) {
    this.processors.register(name, processor);
  }
  getProcessor(name) {
    return this.processors.get(name);
  }
  getTracer(name, version) {
    return this.provider.getTracer(name || this.tracerName, version || this.version);
  }
  start() {
    let processorName = this.processorName;
    if (typeof processorName === "string") {
      processorName = processorName.split(",");
    }
    processorName.forEach((name) => {
      const processor = this.getProcessor(name)();
      this.provider.addSpanProcessor(processor);
    });
  }
  shutdown() {
    return this.provider.shutdown();
  }
};
__name(_Trace, "Trace");
let Trace = _Trace;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Trace
});
