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
var parameters_exports = {};
__export(parameters_exports, {
  default: () => parameters_default
});
module.exports = __toCommonJS(parameters_exports);
var import_field_type_map = require("./field-type-map");
var parameters_default = (collection) => {
  const primaryKey = collection.model.primaryKeyAttribute;
  const parameters = {};
  if (primaryKey) {
    const primaryKeyField = collection.fields.get(primaryKey);
    if (!primaryKeyField) {
      throw new Error(`primaryKeyField not found: ${primaryKey}, ${collection.name}`);
    }
    Object.assign(parameters, {
      collectionIndex: {
        required: true,
        name: "collectionIndex",
        in: "path",
        description: "collection index",
        schema: (0, import_field_type_map.getTypeByField)(collection.fields.get(primaryKey))
      },
      filterByTk: {
        name: "filterByTk",
        in: "query",
        description: "filter by TK(default by ID)",
        schema: (0, import_field_type_map.getTypeByField)(collection.fields.get(primaryKey))
      },
      filterByTks: {
        name: "filterByTk",
        in: "query",
        description: "filter by TKs(default by ID), example: `1,2,3`",
        schema: {
          type: "array",
          items: (0, import_field_type_map.getTypeByField)(collection.fields.get(primaryKey))
        }
      }
    });
  }
  Object.assign(parameters, {
    filter: {
      name: "filter",
      in: "query",
      description: "filter items",
      content: {
        "application/json": {
          schema: {
            type: "object"
          }
        }
      }
    },
    sort: {
      name: "sort",
      in: "query",
      description: "sort items by fields, example: `-field1,-field2,field3`",
      schema: {
        oneOf: [
          {
            type: "array",
            items: {
              type: "string"
            },
            example: ["-id", "createdAt"]
          },
          {
            type: "string",
            example: "-id,createdAt"
          }
        ]
      }
    },
    fields: {
      name: "fields",
      in: "query",
      description: "select fields, example: `field1,field2`",
      schema: {
        oneOf: [
          {
            type: "array",
            items: {
              type: "string"
            },
            example: ["id", "createdAt"]
          },
          {
            type: "string",
            example: "id,createdAt"
          }
        ]
      }
    },
    except: {
      name: "except",
      in: "query",
      description: "except fields in results, example: `field1,field2`",
      schema: {
        oneOf: [
          {
            type: "array",
            items: {
              type: "string"
            },
            example: ["id", "createdAt"]
          },
          {
            type: "string",
            example: "id,createdAt"
          }
        ]
      }
    },
    appends: {
      name: "appends",
      in: "query",
      description: "append associations in results, example: `assoc1,assoc2`",
      schema: {
        oneOf: [
          {
            type: "array",
            items: {
              type: "string"
            },
            example: ["id", "createdAt"]
          },
          {
            type: "string",
            example: "id,createdAt"
          }
        ]
      }
    },
    whitelist: {
      name: "whitelist",
      in: "query",
      description: "whitelist for fields changes, example: `field1,field2`",
      schema: {
        oneOf: [
          {
            type: "array",
            items: {
              type: "string"
            },
            example: ["id", "createdAt"]
          },
          {
            type: "string",
            example: "id,createdAt"
          }
        ]
      }
    },
    blacklist: {
      name: "blacklist",
      in: "query",
      description: "blacklist for fields changes, example: `field1,field2`",
      schema: {
        oneOf: [
          {
            type: "array",
            items: {
              type: "string"
            },
            example: ["id", "createdAt"]
          },
          {
            type: "string",
            example: "id,createdAt"
          }
        ]
      }
    }
  });
  return {
    parameters
  };
};
