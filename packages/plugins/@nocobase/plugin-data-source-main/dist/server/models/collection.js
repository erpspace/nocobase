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
var collection_exports = {};
__export(collection_exports, {
  CollectionModel: () => CollectionModel
});
module.exports = __toCommonJS(collection_exports);
var import_database = require("@nocobase/database");
var import_lodash = __toESM(require("lodash"));
class CollectionModel extends import_database.MagicAttributeModel {
  get db() {
    return this.constructor.database;
  }
  toJSON() {
    const json = super.toJSON();
    const collection = this.db.getCollection(json.name);
    if (!json.filterTargetKey) {
      json.filterTargetKey = collection == null ? void 0 : collection.filterTargetKey;
    }
    if (collection && collection.unavailableActions) {
      json["unavailableActions"] = collection.unavailableActions();
    }
    if (collection && collection.availableActions) {
      json["availableActions"] = collection.availableActions();
    }
    return json;
  }
  async load(loadOptions = {}) {
    const { skipExist, skipField, resetFields, transaction } = loadOptions;
    const name = this.get("name");
    let collection;
    const collectionOptions = {
      origin: "@nocobase/plugin-data-source-main",
      ...this.get(),
      fields: [],
      loadedFromCollectionManager: true
    };
    if (!this.db.inDialect("postgres") && collectionOptions.schema) {
      delete collectionOptions.schema;
    }
    if (this.db.inDialect("postgres") && !collectionOptions.schema && collectionOptions.from !== "db2cm") {
      collectionOptions.schema = process.env.COLLECTION_MANAGER_SCHEMA || this.db.options.schema || "public";
    }
    if (this.db.hasCollection(name)) {
      collection = this.db.getCollection(name);
      if (skipExist) {
        return collection;
      }
      if (resetFields) {
        collection.resetFields();
      }
      collection.updateOptions(collectionOptions);
    } else {
      if (!collectionOptions.dumpRules) {
        import_lodash.default.set(collectionOptions, "dumpRules.group", "custom");
      }
      collection = this.db.collection(collectionOptions);
    }
    if (!skipField) {
      await this.loadFields({ transaction });
    }
    if (import_lodash.default.isArray(skipField)) {
      await this.loadFields({ transaction, skipField });
    }
    await this.db.emitAsync("collection:loaded", {
      collection,
      transaction
    });
    return collection;
  }
  async loadFields(options = {}) {
    let fields = this.get("fields") || [];
    if (!fields.length) {
      fields = await this.getFields(options);
    }
    if (options.skipField) {
      fields = fields.filter((field) => !options.skipField.includes(field.name));
    }
    if (options.includeFields) {
      fields = fields.filter((field) => options.includeFields.includes(field.name));
    }
    if (this.options.view && fields.find((f) => f.name == "id")) {
      fields = fields.map((field) => {
        if (field.name == "id") {
          field.set("primaryKey", true);
        } else {
          field.set("primaryKey", false);
        }
        return field;
      });
    }
    const instances = fields;
    instances.sort((a, b) => {
      if (a.isAssociationField() && !b.isAssociationField()) {
        return 1;
      }
      if (!a.isAssociationField() && b.isAssociationField()) {
        return -1;
      }
      return 0;
    });
    for (const instance of instances) {
      await instance.load(options);
    }
  }
  async remove(options) {
    const { transaction } = options || {};
    const name = this.get("name");
    const collection = this.db.getCollection(name);
    if (!collection) {
      return;
    }
    const fields = await this.db.getRepository("fields").find({
      filter: {
        "type.$in": ["belongsToMany", "belongsTo", "hasMany", "hasOne"]
      },
      transaction
    });
    for (const field of fields) {
      if (field.get("target") && field.get("target") === name) {
        await field.destroy({ transaction });
      } else if (field.get("through") && field.get("through") === name) {
        await field.destroy({ transaction });
      }
      if (field.get("collectionName") === name) {
        await field.destroy({ transaction });
      }
    }
    await collection.removeFromDb(options);
  }
  async migrate(options) {
    const pendingFieldsTargetToThis = this.db.pendingFields.get(this.get("name")) || [];
    const getPendingField = () => pendingFieldsTargetToThis.map((field) => {
      return {
        name: field.get("name"),
        collectionName: field.get("collectionName")
      };
    });
    const beforePendingFields = getPendingField();
    const collection = await this.load({
      transaction: options == null ? void 0 : options.transaction
    });
    const afterPendingFields = getPendingField();
    const resolvedPendingFields = import_lodash.default.differenceWith(beforePendingFields, afterPendingFields, import_lodash.default.isEqual);
    const resolvedPendingFieldsCollections = import_lodash.default.uniq(resolvedPendingFields.map((field) => field.collectionName));
    if (Object.keys(collection.model.tableAttributes).length == 0 && !this.db.inDialect("postgres")) {
      return;
    }
    try {
      const syncOptions = {
        force: false,
        alter: {
          drop: false
        },
        ...options
      };
      await collection.sync(syncOptions);
      for (const collectionName of resolvedPendingFieldsCollections) {
        await this.db.getCollection(collectionName).sync(syncOptions);
      }
    } catch (error) {
      console.error(error);
      const name = this.get("name");
      this.db.removeCollection(name);
      throw error;
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CollectionModel
});
