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
var belongs_to_many_repository_exports = {};
__export(belongs_to_many_repository_exports, {
  BelongsToManyRepository: () => BelongsToManyRepository
});
module.exports = __toCommonJS(belongs_to_many_repository_exports);
var import_lodash = __toESM(require("lodash"));
var import_sequelize = require("sequelize");
var import_update_associations = require("../update-associations");
var import_multiple_relation_repository = require("./multiple-relation-repository");
var import_relation_repository = require("./relation-repository");
const _BelongsToManyRepository = class _BelongsToManyRepository extends import_multiple_relation_repository.MultipleRelationRepository {
  async aggregate(options) {
    const targetRepository = this.targetCollection.repository;
    const sourceModel = await this.getSourceModel(await this.getTransaction(options));
    const association = this.association;
    return await targetRepository.aggregate({
      ...options,
      optionsTransformer: /* @__PURE__ */ __name((modelOptions) => {
        modelOptions.include = modelOptions.include || [];
        const throughWhere = {};
        throughWhere[association.foreignKey] = sourceModel.get(association.sourceKey);
        modelOptions.include.push({
          association: association.oneFromTarget,
          required: true,
          attributes: [],
          where: throughWhere
        });
      }, "optionsTransformer")
    });
  }
  async create(options) {
    if (Array.isArray(options.values)) {
      return Promise.all(options.values.map((record) => this.create({ ...options, values: record })));
    }
    const transaction2 = await this.getTransaction(options);
    const createAccessor = this.accessors().create;
    const values = options.values || {};
    const sourceModel = await this.getSourceModel(transaction2);
    const createOptions = {
      ...options,
      through: values[this.throughName()],
      transaction: transaction2
    };
    const instance = await sourceModel[createAccessor](values, createOptions);
    await (0, import_update_associations.updateAssociations)(instance, values, { ...options, transaction: transaction2 });
    return instance;
  }
  async destroy(options) {
    const transaction2 = await this.getTransaction(options);
    const association = this.association;
    const throughModel = this.throughModel();
    const instancesToIds = /* @__PURE__ */ __name((instances) => {
      return instances.map((instance) => instance.get(this.targetKey()));
    }, "instancesToIds");
    const throughTableWhere = [
      {
        [throughModel.rawAttributes[association.foreignKey].field]: this.sourceKeyValue
      }
    ];
    let ids;
    if (options && options["filter"]) {
      const instances = await this.find({
        filter: options["filter"],
        transaction: transaction2
      });
      ids = instancesToIds(instances);
    }
    if (options && options["filterByTk"]) {
      const instances = this.association.toInstanceArray(options["filterByTk"]);
      ids = ids ? import_lodash.default.intersection(ids, instancesToIds(instances)) : instancesToIds(instances);
    }
    if (options && !options["filterByTk"] && !options["filter"]) {
      const sourceModel = await this.getSourceModel(transaction2);
      const instances = await sourceModel[this.accessors().get]({
        transaction: transaction2
      });
      ids = instancesToIds(instances);
    }
    throughTableWhere.push({
      [throughModel.rawAttributes[association.otherKey].field]: {
        [import_sequelize.Op.in]: ids
      }
    });
    await this.throughModel().destroy({
      where: throughTableWhere,
      transaction: transaction2
    });
    await this.targetModel.destroy({
      where: {
        [this.targetKey()]: {
          [import_sequelize.Op.in]: ids
        }
      },
      transaction: transaction2
    });
    return true;
  }
  async add(options) {
    await this.setTargets("add", options);
  }
  async set(options) {
    await this.setTargets("set", options);
  }
  async toggle(options) {
    const transaction2 = await this.getTransaction(options);
    const sourceModel = await this.getSourceModel(transaction2);
    const has = await sourceModel[this.accessors().hasSingle](options["tk"], {
      transaction: transaction2
    });
    if (has) {
      await this.remove({
        ...options,
        transaction: transaction2
      });
    } else {
      await this.add({
        ...options,
        transaction: transaction2
      });
    }
    return;
  }
  throughName() {
    return this.throughModel().name;
  }
  throughModel() {
    return this.association.through.model;
  }
  async setTargets(call, options) {
    const handleKeys = this.convertTks(options);
    const transaction2 = await this.getTransaction(options, false);
    const sourceModel = await this.getSourceModel(transaction2);
    const setObj = handleKeys.reduce((carry, item) => {
      if (Array.isArray(item)) {
        carry[item[0]] = item[1];
      } else {
        carry[item] = true;
      }
      return carry;
    }, {});
    const targetKeys = Object.keys(setObj);
    const association = this.association;
    const targetObjects = await this.targetModel.findAll({
      where: {
        [association["targetKey"]]: targetKeys
      },
      transaction: transaction2
    });
    await sourceModel[this.accessors()[call]](targetObjects, {
      transaction: transaction2
    });
    for (const [id, throughValues] of Object.entries(setObj)) {
      if (typeof throughValues === "object") {
        const instance = await this.targetModel.findByPk(id, {
          transaction: transaction2
        });
        await (0, import_update_associations.updateThroughTableValue)(instance, this.throughName(), throughValues, sourceModel, transaction2);
      }
    }
  }
};
__name(_BelongsToManyRepository, "BelongsToManyRepository");
__decorateClass([
  (0, import_relation_repository.transaction)()
], _BelongsToManyRepository.prototype, "create", 1);
__decorateClass([
  (0, import_relation_repository.transaction)((args, transaction2) => {
    return {
      filterByTk: args[0],
      transaction: transaction2
    };
  })
], _BelongsToManyRepository.prototype, "destroy", 1);
__decorateClass([
  (0, import_relation_repository.transaction)((args, transaction2) => {
    return {
      tk: args[0],
      transaction: transaction2
    };
  })
], _BelongsToManyRepository.prototype, "add", 1);
__decorateClass([
  (0, import_relation_repository.transaction)((args, transaction2) => {
    return {
      tk: args[0],
      transaction: transaction2
    };
  })
], _BelongsToManyRepository.prototype, "set", 1);
__decorateClass([
  (0, import_relation_repository.transaction)((args, transaction2) => {
    return {
      tk: args[0],
      transaction: transaction2
    };
  })
], _BelongsToManyRepository.prototype, "toggle", 1);
let BelongsToManyRepository = _BelongsToManyRepository;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BelongsToManyRepository
});
