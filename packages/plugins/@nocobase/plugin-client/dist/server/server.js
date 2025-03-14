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
var server_exports = {};
__export(server_exports, {
  PluginClientServer: () => PluginClientServer,
  default: () => server_default
});
module.exports = __toCommonJS(server_exports);
var import_server = require("@nocobase/server");
var import_utils = require("@nocobase/utils");
var import_lodash = __toESM(require("lodash"));
var process = __toESM(require("node:process"));
var import_path = require("path");
var import_antd = require("./antd");
var import_cron = require("./cron");
var import_cronstrue = require("./cronstrue");
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
class PluginClientServer extends import_server.Plugin {
  async beforeLoad() {
  }
  async install() {
    const uiSchemas = this.db.getRepository("uiSchemas");
    await uiSchemas.insert({
      type: "void",
      "x-uid": "nocobase-admin-menu",
      "x-component": "Menu",
      "x-designer": "Menu.Designer",
      "x-initializer": "MenuItemInitializers",
      "x-component-props": {
        mode: "mix",
        theme: "dark",
        // defaultSelectedUid: 'u8',
        onSelect: "{{ onSelect }}",
        sideMenuRefScopeKey: "sideMenuRef"
      },
      properties: {}
    });
  }
  async load() {
    this.app.localeManager.setLocaleFn("antd", async (lang) => (0, import_antd.getAntdLocale)(lang));
    this.app.localeManager.setLocaleFn("cronstrue", async (lang) => (0, import_cronstrue.getCronstrueLocale)(lang));
    this.app.localeManager.setLocaleFn("cron", async (lang) => (0, import_cron.getCronLocale)(lang));
    this.db.addMigrations({
      namespace: "client",
      directory: (0, import_path.resolve)(__dirname, "./migrations"),
      context: {
        plugin: this
      }
    });
    this.app.acl.allow("app", "getLang");
    this.app.acl.allow("app", "getInfo");
    this.app.acl.registerSnippet({
      name: "app",
      actions: ["app:restart", "app:refresh", "app:clearCache"]
    });
    const dialect = this.app.db.sequelize.getDialect();
    this.app.resourceManager.define({
      name: "app",
      actions: {
        async getInfo(ctx, next) {
          var _a, _b;
          const SystemSetting = ctx.db.getRepository("systemSettings");
          const systemSetting = await SystemSetting.findOne();
          const enabledLanguages = (systemSetting == null ? void 0 : systemSetting.get("enabledLanguages")) || [];
          const currentUser = ctx.state.currentUser;
          let lang = (enabledLanguages == null ? void 0 : enabledLanguages[0]) || process.env.APP_LANG || "en-US";
          if (enabledLanguages.includes(currentUser == null ? void 0 : currentUser.appLang)) {
            lang = currentUser == null ? void 0 : currentUser.appLang;
          }
          const info = {
            database: {
              dialect
            },
            version: await ctx.app.version.get(),
            lang,
            name: ctx.app.name,
            theme: ((_a = currentUser == null ? void 0 : currentUser.systemSettings) == null ? void 0 : _a.theme) || ((_b = systemSetting == null ? void 0 : systemSetting.options) == null ? void 0 : _b.theme) || "default"
          };
          if (process.env["EXPORT_LIMIT"]) {
            info.exportLimit = parseInt(process.env["EXPORT_LIMIT"]);
          }
          if (process.env["EXPORT_AUTO_MODE_THRESHOLD"]) {
            info.exportAutoModeThreshold = parseInt(process.env["EXPORT_AUTO_MODE_THRESHOLD"]);
          }
          if (process.env["EXPORT_ATTACHMENTS_AUTO_MODE_THRESHOLD"]) {
            info.exportAttachmentsAutoModeThreshold = parseInt(process.env["EXPORT_ATTACHMENTS_AUTO_MODE_THRESHOLD"]);
          }
          ctx.body = info;
          await next();
        },
        async getLang(ctx, next) {
          const lang = await getLang(ctx);
          const resources = await ctx.app.localeManager.get(lang);
          ctx.body = {
            lang,
            ...resources
          };
          await next();
        },
        async clearCache(ctx, next) {
          await ctx.cache.reset();
          await next();
        },
        async restart(ctx, next) {
          ctx.app.runAsCLI(["restart"], { from: "user" });
          await next();
        },
        async refresh(ctx, next) {
          ctx.app.runCommand("refresh");
          await next();
        }
      }
    });
    this.app.auditManager.registerActions(["app:restart", "app:refresh", "app:clearCache"]);
    this.registerActionHandlers();
    this.bindNewMenuToRoles();
    this.setACL();
    this.registerLocalizationSource();
    this.app.db.on("desktopRoutes.afterUpdate", async (instance, { transaction }) => {
      if (instance.changed("enableTabs")) {
        const repository = this.app.db.getRepository("desktopRoutes");
        await repository.update({
          filter: {
            parentId: instance.id
          },
          values: {
            hidden: !instance.enableTabs
          },
          transaction
        });
      }
    });
  }
  setACL() {
    this.app.acl.registerSnippet({
      name: `ui.desktopRoutes`,
      actions: ["desktopRoutes:create", "desktopRoutes:update", "desktopRoutes:move", "desktopRoutes:destroy"]
    });
    this.app.acl.registerSnippet({
      name: `pm.desktopRoutes`,
      actions: ["desktopRoutes:list", "roles.desktopRoutes:*"]
    });
    this.app.acl.allow("desktopRoutes", "listAccessible", "loggedIn");
  }
  /**
   * used to implement: roles with permission (allowNewMenu is true) can directly access the newly created menu
   */
  bindNewMenuToRoles() {
    this.app.db.on("roles.beforeCreate", async (instance) => {
      instance.set(
        "allowNewMenu",
        instance.allowNewMenu === void 0 ? ["admin", "member"].includes(instance.name) : !!instance.allowNewMenu
      );
    });
    this.app.db.on("desktopRoutes.afterCreate", async (instance, { transaction }) => {
      const addNewMenuRoles = await this.app.db.getRepository("roles").find({
        filter: {
          allowNewMenu: true
        },
        transaction
      });
      await this.app.db.getRepository("desktopRoutes.roles", instance.id).add({
        tk: addNewMenuRoles.map((role) => role.name),
        transaction
      });
    });
    const processRoleDesktopRoutes = async (params) => {
      const { models, action, transaction } = params;
      if (!models.length) return;
      const parentIds = models.map((x) => x.desktopRouteId);
      const tabs = await this.app.db.getRepository("desktopRoutes").find({
        where: { parentId: parentIds, hidden: true },
        transaction
      });
      if (!tabs.length) return;
      const repository = this.app.db.getRepository("rolesDesktopRoutes");
      const roleName = models[0].get("roleName");
      const tabIds = tabs.map((x) => x.get("id"));
      const where = { desktopRouteId: tabIds, roleName };
      if (action === "create") {
        const exists = await repository.find({ where });
        const modelsByRouteId = import_lodash.default.keyBy(exists, (x) => x.get("desktopRouteId"));
        const createModels = tabs.map((x) => !modelsByRouteId[x.get("id")] && { desktopRouteId: x.get("id"), roleName }).filter(Boolean);
        for (const values of createModels) {
          await repository.firstOrCreate({
            values,
            filterKeys: ["desktopRouteId", "roleName"],
            transaction
          });
        }
        return;
      }
      if (action === "remove") {
        return await repository.destroy({ filter: where, transaction });
      }
    };
    this.app.db.on("rolesDesktopRoutes.afterBulkCreate", async (instances, options) => {
      await processRoleDesktopRoutes({ models: instances, action: "create", transaction: options.transaction });
    });
    this.app.db.on("rolesDesktopRoutes.afterBulkDestroy", async (options) => {
      const models = await this.app.db.getRepository("rolesDesktopRoutes").find({
        where: options.where
      });
      await processRoleDesktopRoutes({ models, action: "remove", transaction: options.transaction });
    });
  }
  registerActionHandlers() {
    this.app.resourceManager.registerActionHandler("desktopRoutes:listAccessible", async (ctx, next) => {
      const desktopRoutesRepository = ctx.db.getRepository("desktopRoutes");
      const rolesRepository = ctx.db.getRepository("roles");
      if (ctx.state.currentRole === "root") {
        ctx.body = await desktopRoutesRepository.find({
          tree: true,
          ...ctx.query
        });
        return await next();
      }
      const role = await rolesRepository.findOne({
        filterByTk: ctx.state.currentRole,
        appends: ["desktopRoutes"]
      });
      const desktopRoutesId = role.get("desktopRoutes").map(async (item, index, items) => {
        if (item.type === "page" && !items.some((tab) => tab.parentId === item.id)) {
          const children = await desktopRoutesRepository.find({
            filter: {
              parentId: item.id
            }
          });
          return [item.id, ...(children || []).map((child) => child.id)];
        }
        return item.id;
      });
      if (desktopRoutesId) {
        const ids = (await Promise.all(desktopRoutesId)).flat();
        const result = await desktopRoutesRepository.find({
          tree: true,
          ...ctx.query,
          filter: {
            id: ids
          }
        });
        ctx.body = result;
      }
      await next();
    });
  }
  registerLocalizationSource() {
    const localizationPlugin = this.app.pm.get("localization");
    if (!localizationPlugin) {
      return;
    }
    localizationPlugin.sourceManager.registerSource("desktop-routes", {
      title: (0, import_utils.tval)("Desktop routes"),
      sync: async (ctx) => {
        const desktopRoutes = await ctx.db.getRepository("desktopRoutes").find({
          raw: true
        });
        const resources = {};
        desktopRoutes.forEach((route) => {
          if (route.title) {
            resources[route.title] = "";
          }
        });
        return {
          "lm-desktop-routes": resources
        };
      },
      namespace: "lm-desktop-routes",
      collections: [
        {
          collection: "desktopRoutes",
          fields: ["title"]
        }
      ]
    });
  }
}
var server_default = PluginClientServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginClientServer
});
