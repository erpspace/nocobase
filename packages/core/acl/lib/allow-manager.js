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
var allow_manager_exports = {};
__export(allow_manager_exports, {
  AllowManager: () => AllowManager
});
module.exports = __toCommonJS(allow_manager_exports);
const _AllowManager = class _AllowManager {
  constructor(acl) {
    this.acl = acl;
    this.registerAllowCondition("loggedIn", (ctx) => {
      return ctx.state.currentUser;
    });
    this.registerAllowCondition("public", (ctx) => {
      return true;
    });
    this.registerAllowCondition("allowConfigure", async (ctx) => {
      var _a;
      const roleName = ctx.state.currentRole;
      if (!roleName) {
        return false;
      }
      const role = acl.getRole(roleName);
      if (!role) {
        return false;
      }
      return (_a = role.getStrategy()) == null ? void 0 : _a.allowConfigure;
    });
  }
  skipActions = /* @__PURE__ */ new Map();
  registeredCondition = /* @__PURE__ */ new Map();
  allow(resourceName, actionName, condition) {
    const actionMap = this.skipActions.get(resourceName) || /* @__PURE__ */ new Map();
    actionMap.set(actionName, condition || true);
    this.skipActions.set(resourceName, actionMap);
  }
  getAllowedConditions(resourceName, actionName) {
    const fetchActionSteps = ["*", resourceName];
    const results = [];
    for (const fetchActionStep of fetchActionSteps) {
      const resource = this.skipActions.get(fetchActionStep);
      if (resource) {
        for (const fetchActionStep2 of ["*", actionName]) {
          const condition = resource.get(fetchActionStep2);
          if (condition) {
            results.push(typeof condition === "string" ? this.registeredCondition.get(condition) : condition);
          }
        }
      }
    }
    return results;
  }
  registerAllowCondition(name, condition) {
    this.registeredCondition.set(name, condition);
  }
  async isAllowed(resourceName, actionName, ctx) {
    const skippedConditions = this.getAllowedConditions(resourceName, actionName);
    for (const skippedCondition of skippedConditions) {
      if (skippedCondition) {
        let skipResult = false;
        if (typeof skippedCondition === "function") {
          skipResult = await skippedCondition(ctx);
        } else if (skippedCondition) {
          skipResult = true;
        }
        if (skipResult) {
          return true;
        }
      }
    }
    return false;
  }
  aclMiddleware() {
    return async (ctx, next) => {
      const { resourceName, actionName } = ctx.action;
      const skip = await this.acl.allowManager.isAllowed(resourceName, actionName, ctx);
      if (skip) {
        ctx.permission = {
          ...ctx.permission || {},
          skip: true
        };
      }
      await next();
    };
  }
};
__name(_AllowManager, "AllowManager");
let AllowManager = _AllowManager;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AllowManager
});
