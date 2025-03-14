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
var collection_repository_exports = {};
__export(collection_repository_exports, {
  CollectionRepository: () => CollectionRepository
});
module.exports = __toCommonJS(collection_repository_exports);
var import_database = require("@nocobase/database");
var import_utils = require("@nocobase/utils");
var import_lodash = __toESM(require("lodash"));
class CollectionRepository extends import_database.Repository {
  app;
  setApp(app) {
    this.app = app;
  }
  async load(options = {}) {
    this.database.logger.debug("loading collections...");
    const { filter, skipExist } = options;
    const instances = await this.find({ filter, appends: ["fields"] });
    const graphlib = import_utils.CollectionsGraph.graphlib();
    const graph = new graphlib.Graph();
    const nameMap = {};
    const viewCollections = [];
    for (const instance of instances) {
      graph.setNode(instance.get("name"));
      if (instance.get("view") || instance.get("sql")) {
        viewCollections.push(instance.get("name"));
      }
      this.database.collectionsSort.set(instance.get("name"), instance.get("sort"));
    }
    for (const instance of instances) {
      const collectionName = instance.get("name");
      nameMap[collectionName] = instance;
      if (instance.get("inherits")) {
        for (const parent of instance.get("inherits")) {
          graph.setEdge(parent, collectionName);
        }
      }
    }
    if (graph.nodeCount() === 0) return;
    if (!graphlib.alg.isAcyclic(graph)) {
      const cycles = graphlib.alg.findCycles(graph);
      throw new Error(`Cyclic dependencies: ${cycles.map((cycle) => cycle.join(" -> ")).join(", ")}`);
    }
    const sortedNames = graphlib.alg.topsort(graph);
    const lazyCollectionFields = /* @__PURE__ */ new Map();
    for (const instanceName of sortedNames) {
      if (!nameMap[instanceName]) continue;
      const skipField = (() => {
        if (viewCollections.includes(instanceName)) {
          return true;
        }
        const fields = nameMap[instanceName].get("fields");
        return fields.filter((field) => field["type"] === "belongsTo" || field["type"] === "belongsToMany").map((field) => field.get("name"));
      })();
      if (import_lodash.default.isArray(skipField) && skipField.length) {
        lazyCollectionFields.set(instanceName, skipField);
      }
      this.database.logger.trace(`load ${instanceName} collection`, {
        submodule: "CollectionRepository",
        method: "load"
      });
      this.app.setMaintainingMessage(`load ${instanceName} collection`);
      await nameMap[instanceName].load({ skipField });
    }
    const fieldWithSourceAttributes = /* @__PURE__ */ new Map();
    for (const viewCollectionName of viewCollections) {
      this.database.logger.trace(`load collection fields`, {
        submodule: "CollectionRepository",
        method: "load",
        viewCollectionName
      });
      const skipField = (() => {
        const fields = nameMap[viewCollectionName].get("fields");
        return fields.filter((field) => {
          var _a;
          if (((_a = field.options) == null ? void 0 : _a.source) && (field["type"] === "belongsTo" || field["type"] === "belongsToMany")) {
            return true;
          }
          return false;
        }).map((field) => field.get("name"));
      })();
      this.app.setMaintainingMessage(`load ${viewCollectionName} collection fields`);
      if (import_lodash.default.isArray(skipField) && skipField.length) {
        fieldWithSourceAttributes.set(viewCollectionName, skipField);
      }
      await nameMap[viewCollectionName].loadFields({ skipField });
    }
    for (const [collectionName, skipField] of lazyCollectionFields) {
      this.database.logger.trace(`load collection fields`, {
        submodule: "CollectionRepository",
        method: "load",
        collectionName
      });
      this.app.setMaintainingMessage(`load ${collectionName} collection fields`);
      await nameMap[collectionName].loadFields({ includeFields: skipField });
    }
    for (const [collectionName, skipField] of fieldWithSourceAttributes) {
      this.database.logger.trace(`load collection fields`, {
        submodule: "CollectionRepository",
        method: "load",
        collectionName
      });
      this.app.setMaintainingMessage(`load ${collectionName} collection fields`);
      await nameMap[collectionName].loadFields({ includeFields: skipField });
    }
    this.database.logger.debug("collections loaded");
  }
  async db2cm(collectionName) {
    const collection = this.database.getCollection(collectionName);
    if (await this.findOne({ filter: { name: collectionName } })) {
      return;
    }
    const options = collection.options;
    const fields = [];
    for (const [name, field] of collection.fields) {
      fields.push({
        name,
        ...field.options
      });
    }
    const collectionOptions = options;
    if (collectionOptions.schema && collectionOptions.schema == (this.database.options.schema || "public")) {
      delete collectionOptions.schema;
    }
    await this.create({
      values: {
        ...collectionOptions,
        fields,
        from: "db2cm"
      }
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CollectionRepository
});
