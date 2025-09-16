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
  mergeAclActionParams: () => mergeAclActionParams,
  mergeRole: () => mergeRole,
  removeEmptyParams: () => removeEmptyParams
});
module.exports = __toCommonJS(acl_role_exports);
var import_utils = require("@nocobase/utils");
var import_lodash = __toESM(require("lodash"));
function mergeRole(roles) {
  const result = {
    roles: [],
    strategy: {},
    actions: null,
    snippets: [],
    resources: null
  };
  const allSnippets = [];
  for (const role of roles) {
    const jsonRole = role.toJSON();
    result.roles = mergeRoleNames(result.roles, jsonRole.role);
    result.strategy = mergeRoleStrategy(result.strategy, jsonRole.strategy);
    result.actions = mergeRoleActions(result.actions, jsonRole.actions);
    result.resources = mergeRoleResources(result.resources, [...role.resources.keys()]);
    if (import_lodash.default.isArray(jsonRole.snippets)) {
      allSnippets.push(jsonRole.snippets);
    }
  }
  result.snippets = mergeRoleSnippets(allSnippets);
  adjustActionByStrategy(roles, result);
  return result;
}
__name(mergeRole, "mergeRole");
function adjustActionByStrategy(roles, result) {
  const { actions, strategy } = result;
  const actionSet = getAdjustActions(roles);
  if (!import_lodash.default.isEmpty(actions) && !import_lodash.default.isEmpty(strategy == null ? void 0 : strategy.actions) && !import_lodash.default.isEmpty(result.resources)) {
    for (const resource of result.resources) {
      for (const action of strategy.actions) {
        if (actionSet.has(action)) {
          actions[`${resource}:${action}`] = {};
        }
      }
    }
  }
}
__name(adjustActionByStrategy, "adjustActionByStrategy");
function getAdjustActions(roles) {
  var _a;
  const actionSet = /* @__PURE__ */ new Set();
  for (const role of roles) {
    const jsonRole = role.toJSON();
    if (!import_lodash.default.isEmpty((_a = jsonRole.strategy) == null ? void 0 : _a["actions"]) && import_lodash.default.isEmpty(jsonRole.actions)) {
      jsonRole.strategy["actions"].forEach((x) => !x.includes("own") && actionSet.add(x));
    }
  }
  return actionSet;
}
__name(getAdjustActions, "getAdjustActions");
function mergeRoleNames(sourceRoleNames, newRoleName) {
  return newRoleName ? sourceRoleNames.concat(newRoleName) : sourceRoleNames;
}
__name(mergeRoleNames, "mergeRoleNames");
function mergeRoleStrategy(sourceStrategy, newStrategy) {
  if (!newStrategy) {
    return sourceStrategy;
  }
  if (import_lodash.default.isArray(newStrategy.actions)) {
    if (!sourceStrategy.actions) {
      sourceStrategy.actions = newStrategy.actions;
    } else {
      const actions = sourceStrategy.actions.concat(newStrategy.actions);
      return {
        ...sourceStrategy,
        actions: [...new Set(actions)]
      };
    }
  }
  return sourceStrategy;
}
__name(mergeRoleStrategy, "mergeRoleStrategy");
function mergeRoleActions(sourceActions, newActions) {
  if (import_lodash.default.isEmpty(sourceActions)) return newActions;
  if (import_lodash.default.isEmpty(newActions)) return sourceActions;
  const result = {};
  [...new Set(Reflect.ownKeys(sourceActions).concat(Reflect.ownKeys(newActions)))].forEach((key) => {
    if (import_lodash.default.has(sourceActions, key) && import_lodash.default.has(newActions, key)) {
      result[key] = mergeAclActionParams(sourceActions[key], newActions[key]);
      return;
    }
    result[key] = import_lodash.default.has(sourceActions, key) ? sourceActions[key] : newActions[key];
  });
  return result;
}
__name(mergeRoleActions, "mergeRoleActions");
function mergeRoleSnippets(allRoleSnippets) {
  if (!allRoleSnippets.length) {
    return [];
  }
  const allSnippets = allRoleSnippets.flat();
  const isExclusion = /* @__PURE__ */ __name((value) => value.startsWith("!"), "isExclusion");
  const includes = new Set(allSnippets.filter((x) => !isExclusion(x)));
  const excludes = new Set(allSnippets.filter(isExclusion));
  const domainRoleMap = /* @__PURE__ */ new Map();
  allRoleSnippets.forEach((roleSnippets, i) => {
    roleSnippets.filter((x) => x.endsWith(".*") && !isExclusion(x)).forEach((include) => {
      const domain = include.slice(0, -1);
      if (!domainRoleMap.has(domain)) {
        domainRoleMap.set(domain, /* @__PURE__ */ new Set());
      }
      domainRoleMap.get(domain).add(i);
    });
  });
  const excludesSet = /* @__PURE__ */ new Set();
  for (const snippet of excludes) {
    if (allRoleSnippets.every((x) => x.includes(snippet))) {
      excludesSet.add(snippet);
    }
  }
  for (const [domain, indexes] of domainRoleMap.entries()) {
    const fullDomain = `${domain}.*`;
    if (includes.has(fullDomain)) {
      excludesSet.delete(`!${fullDomain}`);
    }
    for (const roleIndex of indexes) {
      for (const exclude of allRoleSnippets[roleIndex]) {
        if (exclude.startsWith(`!${domain}`) && exclude !== `!${fullDomain}`) {
          if ([...indexes].every((i) => allRoleSnippets[i].includes(exclude))) {
            excludesSet.add(exclude);
          }
        }
      }
    }
  }
  if (includes.size > 0) {
    for (const x of [...excludesSet]) {
      const exactMatch = x.slice(1);
      const segments = exactMatch.split(".");
      if (segments.length > 1 && segments[1] !== "*") {
        const parentDomain = segments[0] + ".*";
        if (!includes.has(parentDomain)) {
          excludesSet.delete(x);
        }
      }
    }
  }
  return [...includes, ...excludesSet];
}
__name(mergeRoleSnippets, "mergeRoleSnippets");
function mergeRoleResources(sourceResources, newResources) {
  if (sourceResources === null) {
    return newResources;
  }
  return [...new Set(sourceResources.concat(newResources))];
}
__name(mergeRoleResources, "mergeRoleResources");
function mergeAclActionParams(sourceParams, targetParams) {
  if (import_lodash.default.isEmpty(sourceParams) || import_lodash.default.isEmpty(targetParams)) {
    return {};
  }
  removeUnmatchedParams(sourceParams, targetParams, ["fields", "whitelist", "appends"]);
  const andMerge = /* @__PURE__ */ __name((x, y) => {
    if (import_lodash.default.isEmpty(x) || import_lodash.default.isEmpty(y)) {
      return [];
    }
    return import_lodash.default.uniq(x.concat(y)).filter(Boolean);
  }, "andMerge");
  const mergedParams = (0, import_utils.assign)(targetParams, sourceParams, {
    own: /* @__PURE__ */ __name((x, y) => x || y, "own"),
    filter: /* @__PURE__ */ __name((x, y) => {
      if (import_lodash.default.isEmpty(x) || import_lodash.default.isEmpty(y)) {
        return {};
      }
      const xHasOr = import_lodash.default.has(x, "$or"), yHasOr = import_lodash.default.has(y, "$or");
      let $or = [x, y];
      if (xHasOr && !yHasOr) {
        $or = [...x.$or, y];
      } else if (!xHasOr && yHasOr) {
        $or = [x, ...y.$or];
      } else if (xHasOr && yHasOr) {
        $or = [...x.$or, ...y.$or];
      }
      return { $or: import_lodash.default.uniqWith($or, import_lodash.default.isEqual) };
    }, "filter"),
    fields: andMerge,
    whitelist: andMerge,
    appends: "union"
  });
  removeEmptyParams(mergedParams);
  return mergedParams;
}
__name(mergeAclActionParams, "mergeAclActionParams");
function removeEmptyParams(params) {
  if (!import_lodash.default.isObject(params)) {
    return;
  }
  Object.keys(params).forEach((key) => {
    if (import_lodash.default.isEmpty(params[key])) {
      delete params[key];
    }
  });
}
__name(removeEmptyParams, "removeEmptyParams");
function removeUnmatchedParams(source, target, keys) {
  for (const key of keys) {
    if (import_lodash.default.has(source, key) && !import_lodash.default.has(target, key)) {
      delete source[key];
    }
    if (!import_lodash.default.has(source, key) && import_lodash.default.has(target, key)) {
      delete target[key];
    }
  }
}
__name(removeUnmatchedParams, "removeUnmatchedParams");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mergeAclActionParams,
  mergeRole,
  removeEmptyParams
});
