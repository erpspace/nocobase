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
var beforeDestoryField_exports = {};
__export(beforeDestoryField_exports, {
  beforeDestoryField: () => beforeDestoryField
});
module.exports = __toCommonJS(beforeDestoryField_exports);
var import_field_is_depended_on_by_other = require("../errors/field-is-depended-on-by-other");
function beforeDestoryField(db) {
  return async (model, opts) => {
    const { transaction } = opts;
    const { name, type, collectionName } = model.get();
    if (["belongsTo", "hasOne", "hasMany", "belongsToMany"].includes(type)) {
      return;
    }
    const relatedFields = await db.getRepository("fields").find({
      filter: {
        $or: [
          {
            ["options.sourceKey"]: name,
            collectionName
          },
          {
            ["options.targetKey"]: name,
            ["options.target"]: collectionName
          }
        ]
      },
      transaction
    });
    for (const field of relatedFields) {
      const keys = [
        {
          name: "sourceKey",
          condition: (associationField) => associationField.options["sourceKey"] === name && associationField.collectionName === collectionName
        },
        {
          name: "targetKey",
          condition: (associationField) => associationField.options["targetKey"] === name && associationField.options["target"] === collectionName
        }
      ];
      const usedAs = keys.find((key) => key.condition(field))["name"];
      throw new import_field_is_depended_on_by_other.FieldIsDependedOnByOtherError({
        fieldName: name,
        fieldCollectionName: collectionName,
        dependedFieldName: field.get("name"),
        dependedFieldCollectionName: field.get("collectionName"),
        dependedFieldAs: usedAs
      });
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  beforeDestoryField
});
