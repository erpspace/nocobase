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
var acl_resource_exports = {};
__export(acl_resource_exports, {
  ACLResource: () => ACLResource
});
module.exports = __toCommonJS(acl_resource_exports);
var import_lodash = __toESM(require("lodash"));
const _ACLResource = class _ACLResource {
  actions = /* @__PURE__ */ new Map();
  acl;
  role;
  name;
  constructor(options) {
    this.acl = options.role.acl;
    this.role = options.role;
    this.name = options.name;
    const actionsOption = options.actions || {};
    for (const actionName of Object.keys(actionsOption)) {
      this.actions.set(actionName, actionsOption[actionName]);
    }
  }
  getActions() {
    return Array.from(this.actions.keys()).reduce((carry, key) => {
      carry[key] = this.actions.get(key);
      return carry;
    }, {});
  }
  getAction(name) {
    const result = this.actions.get(name) || this.actions.get(this.acl.resolveActionAlias(name));
    if (!result) {
      return null;
    }
    if (Array.isArray(result.fields) && result.fields.length > 0) {
      result.fields = import_lodash.default.uniq(result.fields);
    }
    return import_lodash.default.cloneDeep(result);
  }
  setAction(name, params) {
    const context = {
      role: this.role,
      acl: this.role.acl,
      params: params || {},
      path: `${this.name}:${name}`,
      resourceName: this.name,
      actionName: name
    };
    this.acl.emit("beforeGrantAction", context);
    this.actions.set(name, context.params);
  }
  setActions(actions) {
    for (const actionName of Object.keys(actions)) {
      this.setAction(actionName, actions[actionName]);
    }
  }
  removeAction(name) {
    this.actions.delete(name);
  }
};
__name(_ACLResource, "ACLResource");
let ACLResource = _ACLResource;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ACLResource
});
