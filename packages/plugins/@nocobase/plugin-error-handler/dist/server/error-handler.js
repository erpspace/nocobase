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
var error_handler_exports = {};
__export(error_handler_exports, {
  ErrorHandler: () => ErrorHandler
});
module.exports = __toCommonJS(error_handler_exports);
class ErrorHandler {
  handlers = [];
  register(guard, render) {
    this.handlers.push({
      guard,
      render
    });
  }
  defaultHandler(err, ctx) {
    ctx.status = err.statusCode || err.status || 500;
    let message = err.message;
    if (err.cause) {
      message += `: ${err.cause.message}`;
    }
    ctx.body = {
      errors: [
        {
          message,
          code: err.code
        }
      ]
    };
  }
  renderError(err, ctx) {
    for (const handler of this.handlers) {
      if (handler.guard(err)) {
        return handler.render(err, ctx);
      }
    }
    this.defaultHandler(err, ctx);
  }
  middleware() {
    const self = this;
    return async function errorHandler(ctx, next) {
      try {
        await next();
      } catch (err) {
        ctx.log.error(err.message, { method: "error-handler", err: err.stack, cause: err.cause });
        if (err.statusCode) {
          ctx.status = err.statusCode;
        }
        self.renderError(err, ctx);
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ErrorHandler
});
