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
  MultiAppShareCollectionPlugin: () => MultiAppShareCollectionPlugin,
  default: () => plugin_default
});
module.exports = __toCommonJS(plugin_exports);
var import_plugin_multi_app_manager = __toESM(require("@nocobase/plugin-multi-app-manager"));
var import_server = require("@nocobase/server");
var import_lodash = __toESM(require("lodash"));
const subAppFilteredPlugins = ["multi-app-share-collection", "multi-app-manager"];
const unSyncPlugins = ["localization"];
class SubAppPlugin extends import_server.Plugin {
  beforeLoad() {
    const mainApp = this.options.mainApp;
    const subApp = this.app;
    const sharedCollections = [];
    for (const collection of mainApp.db.collections.values()) {
      if (collection.options.shared) {
        sharedCollections.push(collection.name);
      }
    }
    subApp.on("beforeLoadPlugin", (plugin) => {
      if (plugin.name === "data-source-main") {
        plugin.setLoadFilter({
          "name.$ne": "roles"
        });
      }
    });
    subApp.db.on("beforeDefineCollection", (options) => {
      const name = options.name;
      if (name === "roles") {
        options.loadedFromCollectionManager = true;
      }
      if (sharedCollections.includes(name)) {
        options.schema = mainApp.db.options.schema || "public";
      }
    });
    this.app.resourcer.use(async (ctx, next) => {
      const { actionName, resourceName } = ctx.action;
      if (actionName === "list" && resourceName === "applicationPlugins") {
        ctx.action.mergeParams({
          filter: {
            "name.$notIn": subAppFilteredPlugins
          }
        });
      }
      if (actionName === "list" && resourceName === "collections") {
        const appCollectionBlacklistCollection = mainApp.db.getCollection("appCollectionBlacklist");
        const blackList = await appCollectionBlacklistCollection.model.findAll({
          where: {
            applicationName: subApp.name
          }
        });
        if (blackList.length > 0) {
          ctx.action.mergeParams({
            filter: {
              "name.$notIn": blackList.map((item) => item.get("collectionName"))
            }
          });
        }
      }
      await next();
    });
    subApp.on("beforeInstall", async () => {
      await subApp.db.sync();
      const subAppPluginsCollection = subApp.db.getCollection("applicationPlugins");
      const mainAppPluginsCollection = mainApp.db.getCollection("applicationPlugins");
      await subApp.db.sequelize.query(`TRUNCATE ${subAppPluginsCollection.quotedTableName()}`);
      const columnsInfo = await subApp.db.sequelize.getQueryInterface().describeTable(subAppPluginsCollection.getTableNameWithSchema());
      const columns = Object.keys(columnsInfo).sort();
      const columnsInSql = columns.map((column) => `"${column}"`).join(", ");
      await subApp.db.sequelize.query(`
        INSERT INTO ${subAppPluginsCollection.quotedTableName()} (${columnsInSql})
        SELECT ${columnsInSql}
        FROM ${mainAppPluginsCollection.quotedTableName()}
        WHERE "name" not in ('multi-app-manager', 'multi-app-share-collection');
      `);
      const sequenceNameSql = `SELECT pg_get_serial_sequence('"${subAppPluginsCollection.collectionSchema()}"."${subAppPluginsCollection.model.tableName}"', 'id')`;
      const sequenceName = await subApp.db.sequelize.query(sequenceNameSql, { type: "SELECT" });
      await subApp.db.sequelize.query(`
        SELECT setval('${sequenceName[0]["pg_get_serial_sequence"]}', (SELECT max("id") FROM ${subAppPluginsCollection.quotedTableName()}));
      `);
      await subApp.reload();
      console.log(`sync plugins from ${mainApp.name} app to sub app ${subApp.name}`);
    });
  }
}
class MultiAppShareCollectionPlugin extends import_server.Plugin {
  afterAdd() {
  }
  async beforeEnable() {
    if (!this.db.inDialect("postgres")) {
      throw new Error("multi-app-share-collection plugin only support postgres");
    }
    const plugin = this.pm.get("multi-app-manager");
    if (!(plugin == null ? void 0 : plugin.enabled)) {
      throw new Error(`${this.name} plugin need multi-app-manager plugin enabled`);
    }
  }
  async beforeLoad() {
    if (!this.db.inDialect("postgres")) {
      throw new Error("multi-app-share-collection plugin only support postgres");
    }
    const traverseSubApps = async (callback, options) => {
      if (import_lodash.default.get(options, "loadFromDatabase")) {
        for (const application of await this.app.db.getCollection("applications").repository.find()) {
          const appName = application.get("name");
          const subApp = await import_server.AppSupervisor.getInstance().getApp(appName);
          await callback(subApp);
        }
        return;
      }
      const subApps = [...import_server.AppSupervisor.getInstance().subApps()];
      for (const subApp of subApps) {
        await callback(subApp);
      }
    };
    const mainApp = this.app;
    function addPluginToSubApp(app) {
      if (app.name !== "main") {
        app.plugin(SubAppPlugin, { name: "sub-app", mainApp });
      }
    }
    if (import_server.AppSupervisor.getInstance().listeners("afterAppAdded").filter((f) => f.name == addPluginToSubApp.name).length == 0) {
      import_server.AppSupervisor.getInstance().on("afterAppAdded", addPluginToSubApp);
    }
    this.app.db.on("users.afterCreateWithAssociations", async (model, options) => {
      await traverseSubApps(async (subApp) => {
        const { transaction } = options;
        const repository = subApp.db.getRepository("roles");
        const subAppUserModel = await subApp.db.getCollection("users").repository.findOne({
          filter: {
            id: model.get("id")
          },
          transaction
        });
        const defaultRole = await repository.findOne({
          filter: {
            default: true
          },
          transaction
        });
        if (defaultRole && await subAppUserModel.countRoles({ transaction }) == 0) {
          await subAppUserModel.addRoles(defaultRole, { transaction });
        }
      });
    });
    this.app.on("__restarted", () => {
      traverseSubApps((subApp) => {
        subApp.runCommand("restart");
      });
    });
    this.app.on("afterEnablePlugin", (pluginNames) => {
      traverseSubApps((subApp) => {
        for (const pluginName of import_lodash.default.castArray(pluginNames)) {
          if (subAppFilteredPlugins.includes(pluginName)) return;
          subApp.runAsCLI(["pm", "enable", pluginName], { from: "user" });
        }
      });
    });
    this.app.on("afterDisablePlugin", (pluginNames) => {
      traverseSubApps((subApp) => {
        for (const pluginName of import_lodash.default.castArray(pluginNames)) {
          if (subAppFilteredPlugins.includes(pluginName)) return;
          subApp.runAsCLI(["pm", "disable", pluginName], { from: "user" });
        }
      });
    });
    this.app.db.on(`afterRemoveCollection`, (collection) => {
      const subApps = [...import_server.AppSupervisor.getInstance().subApps()];
      for (const subApp of subApps) {
        if (subApp.db.hasCollection(collection.name)) {
          subApp.db.removeCollection(collection.name);
        }
      }
    });
  }
  async load() {
    const multiAppManager = this.app.getPlugin("multi-app-manager");
    if (!multiAppManager) {
      this.app.log.warn("multi-app-share-collection plugin need multi-app-manager plugin enabled");
      return;
    }
    this.app.resourcer.registerActionHandlers({
      "applications:shareCollections": async (ctx, next) => {
        const { filterByTk, values } = ctx.action.params;
        ctx.body = {
          filterByTk,
          values
        };
        await next();
      }
    });
    multiAppManager.setAppOptionsFactory((appName, mainApp) => {
      const mainAppDbConfig = import_plugin_multi_app_manager.default.getDatabaseConfig(mainApp);
      const databaseOptions = {
        ...mainAppDbConfig,
        schema: appName
      };
      const plugins = [...mainApp.pm.getPlugins().values()].filter(
        (plugin) => {
          var _a, _b;
          return ((_a = plugin == null ? void 0 : plugin.options) == null ? void 0 : _a.packageName) !== "@nocobase/plugin-multi-app-manager" && ((_b = plugin == null ? void 0 : plugin.options) == null ? void 0 : _b.packageName) !== "@nocobase/plugin-multi-app-share-collection";
        }
      ).map((plugin) => plugin.name);
      return {
        database: import_lodash.default.merge(databaseOptions, {
          dialectOptions: {
            application_name: `nocobase.${appName}`
          }
        }),
        plugins: plugins.includes("nocobase") ? ["nocobase"] : plugins,
        resourcer: {
          prefix: process.env.API_BASE_PATH
        },
        logger: {
          ...mainApp.options.logger,
          requestWhitelist: [
            "action",
            "header.x-role",
            "header.x-hostname",
            "header.x-timezone",
            "header.x-locale",
            "referer",
            "header.x-app"
          ]
        }
        // pmSock: resolve(process.cwd(), 'storage', `${appName}.sock`),
      };
    });
    multiAppManager.setAppDbCreator(async (app) => {
      const schema = app.options.database.schema;
      await this.app.db.sequelize.query(`CREATE SCHEMA IF NOT EXISTS ${schema}`);
    });
  }
}
var plugin_default = MultiAppShareCollectionPlugin;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MultiAppShareCollectionPlugin
});
