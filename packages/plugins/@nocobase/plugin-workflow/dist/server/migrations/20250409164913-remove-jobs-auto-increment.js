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
var remove_jobs_auto_increment_exports = {};
__export(remove_jobs_auto_increment_exports, {
  default: () => remove_jobs_auto_increment_default
});
module.exports = __toCommonJS(remove_jobs_auto_increment_exports);
var import_server = require("@nocobase/server");
class remove_jobs_auto_increment_default extends import_server.Migration {
  appVersion = "<1.7.0";
  on = "beforeLoad";
  async up() {
    const { db } = this.context;
    const jobCollection = db.collection({
      name: "jobs"
    });
    const tableNameWithQuotes = jobCollection.getRealTableName(true);
    await db.sequelize.transaction(async (transaction) => {
      if (this.db.isPostgresCompatibleDialect()) {
        await db.sequelize.query(`ALTER TABLE ${tableNameWithQuotes} ALTER COLUMN id DROP DEFAULT`, {
          transaction
        });
        return;
      }
      if (this.db.isMySQLCompatibleDialect()) {
        await db.sequelize.query(`ALTER TABLE ${tableNameWithQuotes} MODIFY COLUMN id BIGINT`, {
          transaction
        });
        return;
      }
    });
  }
}
