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
var before_destroy_foreign_key_exports = {};
__export(before_destroy_foreign_key_exports, {
  beforeDestroyForeignKey: () => beforeDestroyForeignKey
});
module.exports = __toCommonJS(before_destroy_foreign_key_exports);
function beforeDestroyForeignKey(db) {
  return async (model, { transaction }) => {
    var _a;
    const { isForeignKey, collectionName, name: fkName, type } = model.get();
    if (!isForeignKey || type !== "set") {
      return;
    }
    const fieldKeys = [];
    const collection = db.getCollection(collectionName);
    if (!collection) {
      return;
    }
    for (const [, field] of collection.fields) {
      const fieldKey = (_a = field.options) == null ? void 0 : _a.key;
      if (!fieldKey || field.type !== "belongsToArray" || field.foreignKey !== fkName) {
        continue;
      }
      fieldKeys.push(fieldKey);
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
