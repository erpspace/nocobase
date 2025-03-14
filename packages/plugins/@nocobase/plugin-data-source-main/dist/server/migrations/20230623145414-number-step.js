/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var number_step_exports = {};
__export(number_step_exports, {
  default: () => number_step_default
});
module.exports = __toCommonJS(number_step_exports);
var import_server = require("@nocobase/server");
var import_lodash = __toESM(require("lodash"));
/* istanbul ignore file -- @preserve */
class number_step_default extends import_server.Migration {
  appVersion = "<0.10.0-alpha.3";
  async up() {
    const transaction = await this.db.sequelize.transaction();
    const migrateFieldsSchema = async (collection) => {
      var _a;
      this.app.log.info(`Start to migrate ${collection.name} collection's ui schema`);
      const fieldRecords = await collection.repository.find({
        transaction,
        filter: {
          type: ["bigInt", "float", "double"]
        }
      });
      this.app.log.info(`Total ${fieldRecords.length} fields need to be migrated`);
      for (const fieldRecord of fieldRecords) {
        const uiSchema = fieldRecord.get("uiSchema");
        if (((_a = uiSchema == null ? void 0 : uiSchema["x-component-props"]) == null ? void 0 : _a.step) !== "0") {
          continue;
        }
        import_lodash.default.set(uiSchema, "x-component-props.step", "1");
        fieldRecord.set("uiSchema", uiSchema);
        await fieldRecord.save({
          transaction
        });
        console.log(`changed: ${fieldRecord.get("collectionName")}.${fieldRecord.get("name")}`);
      }
    };
    try {
      await migrateFieldsSchema(this.db.getCollection("fields"));
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      this.app.log.error(error);
      throw error;
    }
  }
}
