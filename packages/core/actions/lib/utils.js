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
var utils_exports = {};
__export(utils_exports, {
  RelationRepositoryActionBuilder: () => RelationRepositoryActionBuilder,
  getRepositoryFromParams: () => getRepositoryFromParams,
  pageArgsToLimitArgs: () => pageArgsToLimitArgs
});
module.exports = __toCommonJS(utils_exports);
function pageArgsToLimitArgs(page, pageSize) {
  return {
    offset: (page - 1) * pageSize,
    limit: pageSize
  };
}
__name(pageArgsToLimitArgs, "pageArgsToLimitArgs");
function getRepositoryFromParams(ctx) {
  const { resourceName, sourceId, actionName } = ctx.action;
  if (sourceId === "_" && ["get", "list"].includes(actionName)) {
    const collection = ctx.db.getCollection(resourceName);
    return ctx.db.getRepository(collection.name);
  }
  if (sourceId) {
    return ctx.db.getRepository(resourceName, sourceId);
  }
  return ctx.db.getRepository(resourceName);
}
__name(getRepositoryFromParams, "getRepositoryFromParams");
function RelationRepositoryActionBuilder(method) {
  return async function(ctx, next) {
    const repository = getRepositoryFromParams(ctx);
    const filterByTk = ctx.action.params.filterByTk || ctx.action.params.filterByTks || ctx.action.params.values;
    await repository[method](filterByTk);
    ctx.status = 200;
    await next();
  };
}
__name(RelationRepositoryActionBuilder, "RelationRepositoryActionBuilder");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RelationRepositoryActionBuilder,
  getRepositoryFromParams,
  pageArgsToLimitArgs
});
