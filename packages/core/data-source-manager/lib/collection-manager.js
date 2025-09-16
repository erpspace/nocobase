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
var collection_manager_exports = {};
__export(collection_manager_exports, {
  CollectionManager: () => CollectionManager
});
module.exports = __toCommonJS(collection_manager_exports);
var import_collection = require("./collection");
var import_repository = require("./repository");
const _CollectionManager = class _CollectionManager {
  dataSource;
  collections = /* @__PURE__ */ new Map();
  repositories = /* @__PURE__ */ new Map();
  models = /* @__PURE__ */ new Map();
  constructor(options = {}) {
    if (options.dataSource) {
      this.dataSource = options.dataSource;
    }
    this.registerRepositories({
      Repository: import_repository.Repository
    });
  }
  setDataSource(dataSource) {
    this.dataSource = dataSource;
  }
  /* istanbul ignore next -- @preserve */
  getRegisteredFieldType(type) {
  }
  /* istanbul ignore next -- @preserve */
  getRegisteredFieldInterface(key) {
  }
  /* istanbul ignore next -- @preserve */
  getRegisteredModel(key) {
    return this.models.get(key);
  }
  getRegisteredRepository(key) {
    if (typeof key !== "string") {
      return key;
    }
    return this.repositories.get(key);
  }
  /* istanbul ignore next -- @preserve */
  registerFieldTypes() {
  }
  registerFieldInterfaces(interfaces) {
    Object.keys(interfaces).forEach((key) => {
      this.registerFieldInterface(key, interfaces[key]);
    });
  }
  registerFieldInterface(name, fieldInterface) {
  }
  getFieldInterface(name) {
    return;
  }
  /* istanbul ignore next -- @preserve */
  registerCollectionTemplates() {
  }
  registerModels(models) {
    Object.keys(models).forEach((key) => {
      this.models.set(key, models[key]);
    });
  }
  registerRepositories(repositories) {
    Object.keys(repositories).forEach((key) => {
      this.repositories.set(key, repositories[key]);
    });
  }
  defineCollection(options) {
    const collection = this.newCollection(options);
    this.collections.set(options.name, collection);
    return collection;
  }
  extendCollection(collectionOptions, mergeOptions) {
    const collection = this.getCollection(collectionOptions.name);
    collection.updateOptions(collectionOptions, mergeOptions);
    return collection;
  }
  hasCollection(name) {
    return !!this.getCollection(name);
  }
  getCollection(name) {
    return this.collections.get(name);
  }
  getCollections() {
    return [...this.collections.values()];
  }
  getRepository(name, sourceId) {
    const collection = this.getCollection(name);
    return collection.repository;
  }
  async sync() {
  }
  removeCollection(name) {
    this.collections.delete(name);
  }
  newCollection(options) {
    return new import_collection.Collection(options, this);
  }
};
__name(_CollectionManager, "CollectionManager");
let CollectionManager = _CollectionManager;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CollectionManager
});
