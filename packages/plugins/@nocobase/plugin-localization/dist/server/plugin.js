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
  PluginLocalizationServer: () => PluginLocalizationServer,
  default: () => plugin_default
});
module.exports = __toCommonJS(plugin_exports);
var import_server = require("@nocobase/server");
var import_localization = __toESM(require("./actions/localization"));
var import_localizationTexts = __toESM(require("./actions/localizationTexts"));
var import_resources = __toESM(require("./resources"));
var import_utils = require("./utils");
var import_constants = require("./constants");
var import_source_manager = require("./source-manager");
var import_utils2 = require("@nocobase/utils");
var import_package = __toESM(require("../../package.json"));
class PluginLocalizationServer extends import_server.Plugin {
  resources;
  sourceManager = new import_source_manager.SourceManager();
  addNewTexts = async (texts, options) => {
    texts = await this.resources.filterExists(texts, options == null ? void 0 : options.transaction);
    this.db.getModel("localizationTexts").bulkCreate(
      texts.map(({ text, module: module2 }) => ({
        module: module2,
        text
      })),
      {
        transaction: options == null ? void 0 : options.transaction
      }
    ).then((newTexts) => {
      this.resources.updateCacheTexts(newTexts, options == null ? void 0 : options.transaction);
      this.sendSyncMessage(
        {
          type: "updateCacheTexts",
          texts: newTexts
        },
        { transaction: options == null ? void 0 : options.transaction }
      );
    }).catch((err) => {
      this.log.error(err);
    });
  };
  afterAdd() {
    this.app.on("afterLoad", () => this.sourceManager.handleTextsSaved(this.db, this.addNewTexts));
  }
  beforeLoad() {
  }
  async load() {
    this.app.resourceManager.define({
      name: "localizationTexts",
      actions: import_localizationTexts.default
    });
    this.app.resourceManager.define({
      name: "localization",
      actions: import_localization.default
    });
    this.app.acl.registerSnippet({
      name: `pm.${this.name}.localization`,
      actions: ["localization:*", "localizationTexts:*", "localizationTranslations:*"]
    });
    this.app.localeManager.registerResourceStorer("plugin-localization", {
      getResources: (lang) => this.resources.getResources(lang),
      reset: () => this.resources.reset()
    });
    const cache = await this.app.cacheManager.createCache({
      name: "localization",
      prefix: "localization",
      store: "memory"
    });
    this.resources = new import_resources.default(this.db, cache);
    this.sourceManager.registerSource("local", {
      title: (0, import_utils2.tval)("System & Plugins", { ns: import_package.default.name }),
      sync: async (ctx) => {
        const resources = await ctx.app.localeManager.getCacheResources(ctx.get("X-Locale") || "en-US");
        const result = {};
        Object.entries(resources).forEach(([module2, resource]) => {
          if (module2.startsWith(import_server.OFFICIAL_PLUGIN_PREFIX)) {
            const name = module2.replace(import_server.OFFICIAL_PLUGIN_PREFIX, "");
            if (resources[name]) {
              return;
            }
          }
          result[module2] = resource;
        });
        return result;
      }
    });
    this.sourceManager.registerSource("db", {
      title: (0, import_utils2.tval)("Collections & Fields", { ns: import_package.default.name }),
      namespace: import_constants.NAMESPACE_COLLECTIONS,
      sync: async (ctx) => {
        const db = ctx.db;
        const result = {};
        const collections = Array.from(db.collections.values());
        for (const collection of collections) {
          const fields = Array.from(collection.fields.values()).filter((field) => {
            var _a;
            return (_a = field.options) == null ? void 0 : _a.translation;
          }).map((field) => field.name);
          if (!fields.length) {
            continue;
          }
          const repo = db.getRepository(collection.name);
          const records = await repo.find({ fields });
          records.forEach((record) => {
            const texts = (0, import_utils.getTextsFromDBRecord)(fields, record);
            texts.forEach((text) => result[text] = "");
          });
        }
        return {
          [import_constants.NAMESPACE_COLLECTIONS]: result
        };
      }
    });
    this.db.on("afterSave", async (instance, options) => {
      const module2 = `resources.${import_constants.NAMESPACE_COLLECTIONS}`;
      const model = instance.constructor;
      const collection = model.collection;
      if (!collection) {
        return;
      }
      const texts = [];
      const fields = Array.from(collection.fields.values()).filter((field) => {
        var _a;
        return ((_a = field.options) == null ? void 0 : _a.translation) && instance["_changed"].has(field.name);
      }).map((field) => field.name);
      if (!fields.length) {
        return;
      }
      const textsFromDB = (0, import_utils.getTextsFromDBRecord)(fields, instance);
      textsFromDB.forEach((text) => {
        texts.push({ text, module: module2 });
      });
      await this.addNewTexts(texts, options);
    });
  }
  async handleSyncMessage(message) {
    switch (message.type) {
      case "updateCacheTexts":
        await this.resources.updateCacheTexts(message.texts);
        return;
    }
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
var plugin_default = PluginLocalizationServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginLocalizationServer
});
