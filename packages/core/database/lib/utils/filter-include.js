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
var filter_include_exports = {};
__export(filter_include_exports, {
  filterIncludes: () => filterIncludes,
  mergeIncludes: () => mergeIncludes
});
module.exports = __toCommonJS(filter_include_exports);
var import_utils = require("../utils");
const collectAssociationPathsFromWhere = /* @__PURE__ */ __name((where) => {
  const aliasPaths = /* @__PURE__ */ new Set();
  const traverse = /* @__PURE__ */ __name((value) => {
    if (value == null) return;
    if (Array.isArray(value)) {
      for (const item of value) traverse(item);
      return;
    }
    if (typeof value === "object") {
      for (const [rawKey, child] of Object.entries(value)) {
        if (typeof rawKey === "string" && rawKey.startsWith("$") && rawKey.endsWith("$")) {
          const inner = rawKey.slice(1, -1);
          const segments = inner.split(".");
          if (segments.length > 1) {
            aliasPaths.add(segments.slice(0, -1).join("."));
          }
        }
        traverse(child);
      }
      for (const sym of Object.getOwnPropertySymbols(value)) {
        traverse(value[sym]);
      }
    }
  }, "traverse");
  traverse(where);
  return Array.from(aliasPaths);
}, "collectAssociationPathsFromWhere");
const pruneIncludeTreeByPaths = /* @__PURE__ */ __name((includes = [], requiredPathsRaw, options) => {
  const normalizedPaths = options.underscored ? requiredPathsRaw.map(
    (p) => p.split(".").map((s) => (0, import_utils.snakeCase)(s)).join(".")
  ) : requiredPathsRaw;
  if (!(includes == null ? void 0 : includes.length) || !(normalizedPaths == null ? void 0 : normalizedPaths.length)) return [];
  const pruned = [];
  for (const inc of includes) {
    const association = inc == null ? void 0 : inc.association;
    if (!association) continue;
    const assocKey = options.underscored ? (0, import_utils.snakeCase)(String(association)) : String(association);
    const matched = normalizedPaths.filter((p) => p === assocKey || p.startsWith(assocKey + "."));
    if (!matched.length) continue;
    const childRemainders = matched.map((p) => p === assocKey ? null : p.slice(assocKey.length + 1)).filter(Boolean);
    const children = pruneIncludeTreeByPaths(inc.include ?? [], childRemainders, options);
    const copy = { ...inc };
    if (children.length) {
      copy.include = children;
    } else if ("include" in copy) {
      delete copy.include;
    }
    pruned.push(copy);
  }
  return pruned;
}, "pruneIncludeTreeByPaths");
const mergeIncludes = /* @__PURE__ */ __name((includes = []) => {
  const byAssociation = /* @__PURE__ */ new Map();
  const mergeAll = /* @__PURE__ */ __name((list = []) => {
    for (const inc of list) {
      const association = inc == null ? void 0 : inc.association;
      if (!association) continue;
      const key = (0, import_utils.snakeCase)(String(association));
      if (!byAssociation.has(key)) {
        byAssociation.set(key, { ...inc, include: void 0 });
      }
      const target = byAssociation.get(key);
      if (inc.required) target.required = true;
      const mergedChildren = mergeIncludes([...target.include ?? [], ...inc.include ?? []]);
      if (mergedChildren.length) {
        target.include = mergedChildren;
      } else if ("include" in target) {
        delete target.include;
      }
    }
  }, "mergeAll");
  mergeAll(includes);
  return Array.from(byAssociation.values());
}, "mergeIncludes");
const filterIncludes = /* @__PURE__ */ __name((where, includes, options) => {
  const path = collectAssociationPathsFromWhere(where);
  const result = pruneIncludeTreeByPaths(includes, path, options);
  return result;
}, "filterIncludes");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  filterIncludes,
  mergeIncludes
});
