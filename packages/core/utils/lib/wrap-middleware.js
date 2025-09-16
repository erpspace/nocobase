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
var wrap_middleware_exports = {};
__export(wrap_middleware_exports, {
  wrapMiddlewareWithLogging: () => wrapMiddlewareWithLogging
});
module.exports = __toCommonJS(wrap_middleware_exports);
function wrapMiddlewareWithLogging(fn, logger) {
  if (process.env["LOGGER_LEVEL"] !== "trace") {
    return fn;
  }
  const name = fn.name || fn.toString().slice(0, 100);
  return async (ctx, next) => {
    const reqId = ctx.reqId;
    if (!logger && !ctx.logger) {
      return await fn(ctx, next);
    }
    if (!logger && ctx.logger) {
      logger = ctx.logger;
    }
    logger.trace(`--> Entering middleware: ${name}`, { reqId });
    const start = Date.now();
    await fn(ctx, async () => {
      const beforeNext = Date.now();
      logger.trace(`--> Before next middleware: ${name} - ${beforeNext - start}ms`, { reqId });
      await next();
      const afterNext = Date.now();
      logger.trace(`<-- After next middleware: ${name} - ${afterNext - beforeNext}ms`, { reqId });
    });
    const ms = Date.now() - start;
    logger.trace(`<-- Exiting middleware: ${name} - ${ms}ms`, { reqId });
  };
}
__name(wrapMiddlewareWithLogging, "wrapMiddlewareWithLogging");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  wrapMiddlewareWithLogging
});
