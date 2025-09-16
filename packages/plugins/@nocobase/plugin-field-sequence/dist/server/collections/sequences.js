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
var sequences_exports = {};
__export(sequences_exports, {
  default: () => sequences_default
});
module.exports = __toCommonJS(sequences_exports);
var import_database = require("@nocobase/database");
var sequences_default = (0, import_database.defineCollection)({
  dumpRules: {
    group: "required",
    async delayRestore(restorer) {
      const app = restorer.app;
      const importedCollections = restorer.importedCollections;
      const sequenceFields = importedCollections.map((collection) => {
        const collectionInstance = app.db.getCollection(collection);
        if (!collectionInstance) {
          app.logger.warn(`Collection ${collection} not found`);
          return [];
        }
        return [...collectionInstance.fields.values()].filter((field) => field.type === "sequence");
      }).flat().filter(Boolean);
      const sequencesAttributes = sequenceFields.map((field) => {
        const patterns = field.get("patterns");
        return patterns.map((pattern) => {
          return {
            collection: field.collection.name,
            field: field.name,
            key: pattern.options.key
          };
        });
      }).flat().filter((attr) => attr.collection && attr.field && attr.key);
      if (sequencesAttributes.length > 0) {
        await app.db.getRepository("sequences").destroy({
          filter: {
            $or: sequencesAttributes
          }
        });
      }
      await restorer.importCollection({
        name: "sequences",
        clear: false,
        rowCondition(row) {
          return sequencesAttributes.some((attributes) => {
            return row.collection === attributes.collection && row.field === attributes.field && row.key === attributes.key;
          });
        }
      });
    }
  },
  migrationRules: ["overwrite", "schema-only"],
  name: "sequences",
  shared: true,
  fields: [
    {
      name: "collection",
      type: "string"
    },
    {
      name: "field",
      type: "string"
    },
    {
      name: "key",
      type: "integer"
    },
    {
      name: "current",
      type: "bigInt"
    },
    {
      name: "lastGeneratedAt",
      type: "date"
    }
  ]
});
