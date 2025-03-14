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
var ui_schema_action_exports = {};
__export(ui_schema_action_exports, {
  uiSchemaActions: () => uiSchemaActions
});
module.exports = __toCommonJS(ui_schema_action_exports);
var import_lodash = __toESM(require("lodash"));
const getRepositoryFromCtx = (ctx) => {
  const repo = ctx.db.getCollection("uiSchemas").repository;
  repo.setCache(ctx.cache);
  return repo;
};
const callRepositoryMethod = (method, paramsKey, optionsBuilder) => {
  return async (ctx, next) => {
    const params = import_lodash.default.get(ctx.action.params, paramsKey);
    const options = optionsBuilder ? optionsBuilder(ctx.action.params) : {};
    const repository = getRepositoryFromCtx(ctx);
    const returnValue = await repository[method](params, options);
    ctx.body = returnValue || {
      result: "ok"
    };
    await next();
  };
};
function parseInsertAdjacentValues(values) {
  if (import_lodash.default.has(values, "schema")) {
    return values;
  }
  return { schema: values, wrap: null };
}
const uiSchemaActions = {
  getJsonSchema: callRepositoryMethod("getJsonSchema", "resourceIndex", (params) => {
    const includeAsyncNode = params == null ? void 0 : params.includeAsyncNode;
    return {
      readFromCache: !includeAsyncNode,
      includeAsyncNode
    };
  }),
  getProperties: callRepositoryMethod(
    "getProperties",
    "resourceIndex",
    () => ({
      readFromCache: true
    })
  ),
  getParentJsonSchema: callRepositoryMethod("getParentJsonSchema", "resourceIndex"),
  getParentProperty: callRepositoryMethod("getParentProperty", "resourceIndex"),
  insert: callRepositoryMethod("insert", "values"),
  insertNewSchema: callRepositoryMethod("insertNewSchema", "values"),
  remove: callRepositoryMethod("remove", "resourceIndex"),
  patch: callRepositoryMethod("patch", "values"),
  initializeActionContext: callRepositoryMethod("initializeActionContext", "values"),
  batchPatch: callRepositoryMethod("batchPatch", "values"),
  clearAncestor: callRepositoryMethod("clearAncestor", "resourceIndex"),
  insertAdjacent: insertPositionActionBuilder(),
  insertBeforeBegin: insertPositionActionBuilder("beforeBegin"),
  insertAfterBegin: insertPositionActionBuilder("afterBegin"),
  insertBeforeEnd: insertPositionActionBuilder("beforeEnd"),
  insertAfterEnd: insertPositionActionBuilder("afterEnd"),
  async saveAsTemplate(ctx, next) {
    const { filterByTk, values } = ctx.action.params;
    const db = ctx.db;
    const transaction = await db.sequelize.transaction();
    try {
      await db.getRepository("uiSchemaTemplates").create({
        values: {
          ...values,
          uid: filterByTk
        },
        transaction
      });
      await getRepositoryFromCtx(ctx).clearAncestor(filterByTk, { transaction });
      ctx.body = {
        result: "ok"
      };
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
    await next();
  }
};
function insertPositionActionBuilder(position = void 0) {
  return async function(ctx, next) {
    const {
      resourceIndex,
      values,
      removeParentsIfNoChildren,
      breakRemoveOn,
      position: positionFromUser
    } = ctx.action.params;
    const repository = getRepositoryFromCtx(ctx);
    const { schema, wrap } = parseInsertAdjacentValues(values);
    ctx.body = await repository.insertAdjacent(position || positionFromUser, resourceIndex, schema, {
      removeParentsIfNoChildren,
      breakRemoveOn,
      wrap
    });
    await next();
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  uiSchemaActions
});
