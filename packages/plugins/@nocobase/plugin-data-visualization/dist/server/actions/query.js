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
var query_exports = {};
__export(query_exports, {
  cacheMiddleware: () => cacheMiddleware,
  checkPermission: () => checkPermission,
  parseFieldAndAssociations: () => parseFieldAndAssociations,
  parseVariables: () => parseVariables,
  postProcess: () => postProcess,
  query: () => query,
  queryData: () => queryData
});
module.exports = __toCommonJS(query_exports);
var import_database = require("@nocobase/database");
var import_koa_compose = __toESM(require("koa-compose"));
var import_server = require("@nocobase/server");
var import_query_parser = require("../query-parser");
const getDB = (ctx, dataSource) => {
  const ds = ctx.app.dataSourceManager.dataSources.get(dataSource);
  return ds == null ? void 0 : ds.collectionManager.db;
};
const postProcess = async (ctx, next) => {
  const { data, fieldMap } = ctx.action.params.values;
  ctx.body = data.map((record) => {
    Object.entries(record).forEach(([key, value]) => {
      if (!value) {
        return;
      }
      const { type } = fieldMap[key] || {};
      switch (type) {
        case "bigInt":
        case "integer":
        case "float":
        case "double":
        case "decimal":
          record[key] = Number(value);
          break;
      }
    });
    return record;
  });
  await next();
};
const queryData = async (ctx, next) => {
  const { dataSource, collection, queryParams, fieldMap } = ctx.action.params.values;
  const db = getDB(ctx, dataSource) || ctx.db;
  const model = db.getModel(collection);
  const data = await model.findAll(queryParams);
  ctx.action.params.values = {
    data,
    fieldMap
  };
  await next();
};
const parseFieldAndAssociations = async (ctx, next) => {
  var _a;
  const {
    dataSource,
    collection: collectionName,
    measures,
    dimensions,
    orders,
    filter
  } = ctx.action.params.values;
  const db = getDB(ctx, dataSource) || ctx.db;
  const collection = db.getCollection(collectionName);
  const fields = collection.fields;
  const associations = collection.model.associations;
  const models = {};
  const parseField = (selected) => {
    var _a2, _b, _c, _d, _e, _f;
    let target;
    let name;
    if (!Array.isArray(selected.field)) {
      name = selected.field;
    } else if (selected.field.length === 1) {
      name = selected.field[0];
    } else if (selected.field.length > 1) {
      [target, name] = selected.field;
    }
    const rawAttributes = collection.model.getAttributes();
    let field = ((_a2 = rawAttributes[name]) == null ? void 0 : _a2.field) || name;
    let fieldType = (_b = fields.get(name)) == null ? void 0 : _b.type;
    let fieldOptions = (_c = fields.get(name)) == null ? void 0 : _c.options;
    if (target) {
      const targetField = fields.get(target);
      const targetCollection = db.getCollection(targetField.target);
      const targetFields = targetCollection.fields;
      fieldType = (_d = targetFields.get(name)) == null ? void 0 : _d.type;
      fieldOptions = (_e = targetFields.get(name)) == null ? void 0 : _e.options;
      field = `${target}.${field}`;
      name = `${target}.${name}`;
      const targetType = (_f = fields.get(target)) == null ? void 0 : _f.type;
      if (!models[target]) {
        models[target] = { type: targetType };
      }
    } else {
      field = `${collectionName}.${field}`;
    }
    return {
      ...selected,
      field,
      name,
      type: fieldType,
      options: fieldOptions,
      alias: selected.alias || name
    };
  };
  const parsedMeasures = (measures == null ? void 0 : measures.map(parseField)) || [];
  const parsedDimensions = (dimensions == null ? void 0 : dimensions.map(parseField)) || [];
  const parsedOrders = (orders == null ? void 0 : orders.map(parseField)) || [];
  const include = Object.entries(models).map(([target, { type }]) => {
    let options = {
      association: target,
      attributes: []
    };
    if (type === "belongsToMany") {
      options["through"] = { attributes: [] };
    }
    if (type === "belongsToArray") {
      const association = associations[target];
      if (association) {
        options = {
          ...options,
          ...association.generateInclude()
        };
      }
    }
    return options;
  });
  const filterParser = new import_database.FilterParser(filter, {
    collection
  });
  const { where, include: filterInclude } = filterParser.toSequelizeParams();
  if (filterInclude) {
    const stack = [...filterInclude];
    while (stack.length) {
      const item = stack.pop();
      if (((_a = fields.get(item.association)) == null ? void 0 : _a.type) === "belongsToMany") {
        item.through = { attributes: [] };
      }
      if (item.include) {
        stack.push(...item.include);
      }
    }
  }
  ctx.action.params.values = {
    ...ctx.action.params.values,
    where,
    measures: parsedMeasures,
    dimensions: parsedDimensions,
    orders: parsedOrders,
    include: [...include, ...filterInclude || []]
  };
  await next();
};
const parseVariables = async (ctx, next) => {
  const { filter } = ctx.action.params.values;
  ctx.action.params.filter = filter;
  await import_server.middlewares.parseVariables(ctx, async () => {
    ctx.action.params.values.filter = ctx.action.params.filter;
    await next();
  });
};
const cacheMiddleware = async (ctx, next) => {
  const { uid, cache: cacheConfig, refresh } = ctx.action.params.values;
  const cache = ctx.app.cacheManager.getCache("data-visualization");
  const useCache = (cacheConfig == null ? void 0 : cacheConfig.enabled) && uid;
  if (useCache && !refresh) {
    const data = await cache.get(uid);
    if (data) {
      ctx.body = data;
      return;
    }
  }
  await next();
  if (useCache) {
    await cache.set(uid, ctx.body, (cacheConfig == null ? void 0 : cacheConfig.ttl) * 1e3);
  }
};
const checkPermission = (ctx, next) => {
  var _a;
  const { collection, dataSource } = ctx.action.params.values;
  const roleName = ctx.state.currentRole || "anonymous";
  const acl = ((_a = ctx.app.dataSourceManager.get(dataSource)) == null ? void 0 : _a.acl) || ctx.app.acl;
  const can = acl.can({ role: roleName, resource: collection, action: "list" });
  if (!can && roleName !== "root") {
    ctx.throw(403, "No permissions");
  }
  return next();
};
const query = async (ctx, next) => {
  const { dataSource } = ctx.action.params.values;
  const db = getDB(ctx, dataSource) || ctx.db;
  const queryParser = (0, import_query_parser.createQueryParser)(db);
  try {
    await (0, import_koa_compose.default)([
      checkPermission,
      cacheMiddleware,
      parseVariables,
      parseFieldAndAssociations,
      queryParser.parse(),
      queryData,
      postProcess
    ])(ctx, next);
  } catch (err) {
    ctx.throw(500, err);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cacheMiddleware,
  checkPermission,
  parseFieldAndAssociations,
  parseVariables,
  postProcess,
  query,
  queryData
});
