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
var inherited_collection_exports = {};
__export(inherited_collection_exports, {
  InheritedCollection: () => InheritedCollection
});
module.exports = __toCommonJS(inherited_collection_exports);
var import_lodash = __toESM(require("lodash"));
var import_collection = require("./collection");
const _InheritedCollection = class _InheritedCollection extends import_collection.Collection {
  parents;
  constructor(options, context) {
    if (!options.inherits) {
      throw new Error("InheritedCollection must have inherits option");
    }
    options.inherits = import_lodash.default.castArray(options.inherits);
    super(options, context);
    try {
      this.bindParents();
    } catch (err) {
      if (err instanceof ParentCollectionNotFound) {
        const listener = /* @__PURE__ */ __name((collection) => {
          if (options.inherits.includes(collection.name) && options.inherits.every((name) => this.db.collections.has(name))) {
            this.bindParents();
            this.db.removeListener("afterDefineCollection", listener);
          }
        }, "listener");
        this.db.addListener("afterDefineCollection", listener);
      } else {
        throw err;
      }
    }
  }
  getParents() {
    return this.parents;
  }
  getFlatParents() {
    const parents = [];
    for (const parent of this.parents) {
      if (parent.isInherited()) {
        parents.push(...parent.getFlatParents());
      }
      parents.push(parent);
    }
    return parents;
  }
  parentFields() {
    const fields = /* @__PURE__ */ new Map();
    if (!this.parents) {
      return fields;
    }
    for (const parent of this.parents) {
      if (parent.isInherited()) {
        for (const [name, field] of parent.parentFields()) {
          fields.set(name, field);
        }
      }
      const parentFields = parent.fields;
      for (const [name, field] of parentFields) {
        fields.set(name, field);
      }
    }
    return fields;
  }
  parentAttributes() {
    const attributes = {};
    for (const parent of this.parents) {
      if (parent.isInherited()) {
        Object.assign(attributes, parent.parentAttributes());
      }
      const parentAttributes = parent.model.tableAttributes;
      Object.assign(attributes, parentAttributes);
    }
    return attributes;
  }
  isInherited() {
    return true;
  }
  bindParents() {
    this.setParents(this.options.inherits);
    this.setParentFields();
    this.setFields(this.options.fields, false);
    this.db.inheritanceMap.setInheritance(this.name, this.options.inherits);
  }
  setParents(inherits) {
    this.parents = import_lodash.default.castArray(inherits).map((name) => {
      const existCollection = this.db.collections.get(name);
      if (!existCollection) {
        throw new ParentCollectionNotFound(name);
      }
      return existCollection;
    });
  }
  setParentFields() {
    const delayFields = /* @__PURE__ */ new Map();
    for (const [name, field] of this.parentFields()) {
      if (field.isRelationField()) {
        delayFields.set(name, field);
        continue;
      }
      this.setField(name, {
        ...field.options,
        inherit: true
      });
    }
    for (const [name, field] of delayFields) {
      this.setField(name, {
        ...field.options,
        inherit: true
      });
    }
  }
};
__name(_InheritedCollection, "InheritedCollection");
let InheritedCollection = _InheritedCollection;
const _ParentCollectionNotFound = class _ParentCollectionNotFound extends Error {
  constructor(name) {
    super(`parent collection ${name} not found`);
  }
};
__name(_ParentCollectionNotFound, "ParentCollectionNotFound");
let ParentCollectionNotFound = _ParentCollectionNotFound;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InheritedCollection
});
