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
var sql_model_exports = {};
__export(sql_model_exports, {
  SQLModel: () => SQLModel
});
module.exports = __toCommonJS(sql_model_exports);
var import_database = require("@nocobase/database");
var import_query_generator = require("./query-generator");
class SQLModel extends import_database.Model {
  static sql;
  static get queryInterface() {
    const queryInterface = this.sequelize.getQueryInterface();
    const queryGenerator = queryInterface.queryGenerator;
    const sqlGenerator = new Proxy(queryGenerator, {
      get(target, prop) {
        if (prop === "selectQuery") {
          return import_query_generator.selectQuery.bind(target);
        }
        return Reflect.get(target, prop);
      }
    });
    return new Proxy(queryInterface, {
      get(target, prop) {
        if (prop === "queryGenerator") {
          return sqlGenerator;
        }
        return Reflect.get(target, prop);
      }
    });
  }
  static async sync() {
  }
  static getTableNameWithSchema(table) {
    if (this.database.inDialect("postgres") && !table.includes(".")) {
      const schema = process.env.DB_SCHEMA || "public";
      return `${schema}.${table}`;
    }
    return table;
  }
  static parseSelectAST(ast) {
    const tablesMap = {};
    const tableAliases = {};
    ast.from.forEach((fromItem) => {
      tablesMap[fromItem.table] = [];
      if (fromItem.as) {
        tableAliases[fromItem.as] = fromItem.table;
      }
    });
    ast.columns.forEach((column) => {
      const expr = column.expr;
      if (expr.type !== "column_ref") {
        return;
      }
      const table = expr.table;
      const name = tableAliases[table] || table;
      const columnAttr = { name: expr.column, as: column.as };
      if (!name) {
        Object.keys(tablesMap).forEach((n) => {
          tablesMap[n].push(columnAttr);
        });
      } else if (tablesMap[name]) {
        tablesMap[name].push(columnAttr);
      }
    });
    return tablesMap;
  }
  static parseTablesAndColumns() {
    let { ast: _ast } = import_database.sqlParser.parse(this.sql);
    if (Array.isArray(_ast)) {
      _ast = _ast[0];
    }
    const ast = _ast;
    ast.from = ast.from || [];
    ast.columns = ast.columns || [];
    if (ast.with) {
      const withAST = ast.with;
      withAST.forEach((withItem) => {
        const as = withItem.name.value;
        const withAst = withItem.stmt.ast;
        ast.from.push(...withAst.from.map((f) => ({ ...f, as })));
        ast.columns.push(
          ...withAst.columns.map((c) => ({
            ...c,
            expr: {
              ...c.expr,
              table: as
            }
          }))
        );
      });
    }
    const tablesMap = this.parseSelectAST(ast);
    return Object.entries(tablesMap).filter(([_, columns]) => columns).map(([table, columns]) => ({ table, columns }));
  }
  static inferFields() {
    const tables = this.parseTablesAndColumns();
    return tables.reduce((fields, { table, columns }) => {
      const tableName = this.getTableNameWithSchema(table);
      const collection = this.database.tableNameCollectionMap.get(tableName);
      if (!collection) {
        const originFields = {};
        columns.forEach((column) => {
          if (column.name === "*") {
            return;
          }
          originFields[column.as || column.name] = {};
        });
        return { ...fields, ...originFields };
      }
      const all = columns.some((column) => column.name === "*");
      const attributes = collection.model.getAttributes();
      const sourceFields = {};
      if (all) {
        Object.values(attributes).forEach((attribute) => {
          const field = collection.getField(attribute.fieldName);
          if (!(field == null ? void 0 : field.options.interface)) {
            return;
          }
          sourceFields[field.name] = {
            collection: field.collection.name,
            type: field.type,
            source: `${field.collection.name}.${field.name}`,
            interface: field.options.interface,
            uiSchema: field.options.uiSchema
          };
        });
      } else {
        columns.forEach((column) => {
          let options = {};
          const modelField = Object.values(attributes).find((attribute) => attribute.field === column.name);
          if (modelField) {
            const field = collection.getField(modelField.fieldName);
            if (field == null ? void 0 : field.options.interface) {
              options = {
                collection: field.collection.name,
                type: field.type,
                source: `${field.collection.name}.${field.name}`,
                interface: field.options.interface,
                uiSchema: field.options.uiSchema
              };
            }
          }
          sourceFields[column.as || column.name] = options;
        });
      }
      return { ...fields, ...sourceFields };
    }, {});
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SQLModel
});
