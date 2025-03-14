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
var beforeCreateCheckFieldInMySQL_exports = {};
__export(beforeCreateCheckFieldInMySQL_exports, {
  beforeCreateCheckFieldInMySQL: () => beforeCreateCheckFieldInMySQL
});
module.exports = __toCommonJS(beforeCreateCheckFieldInMySQL_exports);
function beforeCreateCheckFieldInMySQL(db) {
  return async (model, { transaction }) => {
    if (!db.isMySQLCompatibleDialect()) {
      return;
    }
    const fieldOptions = model.get();
    if (fieldOptions.autoIncrement) {
      const collection = db.getCollection(fieldOptions.collectionName);
      if (!collection) {
        return;
      }
      const rawAttributes = collection.model.rawAttributes;
      const fields = Object.keys(rawAttributes);
      for (const key of fields) {
        if (key === fieldOptions.name) {
          continue;
        }
        const field = rawAttributes[key];
        if (field.autoIncrement) {
          throw new Error(
            `Can not add field ${fieldOptions.name}, autoIncrement field ${key} is already in a table ${collection.getTableNameWithSchemaAsString()}`
          );
        }
      }
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  beforeCreateCheckFieldInMySQL
});
