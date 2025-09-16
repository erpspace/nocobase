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
var relation_repository_exports = {};
__export(relation_repository_exports, {
  RelationRepository: () => RelationRepository,
  transaction: () => transaction
});
module.exports = __toCommonJS(relation_repository_exports);
var import_lodash = __toESM(require("lodash"));
var import_transaction_decorator = require("../decorators/transaction-decorator");
var import_filter_parser = __toESM(require("../filter-parser"));
var import_options_parser = require("../options-parser");
var import_update_associations = require("../update-associations");
var import_update_guard = require("../update-guard");
var import_filter_utils = require("../utils/filter-utils");
const transaction = (0, import_transaction_decorator.transactionWrapperBuilder)(function() {
  return this.sourceCollection.model.sequelize.transaction();
});
const _RelationRepository = class _RelationRepository {
  sourceCollection;
  association;
  targetModel;
  targetCollection;
  associationName;
  associationField;
  sourceKeyValue;
  sourceInstance;
  db;
  database;
  constructor(sourceCollection, association, sourceKeyValue) {
    this.db = sourceCollection.context.database;
    this.database = this.db;
    this.sourceCollection = sourceCollection;
    this.setSourceKeyValue(sourceKeyValue);
    this.associationName = association;
    this.association = this.sourceCollection.model.associations[association];
    this.associationField = this.sourceCollection.getField(association);
    this.targetModel = this.association.target;
    this.targetCollection = this.sourceCollection.context.database.modelCollection.get(this.targetModel);
  }
  decodeMultiTargetKey(str) {
    try {
      const decoded = decodeURIComponent(str);
      const parsed = JSON.parse(decoded);
      return typeof parsed === "object" && parsed !== null ? parsed : decoded;
    } catch (e) {
      return false;
    }
  }
  setSourceKeyValue(sourceKeyValue) {
    this.sourceKeyValue = typeof sourceKeyValue === "string" ? this.decodeMultiTargetKey(sourceKeyValue) || sourceKeyValue : sourceKeyValue;
  }
  isMultiTargetKey(value) {
    return import_lodash.default.isPlainObject(value || this.sourceKeyValue);
  }
  get collection() {
    return this.db.getCollection(this.targetModel.name);
  }
  async chunk(options) {
    const { chunkSize, callback, limit: overallLimit } = options;
    const transaction2 = await this.getTransaction(options);
    let offset = 0;
    let totalProcessed = 0;
    while (true) {
      const currentLimit = overallLimit !== void 0 ? Math.min(chunkSize, overallLimit - totalProcessed) : chunkSize;
      const rows = await this.find({
        ...options,
        limit: currentLimit,
        offset,
        transaction: transaction2
      });
      if (rows.length === 0) {
        break;
      }
      await callback(rows, options);
      offset += currentLimit;
      totalProcessed += rows.length;
      if (overallLimit !== void 0 && totalProcessed >= overallLimit) {
        break;
      }
    }
  }
  convertTk(options) {
    let tk = options;
    if (typeof options === "object" && "tk" in options) {
      tk = options["tk"];
    }
    return tk;
  }
  convertTks(options) {
    let tk = this.convertTk(options);
    if (typeof tk === "string") {
      tk = tk.split(",");
    }
    if (tk) {
      return import_lodash.default.castArray(tk);
    }
    return [];
  }
  targetKey() {
    return this.associationField.targetKey;
  }
  async firstOrCreate(options) {
    const { filterKeys, values, transaction: transaction2, hooks, context } = options;
    const filter = (0, import_filter_utils.valuesToFilter)(values, filterKeys);
    const instance = await this.findOne({ filter, transaction: transaction2, context });
    if (instance) {
      return instance;
    }
    return this.create({ values, transaction: transaction2, hooks, context });
  }
  async updateOrCreate(options) {
    const { filterKeys, values, transaction: transaction2, hooks, context } = options;
    const filter = (0, import_filter_utils.valuesToFilter)(values, filterKeys);
    const instance = await this.findOne({ filter, transaction: transaction2, context });
    if (instance) {
      return await this.update({
        filterByTk: instance.get(
          this.targetCollection.filterTargetKey || this.targetCollection.model.primaryKeyAttribute
        ),
        values,
        transaction: transaction2,
        hooks,
        context
      });
    }
    return this.create({ values, transaction: transaction2, hooks, context });
  }
  async create(options) {
    if (Array.isArray(options.values)) {
      return Promise.all(options.values.map((record) => this.create({ ...options, values: record })));
    }
    const createAccessor = this.accessors().create;
    const guard = import_update_guard.UpdateGuard.fromOptions(this.targetModel, options);
    const values = options.values;
    const transaction2 = await this.getTransaction(options);
    const sourceModel = await this.getSourceModel(transaction2);
    const instance = await sourceModel[createAccessor](guard.sanitize(options.values), { ...options, transaction: transaction2 });
    await (0, import_update_associations.updateAssociations)(instance, values, { ...options, transaction: transaction2 });
    if (options.hooks !== false) {
      await this.db.emitAsync(`${this.targetCollection.name}.afterCreateWithAssociations`, instance, {
        ...options,
        transaction: transaction2
      });
      const eventName = `${this.targetCollection.name}.afterSaveWithAssociations`;
      await this.db.emitAsync(eventName, instance, { ...options, transaction: transaction2 });
    }
    return instance;
  }
  async getSourceModel(transaction2) {
    if (!this.sourceInstance) {
      this.sourceInstance = this.isMultiTargetKey() ? await this.sourceCollection.repository.findOne({
        filter: {
          // @ts-ignore
          ...this.sourceKeyValue
        },
        transaction: transaction2
      }) : await this.sourceCollection.model.findOne({
        where: {
          [this.associationField.sourceKey]: this.sourceKeyValue
        },
        transaction: transaction2
      });
    }
    return this.sourceInstance;
  }
  accessors() {
    return this.association.accessors;
  }
  buildQueryOptions(options) {
    const parser = new import_options_parser.OptionsParser(options, {
      collection: this.targetCollection,
      targetKey: this.targetKey()
    });
    const params = parser.toSequelizeParams();
    return { ...options, ...params };
  }
  parseFilter(filter, options) {
    const parser = new import_filter_parser.default(filter, {
      collection: this.targetCollection,
      app: {
        ctx: options == null ? void 0 : options.context
      }
    });
    return parser.toSequelizeParams();
  }
  async getTransaction(options, autoGen = false) {
    if (import_lodash.default.isPlainObject(options) && options.transaction) {
      return options.transaction;
    }
    if (autoGen) {
      return await this.sourceCollection.model.sequelize.transaction();
    }
    return null;
  }
};
__name(_RelationRepository, "RelationRepository");
__decorateClass([
  transaction()
], _RelationRepository.prototype, "firstOrCreate", 1);
__decorateClass([
  transaction()
], _RelationRepository.prototype, "updateOrCreate", 1);
__decorateClass([
  transaction()
], _RelationRepository.prototype, "create", 1);
let RelationRepository = _RelationRepository;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RelationRepository,
  transaction
});
