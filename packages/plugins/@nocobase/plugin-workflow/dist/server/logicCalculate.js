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
var logicCalculate_exports = {};
__export(logicCalculate_exports, {
  calculators: () => calculators,
  logicCalculate: () => logicCalculate
});
module.exports = __toCommonJS(logicCalculate_exports);
var import_utils = require("@nocobase/utils");
const calculators = new import_utils.Registry();
function equal(a, b) {
  return a == b;
}
function notEqual(a, b) {
  return a != b;
}
function gt(a, b) {
  return a > b;
}
function gte(a, b) {
  return a >= b;
}
function lt(a, b) {
  return a < b;
}
function lte(a, b) {
  return a <= b;
}
calculators.register("equal", equal);
calculators.register("notEqual", notEqual);
calculators.register("gt", gt);
calculators.register("gte", gte);
calculators.register("lt", lt);
calculators.register("lte", lte);
calculators.register("==", equal);
calculators.register("!=", notEqual);
calculators.register(">", gt);
calculators.register(">=", gte);
calculators.register("<", lt);
calculators.register("<=", lte);
function includes(a, b) {
  return a.includes(b);
}
function notIncludes(a, b) {
  return !a.includes(b);
}
function startsWith(a, b) {
  return a.startsWith(b);
}
function notStartsWith(a, b) {
  return !a.startsWith(b);
}
function endsWith(a, b) {
  return a.endsWith(b);
}
function notEndsWith(a, b) {
  return !a.endsWith(b);
}
calculators.register("includes", includes);
calculators.register("notIncludes", notIncludes);
calculators.register("startsWith", startsWith);
calculators.register("notStartsWith", notStartsWith);
calculators.register("endsWith", endsWith);
calculators.register("notEndsWith", notEndsWith);
function calculate(calculation = {}) {
  var _a;
  let fn;
  if (!calculation.calculator || !((_a = calculation.operands) == null ? void 0 : _a.length)) {
    return true;
  }
  if (!(fn = calculators.get(calculation.calculator))) {
    throw new Error(`no calculator function registered for "${calculation.calculator}"`);
  }
  return Boolean(fn(...calculation.operands ?? []));
}
const GroupTypeMethodMap = {
  and: "every",
  or: "some"
};
function logicCalculate(calculation) {
  if (!calculation) {
    return true;
  }
  if (typeof calculation["group"] === "object") {
    const method = GroupTypeMethodMap[calculation["group"].type];
    return (calculation["group"].calculations ?? [])[method]((item) => logicCalculate(item));
  }
  return calculate(calculation);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  calculators,
  logicCalculate
});
