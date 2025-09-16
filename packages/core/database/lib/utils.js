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
var utils_exports = {};
__export(utils_exports, {
  checkIdentifier: () => checkIdentifier,
  getKeysByPrefix: () => getKeysByPrefix,
  getTableName: () => getTableName,
  isStringOrNumber: () => isStringOrNumber,
  isUndefinedOrNull: () => isUndefinedOrNull,
  md5: () => md5,
  patchSequelizeQueryInterface: () => patchSequelizeQueryInterface,
  percent2float: () => percent2float,
  processIncludes: () => processIncludes,
  snakeCase: () => snakeCase
});
module.exports = __toCommonJS(utils_exports);
var import_crypto = __toESM(require("crypto"));
var import_identifier_error = require("./errors/identifier-error");
var import_lodash = __toESM(require("lodash"));
function md5(value) {
  return import_crypto.default.createHash("md5").update(value).digest("hex");
}
__name(md5, "md5");
const MAX_IDENTIFIER_LENGTH = 63;
function checkIdentifier(value) {
  if (value.length > MAX_IDENTIFIER_LENGTH) {
    throw new import_identifier_error.IdentifierError(`Identifier ${value} is too long`);
  }
}
__name(checkIdentifier, "checkIdentifier");
function getTableName(collectionName, options) {
  return options.underscored ? snakeCase(collectionName) : collectionName;
}
__name(getTableName, "getTableName");
function snakeCase(name) {
  return require("sequelize").Utils.underscore(name);
}
__name(snakeCase, "snakeCase");
function patchShowConstraintsQuery(queryGenerator, db) {
  queryGenerator.showConstraintsQuery = (tableName, constraintName) => {
    const lines = [
      'SELECT constraint_catalog AS "constraintCatalog",',
      'constraint_schema AS "constraintSchema",',
      'constraint_name AS "constraintName",',
      'table_catalog AS "tableCatalog",',
      'table_schema AS "tableSchema",',
      'table_name AS "tableName",',
      'constraint_type AS "constraintType",',
      'is_deferrable AS "isDeferrable",',
      'initially_deferred AS "initiallyDeferred"',
      "from INFORMATION_SCHEMA.table_constraints",
      `WHERE table_name='${import_lodash.default.isPlainObject(tableName) ? tableName.tableName : tableName}'`
    ];
    if (constraintName) {
      lines.push(`AND constraint_name='${constraintName}'`);
    }
    if (import_lodash.default.isPlainObject(tableName) && tableName.schema) {
      lines.push(`AND table_schema='${tableName.schema}'`);
    }
    return lines.join(" ");
  };
}
__name(patchShowConstraintsQuery, "patchShowConstraintsQuery");
function patchDescribeTableQuery(queryGenerator) {
  const describeTableQuery = /* @__PURE__ */ __name(function(tableName, schema) {
    schema = schema || this.options.schema || "public";
    return `SELECT pk.constraint_type as "Constraint",c.column_name as "Field", c.column_default as "Default",c.is_nullable as "Null", (CASE WHEN c.udt_name = 'hstore' THEN c.udt_name ELSE c.data_type END) || (CASE WHEN c.character_maximum_length IS NOT NULL THEN '(' || c.character_maximum_length || ')' ELSE '' END) as "Type", (SELECT array_agg(e.enumlabel) FROM pg_catalog.pg_type t JOIN pg_catalog.pg_enum e ON t.oid=e.enumtypid WHERE t.typname=c.udt_name) AS "special", (SELECT pgd.description FROM pg_catalog.pg_statio_all_tables AS st INNER JOIN pg_catalog.pg_description pgd on (pgd.objoid=st.relid) WHERE c.ordinal_position=pgd.objsubid AND c.table_name=st.relname AND st.schemaname = c.table_schema) AS "Comment" FROM information_schema.columns c LEFT JOIN (SELECT tc.table_schema, tc.table_name, cu.column_name, tc.constraint_type FROM information_schema.TABLE_CONSTRAINTS tc JOIN information_schema.KEY_COLUMN_USAGE  cu ON tc.table_schema=cu.table_schema and tc.table_name=cu.table_name and tc.constraint_name=cu.constraint_name and tc.constraint_type='PRIMARY KEY') pk ON pk.table_schema=c.table_schema AND pk.table_name=c.table_name AND pk.column_name=c.column_name WHERE c.table_name = ${this.escape(tableName)} AND c.table_schema = ${this.escape(schema)}`;
  }, "describeTableQuery");
  queryGenerator.describeTableQuery = describeTableQuery.bind(queryGenerator);
}
__name(patchDescribeTableQuery, "patchDescribeTableQuery");
function patchSequelizeQueryInterface(db) {
  if (db.inDialect("postgres")) {
    const queryGenerator = db.sequelize.dialect.queryGenerator;
    patchShowConstraintsQuery(queryGenerator, db);
    patchDescribeTableQuery(queryGenerator);
  }
}
__name(patchSequelizeQueryInterface, "patchSequelizeQueryInterface");
function percent2float(value) {
  if (!value.endsWith("%")) {
    return NaN;
  }
  const val = value.substring(0, value.length - 1);
  if (isNaN(+val)) {
    return NaN;
  }
  const index = value.indexOf(".");
  if (index === -1) {
    return parseFloat(value) / 100;
  }
  const repeat = value.length - index - 2;
  const v = parseInt("1" + "0".repeat(repeat));
  return parseFloat(value) * v / (100 * v);
}
__name(percent2float, "percent2float");
function isUndefinedOrNull(value) {
  return typeof value === "undefined" || value === null;
}
__name(isUndefinedOrNull, "isUndefinedOrNull");
function isStringOrNumber(value) {
  return typeof value === "string" || typeof value === "number";
}
__name(isStringOrNumber, "isStringOrNumber");
function getKeysByPrefix(keys, prefix) {
  return keys.filter((key) => key.startsWith(`${prefix}.`)).map((key) => key.substring(prefix.length + 1));
}
__name(getKeysByPrefix, "getKeysByPrefix");
function processIncludes(includes, model, parentAs = "") {
  includes.forEach((include, index) => {
    const association = model.associations[include.association];
    if (association == null ? void 0 : association.generateInclude) {
      includes[index] = {
        ...include,
        ...association.generateInclude(parentAs)
      };
    }
    if (include.include && Array.isArray(include.include) && include.include.length > 0) {
      const nextModel = association == null ? void 0 : association.target;
      if (!nextModel) {
        return;
      }
      processIncludes(include.include, nextModel, parentAs ? `${parentAs}->${association.as}` : association.as);
    }
  });
  return includes;
}
__name(processIncludes, "processIncludes");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkIdentifier,
  getKeysByPrefix,
  getTableName,
  isStringOrNumber,
  isUndefinedOrNull,
  md5,
  patchSequelizeQueryInterface,
  percent2float,
  processIncludes,
  snakeCase
});
