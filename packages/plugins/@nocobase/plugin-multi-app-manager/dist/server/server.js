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
var server_exports = {};
__export(server_exports, {
  PluginMultiAppManagerServer: () => PluginMultiAppManagerServer
});
module.exports = __toCommonJS(server_exports);
var import_database = require("@nocobase/database");
var import_server = require("@nocobase/server");
var import_lodash = __toESM(require("lodash"));
var import_path = __toESM(require("path"));
var import_server2 = require("../server");
const defaultSubAppUpgradeHandle = async (mainApp) => {
  const repository = mainApp.db.getRepository("applications");
  const findOptions = {};
  const appSupervisor = import_server.AppSupervisor.getInstance();
  if (appSupervisor.runningMode == "single") {
    findOptions["filter"] = {
      name: appSupervisor.singleAppName
    };
  } else {
    findOptions["filter"] = {
      "options.autoStart": true
    };
  }
  const instances = await repository.find(findOptions);
  for (const instance of instances) {
    const instanceOptions = instance.get("options");
    if ((instanceOptions == null ? void 0 : instanceOptions.standaloneDeployment) && appSupervisor.runningMode !== "single") {
      continue;
    }
    const beforeSubAppStatus = import_server.AppSupervisor.getInstance().getAppStatus(instance.name);
    const subApp = await appSupervisor.getApp(instance.name, {
      upgrading: true
    });
    try {
      mainApp.setMaintainingMessage(`upgrading sub app ${instance.name}...`);
      await subApp.runAsCLI(["upgrade"], { from: "user" });
      if (!beforeSubAppStatus && import_server.AppSupervisor.getInstance().getAppStatus(instance.name) === "initialized") {
        await import_server.AppSupervisor.getInstance().removeApp(instance.name);
      }
    } catch (error) {
      console.log(`${instance.name}: upgrade failed`);
      mainApp.logger.error(error);
      console.error(error);
    }
  }
};
const defaultDbCreator = async (app) => {
  const databaseOptions = app.options.database;
  const { host, port, username, password, dialect, database, schema } = databaseOptions;
  if (dialect === "mysql") {
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection({ host, port, user: username, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    await connection.close();
  }
  if (dialect === "mariadb") {
    const mariadb = require("mariadb");
    const connection = await mariadb.createConnection({ host, port, user: username, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    await connection.end();
  }
  if (["postgres", "kingbase"].includes(dialect)) {
    const { Client } = require("pg");
    const client = new Client({
      host,
      port,
      user: username,
      password,
      database: dialect
    });
    await client.connect();
    try {
      if (process.env.USE_DB_SCHEMA_IN_SUBAPP === "true") {
        await client.query(`CREATE SCHEMA IF NOT EXISTS ${schema}`);
      } else {
        await client.query(`CREATE DATABASE "${database}"`);
      }
    } catch (e) {
      console.log(e);
    }
    await client.end();
  }
};
const defaultAppOptionsFactory = (appName, mainApp) => {
  const rawDatabaseOptions = PluginMultiAppManagerServer.getDatabaseConfig(mainApp);
  if (rawDatabaseOptions.dialect === "sqlite") {
    const mainAppStorage = rawDatabaseOptions.storage;
    if (mainAppStorage !== ":memory:") {
      const mainStorageDir = import_path.default.dirname(mainAppStorage);
      rawDatabaseOptions.storage = import_path.default.join(mainStorageDir, `${appName}.sqlite`);
    }
  } else if (process.env.USE_DB_SCHEMA_IN_SUBAPP === "true" && ["postgres", "kingbase"].includes(rawDatabaseOptions.dialect)) {
    rawDatabaseOptions.schema = appName;
  } else {
    rawDatabaseOptions.database = appName;
  }
  return {
    database: {
      ...rawDatabaseOptions,
      tablePrefix: ""
    },
    plugins: ["nocobase"],
    resourcer: {
      prefix: process.env.API_BASE_PATH
    },
    cacheManager: {
      ...mainApp.options.cacheManager,
      prefix: appName
    }
  };
};
class PluginMultiAppManagerServer extends import_server.Plugin {
  appDbCreator = defaultDbCreator;
  appOptionsFactory = defaultAppOptionsFactory;
  subAppUpgradeHandler = defaultSubAppUpgradeHandle;
  static getDatabaseConfig(app) {
    let oldConfig = app.options.database instanceof import_database.Database ? app.options.database.options : app.options.database;
    if (!oldConfig && app.db) {
      oldConfig = app.db.options;
    }
    return import_lodash.default.cloneDeep(import_lodash.default.omit(oldConfig, ["migrator"]));
  }
  async handleSyncMessage(message) {
    const { type } = message;
    if (type === "subAppStarted") {
      const { appName } = message;
      const model = await this.app.db.getRepository("applications").findOne({
        filter: {
          name: appName
        }
      });
      if (!model) {
        return;
      }
      if (import_server.AppSupervisor.getInstance().hasApp(appName)) {
        return;
      }
      const subApp = model.registerToSupervisor(this.app, {
        appOptionsFactory: this.appOptionsFactory
      });
      subApp.runCommand("start", "--quickstart");
    }
    if (type === "removeApp") {
      const { appName } = message;
      await import_server.AppSupervisor.getInstance().removeApp(appName);
    }
  }
  setSubAppUpgradeHandler(handler) {
    this.subAppUpgradeHandler = handler;
  }
  setAppOptionsFactory(factory) {
    this.appOptionsFactory = factory;
  }
  setAppDbCreator(appDbCreator) {
    this.appDbCreator = appDbCreator;
  }
  beforeLoad() {
    this.db.registerModels({
      ApplicationModel: import_server2.ApplicationModel
    });
  }
  async beforeEnable() {
    if (this.app.name !== "main") {
      throw new Error("@nocobase/plugin-multi-app-manager can only be enabled in the main app");
    }
  }
  async load() {
    await this.importCollections(import_path.default.resolve(__dirname, "collections"));
    this.db.on(
      "applications.afterCreateWithAssociations",
      async (model, options) => {
        var _a;
        const { transaction } = options;
        const name = model.get("name");
        if (name === "main") {
          throw new Error('Application name "main" is reserved');
        }
        const subApp = model.registerToSupervisor(this.app, {
          appOptionsFactory: this.appOptionsFactory
        });
        subApp.on("afterStart", async () => {
          this.sendSyncMessage({
            type: "subAppStarted",
            appName: name
          });
        });
        const quickstart = async () => {
          await this.appDbCreator(subApp, {
            transaction,
            applicationModel: model,
            context: options.context
          });
          await subApp.runCommand("start", "--quickstart");
        };
        const startPromise = quickstart();
        if ((_a = options == null ? void 0 : options.context) == null ? void 0 : _a.waitSubAppInstall) {
          await startPromise;
        }
      }
    );
    this.db.on("applications.afterDestroy", async (model, options) => {
      await import_server.AppSupervisor.getInstance().removeApp(model.get("name"));
      this.sendSyncMessage(
        {
          type: "removeApp",
          appName: model.get("name")
        },
        {
          transaction: options.transaction
        }
      );
    });
    const self = this;
    async function LazyLoadApplication({
      appSupervisor,
      appName,
      options
    }) {
      const loadButNotStart = options == null ? void 0 : options.upgrading;
      const name = appName;
      if (appSupervisor.hasApp(name)) {
        return;
      }
      const mainApp = await appSupervisor.getApp("main");
      const applicationRecord = await mainApp.db.getRepository("applications").findOne({
        filter: {
          name
        }
      });
      if (!applicationRecord) {
        return;
      }
      const instanceOptions = applicationRecord.get("options");
      if ((instanceOptions == null ? void 0 : instanceOptions.standaloneDeployment) && appSupervisor.runningMode !== "single") {
        return;
      }
      if (!applicationRecord) {
        return;
      }
      const subApp = applicationRecord.registerToSupervisor(mainApp, {
        appOptionsFactory: self.appOptionsFactory
      });
      subApp.on("afterStart", async () => {
        this.sendSyncMessage({
          type: "subAppStarted",
          appName: name
        });
      });
      if (!loadButNotStart) {
        await subApp.runCommand("start", "--quickstart");
      }
    }
    import_server.AppSupervisor.getInstance().setAppBootstrapper(LazyLoadApplication.bind(this));
    import_server.Gateway.getInstance().addAppSelectorMiddleware(async (ctx, next) => {
      const { req } = ctx;
      if (!ctx.resolvedAppName && req.headers["x-hostname"]) {
        const repository = this.db.getRepository("applications");
        if (!repository) {
          await next();
          return;
        }
        const appInstance = await repository.findOne({
          filter: {
            cname: req.headers["x-hostname"]
          }
        });
        if (appInstance) {
          ctx.resolvedAppName = appInstance.name;
        }
      }
      await next();
    });
    this.app.on("afterStart", async (app) => {
      const repository = this.db.getRepository("applications");
      const appSupervisor = import_server.AppSupervisor.getInstance();
      this.app.setMaintainingMessage("starting sub applications...");
      if (appSupervisor.runningMode == "single") {
        import_server.Gateway.getInstance().addAppSelectorMiddleware((ctx) => ctx.resolvedAppName = appSupervisor.singleAppName);
        try {
          await import_server.AppSupervisor.getInstance().getApp(appSupervisor.singleAppName);
        } catch (err) {
          console.error("Auto register sub application in single mode failed: ", appSupervisor.singleAppName, err);
        }
        return;
      }
      try {
        const subApps = await repository.find({
          filter: {
            "options.autoStart": true
          }
        });
        const promises = [];
        for (const subAppInstance of subApps) {
          promises.push(
            (async () => {
              if (!appSupervisor.hasApp(subAppInstance.name)) {
                await import_server.AppSupervisor.getInstance().getApp(subAppInstance.name);
              } else if (appSupervisor.getAppStatus(subAppInstance.name) === "initialized") {
                (await import_server.AppSupervisor.getInstance().getApp(subAppInstance.name)).runCommand("start", "--quickstart");
              }
            })()
          );
        }
        await Promise.all(promises);
      } catch (err) {
        console.error("Auto register sub applications failed: ", err);
      }
    });
    this.app.on("afterUpgrade", async (app, options) => {
      await this.subAppUpgradeHandler(app);
    });
    this.app.resourcer.registerActionHandlers({
      "applications:listPinned": async (ctx, next) => {
        const items = await this.db.getRepository("applications").find({
          filter: {
            pinned: true
          }
        });
        ctx.body = items;
      }
    });
    this.app.acl.allow("applications", "listPinned", "loggedIn");
    this.app.acl.registerSnippet({
      name: `pm.${this.name}.applications`,
      actions: ["applications:*"]
    });
    this.app.resourcer.use(async (ctx, next) => {
      await next();
      const { actionName, resourceName, params } = ctx.action;
      if (actionName === "list" && resourceName === "applications") {
        const applications = ctx.body.rows;
        for (const application of applications) {
          const appStatus = import_server.AppSupervisor.getInstance().getAppStatus(application.name, "stopped");
          application.status = appStatus;
        }
      }
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginMultiAppManagerServer
});
