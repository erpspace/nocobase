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
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var hasmany_repository_exports = {};
__export(hasmany_repository_exports, {
  HasManyRepository: () => HasManyRepository
});
module.exports = __toCommonJS(hasmany_repository_exports);
var import_lodash = require("lodash");
var import_sequelize = require("sequelize");
var import_multiple_relation_repository = require("./multiple-relation-repository");
var import_relation_repository = require("./relation-repository");
const _HasManyRepository = class _HasManyRepository extends import_multiple_relation_repository.MultipleRelationRepository {
  async find(options) {
    const targetRepository = this.targetCollection.repository;
    const targetFilterOptions = await this.targetRepositoryFilterOptionsBySourceValue();
    const findOptionsOmit = ["where", "values", "attributes"];
    if ((options == null ? void 0 : options.filterByTk) && !this.isMultiTargetKey(options.filterByTk)) {
      targetFilterOptions[this.associationField.targetKey] = options.filterByTk;
      findOptionsOmit.push("filterByTk");
    }
    const findOptions = {
      ...(0, import_lodash.omit)(options, findOptionsOmit),
      filter: {
        $and: [(options == null ? void 0 : options.filter) || {}, targetFilterOptions]
      }
    };
    return await targetRepository.find(findOptions);
  }
  async aggregate(options) {
    const targetRepository = this.targetCollection.repository;
    const aggOptions = {
      ...options,
      filter: {
        $and: [options.filter || {}, await this.targetRepositoryFilterOptionsBySourceValue()]
      }
    };
    return await targetRepository.aggregate(aggOptions);
  }
  async destroy(options) {
    const transaction2 = await this.getTransaction(options);
    const sourceModel = await this.getSourceModel(transaction2);
    const where = [
      {
        [this.association.foreignKey]: sourceModel.get(this.association.sourceKey)
      }
    ];
    if (options && options["filter"]) {
      const filterResult = this.parseFilter(options["filter"], options);
      if (filterResult.include && filterResult.include.length > 0) {
        return await this.destroyByFilter(
          {
            filter: options["filter"],
            filterByTk: options["filterByTk"]
          },
          transaction2
        );
      }
      where.push(filterResult.where);
    }
    if (options && options["filterByTk"]) {
      if (typeof options === "object" && options["filterByTk"]) {
        options = options["filterByTk"];
      }
      where.push({
        [this.targetKey()]: options
      });
    }
    await this.targetModel.destroy({
      where: {
        [import_sequelize.Op.and]: where
      },
      individualHooks: true,
      transaction: transaction2
    });
    return true;
  }
  async set(options) {
    const transaction2 = await this.getTransaction(options);
    const sourceModel = await this.getSourceModel(transaction2);
    await sourceModel[this.accessors().set](this.convertTks(options), {
      transaction: transaction2
    });
  }
  async add(options) {
    const transaction2 = await this.getTransaction(options);
    const sourceModel = await this.getSourceModel(transaction2);
    await sourceModel[this.accessors().add](this.convertTks(options), {
      transaction: transaction2
    });
  }
  /**
   * @internal
   */
  accessors() {
    return this.association.accessors;
  }
};
__name(_HasManyRepository, "HasManyRepository");
__decorateClass([
  (0, import_relation_repository.transaction)((args, transaction2) => {
    return {
      filterByTk: args[0],
      transaction: transaction2
    };
  })
], _HasManyRepository.prototype, "destroy", 1);
__decorateClass([
  (0, import_relation_repository.transaction)((args, transaction2) => {
    return {
      tk: args[0],
      transaction: transaction2
    };
  })
], _HasManyRepository.prototype, "set", 1);
__decorateClass([
  (0, import_relation_repository.transaction)((args, transaction2) => {
    return {
      tk: args[0],
      transaction: transaction2
    };
  })
], _HasManyRepository.prototype, "add", 1);
let HasManyRepository = _HasManyRepository;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HasManyRepository
});
