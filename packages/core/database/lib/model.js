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
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var model_exports = {};
__export(model_exports, {
  Model: () => Model
});
module.exports = __toCommonJS(model_exports);
var import_lodash = __toESM(require("lodash"));
var import_sequelize = require("sequelize");
var import_sync_runner = require("./sync-runner");
const _ = import_lodash.default;
const _Model = class _Model extends import_sequelize.Model {
  _changedWithAssociations = /* @__PURE__ */ new Set();
  _previousDataValuesWithAssociations = {};
  get db() {
    return this.constructor.database;
  }
  static async sync(options) {
    const runner = new import_sync_runner.SyncRunner(this);
    return await runner.runSync(options);
  }
  static callSetters(values, options) {
    const result = {};
    for (const key of Object.keys(values)) {
      const field = this.collection.getField(key);
      if (field && field.setter) {
        result[key] = field.setter.call(field, values[key], options, values, key);
      } else {
        result[key] = values[key];
      }
    }
    return result;
  }
  // TODO
  toChangedWithAssociations() {
    this._changedWithAssociations = /* @__PURE__ */ new Set([...this._changedWithAssociations, ...this._changed]);
    this._previousDataValuesWithAssociations = this._previousDataValues;
  }
  changedWithAssociations(key, value) {
    if (key === void 0) {
      if (this._changedWithAssociations.size > 0) {
        return Array.from(this._changedWithAssociations);
      }
      return false;
    }
    if (value === true) {
      this._changedWithAssociations.add(key);
      return this;
    }
    if (value === false) {
      this._changedWithAssociations.delete(key);
      return this;
    }
    return this._changedWithAssociations.has(key);
  }
  clearChangedWithAssociations() {
    this._changedWithAssociations = /* @__PURE__ */ new Set();
  }
  toJSON() {
    const handleObj = /* @__PURE__ */ __name((obj, options) => {
      const handles = [
        (data) => {
          if (data instanceof _Model) {
            return data.toJSON();
          }
          return data;
        },
        this.hiddenObjKey,
        this.handleBigInt
      ];
      return handles.reduce((carry, fn) => fn.apply(this, [carry, options]), obj);
    }, "handleObj");
    const handleArray = /* @__PURE__ */ __name((arrayOfObj, options) => {
      const handles = [this.sortAssociations];
      return handles.reduce((carry, fn) => fn.apply(this, [carry, options]), arrayOfObj || []);
    }, "handleArray");
    const opts = {
      model: this.constructor,
      collection: this.constructor.collection,
      db: this.constructor.database
    };
    const traverseJSON = /* @__PURE__ */ __name((data, options) => {
      const { model, db, collection } = options;
      data = handleObj(data, options);
      const result = {};
      for (const key of Object.keys(data)) {
        if (model.hasAlias(key)) {
          const association = model.associations[key];
          const opts2 = {
            model: association.target,
            collection: db.getCollection(association.target.name),
            db,
            key,
            field: collection.getField(key)
          };
          if (["HasMany", "BelongsToMany"].includes(association.associationType)) {
            result[key] = handleArray(data[key], opts2).map((item) => traverseJSON(item, opts2));
          } else if (association.associationType === "BelongsToArray") {
            const value = data[key];
            if (!value || value.some((v) => typeof v !== "object")) {
              result[key] = value;
            } else {
              result[key] = handleArray(data[key], opts2).map((item) => traverseJSON(item, opts2));
            }
          } else {
            result[key] = data[key] ? traverseJSON(data[key], opts2) : null;
          }
        } else {
          result[key] = data[key];
        }
      }
      return result;
    }, "traverseJSON");
    return traverseJSON(super.toJSON(), opts);
  }
  hiddenObjKey(obj, options) {
    const hiddenFields = Array.from(options.collection.fields.values()).filter((field) => field.options.hidden).map((field) => field.options.name);
    return import_lodash.default.omit(obj, hiddenFields);
  }
  handleBigInt(obj, options) {
    if (!options.db.inDialect("mariadb")) {
      return obj;
    }
    const bigIntKeys = Object.keys(options.model.rawAttributes).filter((key) => {
      return options.model.rawAttributes[key].type.constructor.name === "BIGINT";
    });
    for (const key of bigIntKeys) {
      if (obj[key] !== null && obj[key] !== void 0 && typeof obj[key] !== "string" && typeof obj[key] !== "number") {
        obj[key] = obj[key].toString();
      }
    }
    return obj;
  }
  sortAssociations(data, { field }) {
    const sortBy = field.options.sortBy;
    return sortBy ? this.sortArray(data, sortBy) : data;
  }
  sortArray(data, sortBy) {
    if (!import_lodash.default.isArray(sortBy)) {
      sortBy = [sortBy];
    }
    const orderItems = [];
    const orderDirections = [];
    sortBy.forEach((sortItem) => {
      orderDirections.push(sortItem.startsWith("-") ? "desc" : "asc");
      orderItems.push(sortItem.replace("-", ""));
    });
    return import_lodash.default.orderBy(data, orderItems, orderDirections);
  }
};
__name(_Model, "Model");
__publicField(_Model, "database");
__publicField(_Model, "collection");
let Model = _Model;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Model
});
