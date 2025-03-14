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
var server_exports = {};
__export(server_exports, {
  PluginAPIDocServer: () => PluginAPIDocServer,
  default: () => server_default
});
module.exports = __toCommonJS(server_exports);
var import_server = require("@nocobase/server");
var import_swagger = require("./swagger");
class PluginAPIDocServer extends import_server.Plugin {
  swagger;
  constructor(app, options) {
    super(app, options);
    this.swagger = new import_swagger.SwaggerManager(this);
  }
  async beforeLoad() {
  }
  async load() {
    this.app.resourcer.define({
      name: "swagger",
      type: "single",
      actions: {
        getUrls: async (ctx, next) => {
          ctx.body = await this.swagger.getUrls();
          await next();
        },
        get: async (ctx, next) => {
          ctx.withoutDataWrapping = true;
          const { ns } = ctx.action.params;
          if (!ns) {
            ctx.body = await this.swagger.getSwagger();
            return;
          }
          const [type, index] = ns.split("/");
          if (type === "core") {
            ctx.body = await this.swagger.getCoreSwagger();
          } else if (type === "plugins") {
            ctx.body = await this.swagger.getPluginsSwagger(index);
          } else if (type === "collections") {
            ctx.body = await this.swagger.getCollectionsSwagger(index);
          }
          await next();
        }
      },
      only: ["get", "getUrls"]
    });
    this.app.acl.allow("swagger", ["get", "getUrls"], "loggedIn");
    this.app.acl.registerSnippet({
      name: ["pm", this.name, "documentation"].join("."),
      actions: ["swagger:*"]
    });
  }
}
var server_default = PluginAPIDocServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginAPIDocServer
});
