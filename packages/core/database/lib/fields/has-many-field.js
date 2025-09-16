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
var has_many_field_exports = {};
__export(has_many_field_exports, {
  HasManyField: () => HasManyField
});
module.exports = __toCommonJS(has_many_field_exports);
var import_lodash = require("lodash");
var import_sequelize = require("sequelize");
var import_references_map = require("../features/references-map");
var import_utils = require("../utils");
var import_relation_field = require("./relation-field");
const _HasManyField = class _HasManyField extends import_relation_field.RelationField {
  get dataType() {
    return "HasMany";
  }
  get foreignKey() {
    if (this.options.foreignKey) {
      return this.options.foreignKey;
    }
    const { model } = this.context.collection;
    return import_sequelize.Utils.camelize([model.options.name.singular, this.sourceKey || model.primaryKeyAttribute].join("_"));
  }
  reference(association) {
    const sourceKey = association.sourceKey;
    return (0, import_references_map.buildReference)({
      sourceCollectionName: this.database.modelCollection.get(association.target).name,
      sourceField: association.foreignKey,
      targetField: sourceKey,
      targetCollectionName: this.database.modelCollection.get(association.source).name,
      onDelete: this.options.onDelete
    });
  }
  checkAssociationKeys() {
    let { foreignKey, sourceKey } = this.options;
    if (!sourceKey) {
      sourceKey = this.collection.model.primaryKeyAttribute;
    }
    if (!foreignKey) {
      foreignKey = import_sequelize.Utils.camelize([import_sequelize.Utils.singularize(this.name), this.collection.model.primaryKeyAttribute].join("_"));
    }
    const foreignKeyAttribute = this.TargetModel.rawAttributes[foreignKey];
    const sourceKeyAttribute = this.collection.model.rawAttributes[sourceKey];
    if (!foreignKeyAttribute || !sourceKeyAttribute) {
      return;
    }
    const foreignKeyType = foreignKeyAttribute.type.constructor.toString();
    const sourceKeyType = sourceKeyAttribute.type.constructor.toString();
    if (!this.keyPairsTypeMatched(foreignKeyType, sourceKeyType)) {
      throw new Error(
        `Foreign key "${foreignKey}" type "${foreignKeyType}" does not match source key "${sourceKey}" type "${sourceKeyType}" in has many relation "${this.name}" of collection "${this.collection.name}"`
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
    const association = collection.model.hasMany(Target, {
      constraints: false,
      ...(0, import_lodash.omit)(this.options, ["name", "type", "target", "onDelete"]),
      as: this.name,
      foreignKey: this.foreignKey
    });
    database.removePendingField(this);
    if (!this.options.foreignKey) {
      this.options.foreignKey = association.foreignKey;
    }
    if (!this.options.sourceKey) {
      this.options.sourceKey = association.sourceKey;
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
    let tcoll;
    if (this.target === collection.name) {
      tcoll = collection;
    } else {
      tcoll = database.getCollection(this.target);
    }
    if (tcoll) {
      tcoll.addIndex([this.options.foreignKey]);
    }
    this.database.referenceMap.addReference(this.reference(association));
    if (this.options.sortable) {
      const targetCollection = database.modelCollection.get(this.TargetModel);
      const sortFieldName = `${this.options.foreignKey}Sort`;
      targetCollection.setField(sortFieldName, {
        type: "sort",
        hidden: true,
        scopeKey: this.options.foreignKey
      });
      this.options.sortBy = sortFieldName;
    }
    return true;
  }
  unbind() {
    const { database, collection } = this.context;
    database.removePendingField(this);
    const tcoll = database.getCollection(this.target);
    if (tcoll) {
      const foreignKey = this.options.foreignKey;
      const field = tcoll.findField((field2) => {
        if (field2.name === foreignKey) {
          return true;
        }
        return field2.type === "belongsTo" && field2.foreignKey === foreignKey;
      });
      if (!field) {
        tcoll.model.removeAttribute(foreignKey);
      }
    }
    const association = collection.model.associations[this.name];
    if (association && !this.options.inherit) {
      this.database.referenceMap.removeReference(this.reference(association));
    }
    this.clearAccessors();
    delete collection.model.associations[this.name];
    collection.model.refreshAttributes();
  }
};
__name(_HasManyField, "HasManyField");
let HasManyField = _HasManyField;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HasManyField
});
