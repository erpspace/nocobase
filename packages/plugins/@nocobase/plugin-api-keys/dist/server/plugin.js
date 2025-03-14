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
  PluginAPIKeysServer: () => PluginAPIKeysServer,
  default: () => plugin_default
});
module.exports = __toCommonJS(plugin_exports);
var import_server = require("@nocobase/server");
var import_api_keys = require("./actions/api-keys");
class PluginAPIKeysServer extends import_server.Plugin {
  resourceName = "apiKeys";
  async beforeLoad() {
    this.app.resourcer.define({
      name: this.resourceName,
      actions: {
        create: import_api_keys.create,
        destroy: import_api_keys.destroy
      },
      only: ["list", "create", "destroy"]
    });
    this.app.acl.registerSnippet({
      name: ["pm", this.name, "configuration"].join("."),
      actions: ["apiKeys:list", "apiKeys:create", "apiKeys:destroy"]
    });
  }
  async load() {
    this.app.resourcer.use(
      async (ctx, next) => {
        const { resourceName, actionName } = ctx.action;
        if (resourceName === this.resourceName && ["list", "destroy"].includes(actionName)) {
          ctx.action.mergeParams({
            filter: {
              createdById: ctx.auth.user.id
            }
          });
        }
        await next();
      },
      {
        group: "apiKeys",
        before: "acl",
        after: "auth"
      }
    );
  }
}
var plugin_default = PluginAPIKeysServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginAPIKeysServer
});
