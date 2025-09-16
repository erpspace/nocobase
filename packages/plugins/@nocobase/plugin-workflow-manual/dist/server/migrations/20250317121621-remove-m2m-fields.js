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
var remove_m2m_fields_exports = {};
__export(remove_m2m_fields_exports, {
  default: () => remove_m2m_fields_default
});
module.exports = __toCommonJS(remove_m2m_fields_exports);
var import_server = require("@nocobase/server");
class remove_m2m_fields_default extends import_server.Migration {
  appVersion = "<1.7.0";
  on = "beforeLoad";
  async up() {
    const { db } = this.context;
    const usersJobsCollection = db.collection({
      name: "users_jobs"
    });
    const fieldCollection = db.collection({
      name: "fields",
      autoGenId: false,
      createdAt: false,
      updatedAt: false,
      filterTargetKey: ["collectionName", "name"],
      fields: [
        {
          name: "collectionName",
          type: "string"
        },
        {
          name: "name",
          type: "string"
        }
      ]
    });
    const oldTableExists = await db.sequelize.getQueryInterface().tableExists(usersJobsCollection.getTableNameWithSchema());
    await db.sequelize.transaction(async (transaction) => {
      await fieldCollection.repository.destroy({
        filter: {
          collectionName: "users",
          name: ["jobs", "usersJobs"]
        },
        transaction
      });
      await fieldCollection.repository.destroy({
        filter: {
          collectionName: "jobs",
          name: ["users", "usersJobs"]
        },
        transaction
      });
      if (oldTableExists) {
        const oldColumns = await db.sequelize.getQueryInterface().describeTable(usersJobsCollection.getTableNameWithSchema());
        if (!oldColumns.status) {
          await db.sequelize.getQueryInterface().dropTable(usersJobsCollection.getTableNameWithSchema(), { transaction });
        } else {
          throw new Error("users_jobs table is not migrated properly, please contact support.");
        }
      }
    });
    db.removeCollection("fields");
    db.removeCollection("users_jobs");
  }
}
