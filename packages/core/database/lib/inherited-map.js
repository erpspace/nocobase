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
var inherited_map_exports = {};
__export(inherited_map_exports, {
  default: () => InheritanceMap
});
module.exports = __toCommonJS(inherited_map_exports);
var import_lodash = __toESM(require("lodash"));
const _TableNode = class _TableNode {
  name;
  parents;
  children;
  constructor(name) {
    this.name = name;
    this.parents = /* @__PURE__ */ new Set();
    this.children = /* @__PURE__ */ new Set();
  }
};
__name(_TableNode, "TableNode");
let TableNode = _TableNode;
const _InheritanceMap = class _InheritanceMap {
  nodes = /* @__PURE__ */ new Map();
  removeNode(name) {
    const node = this.nodes.get(name);
    if (!node) return;
    for (const parent of node.parents) {
      parent.children.delete(node);
    }
    for (const child of node.children) {
      child.parents.delete(node);
    }
    this.nodes.delete(name);
  }
  getOrCreateNode(name) {
    if (!this.nodes.has(name)) {
      this.nodes.set(name, new TableNode(name));
    }
    return this.getNode(name);
  }
  getNode(name) {
    return this.nodes.get(name);
  }
  setInheritance(name, inherits) {
    const node = this.getOrCreateNode(name);
    const parents = import_lodash.default.castArray(inherits).map((name2) => this.getOrCreateNode(name2));
    node.parents = new Set(parents);
    for (const parent of parents) {
      parent.children.add(node);
    }
  }
  isParentNode(name) {
    const node = this.getNode(name);
    return node && node.children.size > 0;
  }
  getChildren(name, options = { deep: true }) {
    const results = /* @__PURE__ */ new Set();
    const node = this.getNode(name);
    if (!node) return results;
    for (const child of node.children) {
      results.add(child.name);
      if (!options.deep) {
        continue;
      }
      for (const grandchild of this.getChildren(child.name)) {
        results.add(grandchild);
      }
    }
    return results;
  }
  getParents(name, options = { deep: true }) {
    const results = /* @__PURE__ */ new Set();
    const node = this.getNode(name);
    if (!node) return results;
    for (const parent of node.parents) {
      results.add(parent.name);
      if (!options.deep) {
        continue;
      }
      for (const grandparent of this.getParents(parent.name)) {
        results.add(grandparent);
      }
    }
    return results;
  }
};
__name(_InheritanceMap, "InheritanceMap");
let InheritanceMap = _InheritanceMap;
