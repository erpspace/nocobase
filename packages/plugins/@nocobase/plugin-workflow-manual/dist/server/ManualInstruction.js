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
var ManualInstruction_exports = {};
__export(ManualInstruction_exports, {
  default: () => ManualInstruction_default
});
module.exports = __toCommonJS(ManualInstruction_exports);
var import_utils = require("@nocobase/utils");
var import_plugin_workflow = require("@nocobase/plugin-workflow");
var import_forms = __toESM(require("./forms"));
const MULTIPLE_ASSIGNED_MODE = {
  SINGLE: Symbol("single"),
  ALL: Symbol("all"),
  ANY: Symbol("any"),
  ALL_PERCENTAGE: Symbol("all percentage"),
  ANY_PERCENTAGE: Symbol("any percentage")
};
const Modes = {
  [MULTIPLE_ASSIGNED_MODE.SINGLE]: {
    getStatus(distribution, assignees) {
      const done = distribution.find((item) => item.status !== import_plugin_workflow.JOB_STATUS.PENDING && item.count > 0);
      return done ? done.status : null;
    }
  },
  [MULTIPLE_ASSIGNED_MODE.ALL]: {
    getStatus(distribution, assignees) {
      const resolved = distribution.find((item) => item.status === import_plugin_workflow.JOB_STATUS.RESOLVED);
      if (resolved && resolved.count === assignees.length) {
        return import_plugin_workflow.JOB_STATUS.RESOLVED;
      }
      const rejected = distribution.find((item) => item.status < import_plugin_workflow.JOB_STATUS.PENDING);
      if (rejected && rejected.count) {
        return rejected.status;
      }
      return null;
    }
  },
  [MULTIPLE_ASSIGNED_MODE.ANY]: {
    getStatus(distribution, assignees) {
      const resolved = distribution.find((item) => item.status === import_plugin_workflow.JOB_STATUS.RESOLVED);
      if (resolved && resolved.count) {
        return import_plugin_workflow.JOB_STATUS.RESOLVED;
      }
      const rejectedCount = distribution.reduce(
        (count, item) => item.status < import_plugin_workflow.JOB_STATUS.PENDING ? count + item.count : count,
        0
      );
      if (rejectedCount === assignees.length) {
        return import_plugin_workflow.JOB_STATUS.REJECTED;
      }
      return null;
    }
  }
};
function getMode(mode) {
  switch (true) {
    case mode === 1:
      return Modes[MULTIPLE_ASSIGNED_MODE.ALL];
    case mode === -1:
      return Modes[MULTIPLE_ASSIGNED_MODE.ANY];
    case mode > 0:
      return Modes[MULTIPLE_ASSIGNED_MODE.ALL_PERCENTAGE];
    case mode < 0:
      return Modes[MULTIPLE_ASSIGNED_MODE.ANY_PERCENTAGE];
    default:
      return Modes[MULTIPLE_ASSIGNED_MODE.SINGLE];
  }
}
class ManualInstruction_default extends import_plugin_workflow.Instruction {
  constructor(workflow) {
    super(workflow);
    this.workflow = workflow;
    (0, import_forms.default)(this);
  }
  formTypes = new import_utils.Registry();
  async run(node, prevJob, processor) {
    const { mode, ...config } = node.config;
    const assignees = [...new Set(processor.getParsedValue(config.assignees, node.id).flat().filter(Boolean))];
    const job = await processor.saveJob({
      status: assignees.length ? import_plugin_workflow.JOB_STATUS.PENDING : import_plugin_workflow.JOB_STATUS.RESOLVED,
      result: mode ? [] : null,
      nodeId: node.id,
      nodeKey: node.key,
      upstreamId: (prevJob == null ? void 0 : prevJob.id) ?? null
    });
    if (!assignees.length) {
      return job;
    }
    const title = config.title ? processor.getParsedValue(config.title, node.id) : node.title;
    const TaskRepo = this.workflow.app.db.getRepository("workflowManualTasks");
    await TaskRepo.createMany({
      records: assignees.map((userId) => ({
        userId,
        jobId: job.id,
        nodeId: node.id,
        executionId: job.executionId,
        workflowId: node.workflowId,
        status: import_plugin_workflow.JOB_STATUS.PENDING,
        title
      })),
      transaction: processor.mainTransaction
    });
    return job;
  }
  async resume(node, job, processor) {
    var _a;
    const { mode } = node.config;
    const TaskRepo = this.workflow.app.db.getRepository("workflowManualTasks");
    const tasks = await TaskRepo.find({
      where: {
        jobId: job.id
      },
      transaction: processor.mainTransaction
    });
    const assignees = [];
    const distributionMap = tasks.reduce((result2, item) => {
      if (result2[item.status] == null) {
        result2[item.status] = 0;
      }
      result2[item.status] += 1;
      assignees.push(item.userId);
      return result2;
    }, {});
    const distribution = Object.keys(distributionMap).map((status2) => ({
      status: Number.parseInt(status2, 10),
      count: distributionMap[status2]
    }));
    const submitted = tasks.reduce((count, item) => item.status !== import_plugin_workflow.JOB_STATUS.PENDING ? count + 1 : count, 0);
    const status = job.status || (getMode(mode).getStatus(distribution, assignees) ?? import_plugin_workflow.JOB_STATUS.PENDING);
    const result = mode ? (submitted || 0) / assignees.length : ((_a = job.latestTask) == null ? void 0 : _a.result) ?? job.result;
    processor.logger.debug(`manual resume job and next status: ${status}`);
    job.set({
      status,
      result
    });
    return job;
  }
}
