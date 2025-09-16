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
var referential_integrity_check_exports = {};
__export(referential_integrity_check_exports, {
  referentialIntegrityCheck: () => referentialIntegrityCheck
});
module.exports = __toCommonJS(referential_integrity_check_exports);
async function referentialIntegrityCheck(options) {
  const { referencedInstance, db, transaction } = options;
  const collection = db.getCollectionByModelName(referencedInstance.constructor.name);
  const collectionName = collection.name;
  const references = db.referenceMap.getReferences(collectionName);
  if (!references) {
    return;
  }
  for (const reference of references) {
    const { sourceCollectionName, sourceField, targetField, onDelete } = reference;
    if (onDelete === "NO ACTION") {
      continue;
    }
    const sourceCollection = db.collections.get(sourceCollectionName);
    const sourceRepository = sourceCollection.repository;
    if (sourceCollection.isView()) {
      continue;
    }
    const filter = {
      [sourceField]: referencedInstance[targetField]
    };
    const referencingExists = await sourceRepository.count({
      filter,
      transaction
    });
    if (!referencingExists) {
      continue;
    }
    if (onDelete === "RESTRICT") {
      throw new Error("RESTRICT");
    }
    if (onDelete === "CASCADE") {
      await sourceRepository.destroy({
        filter,
        transaction
      });
    }
    if (onDelete === "SET NULL") {
      await sourceRepository.update({
        filter,
        values: {
          [sourceField]: null
        },
        hooks: false,
        transaction
      });
    }
  }
}
__name(referentialIntegrityCheck, "referentialIntegrityCheck");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  referentialIntegrityCheck
});
