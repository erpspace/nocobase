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
var jsonb_to_json_exports = {};
__export(jsonb_to_json_exports, {
  default: () => jsonb_to_json_default
});
module.exports = __toCommonJS(jsonb_to_json_exports);
var import_database = require("@nocobase/database");
var import_server = require("@nocobase/server");
class jsonb_to_json_default extends import_server.Migration {
  appVersion = "<0.9.0-alpha.3";
  async up() {
    const match = await this.app.version.satisfies("<0.9.0-alpha.3");
    if (!match) {
      return;
    }
    const sequelize = this.sequelize;
    const queryInterface = this.queryInterface;
    const { db } = this.app;
    await sequelize.transaction(async (transaction) => {
      await queryInterface.changeColumn(
        db.getCollection("workflows").model.getTableName(),
        "config",
        {
          type: import_database.DataTypes.JSON
        },
        { transaction }
      );
      await queryInterface.changeColumn(
        db.getCollection("flow_nodes").model.getTableName(),
        "config",
        {
          type: import_database.DataTypes.JSON
        },
        { transaction }
      );
    });
  }
}
