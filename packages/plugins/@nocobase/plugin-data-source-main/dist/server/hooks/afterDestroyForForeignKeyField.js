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
var afterDestroyForForeignKeyField_exports = {};
__export(afterDestroyForForeignKeyField_exports, {
  afterDestroyForForeignKeyField: () => afterDestroyForForeignKeyField
});
module.exports = __toCommonJS(afterDestroyForForeignKeyField_exports);
async function destroyFields(db, transaction, fieldRecords) {
  const fieldsRepo = db.getRepository("fields");
  for (const fieldRecord of fieldRecords) {
    await fieldsRepo.destroy({
      filter: {
        name: fieldRecord.get("name"),
        collectionName: fieldRecord.get("collectionName")
      },
      transaction
    });
  }
}
function afterDestroyForForeignKeyField(db) {
  return async (model, opts) => {
    const { transaction } = opts;
    const options = model.get("options");
    if (!(options == null ? void 0 : options.isForeignKey)) {
      return;
    }
    const collectionRepo = db.getRepository("collections");
    const foreignKey = model.get("name");
    const foreignKeyCollectionName = model.get("collectionName");
    const collectionRecord = await collectionRepo.findOne({
      filter: {
        name: foreignKeyCollectionName
      },
      transaction
    });
    const collectionOptions = collectionRecord.get("options");
    const fieldsRepo = db.getRepository("fields");
    if (collectionOptions == null ? void 0 : collectionOptions.isThrough) {
      const fieldRecords = await fieldsRepo.find({
        filter: {
          options: { through: foreignKeyCollectionName, foreignKey }
        },
        transaction
      });
      await destroyFields(db, transaction, fieldRecords);
    } else {
      await destroyFields(
        db,
        transaction,
        await fieldsRepo.find({
          filter: {
            collectionName: foreignKeyCollectionName,
            options: { foreignKey }
          },
          transaction
        })
      );
      await destroyFields(
        db,
        transaction,
        await fieldsRepo.find({
          filter: {
            options: { foreignKey, target: foreignKeyCollectionName }
          },
          transaction
        })
      );
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  afterDestroyForForeignKeyField
});
