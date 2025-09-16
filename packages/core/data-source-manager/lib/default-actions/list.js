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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var list_exports = {};
__export(list_exports, {
  list: () => list
});
module.exports = __toCommonJS(list_exports);
var import_actions = require("@nocobase/actions");
var import_utils = require("@nocobase/utils");
var import_utils2 = require("./utils");
var import_lodash = __toESM(require("lodash"));
function totalPage(total, pageSize) {
  return Math.ceil(total / pageSize);
}
__name(totalPage, "totalPage");
function findArgs(ctx) {
  var _a;
  const resourceName = ctx.action.resourceName;
  const params = ctx.action.params;
  if (params.tree) {
    if ((0, import_utils.isValidFilter)(params.filter)) {
      params.tree = false;
    } else {
      const [collectionName, associationName] = resourceName.split(".");
      const collection = ctx.dataSource.collectionManager.getCollection(resourceName);
      if (collection.options.tree && !(associationName && collectionName === collection.name)) {
        const foreignKey = ((_a = collection.treeParentField) == null ? void 0 : _a.foreignKey) || "parentId";
        (0, import_utils.assign)(params, { filter: { [foreignKey]: null } }, { filter: "andMerge" });
      }
    }
  }
  const { tree, fields, filter, appends, except, sort } = params;
  return { tree, filter, fields, appends, except, sort };
}
__name(findArgs, "findArgs");
async function listWithPagination(ctx) {
  var _a, _b;
  const { page = 1, pageSize = 50 } = ctx.action.params;
  const repository = ctx.getCurrentRepository();
  let { simplePaginate } = ((_a = repository.collection) == null ? void 0 : _a.options) || {};
  const options = {
    context: ctx,
    ...findArgs(ctx),
    ...(0, import_utils2.pageArgsToLimitArgs)(parseInt(String(page)), parseInt(String(pageSize)))
  };
  Object.keys(options).forEach((key) => {
    if (options[key] === void 0) {
      delete options[key];
    }
  });
  if (import_lodash.default.isUndefined(simplePaginate) && import_lodash.default.isFunction(repository["getEstimatedRowCount"])) {
    const count = await repository.getEstimatedRowCount();
    if (count > import_actions.SIMPLE_PAGINATION_LIMIT) {
      const resourceName = ctx.action.resourceName;
      const collection = ctx.dataSource.collectionManager.getCollection(resourceName);
      await ctx.app.db.getRepository("dataSourcesCollections").updateOrCreate({
        filterKeys: ["name", "dataSourceKey"],
        values: {
          name: collection.name,
          dataSourceKey: ctx.dataSource.options.name,
          options: {
            ...(_b = repository.collection) == null ? void 0 : _b.options,
            simplePaginate: true
          }
        }
      });
      simplePaginate = true;
    }
  }
  if (simplePaginate) {
    options.limit = options.limit + 1;
    const rows = await repository.find(options);
    ctx.body = {
      rows: rows.slice(0, pageSize),
      hasNext: rows.length > pageSize,
      page: Number(page),
      pageSize: Number(pageSize)
    };
  } else {
    const [rows, count] = await repository.findAndCount(options);
    ctx.body = {
      count,
      rows,
      page: Number(page),
      pageSize: Number(pageSize),
      totalPage: totalPage(count, pageSize)
    };
  }
}
__name(listWithPagination, "listWithPagination");
async function listWithNonPaged(ctx) {
  const repository = ctx.getCurrentRepository();
  const rows = await repository.find({ context: ctx, ...findArgs(ctx) });
  ctx.body = rows;
}
__name(listWithNonPaged, "listWithNonPaged");
async function list(ctx, next) {
  const { paginate } = ctx.action.params;
  if (paginate === false || paginate === "false") {
    await listWithNonPaged(ctx);
    ctx.paginate = false;
  } else {
    await listWithPagination(ctx);
    ctx.paginate = true;
  }
  await next();
}
__name(list, "list");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  list
});
