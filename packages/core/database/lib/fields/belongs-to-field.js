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
var belongs_to_field_exports = {};
__export(belongs_to_field_exports, {
  BelongsToField: () => BelongsToField
});
module.exports = __toCommonJS(belongs_to_field_exports);
var import_lodash = __toESM(require("lodash"));
var import_sequelize = require("sequelize");
var import_references_map = require("../features/references-map");
var import_utils = require("../utils");
var import_relation_field = require("./relation-field");
const _BelongsToField = class _BelongsToField extends import_relation_field.RelationField {
  get dataType() {
    return "BelongsTo";
  }
  get target() {
    const { target, name } = this.options;
    return target || import_sequelize.Utils.pluralize(name);
  }
  static toReference(db, association, onDelete, priority = "default") {
    const targetKey = association.targetKey;
    return (0, import_references_map.buildReference)({
      sourceCollectionName: db.modelCollection.get(association.source).name,
      sourceField: association.foreignKey,
      targetField: targetKey,
      targetCollectionName: db.modelCollection.get(association.target).name,
      onDelete,
      priority
    });
  }
  reference(association) {
    return _BelongsToField.toReference(
      this.database,
      association,
      this.options.onDelete,
      this.options.onDelete ? "user" : "default"
    );
  }
  checkAssociationKeys() {
    let { foreignKey, targetKey } = this.options;
    if (!targetKey) {
      targetKey = this.TargetModel.primaryKeyAttribute;
    }
    if (!foreignKey) {
      foreignKey = import_lodash.default.camelCase(`${this.name}_${targetKey}`);
    }
    const targetKeyAttribute = this.TargetModel.rawAttributes[targetKey];
    const foreignKeyAttribute = this.collection.model.rawAttributes[foreignKey];
    if (!foreignKeyAttribute || !targetKeyAttribute) {
      return;
    }
    const foreignKeyType = foreignKeyAttribute.type.constructor.toString();
    const targetKeyType = targetKeyAttribute.type.constructor.toString();
    if (!this.keyPairsTypeMatched(foreignKeyType, targetKeyType)) {
      throw new Error(
        `Foreign key "${foreignKey}" type "${foreignKeyType}" does not match target key "${targetKey}" type "${targetKeyType}" in belongs to relation "${this.name}" of collection "${this.collection.name}"`
      );
    }
  }
  bind() {
    const { database, collection } = this.context;
    const Target = this.TargetModel;
    if (!Target) {
      database.addPendingField(this);
      return false;
    }
    this.checkAssociationKeys();
    if (collection.model.associations[this.name]) {
      delete collection.model.associations[this.name];
    }
    const association = collection.model.belongsTo(Target, {
      as: this.name,
      constraints: false,
      ...(0, import_lodash.omit)(this.options, ["name", "type", "target", "onDelete"])
    });
    database.removePendingField(this);
    if (!this.options.foreignKey) {
      this.options.foreignKey = association.foreignKey;
    }
    if (!this.options.targetKey) {
      this.options.targetKey = association.targetKey;
    }
    try {
      (0, import_utils.checkIdentifier)(this.options.foreignKey);
    } catch (error) {
      this.unbind();
      throw error;
    }
    if (!this.options.sourceKey) {
      this.options.sourceKey = association.sourceKey;
    }
    this.collection.addIndex([this.options.foreignKey]);
    const reference = this.reference(association);
    this.database.referenceMap.addReference(reference);
    return true;
  }
  unbind() {
    const { database, collection } = this.context;
    database.removePendingField(this);
    const tcoll = database.collections.get(this.target);
    const foreignKey = this.options.foreignKey;
    const field1 = collection.getField(foreignKey);
    const field2 = tcoll ? tcoll.findField((field) => {
      return field.type === "hasMany" && field.foreignKey === foreignKey;
    }) : null;
    if (!field1 && !field2) {
      collection.model.removeAttribute(foreignKey);
    }
    const association = collection.model.associations[this.name];
    if (association && !this.options.inherit) {
      const reference = this.reference(association);
      this.database.referenceMap.removeReference(reference);
    }
    this.clearAccessors();
    delete collection.model.associations[this.name];
    collection.model.refreshAttributes();
  }
};
__name(_BelongsToField, "BelongsToField");
__publicField(_BelongsToField, "type", "belongsTo");
let BelongsToField = _BelongsToField;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BelongsToField
});
