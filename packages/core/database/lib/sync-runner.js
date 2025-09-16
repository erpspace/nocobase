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
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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
var sync_runner_exports = {};
__export(sync_runner_exports, {
  SyncRunner: () => SyncRunner
});
module.exports = __toCommonJS(sync_runner_exports);
var import_utils = require("@nocobase/utils");
var import_sequelize = require("sequelize");
var import_zero_column_table_error = require("./errors/zero-column-table-error");
var import_inherited_sync_runner = require("./inherited-sync-runner");
const _SyncRunner = class _SyncRunner {
  constructor(model) {
    this.model = model;
    this.collection = model.collection;
    this.database = model.database;
  }
  collection;
  database;
  tableDescMap = {};
  uniqueAttributes = [];
  get tableName() {
    return this.model.getTableName();
  }
  get sequelize() {
    return this.model.sequelize;
  }
  get queryInterface() {
    return this.sequelize.getQueryInterface();
  }
  get rawAttributes() {
    return this.model.rawAttributes;
  }
  async runSync(options) {
    var _a;
    if (this.collection.isView()) {
      return;
    }
    if (this.collection.options.sync === false) {
      return;
    }
    const collectionSyncOptions = (_a = this.database.collectionFactory.collectionTypes.get(this.collection.constructor)) == null ? void 0 : _a.onSync;
    if (collectionSyncOptions) {
      await collectionSyncOptions(this.model, options);
      return;
    }
    await this.handleSchema(options);
    try {
      await this.handleZeroColumnModel(options);
    } catch (e) {
      if (e instanceof import_zero_column_table_error.ZeroColumnTableError) {
        return;
      }
      throw e;
    }
    let beforeColumns;
    try {
      beforeColumns = await this.queryInterface.describeTable(this.tableName, options);
    } catch (error) {
    }
    if (beforeColumns) {
      await this.handlePrimaryKeyBeforeSync(beforeColumns, options);
      await this.handleUniqueFieldBeforeSync(beforeColumns, options);
    }
    const syncResult = await this.performSync(options);
    const columns = await this.queryInterface.describeTable(this.tableName, options);
    await this.handlePrimaryKey(columns, options);
    await this.handleDefaultValues(columns, options);
    await this.handleUniqueIndex(options);
    return syncResult;
  }
  async handleUniqueFieldBeforeSync(beforeColumns, options) {
    if (!this.database.inDialect("sqlite")) {
      return;
    }
    const newAttributes = Object.keys(this.rawAttributes).filter((key) => {
      return !Object.keys(beforeColumns).includes(this.rawAttributes[key].field) && this.rawAttributes[key].unique;
    });
    this.uniqueAttributes = newAttributes;
    for (const newAttribute of newAttributes) {
      this.rawAttributes[newAttribute].unique = false;
    }
  }
  async handlePrimaryKeyBeforeSync(columns, options) {
    const columnsBePrimaryKey = Object.keys(columns).filter((key) => {
      return columns[key].primaryKey == true;
    }).sort();
    const columnsWillBePrimaryKey = Object.keys(this.rawAttributes).filter((key) => {
      return this.rawAttributes[key].primaryKey == true;
    }).map((key) => {
      return this.rawAttributes[key].field;
    }).sort();
    if (columnsBePrimaryKey.length == 1 && !columnsWillBePrimaryKey.includes(columnsBePrimaryKey[0])) {
      if (this.database.inDialect("mariadb", "mysql")) {
        await this.sequelize.query(`ALTER TABLE ${this.collection.quotedTableName()} DROP PRIMARY KEY;`, options);
      }
    }
  }
  async handlePrimaryKey(columns, options) {
    try {
      const columnsBePrimaryKey = Object.keys(columns).filter((key) => {
        return columns[key].primaryKey == true;
      }).sort();
      const columnsWillBePrimaryKey = Object.keys(this.rawAttributes).filter((key) => {
        return this.rawAttributes[key].primaryKey == true;
      }).map((key) => {
        return this.rawAttributes[key].field;
      }).sort();
      if (columnsWillBePrimaryKey.length == 0) {
        return;
      }
      if (columnsWillBePrimaryKey.length == 1 && JSON.stringify(columnsBePrimaryKey) != JSON.stringify(columnsWillBePrimaryKey)) {
        if (this.database.inDialect("mariadb", "mysql")) {
          await this.sequelize.query(
            `ALTER TABLE ${this.collection.quotedTableName()} ADD PRIMARY KEY (${columnsWillBePrimaryKey[0]});`,
            options
          );
        } else {
          await this.queryInterface.addConstraint(this.tableName, {
            type: "primary key",
            fields: columnsWillBePrimaryKey,
            name: `${this.collection.tableName()}_${columnsWillBePrimaryKey.join("_")}_pk`,
            transaction: options == null ? void 0 : options.transaction
          });
        }
      }
    } catch (e) {
      if (e.message.includes("No description found")) {
        return;
      }
      throw e;
    }
  }
  async handleDefaultValues(columns, options) {
    const isJSONColumn = /* @__PURE__ */ __name((column) => {
      return ["JSON", "JSONB"].includes(column.type);
    }, "isJSONColumn");
    for (const columnName in columns) {
      const column = columns[columnName];
      const isPrimaryKey = /* @__PURE__ */ __name(() => {
        const attribute = this.findAttributeByColumnName(columnName);
        return attribute && attribute.primaryKey || column.primaryKey;
      }, "isPrimaryKey");
      if (isPrimaryKey()) continue;
      if (await this.isParentColumn(columnName, options)) continue;
      const currentAttribute = this.findAttributeByColumnName(columnName);
      if (!currentAttribute) continue;
      const attributeDefaultValue = (0, import_utils.isPlainObject)(currentAttribute.defaultValue) && isJSONColumn(column) ? JSON.stringify(currentAttribute.defaultValue) : currentAttribute.defaultValue;
      const columnDefaultValue = columns[columnName].defaultValue;
      if (columnDefaultValue === null && attributeDefaultValue === void 0) continue;
      if (columnDefaultValue === "NULL" && attributeDefaultValue === null) continue;
      if (columnDefaultValue != attributeDefaultValue) {
        const changeAttribute = {
          ...currentAttribute,
          defaultValue: attributeDefaultValue
        };
        if (this.database.inDialect("postgres")) {
          const query = this.queryInterface.queryGenerator.attributesToSQL(
            {
              // @ts-ignore
              [columnName]: this.queryInterface.normalizeAttribute(changeAttribute)
            },
            {
              context: "changeColumn",
              table: this.tableName
            }
          );
          const sql = this.queryInterface.queryGenerator.changeColumnQuery(this.tableName, query);
          const regex = /;ALTER TABLE "[^"]+"(\."[^"]+")? ALTER COLUMN "[^"]+" TYPE [^;]+;?$/;
          await this.sequelize.query(sql.replace(regex, ""), options);
        } else {
          await this.queryInterface.changeColumn(this.tableName, columnName, changeAttribute, options);
        }
      }
    }
  }
  async handleUniqueIndex(options) {
    for (const uniqueAttribute of this.uniqueAttributes) {
      this.rawAttributes[uniqueAttribute].unique = true;
    }
    const existsIndexes = await this.queryInterface.showIndex(this.collection.getTableNameWithSchema(), options);
    const existsUniqueIndexes = existsIndexes.filter((index) => index.unique);
    const uniqueAttributes = Object.keys(this.rawAttributes).filter((key) => {
      return this.rawAttributes[key].unique == true;
    });
    for (const existUniqueIndex of existsUniqueIndexes) {
      const isSingleField = existUniqueIndex.fields.length == 1;
      if (!isSingleField) continue;
      const columnName = existUniqueIndex.fields[0].attribute;
      const currentAttribute = this.findAttributeByColumnName(columnName);
      if (!currentAttribute || !currentAttribute.unique && !currentAttribute.primaryKey) {
        if (this.database.inDialect("postgres")) {
          const constraints = await this.queryInterface.showConstraint(this.tableName, existUniqueIndex.name, options);
          if (constraints.some((c) => c.constraintName === existUniqueIndex.name)) {
            await this.queryInterface.removeConstraint(this.tableName, existUniqueIndex.name, options);
          }
        }
        if (this.database.inDialect("sqlite")) {
          const changeAttribute = {
            ...currentAttribute,
            unique: false
          };
          await this.queryInterface.changeColumn(this.tableName, columnName, changeAttribute, options);
        } else {
          await this.queryInterface.removeIndex(this.tableName, existUniqueIndex.name, options);
        }
      }
    }
    for (const uniqueAttribute of uniqueAttributes) {
      const indexExists = existsUniqueIndexes.find((index) => {
        return index.fields.length == 1 && index.fields[0].attribute == this.rawAttributes[uniqueAttribute].field;
      });
      if (!indexExists) {
        await this.queryInterface.addIndex(this.tableName, [this.rawAttributes[uniqueAttribute].field], {
          unique: true,
          transaction: options == null ? void 0 : options.transaction,
          name: `${this.collection.tableName()}_${this.rawAttributes[uniqueAttribute].field}_uk`
        });
      }
    }
  }
  async getColumns(options) {
    return await this.queryInterface.describeTable(this.tableName, options);
  }
  async isParentColumn(columnName, options) {
    if (this.collection.isInherited()) {
      const parentCollections = this.collection.getFlatParents();
      for (const parentCollection of parentCollections) {
        let parentColumns = this.tableDescMap[parentCollection.name];
        if (!parentColumns) {
          parentColumns = await this.queryInterface.describeTable(parentCollection.getTableNameWithSchema(), options);
          this.tableDescMap[parentCollection.name] = parentColumns;
        }
        if (parentColumns[columnName]) {
          return true;
        }
      }
    }
    return false;
  }
  async removeUnusedColumns(columns, options) {
    for (const columnName in columns) {
      const currentAttribute = this.findAttributeByColumnName(columnName);
      if (!currentAttribute) {
        let shouldDelete = true;
        if (await this.isParentColumn(columnName, options)) {
          shouldDelete = false;
        }
        if (shouldDelete) {
          await this.queryInterface.removeColumn(this.model.getTableName(), columnName, options);
          continue;
        }
      }
    }
  }
  findAttributeByColumnName(columnName) {
    return Object.values(this.rawAttributes).find((attribute) => {
      return attribute.field == columnName;
    });
  }
  async performSync(options) {
    return this.collection.isInherited() ? await import_inherited_sync_runner.InheritedSyncRunner.syncInheritModel(this.model, options) : await import_sequelize.Model.sync.call(this.model, options);
  }
  async handleZeroColumnModel(options) {
    if (Object.keys(this.model.tableAttributes).length === 0) {
      if (this.database.inDialect("sqlite", "mysql", "mariadb", "postgres")) {
        throw new import_zero_column_table_error.ZeroColumnTableError(
          `Zero-column tables aren't supported in ${this.database.sequelize.getDialect()}`
        );
      }
      const queryInterface = this.queryInterface;
      if (!queryInterface.patched) {
        const oldDescribeTable = queryInterface.describeTable;
        queryInterface.describeTable = async function(...args) {
          try {
            return await oldDescribeTable.call(this, ...args);
          } catch (err) {
            if (err.message.includes("No description found for")) {
              return [];
            } else {
              throw err;
            }
          }
        };
        queryInterface.patched = true;
      }
    }
  }
  async handleSchema(options) {
    const _schema = this.model._schema;
    if (_schema && _schema != "public") {
      await this.sequelize.query(`CREATE SCHEMA IF NOT EXISTS "${_schema}";`, {
        raw: true,
        transaction: options == null ? void 0 : options.transaction
      });
    }
  }
};
__name(_SyncRunner, "SyncRunner");
let SyncRunner = _SyncRunner;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SyncRunner
});
