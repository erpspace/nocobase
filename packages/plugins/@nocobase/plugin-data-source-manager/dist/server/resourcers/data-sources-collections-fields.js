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
var data_sources_collections_fields_exports = {};
__export(data_sources_collections_fields_exports, {
  default: () => data_sources_collections_fields_default
});
module.exports = __toCommonJS(data_sources_collections_fields_exports);
var import_lodash = __toESM(require("lodash"));
var data_sources_collections_fields_default = {
  name: "dataSourcesCollections.fields",
  actions: {
    async list(ctx, next) {
      const { associatedIndex: collectionNameWithDataSourceKey } = ctx.action.params;
      const [dataSourceKey, collectionName] = collectionNameWithDataSourceKey.split(".");
      const dataSource = ctx.app.dataSourceManager.dataSources.get(dataSourceKey);
      const collection = dataSource.collectionManager.getCollection(collectionName);
      const fields = collection.getFields();
      ctx.body = import_lodash.default.sortBy(
        fields.map((field) => field.options),
        "name"
      );
      await next();
    },
    async get(ctx, next) {
      const { associatedIndex: collectionNameWithDataSourceKey, filterByTk: name } = ctx.action.params;
      const [dataSourceKey, collectionName] = collectionNameWithDataSourceKey.split(".");
      const dataSource = ctx.app.dataSourceManager.dataSources.get(dataSourceKey);
      const collection = dataSource.collectionManager.getCollection(collectionName);
      const field = collection.getField(name);
      ctx.body = field.options;
      await next();
    },
    async update(ctx, next) {
      const { associatedIndex: collectionNameWithDataSourceKey, filterByTk: name, values } = ctx.action.params;
      const [dataSourceKey, collectionName] = collectionNameWithDataSourceKey.split(".");
      const mainDb = ctx.app.db;
      let fieldRecord = await mainDb.getRepository("dataSourcesFields").findOne({
        filter: {
          name,
          collectionName,
          dataSourceKey
        }
      });
      if (!fieldRecord) {
        fieldRecord = await mainDb.getRepository("dataSourcesFields").create({
          values: {
            ...values,
            name,
            collectionName,
            dataSourceKey
          }
        });
      } else {
        fieldRecord = (await mainDb.getRepository("dataSourcesFields").update({
          filter: {
            name,
            collectionName,
            dataSourceKey
          },
          values
        }))[0];
      }
      const field = ctx.app.dataSourceManager.dataSources.get(dataSourceKey).collectionManager.getCollection(collectionName).getField(fieldRecord.get("name"));
      ctx.body = field.options;
      await next();
    },
    async create(ctx, next) {
      const { associatedIndex: collectionNameWithDataSourceKey, values } = ctx.action.params;
      const [dataSourceKey, collectionName] = collectionNameWithDataSourceKey.split(".");
      const mainDb = ctx.app.db;
      const name = values.name;
      if (await mainDb.getRepository("dataSourcesFields").findOne({
        filter: {
          name,
          collectionName,
          dataSourceKey
        }
      })) {
        throw new Error(
          `Field name ${name} already exists in collection ${collectionName} of data source ${dataSourceKey}`
        );
      }
      const fieldRecord = await mainDb.getRepository("dataSourcesFields").create({
        values: {
          ...values,
          collectionName,
          dataSourceKey
        }
      });
      ctx.body = fieldRecord.toJSON();
      await next();
    },
    async destroy(ctx, next) {
      const { associatedIndex: collectionNameWithDataSourceKey, filterByTk: name } = ctx.action.params;
      const [dataSourceKey, collectionName] = collectionNameWithDataSourceKey.split(".");
      const mainDb = ctx.app.db;
      const fieldRecord = await mainDb.getRepository("dataSourcesFields").findOne({
        filter: {
          name,
          collectionName,
          dataSourceKey
        }
      });
      if (fieldRecord) {
        await fieldRecord.destroy();
      }
      ctx.body = "ok";
      await next();
    }
  }
};
