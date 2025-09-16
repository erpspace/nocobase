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
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result) __defProp(target, key, result);
  return result;
};
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var repository_exports = {};
__export(repository_exports, {
  Repository: () => Repository,
  Transactionable: () => import_sequelize2.Transactionable
});
module.exports = __toCommonJS(repository_exports);
var import_utils = require("@nocobase/utils");
var import_lodash = __toESM(require("lodash"));
var import_sequelize = require("sequelize");
var import_lodash2 = __toESM(require("lodash"));
var import_belongs_to_array_repository = require("./belongs-to-array/belongs-to-array-repository");
var import_cursor_builder = require("./cursor-builder");
var import_must_have_filter_decorator = __toESM(require("./decorators/must-have-filter-decorator"));
var import_target_collection_decorator = __toESM(require("./decorators/target-collection-decorator"));
var import_transaction_decorator = require("./decorators/transaction-decorator");
var import_eager_loading_tree = require("./eager-loading/eager-loading-tree");
var import_array_field_repository = require("./field-repository/array-field-repository");
var import_fields = require("./fields");
var import_filter_parser = __toESM(require("./filter-parser"));
var import_options_parser = require("./options-parser");
var import_belongs_to_many_repository = require("./relation-repository/belongs-to-many-repository");
var import_belongs_to_repository = require("./relation-repository/belongs-to-repository");
var import_hasmany_repository = require("./relation-repository/hasmany-repository");
var import_hasone_repository = require("./relation-repository/hasone-repository");
var import_update_associations = require("./update-associations");
var import_update_guard = require("./update-guard");
var import_filter_utils = require("./utils/filter-utils");
var import_utils2 = require("./utils");
var import_sequelize2 = require("sequelize");
const debug = require("debug")("noco-database");
const transaction = (0, import_transaction_decorator.transactionWrapperBuilder)(function() {
  return this.collection.model.sequelize.transaction();
});
const _RelationRepositoryBuilder = class _RelationRepositoryBuilder {
  collection;
  associationName;
  association;
  builderMap = {
    HasOne: import_hasone_repository.HasOneRepository,
    BelongsTo: import_belongs_to_repository.BelongsToRepository,
    BelongsToMany: import_belongs_to_many_repository.BelongsToManyRepository,
    HasMany: import_hasmany_repository.HasManyRepository,
    ArrayField: import_array_field_repository.ArrayFieldRepository,
    BelongsToArray: import_belongs_to_array_repository.BelongsToArrayRepository
  };
  constructor(collection, associationName) {
    this.collection = collection;
    this.associationName = associationName;
    this.association = this.collection.model.associations[this.associationName];
    if (this.association) {
      return;
    }
    const field = collection.getField(associationName);
    if (!field) {
      return;
    }
    if (field instanceof import_fields.ArrayField) {
      this.association = {
        associationType: "ArrayField"
      };
    }
  }
  of(id) {
    if (!this.association) {
      return;
    }
    const klass = this.builder()[this.association.associationType];
    return new klass(this.collection, this.associationName, id);
  }
  builder() {
    return this.builderMap;
  }
};
__name(_RelationRepositoryBuilder, "RelationRepositoryBuilder");
let RelationRepositoryBuilder = _RelationRepositoryBuilder;
const _Repository = class _Repository {
  database;
  collection;
  model;
  cursorBuilder;
  constructor(collection) {
    this.database = collection.context.database;
    this.collection = collection;
    this.model = collection.model;
    this.cursorBuilder = new import_cursor_builder.SmartCursorBuilder(this.database.sequelize, this.model.tableName, this.collection);
  }
  /**
   * return count by filter
   */
  async count(countOptions) {
    let options = countOptions ? import_lodash.default.clone(countOptions) : {};
    const transaction2 = await this.getTransaction(options);
    if (countOptions == null ? void 0 : countOptions.filter) {
      options = {
        ...options,
        ...this.parseFilter(countOptions.filter, countOptions)
      };
    }
    if (countOptions == null ? void 0 : countOptions.filterByTk) {
      const optionParser = new import_options_parser.OptionsParser(options, {
        collection: this.collection
      });
      options["where"] = {
        [import_sequelize.Op.and]: [options["where"] || {}, optionParser.filterByTkToWhereOption()]
      };
    }
    const queryOptions = {
      ...options,
      distinct: Boolean(this.collection.model.primaryKeyAttribute) && !this.collection.isMultiFilterTargetKey()
    };
    if (Array.isArray(queryOptions.include) && queryOptions.include.length > 0) {
      queryOptions.include = (0, import_utils2.processIncludes)(queryOptions.include, this.collection.model);
    } else {
      delete queryOptions.include;
    }
    return await this.collection.model.count({
      ...queryOptions,
      transaction: transaction2
    });
  }
  async getEstimatedRowCount() {
    var _a, _b, _c, _d;
    if (import_lodash2.default.isFunction(this.collection["isSql"]) && this.collection["isSql"]()) {
      return 0;
    }
    if (import_lodash2.default.isFunction(this.collection["isView"]) && this.collection["isView"]()) {
      return 0;
    }
    const tableName = this.collection.tableName();
    try {
      if (this.database.isMySQLCompatibleDialect()) {
        const results = await this.database.sequelize.query(
          `
        SELECT table_rows FROM information_schema.tables
        WHERE table_schema = DATABASE()
          AND table_name = ?
      `,
          { replacements: [tableName], type: import_sequelize.QueryTypes.SELECT }
        );
        return Number(((_a = results == null ? void 0 : results[0]) == null ? void 0 : _a[this.database.inDialect("mysql") ? "TABLE_ROWS" : "table_rows"]) ?? 0);
      }
      if (this.database.isPostgresCompatibleDialect()) {
        const results = await this.database.sequelize.query(
          `
        SELECT reltuples::BIGINT AS estimate
        FROM pg_class c JOIN pg_namespace n ON c.relnamespace = n.oid
        WHERE c.relname = ? AND n.nspname = ?;
      `,
          { replacements: [tableName, this.collection.collectionSchema()], type: import_sequelize.QueryTypes.SELECT, logging: true }
        );
        return Number(((_b = results == null ? void 0 : results[0]) == null ? void 0 : _b.estimate) ?? 0);
      }
      if (this.database.sequelize.getDialect() === "mssql") {
        const results = await this.database.sequelize.query(
          `
        SELECT SUM(row_count) AS estimate
        FROM sys.dm_db_partition_stats
        WHERE object_id = OBJECT_ID(?) AND (index_id = 0 OR index_id = 1)
      `,
          { replacements: [tableName], type: import_sequelize.QueryTypes.SELECT }
        );
        return Number(((_c = results == null ? void 0 : results[0]) == null ? void 0 : _c.estimate) ?? 0);
      }
      if (this.database.sequelize.getDialect() === "oracle") {
        const tableName2 = this.collection.name.toUpperCase();
        const schemaName = (await this.getOracleSchema()).toUpperCase();
        await this.database.sequelize.query(`BEGIN DBMS_STATS.GATHER_TABLE_STATS(:schema, :table); END;`, {
          replacements: { schema: schemaName, table: tableName2 },
          type: import_sequelize.QueryTypes.RAW
        });
        const results = await this.database.sequelize.query(
          `
      SELECT NUM_ROWS AS "estimate"
      FROM ALL_TABLES
      WHERE TABLE_NAME = :table AND OWNER = :schema
      `,
          {
            replacements: { table: tableName2, schema: schemaName },
            type: import_sequelize.QueryTypes.SELECT
          }
        );
        return Number(((_d = results == null ? void 0 : results[0]) == null ? void 0 : _d.estimate) ?? 0);
      }
    } catch (error) {
      this.database.logger.error(`Failed to get estimated row count for ${this.collection.name}:`, error);
      return 0;
    }
    return 0;
  }
  async getOracleSchema() {
    const [result] = await this.database.sequelize.query(`SELECT USER FROM DUAL`, {
      type: import_sequelize.QueryTypes.SELECT
    });
    return (result == null ? void 0 : result["USER"]) ?? "";
  }
  async aggregate(options) {
    var _a;
    const { method, field } = options;
    const queryOptions = this.buildQueryOptions({
      ...options,
      fields: []
    });
    (_a = options.optionsTransformer) == null ? void 0 : _a.call(options, queryOptions);
    delete queryOptions.order;
    const hasAssociationFilter = (() => {
      if (queryOptions.include && queryOptions.include.length > 0) {
        const filterInclude = queryOptions.include.filter((include) => {
          var _a2;
          return Object.keys(include.where || {}).length > 0 || ((_a2 = JSON.stringify(queryOptions == null ? void 0 : queryOptions.filter)) == null ? void 0 : _a2.includes(include.association));
        });
        return filterInclude.length > 0;
      }
      return false;
    })();
    if (hasAssociationFilter) {
      const primaryKeyField = this.model.primaryKeyAttribute;
      const queryInterface = this.database.sequelize.getQueryInterface();
      const findOptions = {
        ...queryOptions,
        raw: true,
        includeIgnoreAttributes: false,
        attributes: [
          [
            import_sequelize.Sequelize.literal(
              `DISTINCT ${queryInterface.quoteIdentifiers(`${this.collection.name}.${primaryKeyField}`)}`
            ),
            primaryKeyField
          ]
        ]
      };
      const ids = await this.model.findAll(findOptions);
      return await this.model.aggregate(field, method, {
        ...import_lodash.default.omit(queryOptions, ["where", "include"]),
        where: {
          [primaryKeyField]: ids.map((node) => node[primaryKeyField])
        }
      });
    }
    return await this.model.aggregate(field, method, queryOptions);
  }
  async chunk(options) {
    const { chunkSize, callback, limit: overallLimit, beforeFind, afterFind } = options;
    const transaction2 = await this.getTransaction(options);
    let offset = 0;
    let totalProcessed = 0;
    while (true) {
      const currentLimit = overallLimit !== void 0 ? Math.min(chunkSize, overallLimit - totalProcessed) : chunkSize;
      const findOptions = {
        ...options,
        limit: currentLimit,
        offset,
        transaction: transaction2
      };
      if (beforeFind) {
        await beforeFind(findOptions);
      }
      const rows = await this.find(findOptions);
      if (afterFind) {
        await afterFind(rows, { ...findOptions, offset });
      }
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
  /**
   * Cursor-based pagination query function.
   * Ideal for large datasets (e.g., millions of rows)
   * Note:
   *  1. does not support jumping to arbitrary pages (e.g., "Page 5")
   *  2. Requires a stable, indexed sort field (e.g. ID, createdAt)
   *  3. If custom orderBy is used, it must match the cursor field(s) and direction, otherwise results may be incorrect or unstable.
   * @param options
   */
  async chunkWithCursor(options) {
    return await this.cursorBuilder.chunk({
      ...options,
      find: this.find.bind(this)
    });
  }
  /**
   * find
   * @param options
   */
  async find(options = {}) {
    if ((options == null ? void 0 : options.targetCollection) && (options == null ? void 0 : options.targetCollection) !== this.collection.name) {
      return await this.database.getCollection(options.targetCollection).repository.find(options);
    }
    const model = this.collection.model;
    const transaction2 = await this.getTransaction(options);
    const opts = {
      subQuery: false,
      ...this.buildQueryOptions(options)
    };
    if (!import_lodash2.default.isUndefined(opts.limit)) {
      opts.limit = Number(opts.limit);
    }
    let rows;
    if (opts.include && opts.include.length > 0) {
      const eagerLoadingTree = import_eager_loading_tree.EagerLoadingTree.buildFromSequelizeOptions({
        model,
        rootAttributes: opts.attributes,
        includeOption: opts.include,
        rootOrder: opts.order,
        rootQueryOptions: opts,
        db: this.database
      });
      await eagerLoadingTree.load(transaction2);
      rows = eagerLoadingTree.root.instances;
    } else {
      if (opts.where && model.primaryKeyAttributes.length === 0) {
        opts.where = import_sequelize.Utils.mapWhereFieldNames(opts.where, model);
      }
      rows = await model.findAll({
        ...opts,
        transaction: transaction2
      });
    }
    await this.collection.db.emitAsync("afterRepositoryFind", {
      findOptions: options,
      dataCollection: this.collection,
      data: rows
    });
    return rows;
  }
  /**
   * find and count
   * @param options
   */
  async findAndCount(options) {
    options = {
      ...options,
      transaction: await this.getTransaction(options)
    };
    const count = await this.count(options);
    const results = count ? await this.find(options) : [];
    return [results, count];
  }
  /**
   * Find By Id
   *
   */
  findById(id) {
    return this.collection.model.findByPk(id);
  }
  findByTargetKey(targetKey) {
    return this.findOne({ filterByTk: targetKey });
  }
  /**
   * Find one record from database
   *
   * @param options
   */
  async findOne(options) {
    const transaction2 = await this.getTransaction(options);
    const rows = await this.find({ ...options, limit: 1, transaction: transaction2 });
    return rows.length == 1 ? rows[0] : null;
  }
  /**
   * Get the first record matching the attributes or create it.
   */
  async firstOrCreate(options) {
    const { filterKeys, values, transaction: transaction2, context, ...rest } = options;
    const filter = _Repository.valuesToFilter(values, filterKeys);
    const instance = await this.findOne({ filter, transaction: transaction2, context });
    if (instance) {
      return instance;
    }
    return this.create({ values, transaction: transaction2, context, ...rest });
  }
  async updateOrCreate(options) {
    const { filterKeys, values, transaction: transaction2, context, ...rest } = options;
    const filter = _Repository.valuesToFilter(values, filterKeys);
    const instance = await this.findOne({ filter, transaction: transaction2, context });
    if (instance) {
      return await this.update({
        filterByTk: instance.get(this.collection.filterTargetKey || this.collection.model.primaryKeyAttribute),
        values,
        transaction: transaction2,
        context,
        ...rest
      });
    }
    return this.create({ values, transaction: transaction2, context, ...rest });
  }
  async create(options) {
    if (Array.isArray(options.values)) {
      return this.createMany({
        ...options,
        records: options.values
      });
    }
    const transaction2 = await this.getTransaction(options);
    const guard = import_update_guard.UpdateGuard.fromOptions(this.model, {
      ...options,
      action: "create",
      underscored: this.collection.options.underscored
    });
    const values = this.model.callSetters(guard.sanitize(options.values || {}), options);
    const instance = await this.model.create(values, {
      ...options,
      transaction: transaction2
    });
    if (!instance) {
      return;
    }
    await (0, import_update_associations.updateAssociations)(instance, values, {
      ...options,
      transaction: transaction2
    });
    if (options.hooks !== false) {
      await this.database.emitAsync(`${this.collection.name}.afterCreateWithAssociations`, instance, {
        ...options,
        transaction: transaction2
      });
      await this.database.emitAsync(`${this.collection.name}.afterSaveWithAssociations`, instance, {
        ...options,
        transaction: transaction2
      });
      instance.clearChangedWithAssociations();
    }
    return instance;
  }
  async createMany(options) {
    const transaction2 = await this.getTransaction(options);
    const { records } = options;
    const instances = [];
    for (const values of records) {
      const instance = await this.create({ ...options, values, transaction: transaction2 });
      instances.push(instance);
    }
    return instances;
  }
  async update(options) {
    if (Array.isArray(options.values)) {
      return this.updateMany({
        ...options,
        records: options.values
      });
    }
    const transaction2 = await this.getTransaction(options);
    const guard = import_update_guard.UpdateGuard.fromOptions(this.model, { ...options, underscored: this.collection.options.underscored });
    const values = this.model.callSetters(guard.sanitize(options.values || {}), options);
    if (options.individualHooks === false) {
      const { model: Model2 } = this.collection;
      const primaryKeyField = Model2.primaryKeyField || Model2.primaryKeyAttribute;
      const queryOptions2 = this.buildQueryOptions({
        ...options,
        fields: [primaryKeyField]
      });
      const rows = await this.find({
        ...queryOptions2,
        transaction: transaction2
      });
      const [result] = await Model2.update(values, {
        where: {
          [primaryKeyField]: rows.map((row) => row.get(primaryKeyField))
        },
        fields: options.fields,
        hooks: options.hooks,
        validate: options.validate,
        sideEffects: options.sideEffects,
        limit: options.limit,
        silent: options.silent,
        transaction: transaction2
      });
      return result;
    }
    const queryOptions = this.buildQueryOptions(options);
    const instances = await this.find({
      ...queryOptions,
      transaction: transaction2
    });
    for (const instance of instances) {
      await (0, import_update_associations.updateModelByValues)(instance, values, {
        ...options,
        sanitized: true,
        transaction: transaction2
      });
    }
    if (options.hooks !== false) {
      for (const instance of instances) {
        await this.database.emitAsync(`${this.collection.name}.afterUpdateWithAssociations`, instance, {
          ...options,
          transaction: transaction2
        });
        await this.database.emitAsync(`${this.collection.name}.afterSaveWithAssociations`, instance, {
          ...options,
          transaction: transaction2
        });
        instance.clearChangedWithAssociations();
      }
    }
    return instances;
  }
  async updateMany(options) {
    const transaction2 = await this.getTransaction(options);
    const { records } = options;
    const instances = [];
    for (const values of records) {
      const filterByTk = values[this.model.primaryKeyAttribute];
      if (!filterByTk) {
        throw new Error("filterByTk invalid");
      }
      const instance = await this.update({ values, filterByTk, transaction: transaction2 });
      instances.push(instance);
    }
    return instances;
  }
  async destroy(options) {
    const transaction2 = await this.getTransaction(options);
    const modelFilterKey = this.collection.filterTargetKey;
    options = options;
    if (options["individualHooks"] === void 0) {
      options["individualHooks"] = true;
    }
    const filterByTk = options.filterByTk && !import_lodash.default.isArray(options.filterByTk) ? [options.filterByTk] : options.filterByTk;
    if (this.collection.model.primaryKeyAttributes.length !== 1 && filterByTk && !import_lodash.default.get(this.collection.options, "filterTargetKey")) {
      if (this.collection.model.primaryKeyAttributes.length > 1) {
        throw new Error(`filterByTk is not supported for composite primary key`);
      } else {
        throw new Error(`filterByTk is not supported for collection that has no primary key`);
      }
    }
    if (filterByTk && !(0, import_utils.isValidFilter)(options.filter)) {
      const where = [];
      for (const tk of filterByTk) {
        const optionParser = new import_options_parser.OptionsParser(
          {
            filterByTk: tk
          },
          {
            collection: this.collection
          }
        );
        where.push(optionParser.filterByTkToWhereOption());
      }
      const destroyOptions = {
        ...options,
        where: {
          [import_sequelize.Op.or]: where
        },
        transaction: transaction2
      };
      return await this.model.destroy(destroyOptions);
    }
    if (options.filter && (0, import_utils.isValidFilter)(options.filter)) {
      if (this.collection.model.primaryKeyAttributes.length !== 1 && !import_lodash.default.get(this.collection.options, "filterTargetKey")) {
        const queryOptions = {
          ...this.buildQueryOptions(options)
        };
        return await this.model.destroy({
          ...queryOptions,
          transaction: transaction2
        });
      }
      let pks = (await this.find({
        filter: options.filter,
        transaction: transaction2
      })).map((instance) => instance.get(modelFilterKey));
      if (filterByTk) {
        pks = import_lodash.default.intersection(
          pks.map((i) => `${i}`),
          filterByTk.map((i) => `${i}`)
        );
      }
      return await this.destroy({
        ...import_lodash.default.omit(options, "filter"),
        filterByTk: pks,
        transaction: transaction2
      });
    }
    if (options.truncate) {
      return await this.model.destroy({
        ...options,
        truncate: true,
        transaction: transaction2
      });
    }
  }
  /**
   * @param association target association
   */
  relation(association) {
    return new RelationRepositoryBuilder(this.collection, association);
  }
  buildQueryOptions(options) {
    const parser = new import_options_parser.OptionsParser(options, {
      collection: this.collection
    });
    const params = parser.toSequelizeParams({ parseSort: import_lodash2.default.isBoolean(options == null ? void 0 : options.parseSort) ? options.parseSort : true });
    debug("sequelize query params %o", params);
    if (options.where && params.where) {
      params.where = {
        [import_sequelize.Op.and]: [params.where, options.where]
      };
    }
    return { where: {}, ...options, ...params };
  }
  parseFilter(filter, options) {
    const parser = new import_filter_parser.default(filter, {
      collection: this.collection,
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
      return await this.model.sequelize.transaction();
    }
    return null;
  }
};
__name(_Repository, "Repository");
__publicField(_Repository, "valuesToFilter", import_filter_utils.valuesToFilter);
__decorateClass([
  transaction()
], _Repository.prototype, "create", 1);
__decorateClass([
  transaction()
], _Repository.prototype, "createMany", 1);
__decorateClass([
  transaction(),
  (0, import_must_have_filter_decorator.default)(),
  import_target_collection_decorator.default
], _Repository.prototype, "update", 1);
__decorateClass([
  transaction()
], _Repository.prototype, "updateMany", 1);
__decorateClass([
  transaction((args, transaction2) => {
    return {
      filterByTk: args[0],
      transaction: transaction2
    };
  })
], _Repository.prototype, "destroy", 1);
let Repository = _Repository;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Repository,
  Transactionable
});
