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
var action_exports = {};
__export(action_exports, {
  Action: () => Action,
  default: () => action_default
});
module.exports = __toCommonJS(action_exports);
var import_utils = require("@nocobase/utils");
var import_koa_compose = __toESM(require("koa-compose"));
var import_lodash = __toESM(require("lodash"));
var import_middleware = __toESM(require("./middleware"));
const _Action = class _Action {
  handler;
  resource;
  name;
  options;
  context = {};
  params = {};
  actionName;
  resourceName;
  /**
   * This method is deprecated and should not be used.
   * Use {@link this.sourceId} instead.
   * @deprecated
   */
  resourceOf;
  sourceId;
  middlewares = [];
  /**
   * @internal
   */
  constructor(options) {
    options = (0, import_utils.requireModule)(options);
    if (typeof options === "function") {
      options = { handler: options };
    }
    const { middleware, middlewares = [], handler, ...params } = options;
    this.middlewares = import_middleware.default.toInstanceArray(middleware || middlewares);
    this.handler = handler;
    this.options = options;
    this.mergeParams(params);
  }
  /**
   * @internal
   */
  toJSON() {
    return {
      actionName: this.actionName,
      resourceName: this.resourceName,
      resourceOf: this.sourceId,
      sourceId: this.sourceId,
      params: this.params
    };
  }
  /**
   * @internal
   */
  clone() {
    const options = import_lodash.default.cloneDeep(this.options);
    delete options.middleware;
    delete options.middlewares;
    const action = new _Action(options);
    action.setName(this.name);
    action.setResource(this.resource);
    action.middlewares.push(...this.middlewares);
    return action;
  }
  /**
   * @internal
   */
  setContext(context) {
    this.context = context;
  }
  mergeParams(params, strategies = {}) {
    if (!this.params) {
      this.params = {};
    }
    if (!params) {
      return;
    }
    (0, import_utils.assign)(this.params, params, {
      filter: "andMerge",
      fields: "intersect",
      appends: "union",
      except: "union",
      whitelist: "intersect",
      blacklist: "intersect",
      sort: "overwrite",
      ...strategies
    });
  }
  /**
   * @internal
   */
  setResource(resource) {
    this.resource = resource;
    return this;
  }
  /**
   * @internal
   */
  getResource() {
    return this.resource;
  }
  /**
   * @internal
   */
  getOptions() {
    return this.options;
  }
  /**
   * @internal
   */
  setName(name) {
    this.name = name;
    return this;
  }
  /**
   * @internal
   */
  getName() {
    return this.name;
  }
  /**
   * @internal
   */
  getMiddlewareHandlers() {
    return this.middlewares.filter((middleware) => middleware.canAccess(this.name)).map((middleware) => middleware.getHandler());
  }
  /**
   * @internal
   */
  getHandler() {
    const handler = (0, import_utils.requireModule)(this.handler || this.resource.resourcer.getRegisteredHandler(this.name));
    if (typeof handler !== "function") {
      throw new Error("Handler must be a function!");
    }
    return handler;
  }
  /**
   * @internal
   */
  getHandlers() {
    const handlers = [
      ...this.resource.resourcer.getMiddlewares(),
      ...this.getMiddlewareHandlers(),
      this.getHandler()
    ].filter(Boolean);
    return handlers.map((fn) => (0, import_utils.wrapMiddlewareWithLogging)(fn));
  }
  /**
   * @internal
   */
  async execute(context, next) {
    return await (0, import_koa_compose.default)(this.getHandlers())(context, next);
  }
  /**
   * @internal
   */
  static toInstanceMap(actions, resource) {
    return new Map(
      Object.entries(actions).map(([key, options]) => {
        let action;
        if (options instanceof _Action) {
          action = options;
        } else {
          action = new _Action(options);
        }
        action.setName(key);
        action.setResource(resource);
        resource && action.middlewares.unshift(...resource.middlewares);
        return [key, action];
      })
    );
  }
};
__name(_Action, "Action");
let Action = _Action;
var action_default = Action;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Action
});
