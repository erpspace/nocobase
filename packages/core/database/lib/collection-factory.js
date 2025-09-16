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
var collection_factory_exports = {};
__export(collection_factory_exports, {
  CollectionFactory: () => CollectionFactory
});
module.exports = __toCommonJS(collection_factory_exports);
var import_collection = require("./collection");
const _CollectionFactory = class _CollectionFactory {
  constructor(database) {
    this.database = database;
  }
  // Using a Map with the collection subclass as the key and options as the value
  collectionTypes = /* @__PURE__ */ new Map();
  registerCollectionType(collectionClass, options) {
    this.collectionTypes.set(collectionClass, options);
  }
  createCollection(collectionOptions) {
    let klass = import_collection.Collection;
    for (const [ctor, options] of this.collectionTypes) {
      if (options.condition(collectionOptions)) {
        klass = ctor;
        break;
      }
    }
    return new klass(collectionOptions, {
      database: this.database
    });
  }
};
__name(_CollectionFactory, "CollectionFactory");
let CollectionFactory = _CollectionFactory;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CollectionFactory
});
