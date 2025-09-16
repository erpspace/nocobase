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
var append_child_collection_name_after_repository_find_exports = {};
__export(append_child_collection_name_after_repository_find_exports, {
  appendChildCollectionNameAfterRepositoryFind: () => appendChildCollectionNameAfterRepositoryFind
});
module.exports = __toCommonJS(append_child_collection_name_after_repository_find_exports);
const setRowAttribute = /* @__PURE__ */ __name((row, attribute, value, raw) => {
  if (raw) {
    row[attribute] = value;
  } else {
    row.set(attribute, value, { raw: true });
  }
}, "setRowAttribute");
const appendChildCollectionNameAfterRepositoryFind = /* @__PURE__ */ __name((db) => {
  return ({ findOptions, dataCollection, data }) => {
    if (findOptions.targetCollection) {
      const collection = db.getCollection(findOptions.targetCollection);
      for (const row of data) {
        setRowAttribute(row, "__collection", collection.name, findOptions.raw);
        setRowAttribute(row, "__schemaName", collection.collectionSchema(), findOptions.raw);
        setRowAttribute(row, "__tableName", collection.model.tableName, findOptions.raw);
      }
      return;
    }
    if (dataCollection.isParent()) {
      for (const row of data) {
        if (row.__collection) {
          continue;
        }
        const fullTableName = findOptions.raw ? `${row["__schemaName"]}.${row["__tableName"]}` : `${row.get("__schemaName")}.${row.get("__tableName")}`;
        const rowCollection = db.tableNameCollectionMap.get(fullTableName);
        if (!rowCollection) {
          db.logger.warn(
            `Can not find collection by table name ${JSON.stringify(row)}, current collections: ${Array.from(
              db.tableNameCollectionMap.keys()
            ).join(", ")}`
          );
          return;
        }
        const rowCollectionName = rowCollection.name;
        setRowAttribute(row, "__collection", rowCollectionName, findOptions.raw);
      }
    }
  };
}, "appendChildCollectionNameAfterRepositoryFind");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  appendChildCollectionNameAfterRepositoryFind
});
