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
var telemetry_exports = {};
__export(telemetry_exports, {
  Telemetry: () => Telemetry
});
module.exports = __toCommonJS(telemetry_exports);
var import_semantic_conventions = require("@opentelemetry/semantic-conventions");
var import_resources = require("@opentelemetry/resources");
var import_instrumentation = require("@opentelemetry/instrumentation");
var import_metric = require("./metric");
var import_trace = require("./trace");
const _Telemetry = class _Telemetry {
  serviceName;
  version;
  instrumentations = [];
  trace;
  metric;
  started = false;
  constructor(options) {
    const { trace, metric, serviceName, version } = options || {};
    this.trace = new import_trace.Trace({ tracerName: `${serviceName}-trace`, version, ...trace });
    this.metric = new import_metric.Metric({ meterName: `${serviceName}-meter`, version, ...metric });
    this.serviceName = serviceName || "nocobase";
    this.version = version || "";
  }
  init() {
    (0, import_instrumentation.registerInstrumentations)({
      instrumentations: this.instrumentations
    });
    const resource = import_resources.Resource.default().merge(
      new import_resources.Resource({
        [import_semantic_conventions.SemanticResourceAttributes.SERVICE_NAME]: this.serviceName,
        [import_semantic_conventions.SemanticResourceAttributes.SERVICE_VERSION]: this.version
      })
    );
    this.trace.init(resource);
    this.metric.init(resource);
  }
  start() {
    if (!this.started) {
      this.trace.start();
      this.metric.start();
    }
    this.started = true;
  }
  async shutdown() {
    await Promise.all([this.trace.shutdown(), this.metric.shutdown()]);
    this.started = false;
  }
  addInstrumentation(...instrumentation) {
    this.instrumentations.push(...instrumentation);
  }
};
__name(_Telemetry, "Telemetry");
let Telemetry = _Telemetry;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Telemetry
});
