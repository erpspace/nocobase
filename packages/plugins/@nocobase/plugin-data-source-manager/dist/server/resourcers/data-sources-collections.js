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
var data_sources_collections_exports = {};
__export(data_sources_collections_exports, {
  default: () => data_sources_collections_default
});
module.exports = __toCommonJS(data_sources_collections_exports);
var import_lodash = __toESM(require("lodash"));
var import_database = require("@nocobase/database");
var data_sources_collections_default = {
  name: "dataSources.collections",
  actions: {
    async list(ctx, next) {
      const params = ctx.action.params;
      const { associatedIndex: dataSourceKey } = params;
      const dataSource = ctx.app.dataSourceManager.dataSources.get(dataSourceKey);
      const plugin = ctx.app.pm.get("data-source-manager");
      const dataSourceStatus = plugin.dataSourceStatus[dataSourceKey];
      if (dataSourceStatus === "loading-failed") {
        const error = plugin.dataSourceErrors[dataSourceKey];
        if (error) {
          throw new Error(`dataSource ${dataSourceKey} loading failed: ${error.message}`);
        }
        throw new Error(`dataSource ${dataSourceKey} loading failed`);
      }
      if (["loading", "reloading"].includes(dataSourceStatus)) {
        const progress = plugin.dataSourceLoadingProgress[dataSourceKey];
        if (progress) {
          throw new Error(`dataSource ${dataSourceKey} is ${dataSourceStatus} (${progress.loaded}/${progress.total})`);
        }
        throw new Error(`dataSource ${dataSourceKey} is ${dataSourceStatus}`);
      }
      if (!dataSource) {
        throw new Error(`dataSource ${dataSourceKey} not found`);
      }
      const { paginate, filter = {} } = ctx.action.params;
      const collections = import_lodash.default.sortBy(
        dataSource.collectionManager.getCollections().filter((collection) => {
          return (0, import_database.filterMatch)(collection.options, filter);
        }),
        "name"
      );
      const mapCollection = (collections2) => {
        return collections2.map((collection) => {
          return {
            ...collection.options,
            fields: collection.getFields().map((field) => field.options)
          };
        });
      };
      if (paginate === false || paginate === "false") {
        ctx.body = mapCollection(collections);
      } else {
        const { page = 1, pageSize = 20 } = ctx.action.params;
        ctx.withoutDataWrapping = true;
        ctx.body = {
          data: mapCollection(collections.slice((page - 1) * pageSize, page * pageSize)),
          meta: {
            count: collections.length,
            page,
            pageSize,
            totalPage: Math.ceil(collections.length / pageSize)
          }
        };
      }
      await next();
    },
    async update(ctx, next) {
      const params = ctx.action.params;
      const { filterByTk: collectionName, associatedIndex: dataSourceKey } = params;
      let dataSourceCollectionRecord = await ctx.db.getRepository("dataSourcesCollections").findOne({
        filter: {
          name: collectionName,
          dataSourceKey
        }
      });
      if (!dataSourceCollectionRecord) {
        dataSourceCollectionRecord = await ctx.db.getRepository("dataSourcesCollections").create({
          values: {
            ...params.values,
            name: collectionName,
            dataSourceKey
          }
        });
      } else {
        await ctx.db.getRepository("dataSourcesCollections").update({
          filter: {
            name: collectionName,
            dataSourceKey
          },
          values: params.values,
          updateAssociationValues: ["fields"]
        });
      }
      dataSourceCollectionRecord = await ctx.db.getRepository("dataSourcesCollections").findOne({
        filter: {
          name: collectionName,
          dataSourceKey
        }
      });
      ctx.body = dataSourceCollectionRecord.toJSON();
      await next();
    }
  }
};
