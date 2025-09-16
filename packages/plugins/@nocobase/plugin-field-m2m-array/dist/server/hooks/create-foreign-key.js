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
var create_foreign_key_exports = {};
__export(create_foreign_key_exports, {
  createForeignKey: () => createForeignKey
});
module.exports = __toCommonJS(create_foreign_key_exports);
var import_belongs_to_array_field = require("../belongs-to-array-field");
const createForeignKey = (db) => {
  return async (model, { transaction }) => {
    const { type, collectionName, target, targetKey, foreignKey, name } = model.get();
    if (type !== "belongsToArray") {
      return;
    }
    if (name === foreignKey) {
      throw new Error(
        `Naming collision between attribute '${foreignKey}' and association '${name}' on model ${collectionName}. To remedy this, change either foreignKey or as in your association definition`
      );
    }
    const r = db.getRepository("fields");
    const instance = await r.findOne({
      filter: {
        collectionName,
        name: foreignKey
      },
      transaction
    });
    if (!instance) {
      const targetField = await r.findOne({
        filter: {
          collectionName: target,
          name: targetKey
        },
        transaction
      });
      if (!targetField) {
        throw new Error(`${target}.${targetKey} not found`);
      }
      const field = await r.create({
        values: {
          interface: "json",
          collectionName,
          name: foreignKey,
          type: "set",
          dataType: "array",
          elementType: import_belongs_to_array_field.elementTypeMap[targetField.type] || targetField.type,
          isForeignKey: true,
          uiSchema: {
            type: "object",
            title: foreignKey,
            "x-component": "Input.JSON",
            "x-read-pretty": true
          }
        },
        transaction
      });
      await field.load({ transaction });
    }
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createForeignKey
});
