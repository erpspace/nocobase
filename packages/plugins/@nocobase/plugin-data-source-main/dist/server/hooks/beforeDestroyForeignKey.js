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
var beforeDestroyForeignKey_exports = {};
__export(beforeDestroyForeignKey_exports, {
  beforeDestroyForeignKey: () => beforeDestroyForeignKey
});
module.exports = __toCommonJS(beforeDestroyForeignKey_exports);
function beforeDestroyForeignKey(db) {
  return async (model, opts) => {
    var _a;
    const { transaction } = opts;
    const { isForeignKey, collectionName: fkCollectionName, name: fkName } = model.get();
    if (!isForeignKey) {
      return;
    }
    const fieldKeys = [];
    for (const [sourceName, collection] of db.collections) {
      for (const [, field] of collection.fields) {
        const fieldKey = (_a = field.options) == null ? void 0 : _a.key;
        if (!fieldKey) {
          continue;
        }
        if (field.type === "belongsTo") {
          if (sourceName === fkCollectionName && field.foreignKey === fkName) {
            fieldKeys.push(fieldKey);
          }
        } else if (field.type === "hasOne" || field.type === "hasMany") {
          if (fkCollectionName === field.target && field.foreignKey === fkName) {
            fieldKeys.push(fieldKey);
          }
        } else if (field.type === "belongsToMany" && field.through === fkCollectionName) {
          console.log(field.foreignKey, field.otherKey);
          if (field.foreignKey === fkName || field.otherKey === fkName) {
            fieldKeys.push(fieldKey);
          }
        }
      }
    }
    const r = db.getRepository("fields");
    await r.destroy({
      filter: {
        "key.$in": fieldKeys
      },
      transaction
    });
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  beforeDestroyForeignKey
});
