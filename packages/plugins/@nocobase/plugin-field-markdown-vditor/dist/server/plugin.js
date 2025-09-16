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
  PluginFieldMarkdownVditorServer: () => PluginFieldMarkdownVditorServer,
  default: () => plugin_default
});
module.exports = __toCommonJS(plugin_exports);
var import_server = require("@nocobase/server");
var import_fs_extra = __toESM(require("fs-extra"));
var import_path = __toESM(require("path"));
var import_package = __toESM(require("../../package.json"));
const namespace = import_package.default.name;
class PluginFieldMarkdownVditorServer extends import_server.Plugin {
  async afterAdd() {
  }
  async beforeLoad() {
  }
  async load() {
    await this.copyVditorDist();
    this.setResource();
    this.app.acl.allow("vditor", "check", "loggedIn");
  }
  setResource() {
    this.app.resourceManager.define({
      name: "vditor",
      actions: {
        check: async (context, next) => {
          var _a, _b, _c;
          const { fileCollectionName } = context.action.params;
          let storage;
          const fileCollection = this.db.getCollection(fileCollectionName || "attachments");
          const storageName = (_a = fileCollection == null ? void 0 : fileCollection.options) == null ? void 0 : _a.storage;
          if (storageName) {
            storage = await this.db.getRepository("storages").findOne({
              where: {
                name: storageName
              }
            });
          } else {
            storage = await this.db.getRepository("storages").findOne({
              where: {
                default: true
              }
            });
          }
          if (!storage) {
            context.throw(
              400,
              context.t("Storage configuration not found. Please configure a storage provider first.", {
                ns: namespace
              })
            );
          }
          const isSupportToUploadFiles = storage.type !== "s3-compatible" || ((_b = storage.options) == null ? void 0 : _b.baseUrl) && ((_c = storage.options) == null ? void 0 : _c.public);
          const storageInfo = {
            id: storage.id,
            title: storage.title,
            name: storage.name,
            type: storage.type,
            rules: storage.rules
          };
          context.body = {
            isSupportToUploadFiles: !!isSupportToUploadFiles,
            storage: storageInfo
          };
          await next();
        }
      }
    });
  }
  async copyVditorDist() {
    const dist = import_path.default.resolve(__dirname, "../../dist/client/vditor/dist");
    if (await import_fs_extra.default.exists(dist)) {
      return;
    }
    const vditor = import_path.default.dirname(require.resolve("vditor"));
    await import_fs_extra.default.copy(vditor, dist);
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
var plugin_default = PluginFieldMarkdownVditorServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginFieldMarkdownVditorServer
});
