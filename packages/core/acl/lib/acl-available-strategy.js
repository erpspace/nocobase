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
var acl_available_strategy_exports = {};
__export(acl_available_strategy_exports, {
  ACLAvailableStrategy: () => ACLAvailableStrategy,
  predicate: () => predicate
});
module.exports = __toCommonJS(acl_available_strategy_exports);
var import_lodash = __toESM(require("lodash"));
const predicate = {
  own: {
    filter: {
      createdById: "{{ ctx.state.currentUser.id }}"
    }
  },
  all: {}
};
const _ACLAvailableStrategy = class _ACLAvailableStrategy {
  acl;
  options;
  actionsAsObject;
  allowConfigure;
  constructor(acl, options) {
    this.acl = acl;
    this.options = options;
    this.allowConfigure = options.allowConfigure;
    let actions = this.options.actions;
    if (import_lodash.default.isString(actions) && actions != "*") {
      actions = [actions];
    }
    if (import_lodash.default.isArray(actions)) {
      this.actionsAsObject = actions.reduce((carry, action) => {
        const [actionName, predicate2] = action.split(":");
        carry[actionName] = predicate2;
        return carry;
      }, {});
    }
  }
  matchAction(actionName) {
    if (this.options.actions == "*") {
      return true;
    }
    if (Object.prototype.hasOwnProperty.call(this.actionsAsObject || {}, actionName)) {
      const predicateName = this.actionsAsObject[actionName];
      if (predicateName) {
        return import_lodash.default.cloneDeep(predicate[predicateName]);
      }
      return true;
    }
    return false;
  }
  allow(resourceName, actionName) {
    return this.matchAction(this.acl.resolveActionAlias(actionName));
  }
};
__name(_ACLAvailableStrategy, "ACLAvailableStrategy");
let ACLAvailableStrategy = _ACLAvailableStrategy;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ACLAvailableStrategy,
  predicate
});
