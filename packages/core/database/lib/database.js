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
var database_exports = {};
__export(database_exports, {
  Database: () => Database,
  default: () => database_default,
  defineCollection: () => defineCollection,
  extend: () => extend,
  extendCollection: () => extendCollection
});
module.exports = __toCommonJS(database_exports);
var import_logger = require("@nocobase/logger");
var import_utils = require("@nocobase/utils");
var import_chalk = __toESM(require("chalk"));
var import_events = require("events");
var import_exponential_backoff = require("exponential-backoff");
var import_glob = __toESM(require("glob"));
var import_lodash = __toESM(require("lodash"));
var import_nanoid = require("nanoid");
var import_path = require("path");
var import_safe_json_stringify = __toESM(require("safe-json-stringify"));
var import_sequelize = require("sequelize");
var import_umzug = require("umzug");
var import_collection_factory = require("./collection-factory");
var import_collection_importer = require("./collection-importer");
var import_database_utils = __toESM(require("./database-utils"));
var import_references_map = __toESM(require("./features/references-map"));
var import_referential_integrity_check = require("./features/referential-integrity-check");
var FieldTypes = __toESM(require("./fields"));
var import_helpers = require("./helpers");
var import_inherited_collection = require("./inherited-collection");
var import_inherited_map = __toESM(require("./inherited-map"));
var import_interface_manager = require("./interface-manager");
var import_utils2 = require("./interfaces/utils");
var import_listeners = require("./listeners");
var import_migration = require("./migration");
var import_model_hook = require("./model-hook");
var import_operators = __toESM(require("./operators"));
var import_query_interface_builder = __toESM(require("./query-interface/query-interface-builder"));
var import_utils3 = require("./utils");
var import_value_parsers = require("./value-parsers");
var import_view_collection = require("./view-collection");
const _Database = class _Database extends import_events.EventEmitter {
  sequelize;
  migrator;
  migrations;
  fieldTypes = /* @__PURE__ */ new Map();
  fieldValueParsers = /* @__PURE__ */ new Map();
  options;
  models = /* @__PURE__ */ new Map();
  repositories = /* @__PURE__ */ new Map();
  operators = /* @__PURE__ */ new Map();
  collections = /* @__PURE__ */ new Map();
  collectionsSort = /* @__PURE__ */ new Map();
  pendingFields = /* @__PURE__ */ new Map();
  modelCollection = /* @__PURE__ */ new Map();
  modelNameCollectionMap = /* @__PURE__ */ new Map();
  tableNameCollectionMap = /* @__PURE__ */ new Map();
  context = {};
  queryInterface;
  utils = new import_database_utils.default(this);
  referenceMap = new import_references_map.default(this);
  inheritanceMap = new import_inherited_map.default();
  importedFrom = /* @__PURE__ */ new Map();
  modelHook;
  delayCollectionExtend = /* @__PURE__ */ new Map();
  logger;
  interfaceManager = new import_interface_manager.InterfaceManager(this);
  collectionFactory = new import_collection_factory.CollectionFactory(this);
  dialect;
  static registerDialect(dialect) {
    this.dialects.set(dialect.dialectName, dialect);
  }
  static getDialect(name) {
    return this.dialects.get(name);
  }
  constructor(options) {
    super();
    const dialectClass = _Database.getDialect(options.dialect);
    if (!dialectClass) {
      throw new Error(`unsupported dialect ${options.dialect}`);
    }
    this.dialect = new dialectClass();
    const opts = {
      sync: {
        alter: {
          drop: false
        },
        force: false
      },
      ...import_lodash.default.clone(options)
    };
    if (options.logger) {
      if (typeof options.logger["log"] === "function") {
        this.logger = options.logger;
      } else {
        this.logger = (0, import_logger.createLogger)(options.logger);
      }
    } else {
      this.logger = (0, import_logger.createConsoleLogger)();
    }
    if (!options.instanceId) {
      this._instanceId = (0, import_nanoid.nanoid)();
    } else {
      this._instanceId = options.instanceId;
    }
    if (options.storage && options.storage !== ":memory:") {
      if (!(0, import_path.isAbsolute)(options.storage)) {
        opts.storage = (0, import_path.resolve)(process.cwd(), options.storage);
      }
    }
    opts.rawTimezone = opts.timezone;
    if (options.dialect === "sqlite") {
      delete opts.timezone;
    } else if (!opts.timezone) {
      opts.timezone = "+00:00";
    }
    if (options.dialect === "postgres") {
      const types = require("pg").types;
      types.setTypeParser(types.builtins.INT8, function(val) {
        if (val <= Number.MAX_SAFE_INTEGER) {
          return Number(val);
        }
        return val;
      });
    }
    if (options.logging && process.env["DB_SQL_BENCHMARK"] == "true") {
      opts.benchmark = true;
    }
    this.options = opts;
    this.logger.debug(
      `create database instance: ${(0, import_safe_json_stringify.default)(
        // remove sensitive information
        import_lodash.default.omit(this.options, ["storage", "host", "password"])
      )}`,
      {
        databaseInstanceId: this.instanceId
      }
    );
    const sequelizeOptions = this.sequelizeOptions(this.options);
    this.sequelize = new import_sequelize.Sequelize(sequelizeOptions);
    this.queryInterface = (0, import_query_interface_builder.default)(this);
    this.collections = /* @__PURE__ */ new Map();
    this.modelHook = new import_model_hook.ModelHook(this);
    this.on("afterDefineCollection", (collection) => {
      var _a, _b;
      (_a = this.pendingFields.get(collection.name)) == null ? void 0 : _a.forEach((field) => field.bind());
      (_b = this.delayCollectionExtend.get(collection.name)) == null ? void 0 : _b.forEach((collectionExtend) => {
        collection.updateOptions(collectionExtend.collectionOptions, collectionExtend.mergeOptions);
      });
    });
    for (const [name, field] of Object.entries(FieldTypes)) {
      if (["Field", "RelationField"].includes(name)) {
        continue;
      }
      let key = name.replace(/Field$/g, "");
      key = key.substring(0, 1).toLowerCase() + key.substring(1);
      this.registerFieldTypes({
        [key]: field
      });
    }
    (0, import_utils2.registerInterfaces)(this);
    (0, import_value_parsers.registerFieldValueParsers)(this);
    this.initOperators();
    const migratorOptions = this.options.migrator || {};
    const context = {
      db: this,
      sequelize: this.sequelize,
      queryInterface: this.sequelize.getQueryInterface(),
      ...migratorOptions.context
    };
    this.migrations = new import_migration.Migrations(context);
    this.sequelize.beforeDefine((model, opts2) => {
      if (this.options.tablePrefix) {
        if (opts2.tableName && opts2.tableName.startsWith(this.options.tablePrefix)) {
          return;
        }
        opts2.tableName = `${this.options.tablePrefix}${opts2.tableName || opts2.modelName || opts2.name.plural}`;
      }
    });
    this.collection({
      name: "migrations",
      autoGenId: false,
      timestamps: false,
      dumpRules: "required",
      migrationRules: ["schema-only", "overwrite"],
      origin: "@nocobase/database",
      fields: [{ type: "string", name: "name", primaryKey: true }]
    });
    this.migrator = new import_umzug.Umzug({
      logger: migratorOptions.logger || console,
      migrations: this.migrations.callback(),
      context,
      storage: new import_umzug.SequelizeStorage({
        tableName: `${this.options.tablePrefix || ""}migrations`,
        modelName: "migrations",
        ...migratorOptions.storage,
        sequelize: this.sequelize
      })
    });
    this.initListener();
    (0, import_utils3.patchSequelizeQueryInterface)(this);
    this.registerCollectionType();
  }
  _instanceId;
  get instanceId() {
    return this._instanceId;
  }
  /**
   * @internal
   */
  createMigrator({ migrations }) {
    const migratorOptions = this.options.migrator || {};
    const context = {
      db: this,
      sequelize: this.sequelize,
      queryInterface: this.sequelize.getQueryInterface(),
      ...migratorOptions.context
    };
    return new import_umzug.Umzug({
      logger: migratorOptions.logger || console,
      migrations: Array.isArray(migrations) ? import_lodash.default.sortBy(migrations, (m) => m.name) : migrations,
      context,
      storage: new import_umzug.SequelizeStorage({
        tableName: `${this.options.tablePrefix || ""}migrations`,
        modelName: "migrations",
        ...migratorOptions.storage,
        sequelize: this.sequelize
      })
    });
  }
  /**
   * @internal
   */
  setContext(context) {
    this.context = context;
  }
  /**
   * @internal
   */
  sequelizeOptions(options) {
    return this.dialect.getSequelizeOptions(options);
  }
  /**
   * @internal
   */
  initListener() {
    this.on("afterConnect", async (client) => {
      if (this.inDialect("postgres")) {
        await client.query("SET search_path = public");
      }
    });
    this.on("beforeDefine", (model, options) => {
      if (this.options.underscored && options.underscored === void 0) {
        options.underscored = true;
      }
    });
    this.on("afterCreate", async (instance) => {
      var _a;
      (_a = instance == null ? void 0 : instance.toChangedWithAssociations) == null ? void 0 : _a.call(instance);
    });
    this.on("beforeValidate", async (instance) => {
      for (const [key, attribute] of Object.entries(instance.constructor.rawAttributes)) {
        if (attribute.unique && instance.changed(key)) {
          if (instance.get(key) === "") {
            instance.set(key, null);
          }
        }
      }
    });
    this.on("afterUpdate", async (instance) => {
      var _a;
      (_a = instance == null ? void 0 : instance.toChangedWithAssociations) == null ? void 0 : _a.call(instance);
    });
    this.on("beforeDestroy", async (instance, options) => {
      await (0, import_referential_integrity_check.referentialIntegrityCheck)({
        db: this,
        referencedInstance: instance,
        transaction: options.transaction
      });
    });
    this.on("afterRemoveCollection", (collection) => {
      this.inheritanceMap.removeNode(collection.name);
    });
    this.on("afterDefine", (model) => {
      if (import_lodash.default.get(this.options, "usingBigIntForId", true)) {
        const idAttribute = model.rawAttributes["id"];
        if (idAttribute && idAttribute.primaryKey) {
          model.rawAttributes["id"].type = import_sequelize.DataTypes.BIGINT;
          model.refreshAttributes();
        }
      }
    });
    this.on("afterUpdateCollection", (collection, options) => {
      if (collection.options.schema) {
        collection.model._schema = collection.options.schema;
      }
      if (collection.options.sql) {
        collection.modelInit();
      }
    });
    this.on("beforeDefineCollection", (options) => {
      if (this.options.underscored && options.underscored === void 0) {
        options.underscored = true;
      }
      if (options.underscored) {
        if (import_lodash.default.get(options, "indexes")) {
          options.indexes = options.indexes.map((index) => {
            if (index.fields) {
              index.fields = index.fields.map((field) => {
                if (field.name) {
                  return { name: (0, import_utils3.snakeCase)(field.name), ...field };
                }
                return (0, import_utils3.snakeCase)(field);
              });
            }
            return index;
          });
        }
      }
      if (this.options.schema && !options.schema) {
        options.schema = this.options.schema;
      }
    });
    this.on("afterDefineCollection", async (collection) => {
      const options = collection.options;
      if (options.origin) {
        const existsSet = this.importedFrom.get(options.origin) || /* @__PURE__ */ new Set();
        existsSet.add(collection.name);
        this.importedFrom.set(options.origin, existsSet);
      }
    });
    (0, import_listeners.registerBuiltInListeners)(this);
  }
  addMigration(item) {
    return this.migrations.add(item);
  }
  addMigrations(options) {
    const { namespace, context, extensions = ["js", "ts"], directory } = options;
    const patten = `${directory}/*.{${extensions.join(",")}}`;
    const files = import_glob.default.sync(patten, {
      ignore: ["**/*.d.ts"]
    });
    for (const file of files) {
      let filename = (0, import_path.basename)(file);
      filename = filename.substring(0, filename.lastIndexOf(".")) || filename;
      this.migrations.add({
        name: namespace ? `${namespace}/${filename}` : filename,
        migration: file,
        context
      });
    }
  }
  inDialect(...dialect) {
    return dialect.includes(this.sequelize.getDialect());
  }
  isMySQLCompatibleDialect() {
    return this.inDialect("mysql", "mariadb");
  }
  isPostgresCompatibleDialect() {
    return this.inDialect("postgres");
  }
  /**
   * Add collection to database
   * @param options
   */
  collection(options) {
    options = import_lodash.default.cloneDeep(options);
    if (this.options.underscored) {
      options.underscored = true;
    }
    this.logger.trace(`beforeDefineCollection: ${(0, import_safe_json_stringify.default)(options)}`, {
      databaseInstanceId: this.instanceId
    });
    this.emit("beforeDefineCollection", options);
    const collection = this.collectionFactory.createCollection(options);
    this.collections.set(collection.name, collection);
    this.emit("afterDefineCollection", collection);
    return collection;
  }
  getTablePrefix() {
    return this.options.tablePrefix || "";
  }
  getFieldByPath(path) {
    if (!path) {
      return;
    }
    const [collectionName, associationName, ...args] = path.split(".");
    const collection = this.getCollection(collectionName);
    if (!collection) {
      return;
    }
    const field = collection.getField(associationName);
    if (!field) {
      return;
    }
    if (args.length > 0) {
      return this.getFieldByPath(`${field == null ? void 0 : field.target}.${args.join(".")}`);
    }
    return field;
  }
  getCollectionByModelName(name) {
    return this.modelNameCollectionMap.get(name);
  }
  /**
   * get exists collection by its name
   * @param name
   */
  getCollection(name) {
    var _a;
    if (!name) {
      return null;
    }
    const [collectionName, associationName] = name.split(".");
    const collection = this.collections.get(collectionName);
    if (associationName) {
      const target = (_a = collection.getField(associationName)) == null ? void 0 : _a.target;
      return target ? this.collections.get(target) : null;
    }
    return collection;
  }
  hasCollection(name) {
    return !!this.getCollection(name);
  }
  removeCollection(name) {
    const collection = this.collections.get(name);
    this.emit("beforeRemoveCollection", collection);
    collection.resetFields();
    const result = this.collections.delete(name);
    this.sequelize.modelManager.removeModel(collection.model);
    if (result) {
      this.emit("afterRemoveCollection", collection);
    }
    return collection;
  }
  getModel(name) {
    return this.getCollection(name).model;
  }
  getRepository(name, relationId) {
    var _a, _b, _c;
    const [collection, relation] = name.split(".");
    if (relation) {
      return (_b = (_a = this.getRepository(collection)) == null ? void 0 : _a.relation(relation)) == null ? void 0 : _b.of(relationId);
    }
    return (_c = this.getCollection(name)) == null ? void 0 : _c.repository;
  }
  /**
   * @internal
   */
  addPendingField(field) {
    const associating = this.pendingFields;
    const items = this.pendingFields.get(field.target) || [];
    items.push(field);
    associating.set(field.target, items);
  }
  /**
   * @internal
   */
  removePendingField(field) {
    const items = this.pendingFields.get(field.target) || [];
    const index = items.indexOf(field);
    if (index !== -1) {
      delete items[index];
      this.pendingFields.set(field.target, items);
    }
  }
  registerFieldTypes(fieldTypes) {
    for (const [type, fieldType] of Object.entries(fieldTypes)) {
      this.fieldTypes.set(type, fieldType);
    }
  }
  registerFieldValueParsers(parsers) {
    for (const [type, parser] of Object.entries(parsers)) {
      this.fieldValueParsers.set(type, parser);
    }
  }
  buildFieldValueParser(field, ctx) {
    const Parser = field && this.fieldValueParsers.has(field.type) ? this.fieldValueParsers.get(field.type) : this.fieldValueParsers.get("default");
    const parser = new Parser(field, ctx);
    return parser;
  }
  registerModels(models) {
    for (const [type, schemaType] of Object.entries(models)) {
      this.models.set(type, schemaType);
    }
  }
  registerRepositories(repositories) {
    for (const [type, schemaType] of Object.entries(repositories)) {
      this.repositories.set(type, schemaType);
    }
  }
  /**
   * @internal
   */
  initOperators() {
    const operators = /* @__PURE__ */ new Map();
    for (const key in import_sequelize.Op) {
      operators.set("$" + key, import_sequelize.Op[key]);
      const val = import_sequelize.Utils.underscoredIf(key, true);
      operators.set("$" + val, import_sequelize.Op[key]);
      operators.set("$" + val.replace(/_/g, ""), import_sequelize.Op[key]);
    }
    this.operators = operators;
    this.registerOperators({
      ...import_operators.default
    });
  }
  registerOperators(operators) {
    for (const [key, operator] of Object.entries(operators)) {
      this.operators.set(key, operator);
    }
  }
  /**
   * @internal
   */
  buildField(options, context) {
    const { type } = options;
    const Field2 = this.fieldTypes.get(type);
    if (!Field2) {
      throw Error(`unsupported field type ${type}`);
    }
    const { collection } = context;
    if (options.field && collection.options.underscored && !collection.isView()) {
      options.field = (0, import_utils3.snakeCase)(options.field);
    }
    if (Object.prototype.hasOwnProperty.call(options, "defaultValue") && options.defaultValue === null) {
      delete options.defaultValue;
    }
    return new Field2(options, context);
  }
  async sync(options) {
    const isMySQL = this.isMySQLCompatibleDialect();
    if (isMySQL) {
      await this.sequelize.query("SET FOREIGN_KEY_CHECKS = 0", null);
    }
    if (this.options.schema && this.inDialect("postgres")) {
      await this.sequelize.query(`CREATE SCHEMA IF NOT EXISTS "${this.options.schema}"`, null);
    }
    const result = await this.sequelize.sync(options);
    if (isMySQL) {
      await this.sequelize.query("SET FOREIGN_KEY_CHECKS = 1", null);
    }
    return result;
  }
  async clean(options) {
    const { drop, ...others } = options || {};
    if (drop !== true) {
      return;
    }
    if (this.options.schema) {
      const tableNames = (await this.sequelize.getQueryInterface().showAllTables()).map((table) => {
        return `"${this.options.schema}"."${table}"`;
      });
      const skip = options.skip || [];
      for (const tableName of tableNames) {
        if (skip.includes(tableName)) {
          continue;
        }
        await this.sequelize.query(`DROP TABLE IF EXISTS ${tableName} CASCADE`);
      }
      return;
    }
    await this.queryInterface.dropAll(options);
  }
  async collectionExistsInDb(name, options) {
    const collection = this.getCollection(name);
    if (!collection) {
      return false;
    }
    return await this.queryInterface.collectionTableExists(collection, options);
  }
  isSqliteMemory() {
    return this.sequelize.getDialect() === "sqlite" && import_lodash.default.get(this.options, "storage") == ":memory:";
  }
  /* istanbul ignore next -- @preserve */
  async auth(options = {}) {
    const { retry = 9, ...others } = options;
    const startingDelay = 50;
    const timeMultiple = 2;
    let attemptNumber = 1;
    const authenticate = /* @__PURE__ */ __name(async () => {
      try {
        await this.sequelize.authenticate(others);
        this.logger.info("connection has been established successfully.", { method: "auth" });
      } catch (error) {
        this.logger.warn(`attempt ${attemptNumber}/${retry}: Unable to connect to the database: ${error.message}`, {
          method: "auth"
        });
        const nextDelay = startingDelay * Math.pow(timeMultiple, attemptNumber - 1);
        attemptNumber++;
        if (attemptNumber < retry) {
          this.logger.warn(`will retry in ${nextDelay}ms...`, { method: "auth" });
        }
        throw error;
      }
    }, "authenticate");
    try {
      await (0, import_exponential_backoff.backOff)(authenticate, {
        numOfAttempts: retry,
        startingDelay,
        timeMultiple
      });
    } catch (error) {
      throw new Error(`Unable to connect to the database`, { cause: error });
    }
  }
  /**
   * @internal
   */
  async checkVersion() {
    return process.env.DB_SKIP_VERSION_CHECK === "on" || await (0, import_helpers.checkDatabaseVersion)(this);
  }
  /**
   * @internal
   */
  async prepare() {
    if (this.isMySQLCompatibleDialect()) {
      const result = await this.sequelize.query(`SHOW VARIABLES LIKE 'lower_case_table_names'`, { plain: true });
      if ((result == null ? void 0 : result.Value) === "1" && !this.options.underscored) {
        throw new Error(
          `Your database lower_case_table_names=1, please add ${import_chalk.default.yellow("DB_UNDERSCORED=true")} to the .env file`
        );
      }
    }
    if (this.inDialect("postgres") && this.options.schema && this.options.schema != "public") {
      await this.sequelize.query(`CREATE SCHEMA IF NOT EXISTS "${this.options.schema}"`, null);
    }
  }
  async reconnect() {
    if (this.isSqliteMemory()) {
      return;
    }
    const ConnectionManager = this.sequelize.dialect.connectionManager.constructor;
    const connectionManager = new ConnectionManager(this.sequelize.dialect, this.sequelize);
    this.sequelize.dialect.connectionManager = connectionManager;
    this.sequelize.connectionManager = connectionManager;
  }
  closed() {
    return this.sequelize.connectionManager.pool._draining;
  }
  async close() {
    var _a, _b;
    if (this.isSqliteMemory()) {
      return;
    }
    await this.emitAsync("beforeClose", this);
    const closeResult = this.sequelize.close();
    if ((_b = (_a = this.options) == null ? void 0 : _a.customHooks) == null ? void 0 : _b["afterClose"]) {
      await this.options.customHooks["afterClose"](this);
    }
    return closeResult;
  }
  on(event, listener) {
    const type = this.modelHook.match(event);
    if (type && !this.modelHook.hasBoundEvent(type)) {
      this.sequelize.addHook(type, this.modelHook.buildSequelizeHook(type));
      this.modelHook.bindEvent(type);
    }
    return super.on(event, listener);
  }
  extendCollection(collectionOptions, mergeOptions) {
    collectionOptions = import_lodash.default.cloneDeep(collectionOptions);
    const collectionName = collectionOptions.name;
    const existCollection = this.getCollection(collectionName);
    if (existCollection) {
      existCollection.updateOptions(collectionOptions, mergeOptions);
    } else {
      const existDelayExtends = this.delayCollectionExtend.get(collectionName) || [];
      this.delayCollectionExtend.set(collectionName, [...existDelayExtends, { collectionOptions, mergeOptions }]);
    }
  }
  async import(options) {
    const reader = new import_collection_importer.ImporterReader(options.directory, options.extensions);
    const modules = await reader.read();
    const result = /* @__PURE__ */ new Map();
    for (const module2 of modules) {
      if (module2.extend) {
        this.extendCollection(module2.collectionOptions, module2.mergeOptions);
      } else {
        const collection = this.collection({
          ...module2,
          origin: options.from
        });
        result.set(collection.name, collection);
      }
    }
    return result;
  }
  registerCollectionType() {
    this.collectionFactory.registerCollectionType(import_inherited_collection.InheritedCollection, {
      condition: /* @__PURE__ */ __name((options) => {
        return options.inherits && import_lodash.default.castArray(options.inherits).length > 0;
      }, "condition")
    });
    this.collectionFactory.registerCollectionType(import_view_collection.ViewCollection, {
      condition: /* @__PURE__ */ __name((options) => {
        return options.viewName || options.view;
      }, "condition"),
      async onSync() {
        return;
      },
      async onDump(dumper, collection) {
        try {
          const viewDef = await collection.db.queryInterface.viewDef(collection.getTableNameWithSchemaAsString());
          dumper.writeSQLContent(`view-${collection.name}`, {
            sql: [
              `DROP VIEW IF EXISTS ${collection.getTableNameWithSchemaAsString()}`,
              `CREATE VIEW ${collection.getTableNameWithSchemaAsString()} AS ${viewDef}`
            ],
            group: "required"
          });
        } catch (e) {
          return;
        }
        return;
      }
    });
  }
};
__name(_Database, "Database");
__publicField(_Database, "dialects", /* @__PURE__ */ new Map());
let Database = _Database;
function extendCollection(collectionOptions, mergeOptions) {
  return {
    collectionOptions,
    mergeOptions,
    extend: true
  };
}
__name(extendCollection, "extendCollection");
const extend = extendCollection;
const defineCollection = /* @__PURE__ */ __name((collectionOptions) => {
  return collectionOptions;
}, "defineCollection");
(0, import_utils.applyMixins)(Database, [import_utils.AsyncEmitter]);
(0, import_helpers.registerDialects)();
var database_default = Database;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Database,
  defineCollection,
  extend,
  extendCollection
});
