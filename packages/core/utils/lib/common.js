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
var common_exports = {};
__export(common_exports, {
  hasEmptyValue: () => hasEmptyValue,
  isArray: () => isArray,
  isEmpty: () => isEmpty,
  isPlainObject: () => isPlainObject,
  isString: () => isString,
  nextTick: () => nextTick,
  sleep: () => sleep,
  sortTree: () => sortTree,
  treeFind: () => treeFind
});
module.exports = __toCommonJS(common_exports);
var import_lodash = __toESM(require("lodash"));
const isString = /* @__PURE__ */ __name((value) => {
  return typeof value === "string";
}, "isString");
const isArray = /* @__PURE__ */ __name((value) => {
  return Array.isArray(value);
}, "isArray");
const isEmpty = /* @__PURE__ */ __name((value) => {
  if (isPlainObject(value)) {
    return Object.keys(value).length === 0;
  }
  if (Array.isArray(value)) {
    return value.length === 0;
  }
  return !value;
}, "isEmpty");
const isPlainObject = /* @__PURE__ */ __name((value) => {
  if (Object.prototype.toString.call(value) !== "[object Object]") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  return prototype === null || prototype === Object.prototype;
}, "isPlainObject");
const hasEmptyValue = /* @__PURE__ */ __name((objOrArr) => {
  let result = true;
  for (const key in objOrArr) {
    result = false;
    if (isArray(objOrArr[key]) && objOrArr[key].length === 0) {
      return true;
    }
    if (!objOrArr[key]) {
      return true;
    }
    if (isPlainObject(objOrArr[key]) || isArray(objOrArr[key])) {
      return hasEmptyValue(objOrArr[key]);
    }
  }
  return result;
}, "hasEmptyValue");
const nextTick = /* @__PURE__ */ __name((fn) => {
  setTimeout(fn);
}, "nextTick");
function treeFind(tree, callback, options = {}) {
  if (!tree) return void 0;
  const { childrenKey = "children" } = options;
  const nodes = Array.isArray(tree) ? [...tree] : [tree];
  for (const node of nodes) {
    if (callback(node)) {
      return node;
    }
    const children = typeof childrenKey === "function" ? childrenKey(node) : node[childrenKey];
    if (Array.isArray(children) && children.length > 0) {
      const found = treeFind(children, callback, options);
      if (found !== void 0) {
        return found;
      }
    }
  }
  return void 0;
}
__name(treeFind, "treeFind");
function sortTree(tree, sortBy, childrenKey = "children", isAsc = true) {
  if (!tree || !Array.isArray(tree) || tree.length === 0) {
    return tree;
  }
  const sortedTree = import_lodash.default.orderBy(tree, sortBy, isAsc ? "asc" : "desc");
  return sortedTree.map((node) => {
    if (node[childrenKey] && node[childrenKey].length > 0) {
      return {
        ...node,
        [childrenKey]: sortTree(node[childrenKey], sortBy, childrenKey, isAsc)
      };
    }
    return node;
  });
}
__name(sortTree, "sortTree");
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
__name(sleep, "sleep");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  hasEmptyValue,
  isArray,
  isEmpty,
  isPlainObject,
  isString,
  nextTick,
  sleep,
  sortTree,
  treeFind
});
