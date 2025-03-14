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
var LoopInstruction_exports = {};
__export(LoopInstruction_exports, {
  default: () => LoopInstruction_default
});
module.exports = __toCommonJS(LoopInstruction_exports);
var import_evaluators = __toESM(require("@nocobase/evaluators"));
var import_plugin_workflow = require("@nocobase/plugin-workflow");
var import_constants = require("../constants");
function getTargetLength(target) {
  let length = 0;
  if (typeof target === "number") {
    if (target < 0) {
      throw new Error("Loop target in number type must be greater than 0");
    }
    length = Math.floor(target);
  } else {
    const targets = Array.isArray(target) ? target : [target].filter((t) => t != null);
    length = targets.length;
  }
  return length;
}
function calculateCondition(node, processor) {
  const { engine, calculation, expression } = node.config.condition ?? {};
  const evaluator = import_evaluators.default.get(engine);
  return evaluator ? evaluator(expression, processor.getScope(node.id, true)) : (0, import_plugin_workflow.logicCalculate)(processor.getParsedValue(calculation, node.id, { includeSelfScope: true }));
}
class LoopInstruction_default extends import_plugin_workflow.Instruction {
  async run(node, prevJob, processor) {
    const [branch] = processor.getBranches(node);
    const target = processor.getParsedValue(node.config.target, node.id);
    const length = getTargetLength(target);
    const looped = 0;
    if (!branch || !length) {
      return {
        status: import_plugin_workflow.JOB_STATUS.RESOLVED,
        result: { looped }
      };
    }
    const job = await processor.saveJob({
      status: import_plugin_workflow.JOB_STATUS.PENDING,
      result: { looped },
      nodeId: node.id,
      nodeKey: node.key,
      upstreamId: (prevJob == null ? void 0 : prevJob.id) ?? null
    });
    if (node.config.condition) {
      const { checkpoint, calculation, expression, continueOnFalse } = node.config.condition ?? {};
      if ((calculation || expression) && !checkpoint) {
        const condition = calculateCondition(node, processor);
        if (!condition && !continueOnFalse) {
          job.set({
            status: import_plugin_workflow.JOB_STATUS.RESOLVED,
            result: { looped, broken: true }
          });
          return job;
        }
      }
    }
    await processor.run(branch, job);
    return null;
  }
  async resume(node, branchJob, processor) {
    const job = processor.findBranchParentJob(branchJob, node);
    const loop = processor.nodesMap.get(job.nodeId);
    const [branch] = processor.getBranches(node);
    const { result, status } = job;
    if (status !== import_plugin_workflow.JOB_STATUS.PENDING) {
      processor.logger.warn(`loop (${job.nodeId}) has been done, ignore newly resumed event`);
      return null;
    }
    if (branchJob.id !== job.id && branchJob.status === import_plugin_workflow.JOB_STATUS.PENDING) {
      return null;
    }
    const nextIndex = result.looped + 1;
    const target = processor.getParsedValue(loop.config.target, node.id);
    if (branchJob.status === import_plugin_workflow.JOB_STATUS.RESOLVED || branchJob.status < import_plugin_workflow.JOB_STATUS.PENDING && loop.config.exit === import_constants.EXIT.CONTINUE) {
      job.set({ result: { looped: nextIndex } });
      await processor.saveJob(job);
      const length = getTargetLength(target);
      if (nextIndex < length) {
        if (loop.config.condition) {
          const { calculation, expression, continueOnFalse } = loop.config.condition ?? {};
          if (calculation || expression) {
            const condition = calculateCondition(loop, processor);
            if (!condition && !continueOnFalse) {
              job.set({
                status: import_plugin_workflow.JOB_STATUS.RESOLVED,
                result: { looped: nextIndex, broken: true }
              });
              return job;
            }
          }
        }
        await processor.run(branch, job);
        return processor.exit();
      } else {
        job.set({
          status: import_plugin_workflow.JOB_STATUS.RESOLVED
        });
      }
    } else {
      job.set(
        loop.config.exit ? {
          result: { looped: result.looped, broken: true },
          status: import_plugin_workflow.JOB_STATUS.RESOLVED
        } : {
          status: branchJob.status
        }
      );
    }
    return job;
  }
  getScope(node, { looped }, processor) {
    const target = processor.getParsedValue(node.config.target, node.id);
    const targets = (Array.isArray(target) ? target : [target]).filter((t) => t != null);
    const length = getTargetLength(target);
    const index = looped;
    const item = typeof target === "number" ? index : targets[looped];
    const result = {
      item,
      index,
      sequence: index + 1,
      length
    };
    return result;
  }
}
