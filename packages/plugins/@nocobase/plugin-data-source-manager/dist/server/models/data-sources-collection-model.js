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
var data_sources_collection_model_exports = {};
__export(data_sources_collection_model_exports, {
  DataSourcesCollectionModel: () => DataSourcesCollectionModel
});
module.exports = __toCommonJS(data_sources_collection_model_exports);
var import_database = require("@nocobase/database");
class DataSourcesCollectionModel extends import_database.MagicAttributeModel {
  async load(loadOptions) {
    const { app, transaction } = loadOptions;
    const collectionFields = await this.getFields({ transaction });
    const collectionOptions = this.get();
    collectionOptions.fields = collectionFields;
    const dataSourceName = this.get("dataSourceKey");
    const dataSource = app.dataSourceManager.dataSources.get(dataSourceName);
    const collection = dataSource.collectionManager.getCollection(collectionOptions.name);
    if (collectionOptions.fields) {
      collectionOptions.fields = collectionOptions.fields.map((field) => {
        if (field instanceof import_database.Model) {
          return field.get();
        }
        return field;
      });
    }
    if (collection) {
      collection.updateOptions(collectionOptions);
    } else {
      dataSource.collectionManager.defineCollection(collectionOptions);
    }
    return collection;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DataSourcesCollectionModel
});
