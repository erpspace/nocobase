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
var magic_attribute_model_exports = {};
__export(magic_attribute_model_exports, {
  MagicAttributeModel: () => MagicAttributeModel
});
module.exports = __toCommonJS(magic_attribute_model_exports);
var import_utils = require("@nocobase/utils");
var import_lodash = __toESM(require("lodash"));
var import_sequelize = require("sequelize");
var import_model = require("./model");
const Dottie = require("dottie");
const _MagicAttributeModel = class _MagicAttributeModel extends import_model.Model {
  get magicAttribute() {
    const db = this.constructor.database;
    const collection = db.getCollection(this.constructor.name);
    return collection.options.magicAttribute || "options";
  }
  set(key, value, options) {
    if (typeof key === "string") {
      const [column] = key.split(".");
      if (this.constructor.hasAlias(column)) {
        return this.setV1(key, value, options);
      }
      if (this.constructor.rawAttributes[column]) {
        return this.setV1(key, value, options);
      }
      if (import_lodash.default.isPlainObject(value)) {
        const opts = super.get(this.magicAttribute) || {};
        return this.setV1(`${this.magicAttribute}.${key}`, (0, import_utils.merge)(opts == null ? void 0 : opts[key], value), options);
      }
      return this.setV1(`${this.magicAttribute}.${key}`, value, options);
    } else {
      if (!key) {
        return;
      }
      Object.keys(key).forEach((k) => {
        this.setV1(k, key[k], options);
      });
    }
    return this.setV1(key, value, options);
  }
  setV1(key, value, options) {
    let values;
    let originalValue;
    if (typeof key === "object" && key !== null) {
      values = key;
      options = value || {};
      if (options.reset) {
        this.dataValues = {};
        for (const key2 in values) {
          this.changed(key2, false);
        }
      }
      if (options.raw && // @ts-ignore
      !(this._options && this._options.include) && !(options && options.attributes) && // @ts-ignore
      !this.constructor._hasDateAttributes && // @ts-ignore
      !this.constructor._hasBooleanAttributes) {
        if (Object.keys(this.dataValues).length) {
          Object.assign(this.dataValues, values);
        } else {
          this.dataValues = values;
        }
        this._previousDataValues = { ...this.dataValues };
      } else {
        if (options.attributes) {
          const setKeys = /* @__PURE__ */ __name((data) => {
            for (const k of data) {
              if (values[k] === void 0) {
                continue;
              }
              this.set(k, values[k], options);
            }
          }, "setKeys");
          setKeys(options.attributes);
          if (this.constructor._hasVirtualAttributes) {
            setKeys(this.constructor._virtualAttributes);
          }
          if (this._options.includeNames) {
            setKeys(this._options.includeNames);
          }
        } else {
          for (const key2 in values) {
            this.set(key2, values[key2], options);
          }
        }
        if (options.raw) {
          this._previousDataValues = { ...this.dataValues };
        }
      }
      return this;
    }
    if (!options) options = {};
    if (this.dataValues[this.magicAttribute] === null) {
      this.dataValues[this.magicAttribute] = {};
    }
    if (!options.raw) {
      originalValue = this.dataValues[key];
    }
    if (!options.raw && this._customSetters[key]) {
      this._customSetters[key].call(this, value, key);
      const newValue = this.dataValues[key];
      if (!import_lodash.default.isEqual(newValue, originalValue)) {
        this._previousDataValues[key] = originalValue;
        this.changed(key, true);
      }
    } else {
      if (this._options && this._options.include && this._options.includeNames.includes(key)) {
        this._setInclude(key, value, options);
        return this;
      }
      if (!options.raw) {
        if (!this._isAttribute(key)) {
          if (key.includes(".") && this.constructor._jsonAttributes.has(key.split(".")[0])) {
            const previousNestedValue = Dottie.get(this.dataValues, key);
            if (!import_lodash.default.isEqual(previousNestedValue, value)) {
              this._previousDataValues = import_lodash.default.cloneDeep(this._previousDataValues);
              Dottie.set(this.dataValues, key, value);
              this.changed(key.split(".")[0], true);
            }
          }
          return this;
        }
        if (this.constructor._hasPrimaryKeys && originalValue && this.constructor._isPrimaryKey(key)) {
          return this;
        }
        if (!this.isNewRecord && // @ts-ignore
        this.constructor._hasReadOnlyAttributes && // @ts-ignore
        this.constructor._readOnlyAttributes.has(key)) {
          return this;
        }
      }
      if (!(value instanceof import_sequelize.Utils.SequelizeMethod) && // @ts-ignore
      Object.prototype.hasOwnProperty.call(this.constructor._dataTypeSanitizers, key)) {
        value = this.constructor._dataTypeSanitizers[key].call(this, value, options);
      }
      if (!options.raw && // True when sequelize method
      (value instanceof import_sequelize.Utils.SequelizeMethod || // Check for data type type comparators
      // @ts-ignore
      !(value instanceof import_sequelize.Utils.SequelizeMethod) && // @ts-ignore
      this.constructor._dataTypeChanges[key] && // @ts-ignore
      this.constructor._dataTypeChanges[key].call(this, value, originalValue, options) || // Check default
      // @ts-ignore
      !this.constructor._dataTypeChanges[key] && !import_lodash.default.isEqual(value, originalValue))) {
        this._previousDataValues[key] = originalValue;
        this.changed(key, true);
      }
      this.dataValues[key] = value;
    }
    return this;
  }
  get(key, value) {
    if (typeof key === "string") {
      const [column] = key.split(".");
      if (this.constructor.hasAlias(column)) {
        return super.get(key, value);
      }
      if (this.constructor.rawAttributes[column]) {
        return super.get(key, value);
      }
      const options = super.get(this.magicAttribute, value);
      return import_lodash.default.get(options, key);
    }
    const data = super.get(key, value);
    return {
      ...import_lodash.default.omit(data, this.magicAttribute),
      ...data[this.magicAttribute]
    };
  }
  async update(values, options) {
    this._changed = /* @__PURE__ */ new Set();
    return super.update(values, options);
  }
};
__name(_MagicAttributeModel, "MagicAttributeModel");
let MagicAttributeModel = _MagicAttributeModel;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MagicAttributeModel
});
