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
var beforeCreateForValidateField_exports = {};
__export(beforeCreateForValidateField_exports, {
  beforeCreateForValidateField: () => beforeCreateForValidateField,
  beforeUpdateForValidateField: () => beforeUpdateForValidateField
});
module.exports = __toCommonJS(beforeCreateForValidateField_exports);
function beforeCreateForValidateField(db) {
  return async (model, { transaction }) => {
    if (model.type === "belongsToMany") {
      if (model.get("foreignKey") === model.get("otherKey")) {
        throw new Error("foreignKey and otherKey can not be the same");
      }
    }
    const isPrimaryKey = model.get("primaryKey");
    if (isPrimaryKey) {
      const collection = db.getCollection(model.get("collectionName"));
      if (!collection) {
        return;
      }
      const primaryKey = collection.model.primaryKeyAttribute;
      if (primaryKey !== model.get("name") && collection.model.rawAttributes[primaryKey]) {
        throw new Error(
          `add field ${model.get("name")} failed, collection ${collection.name} already has primary key ${primaryKey}`
        );
      }
    }
  };
}
function beforeUpdateForValidateField(db) {
  return async (model, { transaction }) => {
    const isPrimaryKey = model.get("primaryKey");
    if (isPrimaryKey) {
      const collection = db.getCollection(model.get("collectionName"));
      if (!collection) {
        return;
      }
      const primaryKey = collection.model.primaryKeyAttribute;
      if (primaryKey !== model.get("name") && collection.model.rawAttributes[primaryKey]) {
        throw new Error(
          `update field ${model.get("name")} failed, collection ${collection.name} already has primary key ${primaryKey}`
        );
      }
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  beforeCreateForValidateField,
  beforeUpdateForValidateField
});
