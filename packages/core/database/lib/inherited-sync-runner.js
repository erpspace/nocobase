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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var inherited_sync_runner_exports = {};
__export(inherited_sync_runner_exports, {
  InheritedSyncRunner: () => InheritedSyncRunner
});
module.exports = __toCommonJS(inherited_sync_runner_exports);
var import_lodash = __toESM(require("lodash"));
const _InheritedSyncRunner = class _InheritedSyncRunner {
  static async syncInheritModel(model, options) {
    const { transaction } = options;
    options.hooks = options.hooks === void 0 ? true : !!options.hooks;
    const inheritedCollection = model.collection;
    const db = inheritedCollection.context.database;
    const dialect = db.sequelize.getDialect();
    const queryInterface = db.sequelize.getQueryInterface();
    if (dialect != "postgres") {
      throw new Error("Inherit model is only supported on postgres");
    }
    const parents = inheritedCollection.parents;
    if (!parents) {
      throw new Error(
        `Inherit model ${inheritedCollection.name} can't be created without parents, parents option is ${import_lodash.default.castArray(inheritedCollection.options.inherits).join(", ")}`
      );
    }
    for (const parent of parents) {
      if (Object.keys(parent.model.rawAttributes).length === 0) {
        throw new Error(
          `can't inherit from collection ${parent.options.name} because it has no attributes, please define at least one attribute in parent collection`
        );
      }
    }
    const tableName = inheritedCollection.getTableNameWithSchema();
    const attributes = model.tableAttributes;
    const childAttributes = import_lodash.default.pickBy(attributes, (value) => {
      return !value.inherit;
    });
    if (!await inheritedCollection.existsInDb({
      transaction
    })) {
      let maxSequenceVal = 0;
      let maxSequenceName;
      if (childAttributes.id && childAttributes.id.autoIncrement) {
        for (const parent of parents) {
          const sequenceNameResult = await queryInterface.sequelize.query(
            `SELECT column_default
             FROM information_schema.columns
             WHERE table_name = '${parent.model.tableName}'
               and table_schema = '${parent.collectionSchema()}'
               and "column_name" = 'id';`,
            {
              transaction
            }
          );
          if (!sequenceNameResult[0].length) {
            continue;
          }
          const columnDefault = sequenceNameResult[0][0]["column_default"];
          if (!columnDefault) {
            throw new Error(`Can't find sequence name of parent collection ${parent.options.name}`);
          }
          const regex = new RegExp(/nextval\('(.*)'::regclass\)/);
          const match = regex.exec(columnDefault);
          const sequenceName = match[1];
          const sequenceCurrentValResult = await queryInterface.sequelize.query(
            `select last_value
             from ${sequenceName}`,
            {
              transaction
            }
          );
          const sequenceCurrentVal = parseInt(sequenceCurrentValResult[0][0]["last_value"]);
          if (sequenceCurrentVal > maxSequenceVal) {
            maxSequenceName = sequenceName;
            maxSequenceVal = sequenceCurrentVal;
          }
        }
      }
      await this.createTable(tableName, childAttributes, options, model, parents);
      if (maxSequenceName) {
        const parentsDeep = Array.from(db.inheritanceMap.getParents(inheritedCollection.name)).map(
          (parent) => db.getCollection(parent).getTableNameWithSchema()
        );
        const sequenceTables = [...parentsDeep, tableName];
        for (const sequenceTable of sequenceTables) {
          const tableName2 = sequenceTable.tableName;
          const schemaName = sequenceTable.schema;
          const idColumnSql = `SELECT column_name
                               FROM information_schema.columns
                               WHERE table_name = '${tableName2}'
                                 and column_name = 'id'
                                 and table_schema = '${schemaName}';
          `;
          const idColumnQuery = await queryInterface.sequelize.query(idColumnSql, {
            transaction
          });
          if (idColumnQuery[0].length == 0) {
            continue;
          }
          await queryInterface.sequelize.query(
            `alter table ${db.utils.quoteTable(sequenceTable)}
              alter column id set default nextval('${maxSequenceName}')`,
            {
              transaction
            }
          );
        }
      }
    }
    if (options.alter) {
      const columns = await queryInterface.describeTable(tableName, options);
      for (const attribute in childAttributes) {
        const columnName = childAttributes[attribute].field;
        if (!columns[columnName]) {
          await queryInterface.addColumn(tableName, columnName, childAttributes[columnName], options);
        }
      }
    }
    if (options.hooks) {
      await model.runHooks("afterSync", {
        ...options,
        modelName: model.name,
        transaction
      });
    }
  }
  static async createTable(tableName, attributes, options, model, parents) {
    let sql = "";
    options = { ...options };
    if (options && options.uniqueKeys) {
      import_lodash.default.forOwn(options.uniqueKeys, (uniqueKey) => {
        if (uniqueKey.customIndex === void 0) {
          uniqueKey.customIndex = true;
        }
      });
    }
    if (model) {
      options.uniqueKeys = options.uniqueKeys || model.uniqueKeys;
    }
    const queryGenerator = model.queryGenerator;
    attributes = import_lodash.default.mapValues(attributes, (attribute) => model.sequelize.normalizeAttribute(attribute));
    attributes = queryGenerator.attributesToSQL(attributes, { table: tableName, context: "createTable" });
    sql = `${queryGenerator.createTableQuery(tableName, attributes, options)}`.replace(
      ";",
      ` INHERITS (${parents.map((t) => {
        return t.getTableNameWithSchema();
      }).join(", ")});`
    );
    return await model.sequelize.query(sql, options);
  }
};
__name(_InheritedSyncRunner, "InheritedSyncRunner");
let InheritedSyncRunner = _InheritedSyncRunner;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InheritedSyncRunner
});
