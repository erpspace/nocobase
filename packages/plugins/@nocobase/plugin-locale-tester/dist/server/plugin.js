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
  PluginLocaleTesterServer: () => PluginLocaleTesterServer,
  default: () => plugin_default
});
module.exports = __toCommonJS(plugin_exports);
var import_server = require("@nocobase/server");
var import_deepmerge = __toESM(require("deepmerge"));
var import_lodash = __toESM(require("lodash"));
async function getLang(ctx) {
  const SystemSetting = ctx.db.getRepository("systemSettings");
  const systemSetting = await SystemSetting.findOne();
  const enabledLanguages = systemSetting.get("enabledLanguages") || [];
  const currentUser = ctx.state.currentUser;
  let lang = (enabledLanguages == null ? void 0 : enabledLanguages[0]) || process.env.APP_LANG || "en-US";
  if (enabledLanguages.includes(currentUser == null ? void 0 : currentUser.appLang)) {
    lang = currentUser == null ? void 0 : currentUser.appLang;
  }
  if (ctx.request.query.locale && enabledLanguages.includes(ctx.request.query.locale)) {
    lang = ctx.request.query.locale;
  }
  return lang;
}
class PluginLocaleTesterServer extends import_server.Plugin {
  async afterAdd() {
  }
  async beforeLoad() {
    this.app.acl.registerSnippet({
      name: `pm.${this.name}`,
      actions: ["localeTester:*"]
    });
  }
  async load() {
    this.app.resourceManager.use(async (ctx, next) => {
      await next();
      const { resourceName, actionName } = ctx.action;
      if (resourceName === "localeTester" && actionName === "get") {
        const lang = await getLang(ctx);
        const data = await ctx.app.localeManager.get(lang);
        const locale = {};
        Object.keys(data.resources).forEach((key) => {
          if (key.startsWith("@")) {
            locale[key] = data.resources[key];
          }
        });
        const merged = (0, import_deepmerge.default)(locale, ctx.body.locale || {});
        if (!merged["cronstrue"]) {
          merged["cronstrue"] = data.cronstrue;
        }
        if (!merged["react-js-cron"]) {
          merged["react-js-cron"] = data["cron"];
        }
        ctx.body = {
          ...ctx.body.toJSON(),
          locale: merged
        };
      } else if (resourceName === "app" && actionName === "getLang") {
        const repository = this.db.getRepository("localeTester");
        const record = await repository.findOne();
        const locale = (record == null ? void 0 : record.locale) || {};
        if (locale["cronstrue"]) {
          import_lodash.default.set(ctx.body, "cronstrue", locale["cronstrue"]);
        }
        if (locale["react-js-cron"]) {
          import_lodash.default.set(ctx.body, "cron", locale["react-js-cron"]);
        }
        Object.keys(locale).forEach((key) => {
          if (key === "cronstrue" || key === "react-js-cron") {
            return;
          }
          const value = locale[key];
          import_lodash.default.set(ctx.body, ["resources", key], value);
          const k = key.replace("@nocobase/plugin-", "").replace("@nocobase/", "");
          import_lodash.default.set(ctx.body, ["resources", k], value);
        });
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
var plugin_default = PluginLocaleTesterServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginLocaleTesterServer
});
