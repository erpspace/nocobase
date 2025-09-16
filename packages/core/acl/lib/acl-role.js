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
var acl_role_exports = {};
__export(acl_role_exports, {
  ACLRole: () => ACLRole
});
module.exports = __toCommonJS(acl_role_exports);
var import_lodash = __toESM(require("lodash"));
var import_minimatch = __toESM(require("minimatch"));
var import_acl_available_strategy = require("./acl-available-strategy");
var import_acl_resource = require("./acl-resource");
const _ACLRole = class _ACLRole {
  constructor(acl, name) {
    this.acl = acl;
    this.name = name;
  }
  strategy;
  resources = /* @__PURE__ */ new Map();
  snippets = /* @__PURE__ */ new Set();
  _snippetCache = {
    params: null,
    result: null
  };
  _serializeSet(set) {
    return JSON.stringify([...set].sort());
  }
  getResource(name) {
    return this.resources.get(name);
  }
  setStrategy(value) {
    this.strategy = value;
  }
  getStrategy() {
    if (!this.strategy) {
      return null;
    }
    return import_lodash.default.isString(this.strategy) ? this.acl.availableStrategy.get(this.strategy) : new import_acl_available_strategy.ACLAvailableStrategy(this.acl, this.strategy);
  }
  getResourceActionsParams(resourceName) {
    const resource = this.getResource(resourceName);
    return resource.getActions();
  }
  revokeResource(resourceName) {
    for (const key of [...this.resources.keys()]) {
      if (key === resourceName || key.includes(`${resourceName}.`)) {
        this.resources.delete(key);
      }
    }
  }
  grantAction(path, options) {
    let { resource } = this.getResourceActionFromPath(path);
    const { resourceName, actionName } = this.getResourceActionFromPath(path);
    if (!resource) {
      resource = new import_acl_resource.ACLResource({
        role: this,
        name: resourceName
      });
      this.resources.set(resourceName, resource);
    }
    resource.setAction(actionName, options);
  }
  getActionParams(path) {
    const { action } = this.getResourceActionFromPath(path);
    return action;
  }
  revokeAction(path) {
    const { resource, actionName } = this.getResourceActionFromPath(path);
    resource.removeAction(actionName);
  }
  effectiveSnippets() {
    const currentParams = this._serializeSet(this.snippets);
    if (this._snippetCache.params === currentParams) {
      return this._snippetCache.result;
    }
    const allowedSnippets = /* @__PURE__ */ new Set();
    const rejectedSnippets = /* @__PURE__ */ new Set();
    const availableSnippets = this.acl.snippetManager.snippets;
    for (let snippetRule of this.snippets) {
      const negated = snippetRule.startsWith("!");
      snippetRule = negated ? snippetRule.slice(1) : snippetRule;
      for (const [_2, availableSnippet] of availableSnippets) {
        if ((0, import_minimatch.default)(availableSnippet.name, snippetRule)) {
          if (negated) {
            rejectedSnippets.add(availableSnippet.name);
          } else {
            allowedSnippets.add(availableSnippet.name);
          }
        }
      }
    }
    const effectiveSnippets = new Set([...allowedSnippets].filter((x) => !rejectedSnippets.has(x)));
    this._snippetCache = {
      params: currentParams,
      result: {
        allowed: [...effectiveSnippets],
        rejected: [...rejectedSnippets]
      }
    };
    return this._snippetCache.result;
  }
  snippetAllowed(actionPath) {
    const effectiveSnippets = this.effectiveSnippets();
    const getActions = /* @__PURE__ */ __name((snippets) => {
      return snippets.map((snippetName) => this.acl.snippetManager.snippets.get(snippetName).actions).flat();
    }, "getActions");
    const allowedActions = getActions(effectiveSnippets.allowed);
    const rejectedActions = getActions(effectiveSnippets.rejected);
    const actionMatched = /* @__PURE__ */ __name((actionPath2, actionRule) => {
      return (0, import_minimatch.default)(actionPath2, actionRule);
    }, "actionMatched");
    for (const action of allowedActions) {
      if (actionMatched(actionPath, action)) {
        return true;
      }
    }
    for (const action of rejectedActions) {
      if (actionMatched(actionPath, action)) {
        return false;
      }
    }
    return null;
  }
  toJSON() {
    const actions = {};
    for (const resourceName of this.resources.keys()) {
      const resourceActions = this.getResourceActionsParams(resourceName);
      for (const actionName of Object.keys(resourceActions)) {
        actions[`${resourceName}:${actionName}`] = resourceActions[actionName];
      }
    }
    return import_lodash.default.cloneDeep({
      role: this.name,
      strategy: this.strategy,
      actions,
      snippets: Array.from(this.snippets)
    });
  }
  getResourceActionFromPath(path) {
    const [resourceName, actionName] = path.split(":");
    const resource = this.resources.get(resourceName);
    let action = null;
    if (resource) {
      action = resource.getAction(actionName);
    }
    return {
      resourceName,
      actionName,
      resource,
      action
    };
  }
};
__name(_ACLRole, "ACLRole");
let ACLRole = _ACLRole;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ACLRole
});
