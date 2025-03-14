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
var add_users_phone_constraint_exports = {};
__export(add_users_phone_constraint_exports, {
  default: () => AddUsersPhoneMigration
});
module.exports = __toCommonJS(add_users_phone_constraint_exports);
var import_database = require("@nocobase/database");
var import_server = require("@nocobase/server");
class AddUsersPhoneMigration extends import_server.Migration {
  on = "beforeLoad";
  appVersion = "<0.7.5-alpha.1";
  async up() {
    const collection = this.db.collection({
      name: "users",
      fields: [
        {
          type: "string",
          name: "phone"
        }
      ]
    });
    const tableNameWithSchema = collection.getTableNameWithSchema();
    const field = collection.getField("phone");
    const exists = await field.existsInDb();
    if (!exists) {
      await this.db.sequelize.getQueryInterface().addColumn(tableNameWithSchema, field.columnName(), {
        type: import_database.DataTypes.STRING
      });
    }
    try {
      await this.db.sequelize.getQueryInterface().addConstraint(tableNameWithSchema, {
        type: "unique",
        fields: [field.columnName()]
      });
    } catch (error) {
    }
    this.db.removeCollection("users");
  }
  async down() {
  }
}
