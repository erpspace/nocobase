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
var acl_exports = {};
__export(acl_exports, {
  ACL: () => ACL
});
module.exports = __toCommonJS(acl_exports);
var import_utils = require("@nocobase/utils");
var import_events = __toESM(require("events"));
var import_koa_compose = __toESM(require("koa-compose"));
var import_lodash = __toESM(require("lodash"));
var import_acl_available_action = require("./acl-available-action");
var import_acl_available_strategy = require("./acl-available-strategy");
var import_acl_role = require("./acl-role");
var import_allow_manager = require("./allow-manager");
var import_fixed_params_manager = __toESM(require("./fixed-params-manager"));
var import_snippet_manager = __toESM(require("./snippet-manager"));
var import_no_permission_error = require("./errors/no-permission-error");
var import_utils2 = require("./utils");
const _ACL = class _ACL extends import_events.default {
  /**
   * @internal
   */
  availableStrategy = /* @__PURE__ */ new Map();
  /**
   * @internal
   */
  allowManager = new import_allow_manager.AllowManager(this);
  /**
   * @internal
   */
  snippetManager = new import_snippet_manager.default();
  /**
   * @internal
   */
  roles = /* @__PURE__ */ new Map();
  /**
   * @internal
   */
  actionAlias = /* @__PURE__ */ new Map();
  availableActions = /* @__PURE__ */ new Map();
  fixedParamsManager = new import_fixed_params_manager.default();
  middlewares;
  strategyResources = null;
  constructor() {
    super();
    this.middlewares = new import_utils.Toposort();
    this.beforeGrantAction((ctx) => {
      if (import_lodash.default.isPlainObject(ctx.params) && ctx.params.own) {
        ctx.params = import_lodash.default.merge(ctx.params, import_acl_available_strategy.predicate.own);
      }
    });
    this.beforeGrantAction((ctx) => {
      const actionName = this.resolveActionAlias(ctx.actionName);
      if (import_lodash.default.isPlainObject(ctx.params)) {
        if ((actionName === "create" || actionName === "update") && ctx.params.fields) {
          ctx.params = {
            ...import_lodash.default.omit(ctx.params, "fields"),
            whitelist: ctx.params.fields
          };
        }
      }
    });
    this.use(this.allowManager.aclMiddleware(), {
      tag: "allow-manager",
      before: "core"
    });
    this.addCoreMiddleware();
  }
  setStrategyResources(resources) {
    this.strategyResources = new Set(resources);
  }
  getStrategyResources() {
    return this.strategyResources ? [...this.strategyResources] : null;
  }
  appendStrategyResource(resource) {
    if (!this.strategyResources) {
      this.strategyResources = /* @__PURE__ */ new Set();
    }
    this.strategyResources.add(resource);
  }
  removeStrategyResource(resource) {
    this.strategyResources.delete(resource);
  }
  define(options) {
    const roleName = options.role;
    const role = new import_acl_role.ACLRole(this, roleName);
    if (options.strategy) {
      role.strategy = options.strategy;
    }
    const actions = options.actions || {};
    for (const [actionName, actionParams] of Object.entries(actions)) {
      role.grantAction(actionName, actionParams);
    }
    this.roles.set(roleName, role);
    return role;
  }
  getRole(name) {
    return this.roles.get(name);
  }
  getRoles(names) {
    return names.map((name) => this.getRole(name)).filter((x) => Boolean(x));
  }
  removeRole(name) {
    return this.roles.delete(name);
  }
  setAvailableAction(name, options = {}) {
    this.availableActions.set(name, new import_acl_available_action.ACLAvailableAction(name, options));
    if (options.aliases) {
      const aliases = import_lodash.default.isArray(options.aliases) ? options.aliases : [options.aliases];
      for (const alias of aliases) {
        this.actionAlias.set(alias, name);
      }
    }
  }
  getAvailableAction(name) {
    const actionName = this.actionAlias.get(name) || name;
    return this.availableActions.get(actionName);
  }
  getAvailableActions() {
    return this.availableActions;
  }
  setAvailableStrategy(name, options) {
    this.availableStrategy.set(name, new import_acl_available_strategy.ACLAvailableStrategy(this, options));
  }
  beforeGrantAction(listener) {
    this.addListener("beforeGrantAction", listener);
  }
  can(options) {
    var _a;
    if (options.role) {
      return import_lodash.default.cloneDeep(this.getCanByRole(options));
    }
    if ((_a = options.roles) == null ? void 0 : _a.length) {
      if (options.roles.includes("root")) {
        options.roles = ["root"];
      }
      return import_lodash.default.cloneDeep(this.getCanByRoles(options));
    }
    return null;
  }
  getCanByRoles(options) {
    let canResult = null;
    for (const role of options.roles) {
      const result = this.getCanByRole({
        role,
        ...options
      });
      if (!canResult) {
        canResult = result;
        canResult && (0, import_utils2.removeEmptyParams)(canResult.params);
      } else if (canResult && result) {
        canResult.params = (0, import_utils2.mergeAclActionParams)(canResult.params, result.params);
      }
    }
    return canResult;
  }
  getCanByRole(options) {
    const { role, resource, action, rawResourceName } = options;
    const aclRole = this.roles.get(role);
    if (!aclRole) {
      return null;
    }
    const actionPath = `${rawResourceName ? rawResourceName : resource}:${action}`;
    const snippetAllowed = aclRole.snippetAllowed(actionPath);
    const fixedParams = this.fixedParamsManager.getParams(rawResourceName ? rawResourceName : resource, action);
    const mergeParams = /* @__PURE__ */ __name((result) => {
      const params = result["params"] || {};
      const mergedParams = (0, import_utils.assign)(params, fixedParams);
      if (Object.keys(mergedParams).length) {
        result["params"] = mergedParams;
      } else {
        delete result["params"];
      }
      return result;
    }, "mergeParams");
    const aclResource = aclRole.getResource(resource);
    if (aclResource) {
      const actionParams = aclResource.getAction(action);
      if (actionParams) {
        return mergeParams({
          role,
          resource,
          action,
          params: actionParams
        });
      } else {
        return null;
      }
    }
    const roleStrategy = aclRole.getStrategy();
    if (!roleStrategy && !snippetAllowed) {
      return null;
    }
    let roleStrategyParams;
    if (this.strategyResources === null || this.strategyResources.has(resource)) {
      roleStrategyParams = roleStrategy == null ? void 0 : roleStrategy.allow(resource, this.resolveActionAlias(action));
    }
    if (!roleStrategyParams && snippetAllowed) {
      roleStrategyParams = {};
    }
    if (roleStrategyParams) {
      const result = { role, resource, action, params: {} };
      if (import_lodash.default.isPlainObject(roleStrategyParams)) {
        result["params"] = roleStrategyParams;
      }
      return mergeParams(result);
    }
    return null;
  }
  /**
   * @internal
   */
  resolveActionAlias(action) {
    return this.actionAlias.get(action) ? this.actionAlias.get(action) : action;
  }
  use(fn, options) {
    this.middlewares.add(fn, {
      group: "prep",
      ...options
    });
  }
  allow(resourceName, actionNames, condition) {
    return this.skip(resourceName, actionNames, condition);
  }
  /**
   * @deprecated
   */
  skip(resourceName, actionNames, condition) {
    if (!Array.isArray(actionNames)) {
      actionNames = [actionNames];
    }
    for (const actionName of actionNames) {
      this.allowManager.allow(resourceName, actionName, condition);
    }
  }
  /**
   * @internal
   */
  async parseJsonTemplate(json, ctx) {
    var _a, _b, _c, _d, _e;
    if (json.filter) {
      (_b = (_a = ctx.logger) == null ? void 0 : _a.info) == null ? void 0 : _b.call(_a, "parseJsonTemplate.raw", JSON.parse(JSON.stringify(json.filter)));
      const timezone = (_c = ctx == null ? void 0 : ctx.get) == null ? void 0 : _c.call(ctx, "x-timezone");
      const state = JSON.parse(JSON.stringify(ctx.state));
      const filter = await (0, import_utils.parseFilter)(json.filter, {
        timezone,
        now: (/* @__PURE__ */ new Date()).toISOString(),
        vars: {
          ctx: {
            state
          },
          $user: getUser(ctx),
          $nRole: /* @__PURE__ */ __name(() => state.currentRole, "$nRole")
        }
      });
      json.filter = filter;
      (_e = (_d = ctx.logger) == null ? void 0 : _d.info) == null ? void 0 : _e.call(_d, "parseJsonTemplate.parsed", filter);
    }
    return json;
  }
  middleware() {
    const acl = this;
    return /* @__PURE__ */ __name(async function ACLMiddleware(ctx, next) {
      const roleName = ctx.state.currentRole || "anonymous";
      const { resourceName: rawResourceName, actionName } = ctx.action;
      let resourceName = rawResourceName;
      if (rawResourceName.includes(".")) {
        resourceName = rawResourceName.split(".").pop();
      }
      if (ctx.getCurrentRepository) {
        const currentRepository = ctx.getCurrentRepository();
        if (currentRepository && currentRepository.targetCollection) {
          resourceName = ctx.getCurrentRepository().targetCollection.name;
        }
      }
      ctx.can = (options) => {
        const roles = ctx.state.currentRoles || [roleName];
        const can = acl.can({ roles, ...options });
        if (!can) {
          return null;
        }
        return can;
      };
      ctx.permission = {
        can: ctx.can({ resource: resourceName, action: actionName, rawResourceName }),
        resourceName,
        actionName
      };
      return await (0, import_koa_compose.default)(acl.middlewares.nodes)(ctx, next);
    }, "ACLMiddleware");
  }
  /**
   * @internal
   */
  async getActionParams(ctx) {
    var _a;
    const roleNames = ((_a = ctx.state.currentRoles) == null ? void 0 : _a.length) ? ctx.state.currentRoles : "anonymous";
    const { resourceName: rawResourceName, actionName } = ctx.action;
    let resourceName = rawResourceName;
    if (rawResourceName.includes(".")) {
      resourceName = rawResourceName.split(".").pop();
    }
    if (ctx.getCurrentRepository) {
      const currentRepository = ctx.getCurrentRepository();
      if (currentRepository && currentRepository.targetCollection) {
        resourceName = ctx.getCurrentRepository().targetCollection.name;
      }
    }
    ctx.can = (options) => {
      const can = this.can({ roles: roleNames, ...options });
      if (can) {
        return import_lodash.default.cloneDeep(can);
      }
      return null;
    };
    ctx.permission = {
      can: ctx.can({ resource: resourceName, action: actionName, rawResourceName }),
      resourceName,
      actionName
    };
    await (0, import_koa_compose.default)(this.middlewares.nodes)(ctx, async () => {
    });
  }
  addFixedParams(resource, action, merger) {
    this.fixedParamsManager.addParams(resource, action, merger);
  }
  registerSnippet(snippet) {
    this.snippetManager.register(snippet);
  }
  /**
   * @internal
   */
  filterParams(ctx, resourceName, params) {
    var _a, _b, _c;
    if ((_a = params == null ? void 0 : params.filter) == null ? void 0 : _a.createdById) {
      const collection = ctx.db.getCollection(resourceName);
      if (!collection || !collection.getField("createdById")) {
        throw new import_no_permission_error.NoPermissionError("createdById field not found");
      }
    }
    if ((_c = (_b = params == null ? void 0 : params.filter) == null ? void 0 : _b.$or) == null ? void 0 : _c.length) {
      const checkCreatedById = /* @__PURE__ */ __name((items) => {
        return items.some(
          (x) => {
            var _a2, _b2;
            return "createdById" in x || ((_a2 = x.$or) == null ? void 0 : _a2.some((y) => "createdById" in y)) || ((_b2 = x.$and) == null ? void 0 : _b2.some((y) => "createdById" in y));
          }
        );
      }, "checkCreatedById");
      if (checkCreatedById(params.filter.$or)) {
        const collection = ctx.db.getCollection(resourceName);
        if (!collection || !collection.getField("createdById")) {
          throw new import_no_permission_error.NoPermissionError("createdById field not found");
        }
      }
    }
    return params;
  }
  addCoreMiddleware() {
    const acl = this;
    this.middlewares.add(
      async (ctx, next) => {
        var _a, _b, _c, _d;
        const resourcerAction = ctx.action;
        const { resourceName, actionName } = ctx.permission;
        const permission = ctx.permission;
        ((_a = ctx.log) == null ? void 0 : _a.debug) && ctx.log.debug("ctx permission", permission);
        if ((!permission.can || typeof permission.can !== "object") && !permission.skip) {
          ctx.throw(403, "No permissions");
          return;
        }
        const params = ((_b = permission.can) == null ? void 0 : _b.params) || acl.fixedParamsManager.getParams(resourceName, actionName);
        ((_c = ctx.log) == null ? void 0 : _c.debug) && ctx.log.debug("acl params", params);
        try {
          if (params && resourcerAction.mergeParams) {
            const filteredParams = acl.filterParams(ctx, resourceName, params);
            const parsedParams = await acl.parseJsonTemplate(filteredParams, ctx);
            ctx.permission.parsedParams = parsedParams;
            ((_d = ctx.log) == null ? void 0 : _d.debug) && ctx.log.debug("acl parsedParams", parsedParams);
            ctx.permission.rawParams = import_lodash.default.cloneDeep(resourcerAction.params);
            if (parsedParams.appends && resourcerAction.params.fields) {
              for (const queryField of resourcerAction.params.fields) {
                if (parsedParams.appends.indexOf(queryField) !== -1) {
                  if (!resourcerAction.params.appends) {
                    resourcerAction.params.appends = [];
                  }
                  resourcerAction.params.appends.push(queryField);
                  resourcerAction.params.fields = resourcerAction.params.fields.filter((f) => f !== queryField);
                }
              }
            }
            const isEmptyFields = resourcerAction.params.fields && resourcerAction.params.fields.length === 0;
            resourcerAction.mergeParams(parsedParams, {
              appends: /* @__PURE__ */ __name((x, y) => {
                if (!x) {
                  return [];
                }
                if (!y) {
                  return x;
                }
                return x.filter((i) => y.includes(i.split(".").shift()));
              }, "appends")
            });
            if (isEmptyFields) {
              resourcerAction.params.fields = [];
            }
            ctx.permission.mergedParams = import_lodash.default.cloneDeep(resourcerAction.params);
          }
        } catch (e) {
          if (e instanceof import_no_permission_error.NoPermissionError) {
            ctx.throw(403, "No permissions");
            return;
          }
          throw e;
        }
        await next();
      },
      {
        tag: "core",
        group: "core"
      }
    );
  }
  isAvailableAction(actionName) {
    return this.availableActions.has(this.resolveActionAlias(actionName));
  }
};
__name(_ACL, "ACL");
let ACL = _ACL;
function getUser(ctx) {
  return async ({ fields }) => {
    var _a, _b;
    const userFields = fields.filter((f) => f && ctx.db.getFieldByPath("users." + f));
    (_a = ctx.logger) == null ? void 0 : _a.info("filter-parse: ", { userFields });
    if (!ctx.state.currentUser) {
      return;
    }
    if (!userFields.length) {
      return;
    }
    const user = await ctx.db.getRepository("users").findOne({
      filterByTk: ctx.state.currentUser.id,
      fields: userFields
    });
    (_b = ctx.logger) == null ? void 0 : _b.info("filter-parse: ", {
      $user: user == null ? void 0 : user.toJSON()
    });
    return user;
  };
}
__name(getUser, "getUser");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ACL
});
