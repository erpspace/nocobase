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
var relation_field_exports = {};
__export(relation_field_exports, {
  RelationField: () => RelationField
});
module.exports = __toCommonJS(relation_field_exports);
var import_field = require("./field");
const _RelationField = class _RelationField extends import_field.Field {
  /**
   * target relation name
   */
  get target() {
    const { target, name } = this.options;
    return target || name;
  }
  get foreignKey() {
    return this.options.foreignKey;
  }
  get sourceKey() {
    return this.options.sourceKey || this.collection.model.primaryKeyAttribute;
  }
  get targetKey() {
    return this.options.targetKey || this.TargetModel.primaryKeyAttribute;
  }
  /**
   * get target model from database by it's name
   * @constructor
   */
  get TargetModel() {
    return this.context.database.sequelize.models[this.target];
  }
  targetCollection() {
    return this.context.database.getCollection(this.target);
  }
  isRelationField() {
    return true;
  }
  keyPairsTypeMatched(type1, type2) {
    type1 = type1.toLowerCase();
    type2 = type2.toLowerCase();
    const numberTypeGroups = ["integer", "bigint", "decimal", "float", "real", "double", "smallint", "tinyint"];
    const stringTypeGroups = ["string", "char", "text"];
    if (numberTypeGroups.includes(type1) && numberTypeGroups.includes(type2)) {
      return true;
    }
    if (stringTypeGroups.includes(type1) && stringTypeGroups.includes(type2)) {
      return true;
    }
    return type1 === type2;
  }
  clearAccessors() {
    const { collection } = this.context;
    const association = collection.model.associations[this.name];
    if (!association) {
      return;
    }
    const accessors = Object.values(association.accessors);
    accessors.forEach((accessor) => {
      delete collection.model.prototype[accessor];
    });
  }
};
__name(_RelationField, "RelationField");
let RelationField = _RelationField;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RelationField
});
