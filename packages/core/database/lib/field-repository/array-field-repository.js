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
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var array_field_repository_exports = {};
__export(array_field_repository_exports, {
  ArrayFieldRepository: () => ArrayFieldRepository
});
module.exports = __toCommonJS(array_field_repository_exports);
var import_lodash = __toESM(require("lodash"));
var import_transaction_decorator = require("../decorators/transaction-decorator");
var import_fields = require("../fields");
const transaction = (0, import_transaction_decorator.transactionWrapperBuilder)(function() {
  return this.collection.model.sequelize.transaction();
});
const _ArrayFieldRepository = class _ArrayFieldRepository {
  constructor(collection, fieldName, targetValue) {
    this.collection = collection;
    this.fieldName = fieldName;
    this.targetValue = targetValue;
    const field = collection.getField(fieldName);
    if (!(field instanceof import_fields.ArrayField)) {
      throw new Error("Field must be of type Array");
    }
  }
  async get(options) {
    const instance = await this.getInstance(options);
    return instance.get(this.fieldName);
  }
  async find(options) {
    return await this.get(options);
  }
  async set(options) {
    const { transaction: transaction2 } = options;
    const instance = await this.getInstance({
      transaction: transaction2
    });
    instance.set(this.fieldName, import_lodash.default.castArray(options.values));
    await instance.save({ transaction: transaction2 });
    if (options.hooks !== false) {
      await this.emitAfterSave(instance, options);
    }
  }
  async emitAfterSave(instance, options) {
    await this.collection.db.emitAsync(`${this.collection.name}.afterSaveWithAssociations`, instance, {
      ...options
    });
    instance.clearChangedWithAssociations();
  }
  async toggle(options) {
    const { transaction: transaction2 } = options;
    const instance = await this.getInstance({
      transaction: transaction2
    });
    const oldValue = instance.get(this.fieldName) || [];
    const newValue = oldValue.includes(options.value) ? import_lodash.default.without(oldValue, options.value) : [...oldValue, options.value];
    instance.set(this.fieldName, newValue);
    await instance.save({ transaction: transaction2 });
    if (options.hooks !== false) {
      await this.emitAfterSave(instance, options);
    }
  }
  async add(options) {
    const { transaction: transaction2 } = options;
    const instance = await this.getInstance({
      transaction: transaction2
    });
    const oldValue = instance.get(this.fieldName) || [];
    const newValue = [...oldValue, ...import_lodash.default.castArray(options.values)];
    instance.set(this.fieldName, newValue);
    await instance.save({ transaction: transaction2 });
    if (options.hooks !== false) {
      await this.emitAfterSave(instance, options);
    }
  }
  async remove(options) {
    const { transaction: transaction2 } = options;
    const instance = await this.getInstance({
      transaction: transaction2
    });
    const oldValue = instance.get(this.fieldName) || [];
    instance.set(this.fieldName, import_lodash.default.without(oldValue, ...import_lodash.default.castArray(options.values)));
    await instance.save({ transaction: transaction2 });
    if (options.hooks !== false) {
      await this.emitAfterSave(instance, options);
    }
  }
  getInstance(options) {
    return this.collection.repository.findOne({
      filterByTk: this.targetValue
    });
  }
};
__name(_ArrayFieldRepository, "ArrayFieldRepository");
__decorateClass([
  transaction()
], _ArrayFieldRepository.prototype, "get", 1);
__decorateClass([
  transaction()
], _ArrayFieldRepository.prototype, "find", 1);
__decorateClass([
  transaction((args, transaction2) => {
    return {
      values: args[0],
      transaction: transaction2
    };
  })
], _ArrayFieldRepository.prototype, "set", 1);
__decorateClass([
  transaction((args, transaction2) => {
    return {
      value: args[0],
      transaction: transaction2
    };
  })
], _ArrayFieldRepository.prototype, "toggle", 1);
__decorateClass([
  transaction((args, transaction2) => {
    return {
      values: args[0],
      transaction: transaction2
    };
  })
], _ArrayFieldRepository.prototype, "add", 1);
__decorateClass([
  transaction((args, transaction2) => {
    return {
      values: args[0],
      transaction: transaction2
    };
  })
], _ArrayFieldRepository.prototype, "remove", 1);
let ArrayFieldRepository = _ArrayFieldRepository;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ArrayFieldRepository
});
