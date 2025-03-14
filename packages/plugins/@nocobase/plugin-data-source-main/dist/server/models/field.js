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
var field_exports = {};
__export(field_exports, {
  FieldModel: () => FieldModel
});
module.exports = __toCommonJS(field_exports);
var import_database = require("@nocobase/database");
var import_lodash = __toESM(require("lodash"));
class FieldModel extends import_database.MagicAttributeModel {
  get db() {
    return this.constructor.database;
  }
  isAssociationField() {
    return ["belongsTo", "hasOne", "hasMany", "belongsToMany"].includes(this.get("type"));
  }
  async load(loadOptions) {
    const { skipExist = false, transaction } = loadOptions || {};
    const collectionName = this.get("collectionName");
    if (!this.db.hasCollection(collectionName)) {
      return;
    }
    const collection = this.db.getCollection(collectionName);
    const name = this.get("name");
    if (skipExist && collection.hasField(name)) {
      return collection.getField(name);
    }
    const options = this.toJSON();
    const field = await (async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
      return collection.setField(name, {
        ...options,
        __sort: this.get("sort")
      });
    })();
    await this.db.emitAsync("field:loaded", {
      fieldKey: this.get("key"),
      transaction
    });
    if (transaction) {
      this.db.on("transactionRollback:" + transaction["id"], async () => {
        collection.removeField(name);
      });
    }
    return field;
  }
  async syncSortByField(options) {
    const collectionName = this.get("collectionName");
    const collection = this.db.getCollection(collectionName);
    await this.load(options);
    await collection.sync({
      force: false,
      alter: {
        drop: false
      },
      // @ts-ignore
      transaction: options.transaction
    });
  }
  async remove(options) {
    const collection = this.getFieldCollection();
    if (!collection) {
      return;
    }
    return collection.removeFieldFromDb(this.get("name"), {
      transaction: options.transaction
    });
  }
  async syncUniqueIndex(options) {
    const unique = this.get("unique");
    const collection = this.getFieldCollection();
    const field = collection.getField(this.get("name"));
    const columnName = collection.model.rawAttributes[this.get("name")].field;
    const tableName = collection.model.tableName;
    const queryInterface = this.db.sequelize.getQueryInterface();
    const existsIndexes = await queryInterface.showIndex(collection.getTableNameWithSchema(), {
      transaction: options.transaction
    });
    const existUniqueIndex = existsIndexes.find((item) => {
      return item.unique && item.fields[0].attribute === columnName && item.fields.length === 1;
    });
    let existsUniqueConstraint;
    const constraintName = `${tableName}_${field.name}_uk`;
    if (existUniqueIndex) {
      const existsUniqueConstraints = await queryInterface.showConstraint(
        collection.getTableNameWithSchema(),
        constraintName,
        {}
      );
      existsUniqueConstraint = existsUniqueConstraints[0];
    }
    if (unique && !existsUniqueConstraint) {
      await collection.sync({ ...options, force: false, alter: { drop: false } });
      await queryInterface.addConstraint(collection.getTableNameWithSchema(), {
        type: "unique",
        fields: [columnName],
        name: constraintName,
        transaction: options.transaction
      });
      this.db.logger.info(`add unique index ${constraintName}`);
    }
    if (!unique && existsUniqueConstraint) {
      await queryInterface.removeConstraint(collection.getTableNameWithSchema(), constraintName, {
        transaction: options.transaction
      });
      this.db.logger.info(`remove unique index ${constraintName}`);
    }
  }
  async syncDefaultValue(options) {
    const collection = this.getFieldCollection();
    if (!collection) {
      return;
    }
    if (collection.isView()) {
      return;
    }
    const field = collection.getField(this.get("name"));
    if (field.get("overriding")) {
      return;
    }
    const queryInterface = collection.db.sequelize.getQueryInterface();
    await queryInterface.changeColumn(
      collection.getTableNameWithSchema(),
      collection.model.rawAttributes[this.get("name")].field,
      {
        type: field.dataType,
        defaultValue: options.defaultValue
      },
      {
        transaction: options.transaction
      }
    );
  }
  async syncReferenceCheckOption(options) {
    const reverseKey = this.get("reverseKey");
    if (!reverseKey) return;
    const reverseField = await this.db.getCollection("fields").repository.findOne({
      filterByTk: reverseKey,
      transaction: options.transaction
    });
    if (!reverseField) return;
    reverseField.set("onDelete", this.get("onDelete"));
    await reverseField.save({ hooks: false, transaction: options.transaction });
  }
  getFieldCollection() {
    const collectionName = this.get("collectionName");
    if (!this.db.hasCollection(collectionName)) {
      return;
    }
    return this.db.getCollection(collectionName);
  }
  toJSON() {
    const json = super.toJSON();
    if (json.interface === "unixTimestamp" && json.accuracy) {
      import_lodash.default.set(json, "uiSchema.x-component-props.accuracy", json.accuracy);
    }
    return json;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FieldModel
});
