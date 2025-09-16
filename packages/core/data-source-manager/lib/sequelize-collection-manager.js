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
var sequelize_collection_manager_exports = {};
__export(sequelize_collection_manager_exports, {
  SequelizeCollectionManager: () => SequelizeCollectionManager
});
module.exports = __toCommonJS(sequelize_collection_manager_exports);
var import_database = require("@nocobase/database");
/* istanbul ignore file -- @preserve */
const _SequelizeCollectionManager = class _SequelizeCollectionManager {
  db;
  options;
  dataSource;
  constructor(options) {
    this.db = this.createDB(options);
    this.options = options;
  }
  setDataSource(dataSource) {
    this.dataSource = dataSource;
  }
  collectionsFilter() {
    if (this.options.collectionsFilter) {
      return this.options.collectionsFilter;
    }
    return (collection) => {
      return collection.options.introspected;
    };
  }
  createDB(options = {}) {
    if (options.database instanceof import_database.Database) {
      return options.database;
    }
    return new import_database.Database(options);
  }
  registerFieldTypes(types) {
    this.db.registerFieldTypes(types);
  }
  registerFieldInterfaces() {
  }
  registerCollectionTemplates() {
  }
  registerModels(models) {
    return this.db.registerModels(models);
  }
  registerRepositories(repositories) {
    return this.db.registerModels(repositories);
  }
  getRegisteredRepository(key) {
    if (typeof key !== "string") {
      return key;
    }
    return this.db.repositories.get(key);
  }
  defineCollection(options) {
    const collection = this.db.collection(options);
    collection.model.refreshAttributes();
    collection.model._findAutoIncrementAttribute();
    return collection;
  }
  extendCollection(collectionOptions, mergeOptions) {
    return this.db.extendCollection(collectionOptions, mergeOptions);
  }
  hasCollection(name) {
    return this.db.hasCollection(name);
  }
  getCollection(name) {
    return this.db.getCollection(name);
  }
  removeCollection(name) {
  }
  getCollections() {
    const collectionsFilter = this.collectionsFilter();
    return [...this.db.collections.values()].filter((collection) => collectionsFilter(collection));
  }
  getRepository(name, sourceId) {
    return this.db.getRepository(name, sourceId);
  }
  async sync() {
    await this.db.sync();
  }
  registerFieldInterface(name, fieldInterface) {
    this.db.interfaceManager.registerInterfaceType(name, fieldInterface);
  }
  getFieldInterface(name) {
    return this.db.interfaceManager.getInterfaceType(name);
  }
};
__name(_SequelizeCollectionManager, "SequelizeCollectionManager");
let SequelizeCollectionManager = _SequelizeCollectionManager;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SequelizeCollectionManager
});
