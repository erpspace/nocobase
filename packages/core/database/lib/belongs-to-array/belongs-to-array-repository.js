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
var belongs_to_array_repository_exports = {};
__export(belongs_to_array_repository_exports, {
  BelongsToArrayAssociation: () => BelongsToArrayAssociation,
  BelongsToArrayRepository: () => BelongsToArrayRepository
});
module.exports = __toCommonJS(belongs_to_array_repository_exports);
var import_lodash = __toESM(require("lodash"));
var import_transaction_decorator = require("../decorators/transaction-decorator");
var import_multiple_relation_repository = require("../relation-repository/multiple-relation-repository");
const transaction = (0, import_transaction_decorator.transactionWrapperBuilder)(function() {
  return this.collection.model.sequelize.transaction();
});
const _BelongsToArrayAssociation = class _BelongsToArrayAssociation {
  db;
  associationType;
  source;
  foreignKey;
  targetName;
  targetKey;
  identifierField;
  as;
  options;
  constructor(options) {
    const { db, source, as, foreignKey, target, targetKey } = options;
    this.options = options;
    this.associationType = "BelongsToArray";
    this.db = db;
    this.source = source;
    this.foreignKey = foreignKey;
    this.targetName = target;
    this.targetKey = targetKey;
    this.identifierField = "undefined";
    this.as = as;
  }
  get target() {
    return this.db.getModel(this.targetName);
  }
  generateInclude(parentAs) {
    const targetCollection = this.db.getCollection(this.targetName);
    const targetField = targetCollection.getField(this.targetKey);
    const sourceCollection = this.db.getCollection(this.source.name);
    const foreignField = sourceCollection.getField(this.foreignKey);
    const queryInterface = this.db.sequelize.getQueryInterface();
    const asLeft = parentAs ? `${parentAs}->${this.as}` : this.as;
    const asRight = parentAs || this.source.collection.name;
    const left = queryInterface.quoteIdentifiers(`${asLeft}.${targetField.columnName()}`);
    const right = queryInterface.quoteIdentifiers(`${asRight}.${foreignField.columnName()}`);
    return {
      on: this.db.queryInterface.generateJoinOnForJSONArray(left, right)
    };
  }
  async update(instance, value, options = {}) {
    await instance.update(
      {
        [this.as]: value
      },
      {
        values: {
          [this.as]: value
        },
        transaction: options == null ? void 0 : options.transaction
      }
    );
  }
};
__name(_BelongsToArrayAssociation, "BelongsToArrayAssociation");
let BelongsToArrayAssociation = _BelongsToArrayAssociation;
const _BelongsToArrayRepository = class _BelongsToArrayRepository extends import_multiple_relation_repository.MultipleRelationRepository {
  belongsToArrayAssociation;
  constructor(sourceCollection, association, sourceKeyValue) {
    super(sourceCollection, association, sourceKeyValue);
    this.belongsToArrayAssociation = this.association;
  }
  getInstance(options) {
    return this.sourceCollection.repository.findOne({
      filterByTk: this.sourceKeyValue
    });
  }
  async find(options) {
    const targetRepository = this.targetCollection.repository;
    const instance = await this.getInstance(options);
    const tks = instance.get(this.belongsToArrayAssociation.foreignKey);
    const targetKey = this.belongsToArrayAssociation.targetKey;
    const addFilter = {
      [targetKey]: tks
    };
    if (options == null ? void 0 : options.filterByTk) {
      addFilter[targetKey] = options.filterByTk;
    }
    const findOptions = {
      ...import_lodash.default.omit(options, ["filterByTk", "where", "values", "attributes"]),
      filter: {
        $and: [options.filter || {}, addFilter]
      }
    };
    return await targetRepository.find(findOptions);
  }
};
__name(_BelongsToArrayRepository, "BelongsToArrayRepository");
__decorateClass([
  transaction()
], _BelongsToArrayRepository.prototype, "find", 1);
let BelongsToArrayRepository = _BelongsToArrayRepository;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BelongsToArrayAssociation,
  BelongsToArrayRepository
});
