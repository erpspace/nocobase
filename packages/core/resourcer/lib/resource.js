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
var resource_exports = {};
__export(resource_exports, {
  Resource: () => Resource,
  default: () => resource_default
});
module.exports = __toCommonJS(resource_exports);
var import_lodash = __toESM(require("lodash"));
var import_action = __toESM(require("./action"));
var import_middleware = __toESM(require("./middleware"));
const _Resource = class _Resource {
  resourcer;
  middlewares;
  actions = /* @__PURE__ */ new Map();
  options;
  except;
  constructor(options, resourcer) {
    const { middleware, middlewares, actions = {}, only = [], except = [] } = options;
    this.options = options;
    this.resourcer = resourcer;
    this.middlewares = import_middleware.default.toInstanceArray(middleware || middlewares);
    let excludes = [];
    for (const [name, handler] of resourcer.getRegisteredHandlers()) {
      if (!actions[name]) {
        actions[name] = handler;
      }
    }
    if (except.length > 0) {
      excludes = except;
    } else if (only.length > 0) {
      excludes = Object.keys(actions).filter((name) => !only.includes(name));
    }
    this.except = excludes;
    this.actions = import_action.default.toInstanceMap(import_lodash.default.omit(actions, excludes), this);
  }
  getName() {
    return this.options.name;
  }
  getExcept() {
    return this.except;
  }
  addAction(name, handler) {
    if (this.except.includes(name)) {
      throw new Error(`${name} action is not allowed`);
    }
    if (this.actions.has(name)) {
      throw new Error(`${name} action already exists`);
    }
    const action = new import_action.default(handler);
    action.setName(name);
    action.setResource(this);
    action.middlewares.unshift(...this.middlewares);
    this.actions.set(name, action);
  }
  getAction(action) {
    if (this.except.includes(action)) {
      throw new Error(`${action} action is not allowed`);
    }
    if (!this.actions.has(action)) {
      throw new Error(`${action} action does not exist`);
    }
    return this.actions.get(action);
  }
};
__name(_Resource, "Resource");
let Resource = _Resource;
var resource_default = Resource;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Resource
});
