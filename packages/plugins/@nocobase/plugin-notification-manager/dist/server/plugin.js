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
  PluginNotificationManagerServer: () => PluginNotificationManagerServer,
  default: () => plugin_default
});
module.exports = __toCommonJS(plugin_exports);
var import_server = require("@nocobase/server");
var import_manager = __toESM(require("./manager"));
class PluginNotificationManagerServer extends import_server.Plugin {
  manager;
  logger;
  get channelTypes() {
    return this.manager.channelTypes;
  }
  registerChannelType(params) {
    this.manager.registerType(params);
  }
  async send(options) {
    return await this.manager.send(options);
  }
  async sendToUsers(options) {
    return await this.manager.sendToUsers(options);
  }
  async afterAdd() {
    this.logger = this.createLogger({
      dirname: "notification-manager",
      filename: "%DATE%.log",
      transports: ["dailyRotateFile"]
    });
    this.manager = new import_manager.default({ plugin: this });
  }
  async beforeLoad() {
    this.app.resourceManager.registerActionHandler("messages:send", async (ctx, next) => {
      var _a, _b;
      const sendOptions = (_b = (_a = ctx.action) == null ? void 0 : _a.params) == null ? void 0 : _b.values;
      this.manager.send(sendOptions);
      next();
    });
    this.app.acl.registerSnippet({
      name: "pm.notification.channels",
      actions: ["notificationChannels:*"]
    });
    this.app.acl.registerSnippet({
      name: "pm.notification.logs",
      actions: ["notificationSendLogs:*"]
    });
  }
  async load() {
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
var plugin_default = PluginNotificationManagerServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginNotificationManagerServer
});
