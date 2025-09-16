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
var collection_exports = {};
__export(collection_exports, {
  Collection: () => Collection
});
module.exports = __toCommonJS(collection_exports);
var import_lodash = __toESM(require("lodash"));
var import_collection_field = require("./collection-field");
const _Collection = class _Collection {
  constructor(options, collectionManager) {
    this.options = options;
    this.collectionManager = collectionManager;
    this.setRepository(options.repository);
    if (options.fields) {
      this.setFields(options.fields);
    }
  }
  repository;
  fields = /* @__PURE__ */ new Map();
  get name() {
    return this.options.name;
  }
  get filterTargetKey() {
    return this.options.filterTargetKey;
  }
  updateOptions(options, mergeOptions) {
    const newOptions = {
      ...this.options,
      ...import_lodash.default.cloneDeep(options)
    };
    this.options = newOptions;
    this.setFields(newOptions.fields || []);
    if (options.repository) {
      this.setRepository(options.repository);
    }
    return this;
  }
  setFields(fields) {
    const fieldNames = this.fields.keys();
    for (const fieldName of fieldNames) {
      this.removeField(fieldName);
    }
    for (const field of fields) {
      this.setField(field.name, field);
    }
  }
  setField(name, options) {
    const field = new import_collection_field.CollectionField(options);
    this.fields.set(name, field);
    return field;
  }
  removeField(name) {
    this.fields.delete(name);
  }
  getField(name) {
    return this.fields.get(name);
  }
  getFieldByField(field) {
    for (const item of this.fields.values()) {
      if (item.options.field === field) {
        return item;
      }
    }
    return null;
  }
  getFields() {
    return [...this.fields.values()];
  }
  setRepository(repository) {
    const RepositoryClass = this.collectionManager.getRegisteredRepository(repository || "Repository");
    this.repository = new RepositoryClass(this);
  }
};
__name(_Collection, "Collection");
let Collection = _Collection;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Collection
});
