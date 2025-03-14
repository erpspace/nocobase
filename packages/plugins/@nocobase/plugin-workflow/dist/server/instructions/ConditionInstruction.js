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
var ConditionInstruction_exports = {};
__export(ConditionInstruction_exports, {
  BRANCH_INDEX: () => BRANCH_INDEX,
  ConditionInstruction: () => ConditionInstruction,
  default: () => ConditionInstruction_default
});
module.exports = __toCommonJS(ConditionInstruction_exports);
var import_evaluators = require("@nocobase/evaluators");
var import__ = require(".");
var import_constants = require("../constants");
var import_logicCalculate = require("../logicCalculate");
const BRANCH_INDEX = {
  DEFAULT: null,
  ON_TRUE: 1,
  ON_FALSE: 0
};
class ConditionInstruction extends import__.Instruction {
  async run(node, prevJob, processor) {
    const { engine, calculation, expression, rejectOnFalse } = node.config || {};
    const evaluator = import_evaluators.evaluators.get(engine);
    let result = true;
    try {
      result = evaluator ? evaluator(expression, processor.getScope(node.id)) : (0, import_logicCalculate.logicCalculate)(processor.getParsedValue(calculation, node.id));
    } catch (e) {
      return {
        result: e.toString(),
        status: import_constants.JOB_STATUS.ERROR
      };
    }
    if (!result && rejectOnFalse) {
      return {
        status: import_constants.JOB_STATUS.FAILED,
        result
      };
    }
    const job = {
      status: import_constants.JOB_STATUS.RESOLVED,
      result,
      // TODO(optimize): try unify the building of job
      nodeId: node.id,
      nodeKey: node.key,
      upstreamId: prevJob && prevJob.id || null
    };
    const branchNode = processor.nodes.find(
      (item) => item.upstreamId === node.id && item.branchIndex != null && Boolean(item.branchIndex) === result
    );
    if (!branchNode) {
      return job;
    }
    const savedJob = await processor.saveJob(job);
    await processor.run(branchNode, savedJob);
    return null;
  }
  async resume(node, branchJob, processor) {
    const job = processor.findBranchParentJob(branchJob, node);
    if (branchJob.status === import_constants.JOB_STATUS.RESOLVED) {
      return job;
    }
    return processor.exit(branchJob.status);
  }
}
var ConditionInstruction_default = ConditionInstruction;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BRANCH_INDEX,
  ConditionInstruction
});
