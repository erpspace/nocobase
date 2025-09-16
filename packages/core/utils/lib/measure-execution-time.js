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
var measure_execution_time_exports = {};
__export(measure_execution_time_exports, {
  measureExecutionTime: () => measureExecutionTime
});
module.exports = __toCommonJS(measure_execution_time_exports);
async function measureExecutionTime(operation, operationName) {
  const startTime = Date.now();
  await operation();
  const endTime = Date.now();
  const duration = (endTime - startTime).toFixed(0);
  console.log(`${operationName} completed in ${duration} milliseconds`);
}
__name(measureExecutionTime, "measureExecutionTime");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  measureExecutionTime
});
