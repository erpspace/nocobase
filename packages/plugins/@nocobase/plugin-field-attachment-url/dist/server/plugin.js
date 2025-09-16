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
  PluginFieldAttachmentUrlServer: () => PluginFieldAttachmentUrlServer,
  default: () => plugin_default
});
module.exports = __toCommonJS(plugin_exports);
var import_server = require("@nocobase/server");
class PluginFieldAttachmentUrlServer extends import_server.Plugin {
  async afterAdd() {
  }
  async beforeLoad() {
  }
  async load() {
    this.app.resourceManager.registerActionHandlers({
      "collections:listFileCollectionsWithPublicStorage": async (ctx, next) => {
        var _a, _b;
        const fileCollections = await this.db.getRepository("collections").find({
          filter: {
            "options.template": "file"
          }
        });
        const filePlugin = this.pm.get("file-manager");
        const options = [];
        const fileCollection = this.db.getCollection("attachments");
        if (await filePlugin.isPublicAccessStorage((_a = fileCollection == null ? void 0 : fileCollection.options) == null ? void 0 : _a.storage)) {
          options.push({
            title: '{{t("Attachments")}}',
            name: "attachments"
          });
        }
        for (const fileCollection2 of fileCollections) {
          if (await filePlugin.isPublicAccessStorage((_b = fileCollection2 == null ? void 0 : fileCollection2.options) == null ? void 0 : _b.storage)) {
            options.push({
              name: fileCollection2.name,
              title: fileCollection2.title
            });
          }
        }
        ctx.body = options;
        await next();
      }
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
var plugin_default = PluginFieldAttachmentUrlServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginFieldAttachmentUrlServer
});
