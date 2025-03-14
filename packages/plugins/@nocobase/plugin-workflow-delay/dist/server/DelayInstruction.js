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
var DelayInstruction_exports = {};
__export(DelayInstruction_exports, {
  default: () => DelayInstruction_default
});
module.exports = __toCommonJS(DelayInstruction_exports);
var import_plugin_workflow = require("@nocobase/plugin-workflow");
class DelayInstruction_default extends import_plugin_workflow.Instruction {
  constructor(workflow) {
    super(workflow);
    this.workflow = workflow;
    workflow.app.on("afterStart", this.load);
    workflow.app.on("beforeStop", this.unload);
  }
  timers = /* @__PURE__ */ new Map();
  load = async () => {
    const { model } = this.workflow.app.db.getCollection("jobs");
    const jobs = await model.findAll({
      where: {
        status: import_plugin_workflow.JOB_STATUS.PENDING
      },
      include: [
        {
          association: "execution",
          attributes: [],
          where: {
            status: import_plugin_workflow.EXECUTION_STATUS.STARTED
          },
          required: true
        },
        {
          association: "node",
          attributes: ["config"],
          where: {
            type: "delay"
          },
          required: true
        }
      ]
    });
    jobs.forEach((job) => {
      this.schedule(job);
    });
  };
  unload = () => {
    for (const timer of this.timers.values()) {
      clearTimeout(timer);
    }
    this.timers = /* @__PURE__ */ new Map();
  };
  schedule(job) {
    const now = /* @__PURE__ */ new Date();
    const createdAt = Date.parse(job.createdAt);
    const delay = createdAt + job.node.config.duration - now.getTime();
    if (delay > 0) {
      const trigger = this.trigger.bind(this, job);
      this.timers.set(job.id, setTimeout(trigger, delay));
    } else {
      this.trigger(job);
    }
  }
  async trigger(job) {
    if (!job.execution) {
      job.execution = await job.getExecution();
    }
    if (job.execution.status === import_plugin_workflow.EXECUTION_STATUS.STARTED) {
      this.workflow.resume(job);
    }
    if (this.timers.get(job.id)) {
      this.timers.delete(job.id);
    }
  }
  async run(node, prevJob, processor) {
    const job = await processor.saveJob({
      status: import_plugin_workflow.JOB_STATUS.PENDING,
      result: null,
      nodeId: node.id,
      nodeKey: node.key,
      upstreamId: (prevJob == null ? void 0 : prevJob.id) ?? null
    });
    job.node = node;
    this.schedule(job);
    return processor.exit();
  }
  async resume(node, prevJob, processor) {
    const { endStatus } = node.config;
    prevJob.set("status", endStatus);
    return prevJob;
  }
}
