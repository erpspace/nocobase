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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var src_exports = {};
__export(src_exports, {
  BaseError: () => import_sequelize.BaseError,
  BelongsToGetAssociationMixin: () => import_sequelize.BelongsToGetAssociationMixin,
  DataTypes: () => import_sequelize.DataTypes,
  FilterParser: () => import_filter_parser.default,
  HasManyCountAssociationsMixin: () => import_sequelize.HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin: () => import_sequelize.HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin: () => import_sequelize.HasManyGetAssociationsMixin,
  ModelStatic: () => import_sequelize.ModelStatic,
  Op: () => import_sequelize.Op,
  SQLParserTypes: () => import_sql_parser.SQLParserTypes,
  SyncOptions: () => import_sequelize.SyncOptions,
  Transaction: () => import_sequelize.Transaction,
  UniqueConstraintError: () => import_sequelize.UniqueConstraintError,
  ValidationError: () => import_sequelize.ValidationError,
  ValidationErrorItem: () => import_sequelize.ValidationErrorItem,
  default: () => import_database.Database,
  fieldTypeMap: () => import_field_type_map.default,
  filterIncludes: () => import_filter_include.filterIncludes,
  fn: () => import_sequelize.fn,
  literal: () => import_sequelize.literal,
  mergeIncludes: () => import_filter_include.mergeIncludes,
  operators: () => import_operators.default,
  snakeCase: () => import_utils.snakeCase,
  sqlParser: () => import_sql_parser.default,
  where: () => import_sequelize.where
});
module.exports = __toCommonJS(src_exports);
var import_sequelize = require("sequelize");
__reExport(src_exports, require("./belongs-to-array/belongs-to-array-repository"), module.exports);
__reExport(src_exports, require("./collection"), module.exports);
__reExport(src_exports, require("./collection-group-manager"), module.exports);
__reExport(src_exports, require("./collection-importer"), module.exports);
__reExport(src_exports, require("./database"), module.exports);
var import_database = require("./database");
__reExport(src_exports, require("./dialects"), module.exports);
__reExport(src_exports, require("./field-repository/array-field-repository"), module.exports);
__reExport(src_exports, require("./fields"), module.exports);
__reExport(src_exports, require("./filter-match"), module.exports);
var import_filter_parser = __toESM(require("./filter-parser"));
__reExport(src_exports, require("./helpers"), module.exports);
__reExport(src_exports, require("./inherited-collection"), module.exports);
__reExport(src_exports, require("./interfaces"), module.exports);
__reExport(src_exports, require("./magic-attribute-model"), module.exports);
__reExport(src_exports, require("./migration"), module.exports);
__reExport(src_exports, require("./mock-database"), module.exports);
__reExport(src_exports, require("./model"), module.exports);
__reExport(src_exports, require("./relation-repository/belongs-to-many-repository"), module.exports);
__reExport(src_exports, require("./relation-repository/belongs-to-repository"), module.exports);
__reExport(src_exports, require("./relation-repository/hasmany-repository"), module.exports);
__reExport(src_exports, require("./relation-repository/hasone-repository"), module.exports);
__reExport(src_exports, require("./relation-repository/multiple-relation-repository"), module.exports);
__reExport(src_exports, require("./relation-repository/single-relation-repository"), module.exports);
__reExport(src_exports, require("./repository"), module.exports);
__reExport(src_exports, require("./relation-repository/relation-repository"), module.exports);
var import_sql_parser = __toESM(require("./sql-parser"));
__reExport(src_exports, require("./update-associations"), module.exports);
var import_utils = require("./utils");
__reExport(src_exports, require("./value-parsers"), module.exports);
__reExport(src_exports, require("./view-collection"), module.exports);
var import_field_type_map = __toESM(require("./view/field-type-map"));
__reExport(src_exports, require("./view/view-inference"), module.exports);
__reExport(src_exports, require("./update-guard"), module.exports);
var import_operators = __toESM(require("./operators"));
var import_filter_include = require("./utils/filter-include");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseError,
  BelongsToGetAssociationMixin,
  DataTypes,
  FilterParser,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  ModelStatic,
  Op,
  SQLParserTypes,
  SyncOptions,
  Transaction,
  UniqueConstraintError,
  ValidationError,
  ValidationErrorItem,
  fieldTypeMap,
  filterIncludes,
  fn,
  literal,
  mergeIncludes,
  operators,
  snakeCase,
  sqlParser,
  where,
  ...require("./belongs-to-array/belongs-to-array-repository"),
  ...require("./collection"),
  ...require("./collection-group-manager"),
  ...require("./collection-importer"),
  ...require("./database"),
  ...require("./dialects"),
  ...require("./field-repository/array-field-repository"),
  ...require("./fields"),
  ...require("./filter-match"),
  ...require("./helpers"),
  ...require("./inherited-collection"),
  ...require("./interfaces"),
  ...require("./magic-attribute-model"),
  ...require("./migration"),
  ...require("./mock-database"),
  ...require("./model"),
  ...require("./relation-repository/belongs-to-many-repository"),
  ...require("./relation-repository/belongs-to-repository"),
  ...require("./relation-repository/hasmany-repository"),
  ...require("./relation-repository/hasone-repository"),
  ...require("./relation-repository/multiple-relation-repository"),
  ...require("./relation-repository/single-relation-repository"),
  ...require("./repository"),
  ...require("./relation-repository/relation-repository"),
  ...require("./update-associations"),
  ...require("./value-parsers"),
  ...require("./view-collection"),
  ...require("./view/view-inference"),
  ...require("./update-guard")
});
