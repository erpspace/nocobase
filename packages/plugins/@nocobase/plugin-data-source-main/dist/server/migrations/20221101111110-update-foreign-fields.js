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
var update_foreign_fields_exports = {};
__export(update_foreign_fields_exports, {
  default: () => DropForeignKeysMigration
});
module.exports = __toCommonJS(update_foreign_fields_exports);
var import_server = require("@nocobase/server");
var import_afterCreateForForeignKeyField = require("../hooks/afterCreateForForeignKeyField");
/* istanbul ignore file -- @preserve */
class DropForeignKeysMigration extends import_server.Migration {
  appVersion = "<0.8.0-alpha.9";
  async up() {
    const result = await this.app.version.satisfies("<0.8.0");
    if (!result) {
      return;
    }
    const transaction = await this.app.db.sequelize.transaction();
    const callback = (0, import_afterCreateForForeignKeyField.afterCreateForForeignKeyField)(this.app.db);
    try {
      const fields = await this.app.db.getCollection("fields").repository.find({
        filter: {
          interface: {
            $in: ["oho", "o2m", "obo", "m2o", "linkTo", "m2m"]
          },
          collectionName: {
            $not: null
          }
        }
      });
      for (const field of fields) {
        try {
          await callback(field, {
            transaction,
            context: {}
          });
        } catch (error) {
          if (error.message.includes("collection not found")) {
            continue;
          }
          throw error;
        }
      }
      await transaction.commit();
    } catch (error) {
      console.log(error);
      await transaction.rollback();
    }
  }
}
