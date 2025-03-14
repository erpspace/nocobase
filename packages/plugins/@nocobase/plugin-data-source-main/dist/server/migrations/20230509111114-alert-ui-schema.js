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
var alert_ui_schema_exports = {};
__export(alert_ui_schema_exports, {
  default: () => alert_ui_schema_default
});
module.exports = __toCommonJS(alert_ui_schema_exports);
var import_server = require("@nocobase/server");
/* istanbul ignore file -- @preserve */
class alert_ui_schema_default extends import_server.Migration {
  appVersion = "<0.9.3-alpha.1";
  async up() {
    const result = await this.app.version.satisfies("<=0.9.2-alpha.5");
    if (!result) {
      return;
    }
    const transaction = await this.db.sequelize.transaction();
    const migrateFieldsSchema = async (collection) => {
      this.app.log.info(`Start to migrate ${collection.name} collection's ui schema`);
      const fieldRecords = await collection.repository.find({
        transaction,
        filter: {
          type: ["hasOne", "hasMany", "belongsTo", "belongsToMany"]
        }
      });
      const fieldsCount = await collection.repository.count({
        transaction,
        filter: {
          type: ["hasOne", "hasMany", "belongsTo", "belongsToMany"]
        }
      });
      this.app.log.info(`Total ${fieldsCount} fields need to be migrated`);
      let i = 0;
      for (const fieldRecord of fieldRecords) {
        i++;
        this.app.log.info(
          `Migrate field ${fieldRecord.get("collectionName")}.${fieldRecord.get("name")}, ${i}/${fieldsCount}`
        );
        const uiSchema = fieldRecord.get("uiSchema");
        if ((uiSchema == null ? void 0 : uiSchema["x-component"]) !== "RecordPicker") {
          continue;
        }
        console.log(`${fieldRecord.get("collectionName")}.${fieldRecord.get("name")}: ${uiSchema["x-component"]}`);
        uiSchema["x-component"] = "AssociationField";
        fieldRecord.set("uiSchema", uiSchema);
        await fieldRecord.save({
          transaction
        });
      }
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
