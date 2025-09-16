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
var belongs_to_many_field_exports = {};
__export(belongs_to_many_field_exports, {
  BelongsToManyField: () => BelongsToManyField
});
module.exports = __toCommonJS(belongs_to_many_field_exports);
var import_lodash = require("lodash");
var import_sequelize = require("sequelize");
var import_utils = require("../utils");
var import_belongs_to_field = require("./belongs-to-field");
var import_relation_field = require("./relation-field");
const _BelongsToManyField = class _BelongsToManyField extends import_relation_field.RelationField {
  get dataType() {
    return "BelongsToMany";
  }
  get through() {
    return this.options.through || import_sequelize.Utils.camelize(
      [this.context.collection.model.name, this.target].map((name) => name.toLowerCase()).sort().join("_")
    );
  }
  get otherKey() {
    return this.options.otherKey;
  }
  references(association) {
    const db = this.context.database;
    const onDelete = this.options.onDelete || "CASCADE";
    const priority = this.options.onDelete ? "user" : "default";
    const targetAssociation = association.toTarget;
    if (association.targetKey) {
      targetAssociation.targetKey = association.targetKey;
    }
    const sourceAssociation = association.toSource;
    if (association.sourceKey) {
      sourceAssociation.targetKey = association.sourceKey;
    }
    return [
      import_belongs_to_field.BelongsToField.toReference(db, targetAssociation, onDelete, priority),
      import_belongs_to_field.BelongsToField.toReference(db, sourceAssociation, onDelete, priority)
    ];
  }
  checkAssociationKeys(database) {
    let { foreignKey, sourceKey, otherKey, targetKey } = this.options;
    const through = this.through;
    const throughCollection = database.getCollection(through);
    if (!throughCollection) {
      return;
    }
    if (!sourceKey) {
      sourceKey = this.collection.model.primaryKeyAttribute;
    }
    if (!foreignKey) {
      foreignKey = import_sequelize.Utils.camelize([import_sequelize.Utils.singularize(this.collection.model.name), sourceKey].join("_"));
    }
    if (!targetKey) {
      targetKey = this.TargetModel.primaryKeyAttribute;
    }
    if (!otherKey) {
      otherKey = import_sequelize.Utils.camelize([import_sequelize.Utils.singularize(this.TargetModel.name), targetKey].join("_"));
    }
    const foreignKeyAttribute = throughCollection.model.rawAttributes[foreignKey];
    const otherKeyAttribute = throughCollection.model.rawAttributes[otherKey];
    const sourceKeyAttribute = this.collection.model.rawAttributes[sourceKey];
    const targetKeyAttribute = this.TargetModel.rawAttributes[targetKey];
    if (!foreignKeyAttribute || !otherKeyAttribute || !sourceKeyAttribute || !targetKeyAttribute) {
      return;
    }
    const foreignKeyType = foreignKeyAttribute.type.constructor.toString();
    const otherKeyType = otherKeyAttribute.type.constructor.toString();
    const sourceKeyType = sourceKeyAttribute.type.constructor.toString();
    const targetKeyType = targetKeyAttribute.type.constructor.toString();
    if (!this.keyPairsTypeMatched(foreignKeyType, sourceKeyType)) {
      throw new Error(
        `Foreign key "${foreignKey}" type "${foreignKeyType}" does not match source key "${sourceKey}" type "${sourceKeyType}" in belongs to many relation "${this.name}" of collection "${this.collection.name}"`
      );
    }
    if (!this.keyPairsTypeMatched(otherKeyType, targetKeyType)) {
      throw new Error(
        `Other key "${otherKey}" type "${otherKeyType}" does not match target key "${targetKey}" type "${targetKeyType}" in belongs to many relation "${this.name}" of collection "${this.collection.name}"`
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
    if (!this.collection.model.primaryKeyAttribute) {
      throw new Error(`Collection model ${this.collection.model.name} has no primary key attribute`);
    }
    if (!Target.primaryKeyAttribute) {
      throw new Error(`Target model ${Target.name} has no primary key attribute`);
    }
    this.checkAssociationKeys(database);
    const through = this.through;
    let Through;
    if (database.hasCollection(through)) {
      Through = database.getCollection(through);
    } else {
      const throughCollectionOptions = {
        name: through,
        isThrough: true,
        sourceCollectionName: this.collection.name,
        targetCollectionName: this.target
      };
      if (this.collection.options.dumpRules) {
        throughCollectionOptions["dumpRules"] = this.collection.options.dumpRules;
      }
      if (this.collection.collectionSchema()) {
        throughCollectionOptions["schema"] = this.collection.collectionSchema();
      }
      Through = database.collection(throughCollectionOptions);
      Object.defineProperty(Through.model, "isThrough", { value: true });
    }
    const belongsToManyOptions = {
      constraints: false,
      ...(0, import_lodash.omit)(this.options, ["name", "type", "target"]),
      as: this.name,
      through: {
        model: Through.model,
        scope: this.options.throughScope,
        paranoid: this.options.throughParanoid,
        unique: this.options.throughUnique
      }
    };
    const association = collection.model.belongsToMany(Target, belongsToManyOptions);
    database.removePendingField(this);
    if (!this.options.foreignKey) {
      this.options.foreignKey = association.foreignKey;
    }
    if (!this.options.sourceKey) {
      this.options.sourceKey = association.sourceKey;
    }
    if (!this.options.otherKey) {
      this.options.otherKey = association.otherKey;
    }
    if (!this.options.targetKey) {
      this.options.targetKey = association.targetKey;
    }
    try {
      (0, import_utils.checkIdentifier)(this.options.foreignKey);
      (0, import_utils.checkIdentifier)(this.options.otherKey);
    } catch (error) {
      this.unbind();
      throw error;
    }
    if (!this.options.through) {
      this.options.through = this.through;
    }
    Through.addIndex([this.options.foreignKey]);
    Through.addIndex([this.options.otherKey]);
    this.references(association).forEach((reference) => this.database.referenceMap.addReference(reference));
    return true;
  }
  unbind() {
    const { database, collection } = this.context;
    const Through = database.getCollection(this.through);
    database.removePendingField(this);
    const association = collection.model.associations[this.name];
    if (association && !this.options.inherit) {
      this.references(association).forEach((reference) => this.database.referenceMap.removeReference(reference));
    }
    this.clearAccessors();
    delete collection.model.associations[this.name];
  }
};
__name(_BelongsToManyField, "BelongsToManyField");
let BelongsToManyField = _BelongsToManyField;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BelongsToManyField
});
