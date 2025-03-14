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
var CalculationInstruction_exports = {};
__export(CalculationInstruction_exports, {
  CalculationInstruction: () => CalculationInstruction,
  default: () => CalculationInstruction_default
});
module.exports = __toCommonJS(CalculationInstruction_exports);
var import_evaluators = require("@nocobase/evaluators");
var import__ = require(".");
var import_constants = require("../constants");
class CalculationInstruction extends import__.Instruction {
  async run(node, prevJob, processor) {
    const { engine = "math.js", expression = "" } = node.config;
    const scope = processor.getScope(node.id);
    const evaluator = import_evaluators.evaluators.get(engine);
    try {
      const result = evaluator && expression ? evaluator(expression, scope) : null;
      return {
        result,
        status: import_constants.JOB_STATUS.RESOLVED
      };
    } catch (e) {
      return {
        result: e.toString(),
        status: import_constants.JOB_STATUS.ERROR
      };
    }
  }
}
var CalculationInstruction_default = CalculationInstruction;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CalculationInstruction
});
