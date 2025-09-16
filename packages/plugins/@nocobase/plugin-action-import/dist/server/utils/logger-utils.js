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
var logger_utils_exports = {};
__export(logger_utils_exports, {
  LoggerService: () => LoggerService
});
module.exports = __toCommonJS(logger_utils_exports);
class LoggerService {
  logger;
  constructor(options) {
    if (options == null ? void 0 : options.logger) {
      this.logger = options.logger;
    }
  }
  async measureExecutedTime(handler, logMessage, logLevel = "info") {
    var _a, _b;
    if (!this.logger) {
      return await handler();
    }
    const startTime = process.hrtime();
    const result = await handler();
    const endTime = process.hrtime(startTime);
    const executionTimeMs = (endTime[0] * 1e3 + endTime[1] / 1e6).toFixed(2);
    const formattedMessage = logMessage.replace("{time}", executionTimeMs);
    if (logLevel === "info") {
      (_a = this.logger) == null ? void 0 : _a.info(formattedMessage);
    } else {
      (_b = this.logger) == null ? void 0 : _b.debug(formattedMessage);
    }
    return result;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LoggerService
});
