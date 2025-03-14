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
var with_acl_meta_exports = {};
__export(with_acl_meta_exports, {
  createWithACLMetaMiddleware: () => createWithACLMetaMiddleware
});
module.exports = __toCommonJS(with_acl_meta_exports);
var import_lodash = __toESM(require("lodash"));
var import_database = require("@nocobase/database");
var import_acl = require("@nocobase/acl");
function createWithACLMetaMiddleware() {
  return async (ctx, next) => {
    var _a, _b, _c, _d;
    await next();
    const dataSourceKey = ctx.get("x-data-source");
    const dataSource = ctx.app.dataSourceManager.dataSources.get(dataSourceKey);
    const db = dataSource ? dataSource.collectionManager.db : ctx.db;
    if (!db) {
      return;
    }
    const acl = dataSource ? dataSource.acl : ctx.app.acl;
    if (!ctx.action || !ctx.get("X-With-ACL-Meta") || ctx.status !== 200) {
      return;
    }
    const { resourceName, actionName } = ctx.permission;
    if (!["list", "get"].includes(actionName)) {
      return;
    }
    const collection = db.getCollection(resourceName);
    if (!collection) {
      return;
    }
    const Model = collection.model;
    if (collection.isMultiFilterTargetKey()) {
      return;
    }
    const primaryKeyField = Model.primaryKeyField || Model.primaryKeyAttribute;
    let listData;
    if ((_a = ctx.body) == null ? void 0 : _a.data) {
      listData = ctx.data;
    } else if ((_b = ctx.body) == null ? void 0 : _b.rows) {
      listData = ctx.body.rows;
    } else if (ctx.body) {
      listData = ctx.body;
    }
    if (!listData) {
      return;
    }
    if (actionName == "get") {
      listData = import_lodash.default.castArray(listData);
    }
    const inspectActions = ["view", "update", "destroy"];
    const actionsParams = [];
    for (const action of inspectActions) {
      const actionCtx = {
        db,
        get: () => {
          return void 0;
        },
        app: {
          getDb() {
            return db;
          }
        },
        getCurrentRepository: ctx.getCurrentRepository,
        action: {
          actionName: action,
          name: action,
          params: {},
          resourceName: ctx.action.resourceName,
          resourceOf: ctx.action.resourceOf,
          mergeParams() {
          }
        },
        state: {
          currentRole: ctx.state.currentRole,
          currentUser: (() => {
            var _a2;
            if (!ctx.state.currentUser) {
              return null;
            }
            if (ctx.state.currentUser.toJSON) {
              return (_a2 = ctx.state.currentUser) == null ? void 0 : _a2.toJSON();
            }
            return ctx.state.currentUser;
          })()
        },
        permission: {},
        throw(...args) {
          throw new import_acl.NoPermissionError(...args);
        }
      };
      try {
        await acl.getActionParams(actionCtx);
      } catch (e) {
        if (e instanceof import_acl.NoPermissionError) {
          continue;
        }
        throw e;
      }
      actionsParams.push([
        action,
        ((_c = actionCtx.permission) == null ? void 0 : _c.can) === null && !actionCtx.permission.skip ? null : ((_d = actionCtx.permission) == null ? void 0 : _d.parsedParams) || {},
        actionCtx
      ]);
    }
    const ids = (() => {
      if (collection.options.tree) {
        if (listData.length == 0) return [];
        const getAllNodeIds = (data) => [data[primaryKeyField], ...(data.children || []).flatMap(getAllNodeIds)];
        return listData.map((tree) => getAllNodeIds(tree.toJSON())).flat();
      }
      return listData.map((item) => item[primaryKeyField]);
    })();
    if (ids.filter(Boolean).length == 0) {
      return;
    }
    const conditions = [];
    const allAllowed = [];
    for (const [action, params, actionCtx] of actionsParams) {
      if (!params) {
        continue;
      }
      if (import_lodash.default.isEmpty(params) || import_lodash.default.isEmpty(params.filter)) {
        allAllowed.push(action);
        continue;
      }
      const queryParams = collection.repository.buildQueryOptions({
        ...params,
        context: actionCtx
      });
      const actionSql = ctx.db.sequelize.queryInterface.queryGenerator.selectQuery(
        Model.getTableName(),
        {
          where: (() => {
            const filterObj = queryParams.where;
            if (!db.options.underscored) {
              return filterObj;
            }
            const isAssociationKey = (key) => {
              return key.startsWith("$") && key.endsWith("$");
            };
            const iterate = (rootObj, path = []) => {
              const obj = path.length == 0 ? rootObj : import_lodash.default.get(rootObj, path);
              if (Array.isArray(obj)) {
                for (let i = 0; i < obj.length; i++) {
                  if (obj[i] === null) {
                    continue;
                  }
                  if (typeof obj[i] === "object") {
                    iterate(rootObj, [...path, i]);
                  }
                }
                return;
              }
              Reflect.ownKeys(obj).forEach((key) => {
                if (Array.isArray(obj) && key == "length") {
                  return;
                }
                if (typeof obj[key] === "object" && obj[key] !== null || typeof obj[key] === "symbol") {
                  iterate(rootObj, [...path, key]);
                }
                if (typeof key === "string" && key !== (0, import_database.snakeCase)(key)) {
                  const setKey = isAssociationKey(key) ? (() => {
                    const parts = key.split(".");
                    parts[parts.length - 1] = import_lodash.default.snakeCase(parts[parts.length - 1]);
                    const result = parts.join(".");
                    return result.endsWith("$") ? result : `${result}$`;
                  })() : (0, import_database.snakeCase)(key);
                  const setValue = import_lodash.default.cloneDeep(obj[key]);
                  import_lodash.default.unset(rootObj, [...path, key]);
                  import_lodash.default.set(rootObj, [...path, setKey], setValue);
                }
              });
            };
            iterate(filterObj);
            return filterObj;
          })(),
          attributes: [primaryKeyField],
          includeIgnoreAttributes: false
        },
        Model
      );
      const whereCaseMatch = actionSql.match(/WHERE (.*?);/);
      if (!whereCaseMatch) {
        conditions.push({
          whereCase: "1=1",
          action,
          include: queryParams.include
        });
      } else {
        const whereCase = actionSql.match(/WHERE (.*?);/)[1];
        conditions.push({
          whereCase,
          action,
          include: queryParams.include
        });
      }
    }
    const results = await collection.model.findAll({
      where: {
        [primaryKeyField]: ids
      },
      attributes: [
        primaryKeyField,
        ...conditions.map((condition) => {
          return [ctx.db.sequelize.literal(`CASE WHEN ${condition.whereCase} THEN 1 ELSE 0 END`), condition.action];
        })
      ],
      include: conditions.map((condition) => condition.include).flat(),
      raw: true
    });
    const allowedActions = inspectActions.map((action) => {
      if (allAllowed.includes(action)) {
        return [action, ids];
      }
      let actionIds = results.filter((item) => Boolean(item[action])).map((item) => item[primaryKeyField]);
      actionIds = Array.from(new Set(actionIds));
      return [action, actionIds];
    }).reduce((acc, [action, ids2]) => {
      acc[action] = ids2;
      return acc;
    }, {});
    if (actionName == "get") {
      ctx.bodyMeta = {
        ...ctx.bodyMeta || {},
        allowedActions
      };
    }
    if (actionName == "list") {
      ctx.body.allowedActions = allowedActions;
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createWithACLMetaMiddleware
});
