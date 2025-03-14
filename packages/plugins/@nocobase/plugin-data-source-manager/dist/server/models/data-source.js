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
var data_source_exports = {};
__export(data_source_exports, {
  DataSourceModel: () => DataSourceModel
});
module.exports = __toCommonJS(data_source_exports);
var import_database = require("@nocobase/database");
var import_plugin_acl = require("@nocobase/plugin-acl");
var import_path = __toESM(require("path"));
const availableActions = {
  create: {
    displayName: '{{t("Add new")}}',
    type: "new-data",
    onNewRecord: true,
    allowConfigureFields: true
  },
  // import: {
  //   displayName: '{{t("Import")}}',
  //   type: 'new-data',
  //   scope: false,
  // },
  // export: {
  //   displayName: '{{t("Export")}}',
  //   type: 'old-data',
  //   allowConfigureFields: true,
  // },
  view: {
    displayName: '{{t("View")}}',
    type: "old-data",
    aliases: ["get", "list"],
    allowConfigureFields: true
  },
  update: {
    displayName: '{{t("Edit")}}',
    type: "old-data",
    aliases: ["update", "move"],
    allowConfigureFields: true
  },
  destroy: {
    displayName: '{{t("Delete")}}',
    type: "old-data"
  }
};
class DataSourceModel extends import_database.Model {
  isMainRecord() {
    return this.get("type") === "main";
  }
  async loadIntoACL(options) {
    const { app, acl } = options;
    const loadRoleIntoACL = async (model) => {
      await model.writeToAcl({
        acl
      });
    };
    const rolesModel = await app.db.getRepository("dataSourcesRoles").find({
      transaction: options.transaction,
      filter: {
        dataSourceKey: this.get("key")
      }
    });
    for (const roleModel of rolesModel) {
      await loadRoleIntoACL(roleModel);
    }
  }
  async loadIntoApplication(options) {
    const { app, loadAtAfterStart, refresh } = options;
    const dataSourceKey = this.get("key");
    const pluginDataSourceManagerServer = app.pm.get("data-source-manager");
    if (pluginDataSourceManagerServer.dataSourceStatus[dataSourceKey] === "loaded") {
      pluginDataSourceManagerServer.dataSourceStatus[dataSourceKey] = "reloading";
    } else {
      pluginDataSourceManagerServer.dataSourceStatus[dataSourceKey] = "loading";
    }
    const type = this.get("type");
    const createOptions = this.get("options");
    try {
      const dataSource = app.dataSourceManager.factory.create(type, {
        ...createOptions,
        name: dataSourceKey,
        logger: app.logger.child({ dataSourceKey }),
        sqlLogger: app.sqlLogger.child({ dataSourceKey }),
        cache: app.cache,
        storagePath: import_path.default.join(process.cwd(), "storage", "cache", "apps", app.name)
      });
      dataSource.on("loadingProgress", (progress) => {
        pluginDataSourceManagerServer.dataSourceLoadingProgress[dataSourceKey] = progress;
      });
      if (loadAtAfterStart) {
        dataSource.on("loadMessage", ({ message }) => {
          app.setMaintainingMessage(`${message} in data source ${this.get("displayName")}`);
        });
      }
      const acl = dataSource.acl;
      for (const [actionName, actionParams] of Object.entries(availableActions)) {
        acl.setAvailableAction(actionName, actionParams);
      }
      acl.allow("*", "*", (ctx) => {
        return ctx.state.currentRole === "root";
      });
      dataSource.resourceManager.use(import_plugin_acl.setCurrentRole, { tag: "setCurrentRole", before: "acl", after: "auth" });
      await this.loadIntoACL({ app, acl, transaction: options.transaction });
      await app.dataSourceManager.add(dataSource, {
        localData: await this.loadLocalData(),
        refresh
      });
    } catch (e) {
      app.logger.error(`load data source failed`, { cause: e });
      if (pluginDataSourceManagerServer.dataSourceStatus[dataSourceKey] === "loading") {
        pluginDataSourceManagerServer.dataSourceStatus[dataSourceKey] = "loading-failed";
      }
      if (pluginDataSourceManagerServer.dataSourceStatus[dataSourceKey] === "reloading") {
        pluginDataSourceManagerServer.dataSourceStatus[dataSourceKey] = "reloading-failed";
      }
      pluginDataSourceManagerServer.dataSourceErrors[dataSourceKey] = e;
      return;
    }
    pluginDataSourceManagerServer.dataSourceStatus[dataSourceKey] = "loaded";
  }
  async loadLocalData() {
    const dataSourceKey = this.get("key");
    const remoteCollections = await this.db.getRepository("dataSourcesCollections").find({
      filter: {
        dataSourceKey
      }
    });
    const remoteFields = await this.db.getRepository("dataSourcesFields").find({
      filter: {
        dataSourceKey
      }
    });
    const localData = {};
    for (const remoteCollection of remoteCollections) {
      const remoteCollectionOptions = remoteCollection.toJSON();
      localData[remoteCollectionOptions.name] = remoteCollectionOptions;
    }
    for (const remoteField of remoteFields) {
      const remoteFieldOptions = remoteField.toJSON();
      const collectionName = remoteFieldOptions.collectionName;
      if (!localData[collectionName]) {
        localData[collectionName] = {
          name: collectionName,
          fields: []
        };
      }
      if (!localData[collectionName].fields) {
        localData[collectionName].fields = [];
      }
      localData[collectionName].fields.push(remoteFieldOptions);
    }
    return localData;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DataSourceModel
});
