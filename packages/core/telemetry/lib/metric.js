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
var metric_exports = {};
__export(metric_exports, {
  Metric: () => Metric
});
module.exports = __toCommonJS(metric_exports);
var import_utils = require("@nocobase/utils");
var import_sdk_metrics = require("@opentelemetry/sdk-metrics");
var import_api = __toESM(require("@opentelemetry/api"));
const _Metric = class _Metric {
  meterName;
  version;
  readerName;
  readers = new import_utils.Registry();
  provider;
  views = [];
  constructor(options) {
    const { meterName, readerName, version } = options || {};
    this.readerName = readerName || "console";
    this.meterName = meterName || "nocobase-meter";
    this.version = version || "";
    this.registerReader(
      "console",
      () => new import_sdk_metrics.PeriodicExportingMetricReader({
        exporter: new import_sdk_metrics.ConsoleMetricExporter()
      })
    );
  }
  init(resource) {
    this.provider = new import_sdk_metrics.MeterProvider({ resource, views: this.views });
    import_api.default.metrics.setGlobalMeterProvider(this.provider);
  }
  registerReader(name, reader) {
    this.readers.register(name, reader);
  }
  getReader(name) {
    return this.readers.get(name);
  }
  addView(...view) {
    this.views.push(...view);
  }
  getMeter(name, version) {
    return this.provider.getMeter(name || this.meterName, version || this.version);
  }
  start() {
    let readerName = this.readerName;
    if (typeof readerName === "string") {
      readerName = readerName.split(",");
    }
    readerName.forEach((name) => {
      const reader = this.getReader(name)();
      this.provider.addMetricReader(reader);
    });
  }
  shutdown() {
    return this.provider.shutdown();
  }
};
__name(_Metric, "Metric");
let Metric = _Metric;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Metric
});
