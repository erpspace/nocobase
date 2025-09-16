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
var role_collections_exports = {};
__export(role_collections_exports, {
  roleCollectionsResource: () => roleCollectionsResource
});
module.exports = __toCommonJS(role_collections_exports);
function totalPage(total, pageSize) {
  return Math.ceil(total / pageSize);
}
const roleCollectionsResource = {
  name: "roles.collections",
  actions: {
    async list(ctx, next) {
      const role = ctx.action.params.associatedIndex;
      const { page = 1, pageSize = 20 } = ctx.action.params;
      const db = ctx.db;
      const collectionRepository = db.getRepository("collections");
      const fieldRepository = db.getRepository("fields");
      const [collections, count] = await collectionRepository.findAndCount({
        filter: ctx.action.params.filter,
        sort: "sort"
      });
      const roleResources = await db.getRepository("rolesResources").find({
        filter: {
          roleName: role
        }
      });
      const roleResourcesNames = roleResources.map((roleResource) => roleResource.get("name"));
      const roleResourceActionResourceNames = roleResources.filter((roleResources2) => roleResources2.get("usingActionsConfig")).map((roleResources2) => roleResources2.get("name"));
      const items = collections.map((collection, i) => {
        const exists = roleResourcesNames.includes(collection.get("name"));
        const usingConfig = roleResourceActionResourceNames.includes(collection.get("name")) ? "resourceAction" : "strategy";
        const c = db.getCollection(collection.get("name"));
        return {
          type: "collection",
          name: collection.get("name"),
          collectionName: collection.get("name"),
          title: collection.get("title"),
          roleName: role,
          usingConfig,
          exists
          // children: children.length > 0 ? children : null,
        };
      });
      ctx.body = {
        count,
        rows: items,
        page: Number(page),
        pageSize: Number(pageSize),
        totalPage: totalPage(count, pageSize)
      };
      await next();
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  roleCollectionsResource
});
