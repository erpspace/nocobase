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
var multiple_relation_repository_exports = {};
__export(multiple_relation_repository_exports, {
  MultipleRelationRepository: () => MultipleRelationRepository
});
module.exports = __toCommonJS(multiple_relation_repository_exports);
var import_lodash = __toESM(require("lodash"));
var import_sequelize = require("sequelize");
var import_target_collection_decorator = __toESM(require("../decorators/target-collection-decorator"));
var import_update_associations = require("../update-associations");
var import_update_guard = require("../update-guard");
var import_relation_repository = require("./relation-repository");
const _MultipleRelationRepository = class _MultipleRelationRepository extends import_relation_repository.RelationRepository {
  async targetRepositoryFilterOptionsBySourceValue() {
    let filterForeignKeyValue = this.sourceKeyValue;
    if (this.isMultiTargetKey()) {
      const sourceModel = await this.getSourceModel();
      filterForeignKeyValue = sourceModel.get(this.association.sourceKey);
    }
    return {
      [this.association.foreignKey]: filterForeignKeyValue
    };
  }
  async find(options) {
    const targetRepository = this.targetCollection.repository;
    const association = this.association;
    const oneFromTargetOptions = {
      as: "_pivot_",
      foreignKey: association.otherKey,
      sourceKey: association.targetKey,
      realAs: association.through.model.name
    };
    const pivotAssoc = new import_sequelize.HasOne(association.target, association.through.model, oneFromTargetOptions);
    const appendFilter = {
      isPivotFilter: true,
      association: pivotAssoc,
      where: await this.targetRepositoryFilterOptionsBySourceValue()
    };
    return targetRepository.find({
      include: [appendFilter],
      ...options
    });
  }
  async findAndCount(options) {
    const transaction2 = await this.getTransaction(options, false);
    return [
      await this.find({
        ...options,
        transaction: transaction2
      }),
      await this.count({
        ...options,
        transaction: transaction2
      })
    ];
  }
  async count(options) {
    var _a;
    const transaction2 = await this.getTransaction(options);
    const sourceModel = await this.getSourceModel(transaction2);
    if (!sourceModel) return 0;
    const queryOptions = this.buildQueryOptions(options);
    const include = (_a = queryOptions.include) == null ? void 0 : _a.filter((item) => {
      var _a2;
      const association = (_a2 = this.targetModel.associations) == null ? void 0 : _a2[item.association];
      return (association == null ? void 0 : association.associationType) !== "BelongsToArray";
    });
    const count = await sourceModel[this.accessors().get]({
      where: queryOptions.where,
      include,
      includeIgnoreAttributes: false,
      attributes: [
        [
          import_sequelize.Sequelize.fn(
            "COUNT",
            import_sequelize.Sequelize.fn("DISTINCT", import_sequelize.Sequelize.col(`${this.targetModel.name}.${this.targetKey()}`))
          ),
          "count"
        ]
      ],
      raw: true,
      plain: true,
      transaction: transaction2
    });
    return parseInt(count.count);
  }
  async findOne(options) {
    const transaction2 = await this.getTransaction(options, false);
    const rows = await this.find({ ...options, limit: 1, transaction: transaction2 });
    return rows.length == 1 ? rows[0] : null;
  }
  async remove(options) {
    const transaction2 = await this.getTransaction(options);
    const sourceModel = await this.getSourceModel(transaction2);
    await sourceModel[this.accessors().removeMultiple](this.convertTks(options), {
      transaction: transaction2
    });
    return;
  }
  async update(options) {
    const transaction2 = await this.getTransaction(options);
    const guard = import_update_guard.UpdateGuard.fromOptions(this.targetModel, options);
    const values = guard.sanitize(options.values);
    const instances = await this.find({
      ...import_lodash.default.omit(options, ["values"]),
      transaction: transaction2
    });
    for (const instance of instances) {
      await (0, import_update_associations.updateModelByValues)(instance, values, {
        ...options,
        sanitized: true,
        sourceModel: await this.getSourceModel(transaction2),
        transaction: transaction2
      });
    }
    for (const instance of instances) {
      if (options.hooks !== false) {
        await this.db.emitAsync(`${this.targetCollection.name}.afterUpdateWithAssociations`, instance, {
          ...options,
          transaction: transaction2
        });
        await this.db.emitAsync(`${this.targetCollection.name}.afterSaveWithAssociations`, instance, {
          ...options,
          transaction: transaction2
        });
      }
    }
    return instances;
  }
  async destroy(options) {
    return false;
  }
  async destroyByFilter(options, transaction2) {
    const instances = await this.find({
      ...options,
      transaction: transaction2
    });
    return await this.destroy({
      filterByTk: instances.map((instance) => instance.get(this.targetCollection.filterTargetKey)),
      transaction: transaction2
    });
  }
  filterHasInclude(filter, options) {
    const filterResult = this.parseFilter(filter, options);
    return filterResult.include && filterResult.include.length > 0;
  }
  accessors() {
    return super.accessors();
  }
  async updateOrCreate(options) {
    const result = await super.updateOrCreate(options);
    return Array.isArray(result) ? result[0] : result;
  }
};
__name(_MultipleRelationRepository, "MultipleRelationRepository");
__decorateClass([
  (0, import_relation_repository.transaction)((args, transaction2) => {
    return {
      tk: args[0],
      transaction: transaction2
    };
  })
], _MultipleRelationRepository.prototype, "remove", 1);
__decorateClass([
  (0, import_relation_repository.transaction)(),
  import_target_collection_decorator.default
], _MultipleRelationRepository.prototype, "update", 1);
__decorateClass([
  (0, import_relation_repository.transaction)()
], _MultipleRelationRepository.prototype, "updateOrCreate", 1);
let MultipleRelationRepository = _MultipleRelationRepository;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MultipleRelationRepository
});
