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
var increase_url_length_exports = {};
__export(increase_url_length_exports, {
  default: () => increase_url_length_default
});
module.exports = __toCommonJS(increase_url_length_exports);
var import_sequelize = require("sequelize");
var import_server = require("@nocobase/server");
var import_database = require("@nocobase/database");
class increase_url_length_default extends import_server.Migration {
  on = "afterLoad";
  // 'beforeLoad' or 'afterLoad'
  appVersion = "<1.6.0";
  async up() {
    const queryInterface = this.db.sequelize.getQueryInterface();
    const CollectionRepo = this.db.getRepository("collections");
    const FieldRepo = this.db.getRepository("fields");
    const StorageRepo = this.db.getRepository("storages");
    await CollectionRepo.load({
      filter: {
        "options.template": "file"
      }
    });
    const collections = Array.from(this.db.collections.values()).filter(
      (item) => item.name === "attachments" || item.options.template === "file"
    );
    await this.db.sequelize.transaction(async (transaction) => {
      for (const collection of collections) {
        if (!(collection instanceof import_database.InheritedCollection)) {
          const tableName = collection.getTableNameWithSchema();
          await queryInterface.changeColumn(
            tableName,
            "url",
            {
              type: import_sequelize.DataTypes.TEXT
            },
            { transaction }
          );
          await queryInterface.changeColumn(
            tableName,
            "path",
            {
              type: import_sequelize.DataTypes.TEXT
            },
            { transaction }
          );
        }
        await FieldRepo.update({
          filter: {
            collectionName: collection.name,
            name: ["url", "path", "preview"]
          },
          values: {
            type: "text",
            length: null
          },
          transaction
        });
      }
      await queryInterface.changeColumn(
        this.db.getCollection("storages").getTableNameWithSchema(),
        "path",
        {
          type: import_sequelize.DataTypes.TEXT
        },
        { transaction }
      );
      await FieldRepo.update({
        filter: {
          collectionName: "storages",
          name: "path"
        },
        values: {
          type: "text"
        },
        transaction
      });
    });
  }
}
