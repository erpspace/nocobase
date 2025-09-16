/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var plugin_exports = {};
__export(plugin_exports, {
  PluginActionCustomRequestServer: () => PluginActionCustomRequestServer,
  default: () => plugin_default
});
module.exports = __toCommonJS(plugin_exports);
var import_server = require("@nocobase/server");
var import_listByCurrentRole = require("./actions/listByCurrentRole");
var import_send = require("./actions/send");
class PluginActionCustomRequestServer extends import_server.Plugin {
  logger;
  afterAdd() {
  }
  beforeLoad() {
    this.logger = this.getLogger();
  }
  getLogger() {
    const logger = this.createLogger({
      dirname: "custom-request",
      filename: "%DATE%.log"
    });
    return logger;
  }
  async load() {
    this.app.resourceManager.define({
      name: "customRequests",
      actions: {
        send: import_send.send.bind(this),
        listByCurrentRole: import_listByCurrentRole.listByCurrentRole
      }
    });
    this.app.acl.registerSnippet({
      name: `ui.${this.name}`,
      actions: ["customRequests:*", "roles:list"]
    });
    this.app.acl.allow("customRequests", ["send", "listByCurrentRole"], "loggedIn");
  }
  async install(options) {
  }
  async afterEnable() {
  }
  async afterDisable() {
  }
  async remove() {
  }
}
var plugin_default = PluginActionCustomRequestServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginActionCustomRequestServer
});
