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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var middleware_exports = {};
__export(middleware_exports, {
  Middleware: () => Middleware,
  branch: () => branch,
  default: () => middleware_default
});
module.exports = __toCommonJS(middleware_exports);
var import_koa_compose = __toESM(require("koa-compose"));
var import_utils = require("@nocobase/utils");
const _Middleware = class _Middleware {
  options;
  middlewares = [];
  constructor(options) {
    options = (0, import_utils.requireModule)(options);
    if (typeof options === "function") {
      this.options = { handler: options };
    } else {
      this.options = options;
    }
  }
  getHandler() {
    const handler = (0, import_utils.requireModule)(this.options.handler);
    if (typeof handler !== "function") {
      throw new Error("Handler must be a function!");
    }
    return (ctx, next) => (0, import_koa_compose.default)([handler, ...this.middlewares])(ctx, next);
  }
  use(middleware) {
    this.middlewares.push(middleware);
  }
  disuse(middleware) {
    this.middlewares.splice(this.middlewares.indexOf(middleware), 1);
  }
  canAccess(name) {
    const { only = [], except = [] } = this.options;
    if (only.length > 0) {
      return only.includes(name);
    }
    if (except.length > 0) {
      return !except.includes(name);
    }
    return true;
  }
  static toInstanceArray(middlewares) {
    if (!middlewares) {
      return [];
    }
    if (!Array.isArray(middlewares)) {
      middlewares = [middlewares];
    }
    return middlewares.map((middleware) => {
      if (middleware instanceof _Middleware) {
        return middleware;
      }
      if (typeof middleware === "object") {
        return new _Middleware(middleware);
      }
      if (typeof middleware === "function") {
        return new _Middleware({ handler: middleware });
      }
    });
  }
};
__name(_Middleware, "Middleware");
let Middleware = _Middleware;
var middleware_default = Middleware;
function branch(map = {}, reducer, options = {}) {
  return (ctx, next) => {
    const key = reducer(ctx);
    if (!key) {
      return options.keyNotFound ? options.keyNotFound(ctx, next) : ctx.throw(404);
    }
    const handler = map[key];
    if (!handler) {
      return options.handlerNotSet ? options.handlerNotSet(ctx, next) : ctx.throw(404);
    }
    return handler(ctx, next);
  };
}
__name(branch, "branch");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Middleware,
  branch
});
