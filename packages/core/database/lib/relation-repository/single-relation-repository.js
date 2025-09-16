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
var single_relation_repository_exports = {};
__export(single_relation_repository_exports, {
  SingleRelationRepository: () => SingleRelationRepository
});
module.exports = __toCommonJS(single_relation_repository_exports);
var import_target_collection_decorator = __toESM(require("../decorators/target-collection-decorator"));
var import_update_associations = require("../update-associations");
var import_relation_repository = require("./relation-repository");
var import_lodash = __toESM(require("lodash"));
const _SingleRelationRepository = class _SingleRelationRepository extends import_relation_repository.RelationRepository {
  async remove(options) {
    const transaction2 = await this.getTransaction(options);
    const sourceModel = await this.getSourceModel(transaction2);
    return await sourceModel[this.accessors().set](null, {
      transaction: transaction2
    });
  }
  async set(options) {
    const transaction2 = await this.getTransaction(options);
    const sourceModel = await this.getSourceModel(transaction2);
    return await sourceModel[this.accessors().set](this.convertTk(options), {
      transaction: transaction2
    });
  }
  async find(options) {
    const targetRepository = this.targetCollection.repository;
    const sourceModel = await this.getSourceModel(await this.getTransaction(options));
    if (!sourceModel) return null;
    const addFilter = await this.filterOptions(sourceModel);
    const findOptions = {
      ...options,
      filter: {
        $and: [(options == null ? void 0 : options.filter) || {}, addFilter]
      }
    };
    return await targetRepository.findOne(findOptions);
  }
  async findOne(options) {
    return this.find({ ...options, filterByTk: null });
  }
  async destroy(options) {
    const transaction2 = await this.getTransaction(options);
    const target = await this.find({
      transaction: transaction2
    });
    await target.destroy({
      transaction: transaction2
    });
    return true;
  }
  async update(options) {
    const transaction2 = await this.getTransaction(options);
    const target = await this.find({
      transaction: transaction2,
      // @ts-ignore
      targetCollection: options.targetCollection
    });
    if (!target) {
      throw new Error("The record does not exist");
    }
    await (0, import_update_associations.updateModelByValues)(target, options == null ? void 0 : options.values, {
      ...import_lodash.default.omit(options, "values"),
      transaction: transaction2
    });
    if (options.hooks !== false) {
      await this.db.emitAsync(`${this.targetCollection.name}.afterUpdateWithAssociations`, target, {
        ...options,
        transaction: transaction2
      });
      const eventName = `${this.targetCollection.name}.afterSaveWithAssociations`;
      await this.db.emitAsync(eventName, target, { ...options, transaction: transaction2 });
    }
    return target;
  }
  /**
   * @internal
   */
  accessors() {
    return super.accessors();
  }
};
__name(_SingleRelationRepository, "SingleRelationRepository");
__decorateClass([
  (0, import_relation_repository.transaction)()
], _SingleRelationRepository.prototype, "remove", 1);
__decorateClass([
  (0, import_relation_repository.transaction)((args, transaction2) => {
    return {
      tk: args[0],
      transaction: transaction2
    };
  })
], _SingleRelationRepository.prototype, "set", 1);
__decorateClass([
  (0, import_relation_repository.transaction)()
], _SingleRelationRepository.prototype, "destroy", 1);
__decorateClass([
  (0, import_relation_repository.transaction)(),
  import_target_collection_decorator.default
], _SingleRelationRepository.prototype, "update", 1);
let SingleRelationRepository = _SingleRelationRepository;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SingleRelationRepository
});
