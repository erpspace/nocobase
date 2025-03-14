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
var belongs_to_array_field_exports = {};
__export(belongs_to_array_field_exports, {
  BelongsToArrayField: () => BelongsToArrayField,
  elementTypeMap: () => elementTypeMap
});
module.exports = __toCommonJS(belongs_to_array_field_exports);
var import_database = require("@nocobase/database");
const elementTypeMap = {
  nanoid: "string",
  sequence: "string",
  uid: "string"
};
class BelongsToArrayField extends import_database.RelationField {
  get dataType() {
    return "BelongsToArray";
  }
  setForeignKeyArray = async (model, { values, transaction }) => {
    const { name, foreignKey, target, targetKey } = this.options;
    if (!values || values[name] === void 0) {
      return;
    }
    let value = values[name] || [];
    if (!Array.isArray(value)) {
      value = [value];
    }
    const tks = [];
    const items = [];
    for (const item of value) {
      if (typeof item !== "object") {
        tks.push(item);
        continue;
      }
      items.push(item);
    }
    const repo = this.database.getRepository(target);
    const itemTks = items.map((item) => item[targetKey]).filter((tk) => tk);
    const instances = await repo.find({
      filter: {
        [targetKey]: itemTks
      },
      transaction
    });
    tks.push(...instances.map((instance) => instance[targetKey]));
    const toCreate = items.filter((item) => !item[targetKey] || !tks.includes(item[targetKey]));
    const m = this.database.getModel(target);
    const newInstances = await m.bulkCreate(toCreate, { transaction });
    tks.push(...newInstances.map((instance) => instance[targetKey]));
    model.set(foreignKey, tks);
  };
  checkTargetCollection() {
    const { target } = this.options;
    if (!target) {
      throw new Error("Target is required in the options of many to many (array) field.");
    }
    const targetCollection = this.database.getCollection(target);
    if (!targetCollection) {
      this.database.addPendingField(this);
      return false;
    }
    return true;
  }
  checkAssociationKeys() {
    const { foreignKey, target, targetKey } = this.options;
    if (!targetKey) {
      throw new Error("Target key is required in the options of many to many (array) field.");
    }
    const targetField = this.database.getModel(target).getAttributes()[targetKey];
    const foreignField = this.collection.model.getAttributes()[foreignKey];
    if (!foreignField || !targetField) {
      return;
    }
    const foreignType = foreignField.type.constructor.toString();
    if (!["ARRAY", "JSONTYPE", "JSON", "JSONB"].includes(foreignType)) {
      throw new Error(
        `The type of foreign key "${foreignKey}" in collection "${this.collection.name}" must be ARRAY, JSON or JSONB`
      );
    }
    if (this.database.sequelize.getDialect() !== "postgres") {
      return;
    }
    const targetType = targetField.type.constructor.toString();
    const elementType = foreignField.type.type.constructor.toString();
    if (foreignType === "ARRAY" && elementType !== targetType) {
      throw new Error(
        `The element type "${elementType}" of foreign key "${foreignKey}" does not match the type "${targetType}" of target key "${targetKey}" in collection "${target}"`
      );
    }
  }
  bind() {
    if (!this.checkTargetCollection()) {
      return false;
    }
    this.checkAssociationKeys();
    const { name, ...opts } = this.options;
    this.collection.model.associations[name] = new import_database.BelongsToArrayAssociation({
      db: this.database,
      source: this.collection.model,
      as: name,
      ...opts
    });
    this.on("beforeSave", this.setForeignKeyArray);
  }
  unbind() {
    delete this.collection.model.associations[this.name];
    this.off("beforeSave", this.setForeignKeyArray);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BelongsToArrayField,
  elementTypeMap
});
