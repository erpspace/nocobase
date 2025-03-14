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
var user_data_exports = {};
__export(user_data_exports, {
  default: () => user_data_default
});
module.exports = __toCommonJS(user_data_exports);
var import_plugin = require("../plugin");
var user_data_default = {
  listSyncTypes: async (ctx, next) => {
    const plugin = ctx.app.pm.get(import_plugin.PluginUserDataSyncServer);
    ctx.body = plugin.sourceManager.listTypes();
    await next();
  },
  pull: async (ctx, next) => {
    const { name } = ctx.action.params;
    const plugin = ctx.app.pm.get(import_plugin.PluginUserDataSyncServer);
    await plugin.syncService.pull(name, ctx);
    await next();
  },
  push: async (ctx, next) => {
    const data = ctx.action.params.values || {};
    const plugin = ctx.app.pm.get(import_plugin.PluginUserDataSyncServer);
    try {
      let supported = false;
      for (const resource of plugin.resourceManager.resources.nodes) {
        if (resource.accepts.includes(data.dataType)) {
          supported = true;
        }
      }
      if (!supported) {
        throw new Error(`dataType ${data.dataType} is not supported`);
      }
      const result = await plugin.syncService.push(data);
      ctx.body = { code: 0, message: "success", result };
    } catch (error) {
      ctx.status = 500;
      ctx.body = { code: 500, message: error.message };
      return;
    }
    await next();
  },
  retry: async (ctx, next) => {
    const { sourceId, id } = ctx.action.params;
    const plugin = ctx.app.pm.get(import_plugin.PluginUserDataSyncServer);
    await plugin.syncService.retry(sourceId, id, ctx);
    await next();
  }
};
