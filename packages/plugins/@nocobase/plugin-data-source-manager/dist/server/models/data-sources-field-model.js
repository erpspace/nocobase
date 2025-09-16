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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var data_sources_field_model_exports = {};
__export(data_sources_field_model_exports, {
  DataSourcesFieldModel: () => DataSourcesFieldModel
});
module.exports = __toCommonJS(data_sources_field_model_exports);
var import_database = require("@nocobase/database");
var import_lodash = __toESM(require("lodash"));
var import_utils = require("../utils");
class DataSourcesFieldModel extends import_database.MagicAttributeModel {
  load(loadOptions) {
    const { app } = loadOptions;
    const options = this.toJSON();
    const { collectionName, name, dataSourceKey, field } = options;
    const dataSource = app.dataSourceManager.dataSources.get(dataSourceKey);
    const collection = dataSource.collectionManager.getCollection(collectionName);
    const oldFieldByName = collection.getField(name);
    const oldFieldByField = field ? collection.getFieldByField(field) : null;
    const oldField = oldFieldByField || oldFieldByName;
    const newOptions = (0, import_utils.mergeOptions)(oldField ? oldField.options : {}, options);
    collection.setField(name, newOptions);
    if (oldFieldByField && !oldFieldByName) {
      const filedShouldRemove = collection.getFields().filter((f) => f.options.field === field && f.options.name !== name);
      for (const f of filedShouldRemove) {
        collection.removeField(f.options.name);
      }
    }
  }
  unload(loadOptions) {
    const { app } = loadOptions;
    const options = this.toJSON();
    const { collectionName, name, dataSourceKey } = options;
    const dataSource = app.dataSourceManager.dataSources.get(dataSourceKey);
    if (!dataSource) {
      return;
    }
    const collection = dataSource.collectionManager.getCollection(collectionName);
    if (!collection) {
      return;
    }
    collection.removeField(name);
  }
  toJSON() {
    const json = super.toJSON();
    if (json.interface === "unixTimestamp" && json.accuracy) {
      import_lodash.default.set(json, "uiSchema.x-component-props.accuracy", json.accuracy);
    }
    return json;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DataSourcesFieldModel
});
