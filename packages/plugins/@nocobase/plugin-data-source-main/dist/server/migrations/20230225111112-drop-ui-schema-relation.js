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
var drop_ui_schema_relation_exports = {};
__export(drop_ui_schema_relation_exports, {
  default: () => drop_ui_schema_relation_default
});
module.exports = __toCommonJS(drop_ui_schema_relation_exports);
var import_server = require("@nocobase/server");
/* istanbul ignore file -- @preserve */
class drop_ui_schema_relation_default extends import_server.Migration {
  appVersion = "<0.9.2-alpha.1";
  async up() {
    const result = await this.app.version.satisfies("<0.9.2-alpha.2");
    if (!result) {
      return;
    }
    const transaction = await this.db.sequelize.transaction();
    const migrateFieldsSchema = async (collection) => {
      this.app.log.info(`Start to migrate ${collection.name} collection's ui schema`);
      const field = collection.setField("uiSchemaUid", {
        type: "string"
      });
      const exists = await field.existsInDb({ transaction });
      if (!exists) {
        collection.removeField("uiSchemaUid");
        return;
      }
      const fieldRecords = await collection.repository.find({
        transaction
      });
      const fieldsCount = await collection.repository.count({
        transaction
      });
      this.app.log.info(`Total ${fieldsCount} fields need to be migrated`);
      let i = 0;
      for (const fieldRecord of fieldRecords) {
        i++;
        this.app.log.info(
          `Migrate field ${fieldRecord.get("collectionName")}.${fieldRecord.get("name")}, ${i}/${fieldsCount}`
        );
        const uiSchemaUid = fieldRecord.get("uiSchemaUid");
        if (!uiSchemaUid) {
          continue;
        }
        const uiSchemaRecord = await this.db.getRepository("uiSchemas").findOne({
          filterByTk: uiSchemaUid,
          transaction
        });
        if (!uiSchemaRecord) {
          continue;
        }
        const uiSchema = uiSchemaRecord.get("schema");
        fieldRecord.set("uiSchema", uiSchema);
        await fieldRecord.save({
          transaction
        });
      }
      collection.removeField("uiSchemaUid");
      this.app.log.info("Migrate uiSchema to options field done");
    };
    try {
      await migrateFieldsSchema(this.db.getCollection("fields"));
      if (this.db.getCollection("fieldsHistory")) {
        await migrateFieldsSchema(this.db.getCollection("fieldsHistory"));
      }
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      this.app.log.error(error);
      throw error;
    }
  }
}
