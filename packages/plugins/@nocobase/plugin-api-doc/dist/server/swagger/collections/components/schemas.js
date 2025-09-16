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
var schemas_exports = {};
__export(schemas_exports, {
  default: () => schemas_default
});
module.exports = __toCommonJS(schemas_exports);
var import_database = require("@nocobase/database");
var import_field_type_map = require("./field-type-map");
var import_associations = require("../paths/associations");
function getCollectionReadOnlyFields(collection) {
  var _a;
  const readOnlyFields = [];
  const primaryKey = collection.model.primaryKeyAttribute;
  if (primaryKey) {
    const primaryField = collection.fields.get(primaryKey);
    if (primaryField && ((_a = primaryField.options) == null ? void 0 : _a.autoIncrement)) {
      readOnlyFields.push(primaryKey);
    }
  }
  for (const [fieldName, field] of collection.fields) {
    if (field.type == "sort") {
      readOnlyFields.push(fieldName);
      continue;
    }
    if (field.type == "context") {
      readOnlyFields.push(fieldName);
      continue;
    }
    if ([
      "createdAt",
      "updatedAt",
      "created_at",
      "updated_at",
      "sort",
      "created_by_id",
      "createdById",
      "updatedById",
      "updated_by_id"
    ].includes(fieldName)) {
      readOnlyFields.push(fieldName);
      continue;
    }
  }
  return readOnlyFields;
}
function collectionToSchema(collection) {
  return {
    [collection.name]: {
      type: "object",
      properties: Array.from(collection.fields).filter(([key, value]) => {
        return !(value instanceof import_database.RelationField);
      }).reduce((obj, [key, value]) => {
        obj[key] = {
          ...getFieldTypeAttributes(value)
        };
        return obj;
      }, {})
    },
    [`${collection.name}.form`]: {
      allOf: [
        {
          $ref: `#/components/schemas/${collection.name}`
        },
        {
          type: "object",
          properties: getCollectionReadOnlyFields(collection).reduce((obj, key) => {
            obj[key] = {
              readOnly: true
            };
            return obj;
          }, {})
        }
      ]
    }
  };
}
var schemas_default = (collection, options) => {
  const associations = (0, import_associations.associationFields)(collection);
  const associationsTarget = associations.map((field) => collection.db.getCollection(field.target));
  const schemas = collectionToSchema(collection);
  if (options.withAssociation) {
    for (const target of associationsTarget) {
      Object.assign(schemas, collectionToSchema(target));
    }
  }
  return {
    schemas
  };
};
function getFieldTypeAttributes(field) {
  return (0, import_field_type_map.getTypeByField)(field);
}
