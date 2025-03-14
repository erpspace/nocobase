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
  PluginMobileServer: () => PluginMobileServer,
  default: () => plugin_default
});
module.exports = __toCommonJS(plugin_exports);
var import_server = require("@nocobase/server");
var import_utils = require("@nocobase/utils");
var import_lodash = __toESM(require("lodash"));
class PluginMobileServer extends import_server.Plugin {
  async load() {
    this.registerActionHandlers();
    this.bindNewMenuToRoles();
    this.setACL();
    this.registerLocalizationSource();
    this.app.db.on("mobileRoutes.afterUpdate", async (instance, { transaction }) => {
      if (instance.changed("enableTabs")) {
        const repository = this.app.db.getRepository("mobileRoutes");
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
      name: `ui.mobile`,
      actions: ["mobileRoutes:create", "mobileRoutes:update", "mobileRoutes:move", "mobileRoutes:destroy"]
    });
    this.app.acl.registerSnippet({
      name: `pm.mobile`,
      actions: ["mobileRoutes:list", "roles.mobileRoutes:*"]
    });
    this.app.acl.allow("mobileRoutes", "listAccessible", "loggedIn");
  }
  /**
   * used to implement: roles with permission (allowNewMobileMenu is true) can directly access the newly created menu
   */
  bindNewMenuToRoles() {
    this.app.db.on("roles.beforeCreate", async (instance) => {
      instance.set("allowNewMobileMenu", ["admin", "member"].includes(instance.name));
    });
    this.app.db.on("mobileRoutes.afterCreate", async (instance, { transaction }) => {
      const addNewMenuRoles = await this.app.db.getRepository("roles").find({
        filter: {
          allowNewMobileMenu: true
        },
        transaction
      });
      await this.app.db.getRepository("mobileRoutes.roles", instance.id).add({
        tk: addNewMenuRoles.map((role) => role.name),
        transaction
      });
    });
    const processRoleMobileRoutes = async (params) => {
      const { models, action, transaction } = params;
      if (!models.length) return;
      const parentIds = models.map((x) => x.mobileRouteId);
      const tabs = await this.app.db.getRepository("mobileRoutes").find({
        where: { parentId: parentIds, hidden: true },
        transaction
      });
      if (!tabs.length) return;
      const repository = this.app.db.getRepository("rolesMobileRoutes");
      const roleName = models[0].get("roleName");
      const tabIds = tabs.map((x) => x.get("id"));
      const where = { mobileRouteId: tabIds, roleName };
      if (action === "create") {
        const exists = await repository.find({ where });
        const modelsByRouteId = import_lodash.default.keyBy(exists, (x) => x.get("mobileRouteId"));
        const createModels = tabs.map((x) => !modelsByRouteId[x.get("id")] && { mobileRouteId: x.get("id"), roleName }).filter(Boolean);
        for (const values of createModels) {
          await repository.firstOrCreate({
            values,
            filterKeys: ["mobileRouteId", "roleName"],
            transaction
          });
        }
        return;
      }
      if (action === "remove") {
        return await repository.destroy({ filter: where, transaction });
      }
    };
    this.app.db.on("rolesMobileRoutes.afterBulkCreate", async (instances, options) => {
      await processRoleMobileRoutes({ models: instances, action: "create", transaction: options.transaction });
    });
    this.app.db.on("rolesMobileRoutes.afterBulkDestroy", async (options) => {
      const models = await this.app.db.getRepository("rolesMobileRoutes").find({
        where: options.where
      });
      await processRoleMobileRoutes({ models, action: "remove", transaction: options.transaction });
    });
  }
  registerActionHandlers() {
    this.app.resourceManager.registerActionHandler("mobileRoutes:listAccessible", async (ctx, next) => {
      const mobileRoutesRepository = ctx.db.getRepository("mobileRoutes");
      const rolesRepository = ctx.db.getRepository("roles");
      if (ctx.state.currentRole === "root") {
        ctx.body = await mobileRoutesRepository.find({
          tree: true,
          ...ctx.query
        });
        return await next();
      }
      const role = await rolesRepository.findOne({
        filterByTk: ctx.state.currentRole,
        appends: ["mobileRoutes"]
      });
      const mobileRoutesId = role.get("mobileRoutes").map((item) => item.id);
      ctx.body = await mobileRoutesRepository.find({
        tree: true,
        ...ctx.query,
        filter: {
          id: mobileRoutesId
        }
      });
      await next();
    });
  }
  registerLocalizationSource() {
    const localizationPlugin = this.app.pm.get("localization");
    if (!localizationPlugin) {
      return;
    }
    localizationPlugin.sourceManager.registerSource("mobile-routes", {
      title: (0, import_utils.tval)("Mobile routes"),
      sync: async (ctx) => {
        const mobileRoutes = await ctx.db.getRepository("mobileRoutes").find({
          raw: true
        });
        const resources = {};
        mobileRoutes.forEach((route) => {
          if (route.title) {
            resources[route.title] = "";
          }
        });
        return {
          "lm-mobile-routes": resources
        };
      },
      namespace: "lm-mobile-routes",
      collections: [
        {
          collection: "mobileRoutes",
          fields: ["title"]
        }
      ]
    });
  }
}
var plugin_default = PluginMobileServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginMobileServer
});
