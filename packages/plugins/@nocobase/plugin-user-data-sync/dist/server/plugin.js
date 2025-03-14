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
  PluginUserDataSyncServer: () => PluginUserDataSyncServer,
  default: () => plugin_default
});
module.exports = __toCommonJS(plugin_exports);
var import_server = require("@nocobase/server");
var import_user_data_resource_manager = require("./user-data-resource-manager");
var import_user_data_sync_service = require("./user-data-sync-service");
var import_user_data = __toESM(require("./actions/user-data"));
var import_sync_source_manager = require("./sync-source-manager");
var import_sync_source = require("./models/sync-source");
class PluginUserDataSyncServer extends import_server.Plugin {
  sourceManager;
  resourceManager;
  syncService;
  async afterAdd() {
  }
  async beforeLoad() {
    this.app.db.registerModels({ SyncSourceModel: import_sync_source.SyncSourceModel });
    this.sourceManager = new import_sync_source_manager.SyncSourceManager();
    this.resourceManager = new import_user_data_resource_manager.UserDataResourceManager();
  }
  getLogger() {
    const logger = this.createLogger({
      dirname: "user-data-sync",
      filename: "%DATE%.log",
      format: "json"
    });
    return logger;
  }
  async load() {
    const logger = this.getLogger();
    this.resourceManager.db = this.app.db;
    this.resourceManager.logger = this.app.logger;
    this.syncService = new import_user_data_sync_service.UserDataSyncService(this.resourceManager, this.sourceManager, logger);
    this.app.resourceManager.define({
      name: "userData",
      actions: {
        listSyncTypes: import_user_data.default.listSyncTypes,
        pull: import_user_data.default.pull,
        push: import_user_data.default.push,
        retry: import_user_data.default.retry
      }
    });
    this.app.acl.registerSnippet({
      name: `pm.${this.name}`,
      actions: ["userData:*", "userDataSyncSources:*", "userDataSyncTasks:*"]
    });
  }
  async install() {
  }
  async afterEnable() {
  }
  async afterDisable() {
  }
  async remove() {
  }
}
var plugin_default = PluginUserDataSyncServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginUserDataSyncServer
});
