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
var collections_graph_exports = {};
__export(collections_graph_exports, {
  CollectionsGraph: () => CollectionsGraph
});
module.exports = __toCommonJS(collections_graph_exports);
var graphlib = __toESM(require("graphlib"));
var import_lodash = require("lodash");
const _CollectionsGraph = class _CollectionsGraph {
  static graphlib() {
    return graphlib;
  }
  static connectedNodes(options) {
    const nodes = (0, import_lodash.castArray)(options.nodes);
    const excludes = (0, import_lodash.castArray)(options.excludes || []);
    const graph = _CollectionsGraph.build(options);
    const connectedNodes = /* @__PURE__ */ new Set();
    for (const node of nodes) {
      const connected = graphlib.alg.preorder(graph, node);
      for (const connectedNode of connected) {
        if (excludes.includes(connectedNode)) continue;
        connectedNodes.add(connectedNode);
      }
    }
    return Array.from(connectedNodes);
  }
  static preOrder(options) {
    return _CollectionsGraph.graphlib().alg.preorder(_CollectionsGraph.build(options), options.node);
  }
  static build(options) {
    const collections = options.collections;
    const direction = (options == null ? void 0 : options.direction) || "forward";
    const isForward = direction === "forward";
    const graph = new graphlib.Graph();
    for (const collection of collections) {
      graph.setNode(collection.name);
    }
    for (const collection of collections) {
      const parents = collection.inherits || [];
      for (const parent of parents) {
        if (isForward) {
          graph.setEdge(collection.name, parent);
        } else {
          graph.setEdge(parent, collection.name);
        }
      }
      for (const field of collection.fields || []) {
        if (field.type === "hasMany" || field.type === "belongsTo" || field.type === "hasOne") {
          isForward ? graph.setEdge(collection.name, field.target) : graph.setEdge(field.target, collection.name);
        }
        if (field.type === "belongsToMany") {
          const throughCollection = field.through;
          if (isForward) {
            graph.setEdge(collection.name, throughCollection);
            graph.setEdge(throughCollection, field.target);
          } else {
            graph.setEdge(field.target, throughCollection);
            graph.setEdge(throughCollection, collection.name);
          }
        }
      }
    }
    return graph;
  }
};
__name(_CollectionsGraph, "CollectionsGraph");
let CollectionsGraph = _CollectionsGraph;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CollectionsGraph
});
