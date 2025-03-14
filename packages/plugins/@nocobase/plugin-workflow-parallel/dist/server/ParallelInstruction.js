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
var ParallelInstruction_exports = {};
__export(ParallelInstruction_exports, {
  PARALLEL_MODE: () => PARALLEL_MODE,
  default: () => ParallelInstruction_default
});
module.exports = __toCommonJS(ParallelInstruction_exports);
var import_plugin_workflow = require("@nocobase/plugin-workflow");
const PARALLEL_MODE = {
  ALL: "all",
  ANY: "any",
  RACE: "race"
};
const Modes = {
  [PARALLEL_MODE.ALL]: {
    next(previous) {
      return previous.status >= import_plugin_workflow.JOB_STATUS.PENDING;
    },
    getStatus(result) {
      const failedStatus = result.find((status) => status != null && status < import_plugin_workflow.JOB_STATUS.PENDING);
      if (typeof failedStatus !== "undefined") {
        return failedStatus;
      }
      if (result.every((status) => status != null && status === import_plugin_workflow.JOB_STATUS.RESOLVED)) {
        return import_plugin_workflow.JOB_STATUS.RESOLVED;
      }
      return import_plugin_workflow.JOB_STATUS.PENDING;
    }
  },
  [PARALLEL_MODE.ANY]: {
    next(previous) {
      return previous.status <= import_plugin_workflow.JOB_STATUS.PENDING;
    },
    getStatus(result) {
      if (result.some((status) => status != null && status === import_plugin_workflow.JOB_STATUS.RESOLVED)) {
        return import_plugin_workflow.JOB_STATUS.RESOLVED;
      }
      if (result.some((status) => status != null ? status === import_plugin_workflow.JOB_STATUS.PENDING : true)) {
        return import_plugin_workflow.JOB_STATUS.PENDING;
      }
      return import_plugin_workflow.JOB_STATUS.FAILED;
    }
  },
  [PARALLEL_MODE.RACE]: {
    next(previous) {
      return previous.status === import_plugin_workflow.JOB_STATUS.PENDING;
    },
    getStatus(result) {
      if (result.some((status) => status != null && status === import_plugin_workflow.JOB_STATUS.RESOLVED)) {
        return import_plugin_workflow.JOB_STATUS.RESOLVED;
      }
      const failedStatus = result.find((status) => status != null && status < import_plugin_workflow.JOB_STATUS.PENDING);
      if (typeof failedStatus !== "undefined") {
        return failedStatus;
      }
      return import_plugin_workflow.JOB_STATUS.PENDING;
    }
  }
};
class ParallelInstruction_default extends import_plugin_workflow.Instruction {
  async run(node, prevJob, processor) {
    const branches = processor.getBranches(node);
    const job = await processor.saveJob({
      status: import_plugin_workflow.JOB_STATUS.PENDING,
      result: Array(branches.length).fill(null),
      nodeId: node.id,
      nodeKey: node.key,
      upstreamId: (prevJob == null ? void 0 : prevJob.id) ?? null
    });
    const { mode = PARALLEL_MODE.ALL } = node.config;
    await branches.reduce(
      (promise, branch, i) => promise.then(async (previous) => {
        if (i && !Modes[mode].next(previous)) {
          return previous;
        }
        await processor.run(branch, job);
        return processor.findBranchLastJob(branch, job);
      }),
      Promise.resolve()
    );
    return null;
  }
  async resume(node, branchJob, processor) {
    const job = processor.findBranchParentJob(branchJob, node);
    const { result, status } = job;
    if (status !== import_plugin_workflow.JOB_STATUS.PENDING) {
      return processor.exit();
    }
    const jobNode = processor.nodesMap.get(branchJob.nodeId);
    const branchStartNode = processor.findBranchStartNode(jobNode, node);
    const branches = processor.getBranches(node);
    const branchIndex = branches.indexOf(branchStartNode);
    const { mode = PARALLEL_MODE.ALL } = node.config || {};
    const newResult = [...result.slice(0, branchIndex), branchJob.status, ...result.slice(branchIndex + 1)];
    job.set({
      result: newResult,
      status: Modes[mode].getStatus(newResult)
    });
    if (job.status === import_plugin_workflow.JOB_STATUS.PENDING) {
      await job.save({ transaction: processor.transaction });
      return processor.exit();
    }
    return job;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PARALLEL_MODE
});
