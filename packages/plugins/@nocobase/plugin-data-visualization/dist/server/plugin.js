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
  PluginDataVisualizationServer: () => PluginDataVisualizationServer,
  default: () => plugin_default
});
module.exports = __toCommonJS(plugin_exports);
var import_server = require("@nocobase/server");
var import_query = require("./actions/query");
class PluginDataVisualizationServer extends import_server.Plugin {
  cache;
  afterAdd() {
  }
  beforeLoad() {
    this.app.resourceManager.define({
      name: "charts",
      actions: {
        query: import_query.query
      }
    });
    this.app.acl.allow("charts", "query", "loggedIn");
  }
  async load() {
    this.cache = await this.app.cacheManager.createCache({
      name: "data-visualization",
      store: "memory",
      ttl: 30 * 1e3,
      // millseconds
      max: 1e3
    });
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
var plugin_default = PluginDataVisualizationServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginDataVisualizationServer
});
