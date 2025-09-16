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
var collection_exports = {};
__export(collection_exports, {
  Collection: () => Collection
});
module.exports = __toCommonJS(collection_exports);
var import_deepmerge = __toESM(require("deepmerge"));
var import_events = require("events");
var import_lodash = __toESM(require("lodash"));
var import_safe_json_stringify = __toESM(require("safe-json-stringify"));
var import_sequelize = require("sequelize");
var import_model = require("./model");
var import_repository = require("./repository");
var import_utils = require("./utils");
function EnsureAtomicity(target, propertyKey, descriptor) {
  const originalMethod = descriptor.value;
  descriptor.value = function(...args) {
    const model = this.model;
    const beforeAssociationKeys = Object.keys(model.associations);
    const beforeRawAttributes = Object.keys(model.rawAttributes);
    const fieldName = args[0];
    const beforeField = this.getField(fieldName);
    try {
      return originalMethod.apply(this, args);
    } catch (error) {
      const afterAssociationKeys = Object.keys(model.associations);
      const createdAssociationKeys = import_lodash.default.difference(afterAssociationKeys, beforeAssociationKeys);
      for (const key of createdAssociationKeys) {
        delete this.model.associations[key];
      }
      const afterRawAttributes = Object.keys(model.rawAttributes);
      const createdRawAttributes = import_lodash.default.difference(afterRawAttributes, beforeRawAttributes);
      for (const key of createdRawAttributes) {
        delete this.model.rawAttributes[key];
      }
      if (!beforeField) {
        this.removeField(fieldName);
      }
      throw error;
    }
  };
  return descriptor;
}
__name(EnsureAtomicity, "EnsureAtomicity");
const _Collection = class _Collection extends import_events.EventEmitter {
  options;
  context;
  isThrough;
  fields = /* @__PURE__ */ new Map();
  model;
  repository;
  constructor(options, context) {
    super();
    this.context = context;
    this.options = options;
    this.checkOptions(options);
    this.bindFieldEventListener();
    this.modelInit();
    this.db.modelCollection.set(this.model, this);
    this.db.modelNameCollectionMap.set(this.model.name, this);
    this.db.tableNameCollectionMap.set(this.getTableNameWithSchemaAsString(), this);
    if (!options.inherits) {
      this.setFields(options.fields);
    }
    this.setRepository(options.repository);
    this.setSortable(options.sortable);
  }
  get filterTargetKey() {
    var _a;
    const targetKey = (_a = this.options) == null ? void 0 : _a.filterTargetKey;
    if (Array.isArray(targetKey)) {
      if (targetKey.length === 1) {
        return targetKey[0];
      }
      return targetKey;
    }
    if (targetKey && this.model.getAttributes()[targetKey]) {
      return targetKey;
    }
    if (this.model.primaryKeyAttributes.length > 1) {
      return null;
    }
    return this.model.primaryKeyAttribute;
  }
  get name() {
    return this.options.name;
  }
  get origin() {
    return this.options.origin || "core";
  }
  get titleField() {
    return this.options.titleField || this.model.primaryKeyAttribute;
  }
  get db() {
    return this.context.database;
  }
  get treeParentField() {
    for (const [_2, field] of this.fields) {
      if (field.options.treeParent) {
        return field;
      }
    }
  }
  get treeChildrenField() {
    for (const [_2, field] of this.fields) {
      if (field.options.treeChildren) {
        return field;
      }
    }
  }
  isMultiFilterTargetKey() {
    return Array.isArray(this.filterTargetKey) && this.filterTargetKey.length > 1;
  }
  tableName() {
    const { name, tableName } = this.options;
    const tName = tableName || name;
    return this.options.underscored ? (0, import_utils.snakeCase)(tName) : tName;
  }
  /**
   * @internal
   */
  modelInit() {
    if (this.model) {
      return;
    }
    const { name, model, autoGenId = true } = this.options;
    let M = import_model.Model;
    if (this.context.database.sequelize.isDefined(name)) {
      const m = this.context.database.sequelize.model(name);
      if (m.isThrough) {
        this.model = m;
        this.model.database = this.context.database;
        this.model.collection = this;
        return;
      }
    }
    if (typeof model === "string") {
      M = this.context.database.models.get(model) || import_model.Model;
    } else if (model) {
      M = model;
    }
    const collection = this;
    this.model = class extends M {
    };
    Object.defineProperty(this.model, "primaryKeyAttribute", {
      get: function() {
        const singleFilterTargetKey = (() => {
          if (!collection.options.filterTargetKey) {
            return null;
          }
          if (Array.isArray(collection.options.filterTargetKey) && collection.options.filterTargetKey.length === 1) {
            return collection.options.filterTargetKey[0];
          }
          return collection.options.filterTargetKey;
        })();
        if (!this._primaryKeyAttribute && singleFilterTargetKey && collection.getField(singleFilterTargetKey)) {
          return singleFilterTargetKey;
        }
        return this._primaryKeyAttribute;
      }.bind(this.model),
      set(value) {
        this._primaryKeyAttribute = value;
      }
    });
    Object.defineProperty(this.model, "primaryKeyAttributes", {
      get: function() {
        if (Array.isArray(this._primaryKeyAttributes) && this._primaryKeyAttributes.length) {
          return this._primaryKeyAttributes;
        }
        if (collection.options.filterTargetKey) {
          const fields = import_lodash.default.castArray(collection.options.filterTargetKey);
          if (fields.every((field) => collection.getField(field))) {
            return fields;
          }
        }
        return this._primaryKeyAttributes;
      }.bind(this.model),
      set(value) {
        this._primaryKeyAttributes = value;
      }
    });
    Object.defineProperty(this.model, "primaryKeyField", {
      get: function() {
        if (this.primaryKeyAttribute) {
          return this.rawAttributes[this.primaryKeyAttribute].field || this.primaryKeyAttribute;
        }
        return null;
      }.bind(this.model),
      set(val) {
        this._primaryKeyField = val;
      }
    });
    this.model.init(null, this.sequelizeModelOptions());
    this.model.options.modelName = this.options.name;
    if (!autoGenId) {
      this.model.removeAttribute("id");
    }
    this.model.database = this.context.database;
    this.model.collection = this;
  }
  setRepository(repository) {
    let repo = import_repository.Repository;
    if (typeof repository === "string") {
      repo = this.context.database.repositories.get(repository) || import_repository.Repository;
    }
    this.repository = new repo(this);
  }
  forEachField(callback) {
    return [...this.fields.values()].forEach(callback);
  }
  findField(callback) {
    return [...this.fields.values()].find(callback);
  }
  hasField(name) {
    return this.fields.has(name);
  }
  getField(name) {
    return this.fields.get(name);
  }
  getFieldByField(field) {
    return this.findField((f) => f.options.field === field);
  }
  getFields() {
    return [...this.fields.values()];
  }
  addField(name, options) {
    return this.setField(name, options);
  }
  checkFieldType(name, options) {
    if (!this.options.underscored) {
      return;
    }
    const fieldName = options.field || (0, import_utils.snakeCase)(name);
    const field = this.findField((f) => {
      if (f.name === name) {
        return false;
      }
      if (f.field) {
        return f.field === fieldName;
      }
      return (0, import_utils.snakeCase)(f.name) === fieldName;
    });
    if (!field) {
      return;
    }
    if (options.type === field.type) {
      return;
    }
    const isContextTypeMatch = /* @__PURE__ */ __name((data, dataType) => {
      var _a, _b;
      return [(_a = data.dataType) == null ? void 0 : _a.key, (_b = data.type) == null ? void 0 : _b.toUpperCase()].includes(dataType == null ? void 0 : dataType.toUpperCase());
    }, "isContextTypeMatch");
    if (options.type === "context" && isContextTypeMatch(field, options.dataType)) {
      return;
    }
    if (field.type === "context" && isContextTypeMatch(options, field.dataType.key)) {
      return;
    }
    throw new Error(`fields with same column must be of the same type ${JSON.stringify(options)}`);
  }
  /**
   * @internal
   */
  correctOptions(options) {
    if (options.primaryKey && options.autoIncrement) {
      delete options.defaultValue;
    }
  }
  setField(name, options) {
    (0, import_utils.checkIdentifier)(name);
    this.checkFieldType(name, options);
    const { database } = this.context;
    database.logger.trace(`beforeSetField: ${(0, import_safe_json_stringify.default)(options)}`, {
      databaseInstanceId: database.instanceId,
      collectionName: this.name,
      fieldName: name
    });
    if (options.source) {
      const [sourceCollectionName, sourceFieldName] = options.source.split(".");
      const sourceCollection = this.db.collections.get(sourceCollectionName);
      if (!sourceCollection) {
        this.db.logger.warn(
          `source collection "${sourceCollectionName}" not found for field "${name}" at collection "${this.name}"`
        );
        return null;
      } else {
        const sourceField = sourceCollection.fields.get(sourceFieldName);
        if (!sourceField) {
          this.db.logger.warn(
            `Source field "${sourceFieldName}" not found for field "${name}" at collection "${this.name}". Source collection: "${sourceCollectionName}"`
          );
          return null;
        } else {
          options = { ...import_lodash.default.omit(sourceField.options, ["name", "primaryKey"]), ...options };
        }
      }
    }
    this.correctOptions(options);
    this.emit("field.beforeAdd", name, options, { collection: this });
    const field = database.buildField(
      { name, ...options },
      {
        ...this.context,
        collection: this
      }
    );
    const oldField = this.fields.get(name);
    if (oldField && oldField.options.inherit && field.typeToString() != oldField.typeToString()) {
      throw new Error(
        `Field type conflict: cannot set "${name}" on "${this.name}" to ${options.type}, parent "${name}" type is ${oldField.options.type}`
      );
    }
    this.removeField(name);
    this.fields.set(name, field);
    this.emit("field.afterAdd", field);
    this.db.emit("field.afterAdd", {
      collection: this,
      field
    });
    if (this.isParent()) {
      for (const child of this.context.database.inheritanceMap.getChildren(this.name, {
        deep: false
      })) {
        const childCollection = this.db.getCollection(child);
        const existField = childCollection.getField(name);
        if (!existField || existField.options.inherit) {
          childCollection.setField(name, {
            ...options,
            inherit: true
          });
        }
      }
    }
    return field;
  }
  setFields(fields, resetFields = true) {
    if (!Array.isArray(fields)) {
      return;
    }
    if (resetFields) {
      this.resetFields();
    }
    for (const { name, ...options } of fields) {
      this.addField(name, options);
    }
  }
  resetFields() {
    const fieldNames = this.fields.keys();
    for (const fieldName of fieldNames) {
      this.removeField(fieldName);
    }
  }
  remove() {
    return this.context.database.removeCollection(this.name);
  }
  async removeFieldFromDb(name, options) {
    const field = this.getField(name);
    if (!field) {
      return;
    }
    const attribute = this.model.rawAttributes[name];
    if (!attribute) {
      field.remove();
      return;
    }
    if (this.isInherited() && this.parentFields().has(name)) {
      return;
    }
    if (this.model._virtualAttributes.has(this.name)) {
      field.remove();
      return;
    }
    if (this.model.options.timestamps !== false) {
      let timestampsFields = ["createdAt", "updatedAt", "deletedAt"];
      if (this.db.options.underscored) {
        timestampsFields = timestampsFields.map((fieldName) => (0, import_utils.snakeCase)(fieldName));
      }
      if (timestampsFields.includes(field.columnName())) {
        this.fields.delete(name);
        return;
      }
    }
    const sortable = this.options.sortable;
    if (sortable) {
      let sortField;
      if (sortable === true) {
        sortField = "sort";
      } else if (typeof sortable === "string") {
        sortField = sortable;
      } else if (sortable.name) {
        sortField = sortable.name || "sort";
      }
      if (field.name === sortField) {
        return;
      }
    }
    if (this.isView()) {
      field.remove();
      return;
    }
    const columnReferencesCount = import_lodash.default.filter(this.model.rawAttributes, (attr) => attr.field == field.columnName()).length;
    if (await field.existsInDb({
      transaction: options == null ? void 0 : options.transaction
    }) && columnReferencesCount == 1) {
      const columns = await this.model.sequelize.getQueryInterface().describeTable(this.getTableNameWithSchema(), options);
      if (Object.keys(columns).length == 1) {
        await this.removeFromDb({
          ...options,
          cascade: true,
          dropCollection: false
        });
      } else {
        const queryInterface = this.db.sequelize.getQueryInterface();
        await queryInterface.removeColumn(this.getTableNameWithSchema(), field.columnName(), options);
      }
    }
    field.remove();
  }
  async removeFromDb(options) {
    if (!this.isView() && await this.existsInDb({
      transaction: options == null ? void 0 : options.transaction
    })) {
      const queryInterface = this.db.sequelize.getQueryInterface();
      await queryInterface.dropTable(this.getTableNameWithSchema(), options);
    }
    if ((options == null ? void 0 : options.dropCollection) !== false) {
      return this.remove();
    }
  }
  async existsInDb(options) {
    return this.db.queryInterface.collectionTableExists(this, options);
  }
  removeField(name) {
    if (!this.fields.has(name)) {
      return;
    }
    const field = this.fields.get(name);
    const bool = this.fields.delete(name);
    if (bool) {
      if (this.isParent()) {
        for (const child of this.db.inheritanceMap.getChildren(this.name, {
          deep: false
        })) {
          const childCollection = this.db.getCollection(child);
          const existField = childCollection.getField(name);
          if (existField && existField.options.inherit) {
            childCollection.removeField(name);
          }
        }
      }
      this.emit("field.afterRemove", field);
    }
    return field;
  }
  updateOptions(options, mergeOptions) {
    let newOptions = import_lodash.default.cloneDeep(options);
    newOptions = (0, import_deepmerge.default)(this.options, newOptions, mergeOptions);
    if (options.filterTargetKey) {
      newOptions.filterTargetKey = options.filterTargetKey;
    }
    this.context.database.emit("beforeUpdateCollection", this, newOptions);
    this.options = newOptions;
    this.setFields(options.fields, false);
    if (options.repository) {
      this.setRepository(options.repository);
    }
    this.context.database.emit("afterUpdateCollection", this);
    return this;
  }
  setSortable(sortable) {
    if (!sortable) {
      return;
    }
    if (sortable === true) {
      this.setField("sort", {
        type: "sort",
        hidden: true
      });
    }
    if (typeof sortable === "string") {
      this.setField(sortable, {
        type: "sort",
        hidden: true
      });
    } else if (typeof sortable === "object") {
      const { name, ...opts } = sortable;
      this.setField(name || "sort", { type: "sort", hidden: true, ...opts });
    }
  }
  updateField(name, options) {
    if (!this.hasField(name)) {
      throw new Error(`field ${name} not exists`);
    }
    if (options.name && options.name !== name) {
      this.removeField(name);
    }
    this.setField(options.name || name, options);
  }
  addIndex(index) {
    if (!index) {
      return;
    }
    const indexes = this.model.options.indexes || [];
    let indexName = [];
    let indexItem;
    if (typeof index === "string") {
      indexItem = {
        fields: [index]
      };
      indexName = [index];
    } else if (Array.isArray(index)) {
      indexItem = {
        fields: index
      };
      indexName = index;
    } else if (index == null ? void 0 : index.fields) {
      indexItem = index;
      indexName = index.fields;
    }
    if (import_lodash.default.isEqual(this.model.primaryKeyAttributes, indexName)) {
      return;
    }
    const name = this.model.primaryKeyAttributes.join(",");
    if (name.startsWith(`${indexName.join(",")},`)) {
      return;
    }
    for (const item of indexes) {
      if (import_lodash.default.isEqual(item.fields, indexName)) {
        return;
      }
      const name2 = item.fields.join(",");
      if (name2.startsWith(`${indexName.join(",")},`)) {
        return;
      }
    }
    if (!indexItem) {
      return;
    }
    indexes.push(indexItem);
    const tableName = this.model.getTableName();
    this.model._indexes = this.model.options.indexes.map((index2) => import_sequelize.Utils.nameIndex(this.model._conformIndex(index2), tableName)).map((item) => {
      if (item.name && item.name.length > 63) {
        item.name = "i_" + (0, import_utils.md5)(item.name);
      }
      return item;
    });
    this.refreshIndexes();
  }
  removeIndex(fields) {
    if (!fields) {
      return;
    }
    const indexes = this.model._indexes;
    this.model._indexes = indexes.filter((item) => {
      return !import_lodash.default.isEqual(item.fields, fields);
    });
    this.refreshIndexes();
  }
  /**
   * @internal
   */
  refreshIndexes() {
    const indexes = this.model._indexes;
    this.model._indexes = import_lodash.default.uniqBy(
      indexes.filter((item) => {
        return item.fields.every((field) => this.model.rawAttributes[field]);
      }).map((item) => {
        item.fields = item.fields.map((field) => this.model.rawAttributes[field].field);
        return item;
      }),
      "name"
    );
  }
  async sync(syncOptions) {
    const modelNames = /* @__PURE__ */ new Set([this.model.name]);
    const { associations } = this.model;
    for (const associationKey in associations) {
      const association = associations[associationKey];
      modelNames.add(association.target.name);
      if (association.through) {
        modelNames.add(association.through.model.name);
      }
    }
    const models = [];
    this.context.database.sequelize.modelManager.forEachModel((model) => {
      if (modelNames.has(model.name)) {
        models.push(model);
      }
    });
    for (const model of models) {
      await model.sync(
        syncOptions || {
          force: false,
          alter: {
            drop: false
          }
        }
      );
    }
  }
  isInherited() {
    return false;
  }
  isParent() {
    return this.context.database.inheritanceMap.isParentNode(this.name);
  }
  getTableNameWithSchema() {
    const tableName = this.model.tableName;
    if (this.collectionSchema() && this.db.inDialect("postgres")) {
      return this.db.utils.addSchema(tableName, this.collectionSchema());
    }
    return tableName;
  }
  tableNameAsString(options) {
    const tableNameWithSchema = this.getTableNameWithSchema();
    if (import_lodash.default.isString(tableNameWithSchema)) {
      return tableNameWithSchema;
    }
    const schema = tableNameWithSchema.schema;
    const tableName = tableNameWithSchema.tableName;
    if ((options == null ? void 0 : options.ignorePublicSchema) && schema === "public") {
      return tableName;
    }
    return `${schema}.${tableName}`;
  }
  getRealTableName(quoted = false) {
    const realname = this.tableNameAsString();
    return !quoted ? realname : this.db.sequelize.getQueryInterface().quoteIdentifiers(realname);
  }
  getRealFieldName(name, quoted = false) {
    const realname = this.model.getAttributes()[name].field;
    return !quoted ? name : this.db.sequelize.getQueryInterface().quoteIdentifier(realname);
  }
  getTableNameWithSchemaAsString() {
    const tableName = this.model.tableName;
    if (this.collectionSchema() && this.db.inDialect("postgres")) {
      return `${this.collectionSchema()}.${tableName}`;
    }
    return tableName;
  }
  quotedTableName() {
    return this.db.utils.quoteTable(this.getTableNameWithSchema());
  }
  collectionSchema() {
    if (this.options.schema) {
      return this.options.schema;
    }
    if (this.db.options.schema) {
      return this.db.options.schema;
    }
    if (this.db.inDialect("postgres")) {
      return "public";
    }
    return void 0;
  }
  isView() {
    return false;
  }
  unavailableActions() {
    return [];
  }
  sequelizeModelOptions() {
    const { name } = this.options;
    const attr = {
      ...import_lodash.default.omit(this.options, ["name", "fields", "model", "targetKey"]),
      modelName: name,
      sequelize: this.context.database.sequelize,
      tableName: this.tableName()
    };
    return attr;
  }
  bindFieldEventListener() {
    this.on("field.afterAdd", (field) => {
      field.bind();
    });
    this.on("field.afterRemove", (field) => {
      field.unbind();
      this.db.emit("field.afterRemove", field);
    });
  }
  checkOptions(options) {
    (0, import_utils.checkIdentifier)(options.name);
    this.checkTableName();
  }
  checkTableName() {
    const tableName = this.tableName();
    for (const [k, collection] of this.db.collections) {
      if (collection.name != this.options.name && tableName === collection.tableName() && collection.collectionSchema() === this.collectionSchema()) {
        throw new Error(`collection ${collection.name} and ${this.name} have same tableName "${tableName}"`);
      }
    }
  }
};
__name(_Collection, "Collection");
__decorateClass([
  EnsureAtomicity
], _Collection.prototype, "setField", 1);
let Collection = _Collection;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Collection
});
