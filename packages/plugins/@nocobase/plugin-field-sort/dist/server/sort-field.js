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
var sort_field_exports = {};
__export(sort_field_exports, {
  SortField: () => SortField
});
module.exports = __toCommonJS(sort_field_exports);
var import_lodash = require("lodash");
var import_sequelize = require("sequelize");
var import_database = require("@nocobase/database");
class SortField extends import_database.Field {
  static lockManager;
  get dataType() {
    return import_sequelize.DataTypes.BIGINT;
  }
  setSortValue = async (instance, options) => {
    const { name, scopeKey } = this.options;
    const { model } = this.context.collection;
    if ((0, import_lodash.isNumber)(instance.get(name)) && instance._previousDataValues[scopeKey] == instance[scopeKey]) {
      return;
    }
    const where = {};
    if (scopeKey) {
      const value = instance.get(scopeKey);
      if (value !== void 0 && value !== null) {
        where[scopeKey] = value;
      }
    }
    await this.constructor.lockManager.runExclusive(
      this.context.collection.name,
      async () => {
        const max = await model.max(name, { ...options, where });
        const newValue = (max || 0) + 1;
        instance.set(name, newValue);
      },
      2e3
    );
  };
  onScopeChange = async (instance, options) => {
    const { scopeKey } = this.options;
    if (scopeKey && !instance.isNewRecord && instance._previousDataValues[scopeKey] != instance[scopeKey]) {
      await this.setSortValue(instance, options);
    }
  };
  initRecordsSortValue = async (options) => {
    const { transaction } = options;
    const needInit = async (scopeKey2 = null, scopeValue = null) => {
      const filter = {};
      if (scopeKey2 && scopeValue) {
        filter[scopeKey2] = scopeValue;
      }
      const totalCount = await this.collection.repository.count({
        filter,
        transaction
      });
      const emptyCount = await this.collection.repository.count({
        filter: {
          [this.name]: null,
          ...filter
        },
        transaction
      });
      return emptyCount === totalCount && emptyCount > 0;
    };
    const doInit = async (scopeKey2 = null, scopeValue = null) => {
      const orderField = (() => {
        const model = this.collection.model;
        if (model.primaryKeyAttribute) {
          const primaryKeyAttribute = model.rawAttributes[model.primaryKeyAttribute];
          if (primaryKeyAttribute.autoIncrement) {
            return primaryKeyAttribute.field;
          }
        }
        if (model.rawAttributes["createdAt"]) {
          return model.rawAttributes["createdAt"].field;
        }
        throw new Error(`can not find order key for collection ${this.collection.name}`);
      })();
      const queryInterface = this.collection.db.sequelize.getQueryInterface();
      if (scopeKey2) {
        const scopeAttribute = this.collection.model.rawAttributes[scopeKey2];
        if (!scopeAttribute) {
          throw new Error(`can not find scope field ${scopeKey2} for collection ${this.collection.name}`);
        }
        scopeKey2 = scopeAttribute.field;
      }
      const quotedOrderField = queryInterface.quoteIdentifier(orderField);
      const sortColumnName = queryInterface.quoteIdentifier(this.collection.model.rawAttributes[this.name].field);
      let sql;
      const whereClause = scopeKey2 && scopeValue ? (() => {
        const filteredScopeValue = scopeValue.filter((v) => v !== null);
        if (filteredScopeValue.length === 0) {
          return "";
        }
        const initialClause = `
  WHERE ${queryInterface.quoteIdentifier(scopeKey2)} IN (${filteredScopeValue.map((v) => `'${v}'`).join(", ")})`;
        const nullCheck = scopeValue.includes(null) ? ` OR ${queryInterface.quoteIdentifier(scopeKey2)} IS NULL` : "";
        return initialClause + nullCheck;
      })() : "";
      if (this.collection.db.inDialect("postgres")) {
        sql = `
    UPDATE ${this.collection.quotedTableName()}
    SET ${sortColumnName} = ordered_table.new_sequence_number
    FROM (
      SELECT *, ROW_NUMBER() OVER (${scopeKey2 ? `PARTITION BY ${queryInterface.quoteIdentifier(scopeKey2)}` : ""} ORDER BY ${quotedOrderField}) AS new_sequence_number
      FROM ${this.collection.quotedTableName()}
      ${whereClause}
    ) AS ordered_table
    WHERE ${this.collection.quotedTableName()}.${quotedOrderField} = ordered_table.${quotedOrderField};
  `;
      } else if (this.collection.db.inDialect("sqlite")) {
        sql = `
    UPDATE ${this.collection.quotedTableName()}
    SET ${sortColumnName} = (
      SELECT new_sequence_number
      FROM (
        SELECT *, ROW_NUMBER() OVER (${scopeKey2 ? `PARTITION BY ${queryInterface.quoteIdentifier(scopeKey2)}` : ""} ORDER BY ${quotedOrderField}) AS new_sequence_number
        FROM ${this.collection.quotedTableName()}
        ${whereClause}
      ) AS ordered_table
      WHERE ${this.collection.quotedTableName()}.${quotedOrderField} = ordered_table.${quotedOrderField}
    );
  `;
      } else if (this.collection.db.inDialect("mysql") || this.collection.db.inDialect("mariadb")) {
        sql = `
    UPDATE ${this.collection.quotedTableName()}
    JOIN (
      SELECT *, ROW_NUMBER() OVER (${scopeKey2 ? `PARTITION BY ${queryInterface.quoteIdentifier(scopeKey2)}` : ""} ORDER BY ${quotedOrderField}) AS new_sequence_number
      FROM ${this.collection.quotedTableName()}
      ${whereClause}
    ) AS ordered_table ON ${this.collection.quotedTableName()}.${quotedOrderField} = ordered_table.${quotedOrderField}
    SET ${this.collection.quotedTableName()}.${sortColumnName} = ordered_table.new_sequence_number;
  `;
      }
      await this.collection.db.sequelize.query(sql, {
        transaction
      });
    };
    const scopeKey = this.options.scopeKey;
    if (scopeKey) {
      const scopeKeyColumn = this.collection.model.rawAttributes[scopeKey].field;
      const groups = await this.collection.model.findAll({
        attributes: [[import_sequelize.Sequelize.fn("DISTINCT", import_sequelize.Sequelize.col(scopeKeyColumn)), scopeKey]],
        raw: true,
        transaction
      });
      const needInitGroups = [];
      for (const group of groups) {
        if (await needInit(scopeKey, group[scopeKey])) {
          needInitGroups.push(group[scopeKey]);
        }
      }
      if (needInitGroups.length > 0) {
        await doInit(scopeKey, needInitGroups);
      }
    } else if (await needInit()) {
      await doInit();
    }
  };
  bind() {
    super.bind();
    this.on("afterSync", this.initRecordsSortValue);
    this.on("beforeUpdate", this.onScopeChange);
    this.on("beforeCreate", this.setSortValue);
  }
  unbind() {
    super.unbind();
    this.off("beforeUpdate", this.onScopeChange);
    this.off("beforeCreate", this.setSortValue);
    this.off("afterSync", this.initRecordsSortValue);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SortField
});
