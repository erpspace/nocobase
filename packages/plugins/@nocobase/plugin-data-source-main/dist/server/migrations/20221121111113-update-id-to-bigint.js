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
var update_id_to_bigint_exports = {};
__export(update_id_to_bigint_exports, {
  default: () => UpdateIdToBigIntMigrator
});
module.exports = __toCommonJS(update_id_to_bigint_exports);
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
        $or: [
          {
            name: "id",
            type: "integer"
          }
        ]
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
      const columnName = model.rawAttributes[fieldName].field;
      let sql;
      const tableName = model.tableName;
      const addSchemaTableName = db.utils.addSchema(tableName);
      const quoteTableName = db.utils.quoteTable(addSchemaTableName);
      const collection = db.modelCollection.get(model);
      const fieldRecord = await db.getCollection("fields").repository.findOne({
        filter: {
          collectionName: collection.name,
          name: fieldName,
          type: "integer"
        }
      });
      if (fieldRecord) {
        fieldRecord.set("type", "bigInt");
        await fieldRecord.save();
      }
      if (model.rawAttributes[fieldName].type instanceof import_database.DataTypes.INTEGER) {
        if (db.inDialect("postgres")) {
          sql = `ALTER TABLE ${quoteTableName}
            ALTER COLUMN "${columnName}" SET DATA TYPE BIGINT;`;
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
          sql = queryGenerator.changeColumnQuery(addSchemaTableName, query);
          sql = sql.replace(" PRIMARY KEY;", " ;");
        }
        try {
          await this.sequelize.query(sql, {});
        } catch (err) {
          if (err.message.includes("does not exist") || err.message.includes("cannot alter inherited column")) {
            return;
          }
          throw err;
        }
        if (db.inDialect("postgres")) {
          const sequenceQuery = `SELECT pg_get_serial_sequence('${quoteTableName}', '${columnName}');`;
          const [result2] = await this.sequelize.query(sequenceQuery, {});
          const sequenceName = result2[0]["pg_get_serial_sequence"];
          if (sequenceName) {
            await this.sequelize.query(`ALTER SEQUENCE ${sequenceName} AS BIGINT;`, {});
          }
        }
        this.app.log.info(`updated ${tableName}.${fieldName} to BIGINT`, { tableName, fieldName });
      }
    };
    const singleForeignFields = await db.getCollection("fields").repository.find({
      filter: {
        options: {
          isForeignKey: true
        },
        type: "integer"
      }
    });
    for (const field of singleForeignFields) {
      const collection = db.getCollection(field.get("collectionName"));
      if (!collection) {
        console.log("collection not found", field.get("collectionName"));
      }
      await updateToBigInt(collection.model, field.get("name"));
    }
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
