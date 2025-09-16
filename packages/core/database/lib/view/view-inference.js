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
var view_inference_exports = {};
__export(view_inference_exports, {
  ViewFieldInference: () => ViewFieldInference
});
module.exports = __toCommonJS(view_inference_exports);
var import_mathjs = require("mathjs");
var import_field_type_map = __toESM(require("./field-type-map"));
const _ViewFieldInference = class _ViewFieldInference {
  static extractTypeFromDefinition(typeDefinition) {
    const leftParenIndex = typeDefinition.indexOf("(");
    if (leftParenIndex === -1) {
      return typeDefinition.toLowerCase();
    }
    return typeDefinition.substring(0, leftParenIndex).toLowerCase().trim();
  }
  static async inferFields(options) {
    const { db } = options;
    if (!db.inDialect("postgres")) {
      options.viewSchema = void 0;
    }
    const columns = await db.sequelize.getQueryInterface().describeTable(options.viewName, options.viewSchema);
    const columnUsage = await db.queryInterface.viewColumnUsage({
      viewName: options.viewName,
      schema: options.viewSchema
    });
    const rawFields = [];
    for (const [name, column] of Object.entries(columns)) {
      const inferResult = { name, rawType: column.type, field: name };
      const usage = columnUsage[name];
      if (usage) {
        const collection = db.tableNameCollectionMap.get(
          `${usage.table_schema ? `${usage.table_schema}.` : ""}${usage.table_name}`
        );
        const collectionField = (() => {
          if (!collection) return false;
          const fieldAttribute = Object.values(collection.model.rawAttributes).find(
            (field) => field.field === usage.column_name
          );
          if (!fieldAttribute) {
            return false;
          }
          const fieldName = fieldAttribute.fieldName;
          return collection.getField(fieldName);
        })();
        const belongsToAssociationField = (() => {
          if (!collection) return false;
          const field = Object.values(collection.model.rawAttributes).find(
            (field2) => field2.field === usage.column_name
          );
          if (!field) {
            return false;
          }
          const association = Object.values(collection.model.associations).find(
            (association2) => association2.associationType === "BelongsTo" && association2.foreignKey === field.fieldName
          );
          if (!association) {
            return false;
          }
          return collection.getField(association.as);
        })();
        if (belongsToAssociationField) {
          rawFields.push([
            belongsToAssociationField.name,
            {
              name: belongsToAssociationField.name,
              type: belongsToAssociationField.type,
              source: `${belongsToAssociationField.collection.name}.${belongsToAssociationField.name}`
            }
          ]);
        }
        if (collectionField) {
          if (collectionField.options.interface) {
            inferResult.type = collectionField.type;
            inferResult.interface = collectionField.options.interface;
            inferResult.source = `${collectionField.collection.name}.${collectionField.name}`;
          }
        }
      }
      if (!inferResult.type) {
        Object.assign(
          inferResult,
          this.inferToFieldType({
            dialect: db.sequelize.getDialect(),
            name,
            type: column.type
          })
        );
      }
      rawFields.push([name, inferResult]);
    }
    return Object.fromEntries(rawFields);
  }
  static inferToFieldType(options) {
    const { dialect } = options;
    const fieldTypeMap = import_field_type_map.default[dialect];
    if (!options.type) {
      return {
        possibleTypes: Object.keys(fieldTypeMap)
      };
    }
    const queryType = this.extractTypeFromDefinition(options.type);
    const mappedType = fieldTypeMap[queryType];
    if ((0, import_mathjs.isArray)(mappedType)) {
      return {
        type: mappedType[0],
        possibleTypes: mappedType
      };
    }
    return {
      type: mappedType
    };
  }
};
__name(_ViewFieldInference, "ViewFieldInference");
let ViewFieldInference = _ViewFieldInference;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ViewFieldInference
});
