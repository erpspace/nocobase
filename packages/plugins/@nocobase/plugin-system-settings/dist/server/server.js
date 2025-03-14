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
  PluginSystemSettingsServer: () => PluginSystemSettingsServer,
  default: () => server_default
});
module.exports = __toCommonJS(server_exports);
var import_server = require("@nocobase/server");
var import_path = require("path");
class PluginSystemSettingsServer extends import_server.Plugin {
  getInitAppLang(options) {
    var _a, _b, _c;
    return ((_c = (_b = (_a = options == null ? void 0 : options.cliArgs) == null ? void 0 : _a[0]) == null ? void 0 : _b.opts) == null ? void 0 : _c.lang) || process.env.INIT_APP_LANG || "en-US";
  }
  async install(options) {
    const plugin = this.pm.get("file-manager");
    const logo = plugin ? await plugin.createFileRecord({
      filePath: (0, import_path.resolve)(__dirname, "./logo.png"),
      collectionName: "attachments",
      values: {
        title: "nocobase-logo",
        extname: ".png",
        mimetype: "image/png"
      }
    }) : {
      title: "nocobase-logo",
      filename: "682e5ad037dd02a0fe4800a3e91c283b.png",
      extname: ".png",
      mimetype: "image/png",
      url: "/nocobase.png"
    };
    const authLogo = plugin ? await plugin.createFileRecord({
      filePath: (0, import_path.resolve)(__dirname, "./authLogo.png"),
      collectionName: "attachments",
      values: {
        title: "nocobase-auth-logo",
        extname: ".png",
        mimetype: "image/png"
      }
    }) : {
      title: "nocobase-auth-logo",
      filename: "682e5ad037dd02a0fe4800a3e91c283b.png",
      extname: ".png",
      mimetype: "image/png",
      url: "/nocobase.png"
    };
    await this.db.getRepository("systemSettings").create({
      values: {
        title: "NocoBase",
        appLang: this.getInitAppLang(options),
        enabledLanguages: [this.getInitAppLang(options)],
        logo,
        authLogo
      }
    });
  }
  async getSystemSettingsInstance() {
    const repository = this.db.getRepository("systemSettings");
    const instance = await repository.findOne({
      filterByTk: 1,
      appends: ["logo"]
    });
    const json = instance.toJSON();
    json.raw_title = json.title;
    json.title = this.app.environment.renderJsonTemplate(instance.title);
    return json;
  }
  beforeLoad() {
    const cmd = this.app.findCommand("install");
    if (cmd) {
      cmd.option("-l, --lang [lang]");
    }
    this.app.acl.registerSnippet({
      name: `pm.${this.name}.system-settings`,
      actions: ["systemSettings:put"]
    });
  }
  async load() {
    this.app.acl.addFixedParams("systemSettings", "destroy", () => {
      return {
        "id.$ne": 1
      };
    });
    this.app.resourceManager.define({
      name: "systemSettings",
      actions: {
        get: async (ctx, next) => {
          try {
            ctx.body = await this.getSystemSettingsInstance();
          } catch (error) {
            throw error;
          }
          await next();
        },
        put: async (ctx, next) => {
          const repository = this.db.getRepository("systemSettings");
          const values = ctx.action.params.values;
          await repository.update({
            filterByTk: 1,
            values: {
              ...values,
              title: values.raw_title
            }
          });
          ctx.body = await this.getSystemSettingsInstance();
          await next();
        }
      }
    });
    this.app.acl.allow("systemSettings", "get", "public");
  }
}
var server_default = PluginSystemSettingsServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginSystemSettingsServer
});
