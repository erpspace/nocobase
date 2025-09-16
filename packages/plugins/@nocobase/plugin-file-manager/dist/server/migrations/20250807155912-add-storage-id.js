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
var add_storage_id_exports = {};
__export(add_storage_id_exports, {
  default: () => add_storage_id_default
});
module.exports = __toCommonJS(add_storage_id_exports);
var import_server = require("@nocobase/server");
var import_database = require("@nocobase/database");
class add_storage_id_default extends import_server.Migration {
  on = "afterLoad";
  // 'beforeLoad' or 'afterLoad'
  appVersion = "<1.9.0";
  async up() {
    const CollectionRepo = this.db.getRepository("collections");
    const FieldRepo = this.db.getRepository("fields");
    await CollectionRepo.load({
      filter: {
        "options.template": "file"
      }
    });
    const collections = Array.from(this.db.collections.values()).filter(
      (item) => item.name === "attachments" || item.options.template === "file"
    );
    await this.db.sequelize.transaction(async (transaction) => {
      const toAddFields = [];
      for (const collection of collections) {
        if (collection instanceof import_database.InheritedCollection) {
          continue;
        }
        const exist = await FieldRepo.findOne({
          filter: {
            collectionName: collection.name,
            name: "storageId"
          },
          transaction
        });
        if (!exist) {
          toAddFields.push({
            collectionName: collection.name,
            name: "storageId",
            type: "bigInt",
            required: true,
            visible: true,
            index: true
          });
        }
      }
      if (toAddFields.length) {
        await FieldRepo.create({ values: toAddFields, transaction });
      }
    });
  }
}
