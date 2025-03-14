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
var change_table_name_exports = {};
__export(change_table_name_exports, {
  default: () => change_table_name_default
});
module.exports = __toCommonJS(change_table_name_exports);
var import_sequelize = require("sequelize");
var import_server = require("@nocobase/server");
var import_workflowManualTasks = __toESM(require("../collections/workflowManualTasks"));
class change_table_name_default extends import_server.Migration {
  appVersion = "<1.7.0";
  on = "beforeLoad";
  async up() {
    const { db } = this.context;
    const queryInterface = db.sequelize.getQueryInterface();
    const usersJobsCollection = db.collection({
      ...import_workflowManualTasks.default,
      name: "users_jobs"
    });
    const workflowManualTasksCollection = db.collection({
      ...import_workflowManualTasks.default
    });
    const oldTableName = usersJobsCollection.getTableNameWithSchema();
    const oldTableNameWithQuotes = usersJobsCollection.getRealTableName(true);
    const newTableName = workflowManualTasksCollection.getTableNameWithSchema();
    const newTableNameWithQuotes = workflowManualTasksCollection.getRealTableName(true);
    const exists = await queryInterface.tableExists(oldTableName);
    if (!exists) {
      return;
    }
    const constraints = await queryInterface.showConstraint(oldTableName);
    await db.sequelize.transaction(
      {
        isolationLevel: import_sequelize.Transaction.ISOLATION_LEVELS.SERIALIZABLE
      },
      async (transaction) => {
        const newExists = await queryInterface.tableExists(newTableName, { transaction });
        if (newExists) {
          await queryInterface.dropTable(newTableName, { transaction });
        }
        if (this.db.isPostgresCompatibleDialect()) {
          await db.sequelize.query(
            `ALTER TABLE ${oldTableNameWithQuotes} RENAME TO "${db.options.tablePrefix || ""}${db.options.underscored ? "workflow_manual_tasks" : "workflowManualTasks"}";`,
            {
              transaction
            }
          );
        } else {
          await queryInterface.renameTable(oldTableName, newTableName, { transaction });
        }
        if (this.db.isPostgresCompatibleDialect()) {
          const primaryKeys = constraints.filter((item) => item.constraintType === "PRIMARY KEY");
          if (primaryKeys.length) {
            for (const primaryKey of primaryKeys) {
              await queryInterface.removeConstraint(newTableName, primaryKey.constraintName, { transaction });
            }
          }
        } else if (this.db.isMySQLCompatibleDialect()) {
          await db.sequelize.query(`ALTER TABLE ${newTableNameWithQuotes} DROP PRIMARY KEY, ADD PRIMARY KEY (id)`, {
            transaction
          });
        }
        const indexes = await queryInterface.showIndex(newTableName, { transaction });
        const oldIndexPrefix = `${db.options.tablePrefix || ""}users_jobs`;
        const newIndexPrefix = `${db.options.tablePrefix || ""}workflow_manual_tasks`;
        for (const item of indexes) {
          if (item.name.startsWith(oldIndexPrefix)) {
            if (this.db.isPostgresCompatibleDialect()) {
              await db.sequelize.query(
                `ALTER INDEX ${db.options.schema ? `"${db.options.schema}".` : ""}"${item.name}" RENAME TO "${item.name.replace(oldIndexPrefix, newIndexPrefix)}";`,
                { transaction }
              );
            } else if (this.db.isMySQLCompatibleDialect()) {
              await db.sequelize.query(
                `ALTER TABLE ${newTableNameWithQuotes} RENAME INDEX ${item.name} TO ${item.name.replace(
                  oldIndexPrefix,
                  newIndexPrefix
                )};`,
                { transaction }
              );
            }
          }
        }
      }
    );
    db.removeCollection("users_jobs");
    db.removeCollection("workflowManualTasks");
  }
}
