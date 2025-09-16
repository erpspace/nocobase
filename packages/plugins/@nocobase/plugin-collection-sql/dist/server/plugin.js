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
var plugin_exports = {};
__export(plugin_exports, {
  PluginCollectionSQLServer: () => PluginCollectionSQLServer,
  default: () => plugin_default
});
module.exports = __toCommonJS(plugin_exports);
var import_server = require("@nocobase/server");
var import_sql_collection = require("./sql-collection");
var import_sql = __toESM(require("./resources/sql"));
var import_utils = require("./utils");
class PluginCollectionSQLServer extends import_server.Plugin {
  async beforeLoad() {
    this.app.db.collectionFactory.registerCollectionType(import_sql_collection.SQLCollection, {
      condition: (options) => {
        return options.sql;
      },
      async onSync() {
        return;
      },
      async onDump(dumper, collection) {
        return;
      }
    });
    this.app.resourceManager.define(import_sql.default);
    this.app.acl.registerSnippet({
      name: `pm.data-source-manager.collection-sql `,
      actions: ["sqlCollection:*"]
    });
    this.app.resourceManager.use(async (ctx, next) => {
      const { resourceName, actionName } = ctx.action;
      if (resourceName === "collections" && actionName === "create") {
        const { sql } = ctx.action.params.values || {};
        if (sql) {
          try {
            (0, import_utils.checkSQL)(sql);
          } catch (e) {
            ctx.throw(400, ctx.t(e.message));
          }
        }
      }
      return next();
    });
  }
}
var plugin_default = PluginCollectionSQLServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginCollectionSQLServer
});
