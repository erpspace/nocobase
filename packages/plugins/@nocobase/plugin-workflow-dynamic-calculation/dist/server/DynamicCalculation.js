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
var DynamicCalculation_exports = {};
__export(DynamicCalculation_exports, {
  DynamicCalculation: () => DynamicCalculation
});
module.exports = __toCommonJS(DynamicCalculation_exports);
var import_utils = require("@nocobase/utils");
var import_plugin_workflow = require("@nocobase/plugin-workflow");
var import_evaluators = __toESM(require("@nocobase/evaluators"));
class DynamicCalculation extends import_plugin_workflow.Instruction {
  async run(node, prevJob, processor) {
    let { engine = "math.js", expression = "" } = node.config;
    let scope = processor.getScope(node.id);
    const parsed = (0, import_utils.parse)(expression)(scope) ?? {};
    engine = parsed.engine;
    expression = parsed.expression;
    scope = (0, import_utils.parse)(node.config.scope ?? "")(scope) ?? {};
    const evaluator = import_evaluators.default.get(engine);
    try {
      const result = evaluator && expression ? evaluator(expression, scope) : null;
      return {
        result,
        status: import_plugin_workflow.JOB_STATUS.RESOLVED
      };
    } catch (e) {
      return {
        result: e.toString(),
        status: import_plugin_workflow.JOB_STATUS.ERROR
      };
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DynamicCalculation
});
