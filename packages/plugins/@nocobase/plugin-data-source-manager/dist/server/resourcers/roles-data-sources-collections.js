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
var roles_data_sources_collections_exports = {};
__export(roles_data_sources_collections_exports, {
  rolesRemoteCollectionsResourcer: () => rolesRemoteCollectionsResourcer
});
module.exports = __toCommonJS(roles_data_sources_collections_exports);
var import_full_data_repository = require("../services/full-data-repository");
var import_lodash = __toESM(require("lodash"));
function totalPage(total, pageSize) {
  return Math.ceil(total / pageSize);
}
const rolesRemoteCollectionsResourcer = {
  name: "roles.dataSourcesCollections",
  actions: {
    async list(ctx, next) {
      var _a, _b;
      const role = ctx.action.params.associatedIndex;
      const { page = 1, pageSize = 20 } = ctx.action.params;
      const { filter } = ctx.action.params;
      const { dataSourceKey } = filter;
      const dataSource = ctx.app.dataSourceManager.dataSources.get(dataSourceKey);
      const collectionRepository = new import_full_data_repository.FullDataRepository(dataSource.collectionManager.getCollections());
      const [collections] = await collectionRepository.findAndCount();
      const filterItem = import_lodash.default.get(filter, "$and");
      const filterByTitle = filterItem == null ? void 0 : filterItem.find((item) => item.title);
      const filterByName = filterItem == null ? void 0 : filterItem.find((item) => item.name);
      const filterTitle = (_a = import_lodash.default.get(filterByTitle, "title.$includes")) == null ? void 0 : _a.toLowerCase();
      const filterName = (_b = import_lodash.default.get(filterByName, "name.$includes")) == null ? void 0 : _b.toLowerCase();
      const roleResources = await ctx.app.db.getRepository("dataSourcesRolesResources").find({
        filter: {
          roleName: role,
          dataSourceKey
        }
      });
      const roleResourcesNames = roleResources.map((roleResource) => roleResource.get("name"));
      const roleResourceActionResourceNames = roleResources.filter((roleResources2) => roleResources2.get("usingActionsConfig")).map((roleResources2) => roleResources2.get("name"));
      const filtedCollections = collections.filter((collection) => {
        var _a2;
        return (!filterTitle || ((_a2 = import_lodash.default.get(collection, "options.title")) == null ? void 0 : _a2.toLowerCase().includes(filterTitle))) && (!filterName || collection.options.name.toLowerCase().includes(filterName));
      });
      const items = import_lodash.default.sortBy(
        filtedCollections.map((collection, i) => {
          var _a2;
          const collectionName = collection.options.name;
          const exists = roleResourcesNames.includes(collectionName);
          const usingConfig = roleResourceActionResourceNames.includes(collectionName) ? "resourceAction" : "strategy";
          return {
            type: "collection",
            name: collectionName,
            collectionName,
            title: ((_a2 = collection.options.uiSchema) == null ? void 0 : _a2.title) || collection.options.title,
            roleName: role,
            usingConfig,
            exists,
            fields: [...collection.fields.values()].map((field) => {
              return field.options;
            })
          };
        }),
        "name"
      );
      ctx.body = {
        count: filtedCollections.length,
        rows: items,
        page: Number(page),
        pageSize: Number(pageSize),
        totalPage: totalPage(filtedCollections.length, pageSize)
      };
      await next();
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  rolesRemoteCollectionsResourcer
});
