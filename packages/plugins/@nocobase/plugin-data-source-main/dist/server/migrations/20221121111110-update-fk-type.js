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
var update_fk_type_exports = {};
__export(update_fk_type_exports, {
  default: () => UpdateIdToBigIntMigrator
});
module.exports = __toCommonJS(update_fk_type_exports);
var import_database = require("@nocobase/database");
var import_server = require("@nocobase/server");
/* istanbul ignore file -- @preserve */
class UpdateIdToBigIntMigrator extends import_server.Migration {
  appVersion = "<0.8.1-alpha.2";
  async up() {
    const result = await this.app.version.satisfies("<0.9.0-alpha.1");
    if (!result) {
      return;
    }
    const db = this.app.db;
    await db.getCollection("fields").repository.update({
      filter: {
        name: "id",
        type: "integer"
      },
      values: {
        type: "bigInt"
      }
    });
    if (!db.inDialect("mysql", "mariadb", "postgres")) {
      return;
    }
    const models = [];
    const queryInterface = db.sequelize.getQueryInterface();
    const queryGenerator = queryInterface.queryGenerator;
    const updateToBigInt = async (model, fieldName) => {
      let sql;
      const tableName = model.tableName;
      if (model.rawAttributes[fieldName].type instanceof import_database.DataTypes.INTEGER) {
        if (db.inDialect("postgres")) {
          sql = `ALTER TABLE "${tableName}"
            ALTER COLUMN "${fieldName}" SET DATA TYPE BIGINT;`;
        } else if (db.inDialect("mysql", "mariadb")) {
          const dataTypeOrOptions = model.rawAttributes[fieldName];
          const attributeName = fieldName;
          const query = queryGenerator.attributesToSQL(
            {
              [attributeName]: queryInterface.normalizeAttribute({
                ...dataTypeOrOptions,
                type: import_database.DataTypes.BIGINT
              })
            },
            {
              context: "changeColumn",
              table: tableName
            }
          );
          sql = queryGenerator.changeColumnQuery(tableName, query);
          sql = sql.replace(" PRIMARY KEY;", " ;");
        }
        try {
          await this.sequelize.query(sql, {});
        } catch (err) {
          if (err.message.includes("does not exist")) {
            return;
          }
          throw err;
        }
        this.app.log.info(`updated ${tableName}.${fieldName} to BIGINT`, { tableName, fieldName });
      }
    };
    this.app.db.sequelize.modelManager.forEachModel((model) => {
      models.push(model);
    });
    for (const model of models) {
      try {
        const primaryKeyField = model.tableAttributes[model.primaryKeyField];
        const collection = db.modelCollection.get(model);
        if (!collection) {
          continue;
        }
        if (primaryKeyField && primaryKeyField.primaryKey) {
          await updateToBigInt(model, model.primaryKeyField);
        }
        if (model.tableAttributes["sort"] && model.tableAttributes["sort"].type instanceof import_database.DataTypes.INTEGER) {
          await updateToBigInt(model, "sort");
        }
        const associations = model.associations;
        for (const associationName of Object.keys(associations)) {
          const association = associations[associationName];
          const type = association.associationType;
          let foreignModel;
          let fieldName;
          if (type === "BelongsTo") {
            foreignModel = association.source;
            fieldName = association.foreignKey;
          }
          if (type === "HasMany") {
            foreignModel = association.target;
            fieldName = association.foreignKey;
          }
          if (type === "HasOne") {
            foreignModel = association.target;
            fieldName = association.foreignKey;
          }
          if (foreignModel && fieldName) {
            const cf = await db.getRepository("collections.fields", foreignModel.name).findOne({
              filterByTk: fieldName
            });
            if (cf) {
              cf.interface = "integer";
              cf.type = "bigInt";
              await cf.save();
            }
            await updateToBigInt(foreignModel, fieldName);
          }
          if (type === "BelongsToMany") {
            const throughModel = association.through.model;
            const otherKey = association.otherKey;
            const foreignKey = association.foreignKey;
            await updateToBigInt(throughModel, otherKey);
            await updateToBigInt(throughModel, foreignKey);
          }
        }
      } catch (error) {
        if (error.message.includes("cannot alter inherited column")) {
          continue;
        }
        throw error;
      }
    }
  }
}
