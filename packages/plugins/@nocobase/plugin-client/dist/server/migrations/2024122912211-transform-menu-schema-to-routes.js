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
var transform_menu_schema_to_routes_exports = {};
__export(transform_menu_schema_to_routes_exports, {
  default: () => transform_menu_schema_to_routes_default,
  getIds: () => getIds,
  schemaToRoutes: () => schemaToRoutes
});
module.exports = __toCommonJS(transform_menu_schema_to_routes_exports);
var import_server = require("@nocobase/server");
class transform_menu_schema_to_routes_default extends import_server.Migration {
  appVersion = "<1.6.0";
  async up() {
    const uiSchemas = this.db.getRepository("uiSchemas");
    const desktopRoutes = this.db.getRepository("desktopRoutes");
    const count = await desktopRoutes.count();
    if (count > 0) {
      return;
    }
    const mobileRoutes = this.db.getRepository("mobileRoutes");
    const rolesRepository = this.db.getRepository("roles");
    const menuSchema = await uiSchemas.getJsonSchema("nocobase-admin-menu");
    const routes = await schemaToRoutes(menuSchema, uiSchemas);
    try {
      await this.db.sequelize.transaction(async (transaction) => {
        var _a;
        if (routes.length > 0) {
          await desktopRoutes.createMany({
            records: routes,
            transaction
          });
          const roles = await rolesRepository.find({
            appends: ["menuUiSchemas"],
            transaction
          });
          const allDesktopRoutes = await desktopRoutes.find({ transaction });
          for (const role of roles) {
            const menuUiSchemas = role.menuUiSchemas || [];
            const { needRemoveIds, needAddIds } = getIds(allDesktopRoutes, menuUiSchemas);
            if (needRemoveIds.length > 0) {
              await this.db.getRepository("roles.desktopRoutes", role.name).remove({
                tk: needRemoveIds,
                transaction
              });
            }
            if (needAddIds.length > 0) {
              await this.db.getRepository("roles.desktopRoutes", role.name).add({
                tk: needAddIds,
                transaction
              });
            }
          }
        }
        if (mobileRoutes) {
          const allMobileRoutes = await mobileRoutes.find({
            transaction
          });
          for (const item of allMobileRoutes || []) {
            if (item.type !== "page") {
              continue;
            }
            const mobileRouteSchema = await uiSchemas.getJsonSchema(item.schemaUid);
            const enableTabs = !!((_a = mobileRouteSchema == null ? void 0 : mobileRouteSchema["x-component-props"]) == null ? void 0 : _a.displayTabs);
            await mobileRoutes.update({
              filterByTk: item.id,
              values: {
                enableTabs
              },
              transaction
            });
            await mobileRoutes.update({
              filter: {
                parentId: item.id
              },
              values: {
                hidden: !enableTabs
              },
              transaction
            });
          }
        }
      });
    } catch (error) {
      console.error("Migration failed:", error);
      throw error;
    }
  }
}
async function schemaToRoutes(schema, uiSchemas) {
  const schemaKeys = Object.keys(schema.properties || {});
  if (schemaKeys.length === 0) {
    return [];
  }
  const result = schemaKeys.map(async (key) => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
    const item = schema.properties[key];
    if (item["x-component"] === "Menu.SubMenu") {
      return {
        type: "group",
        title: item.title,
        icon: (_a = item["x-component-props"]) == null ? void 0 : _a.icon,
        schemaUid: item["x-uid"],
        hideInMenu: false,
        children: await schemaToRoutes(item, uiSchemas)
      };
    }
    if (item["x-component"] === "Menu.Item") {
      const menuSchema = await uiSchemas.getProperties(item["x-uid"]);
      const pageSchema = (_b = menuSchema == null ? void 0 : menuSchema.properties) == null ? void 0 : _b.page;
      const enableTabs = (_c = pageSchema == null ? void 0 : pageSchema["x-component-props"]) == null ? void 0 : _c.enablePageTabs;
      const enableHeader = !((_d = pageSchema == null ? void 0 : pageSchema["x-component-props"]) == null ? void 0 : _d.disablePageHeader);
      const displayTitle = !((_e = pageSchema == null ? void 0 : pageSchema["x-component-props"]) == null ? void 0 : _e.hidePageTitle);
      return {
        type: "page",
        title: item.title,
        icon: (_f = item["x-component-props"]) == null ? void 0 : _f.icon,
        schemaUid: pageSchema == null ? void 0 : pageSchema["x-uid"],
        menuSchemaUid: item["x-uid"],
        hideInMenu: false,
        enableTabs,
        enableHeader,
        displayTitle,
        children: (await schemaToRoutes(pageSchema, uiSchemas)).map((item2) => ({ ...item2, hidden: !enableTabs }))
      };
    }
    if (item["x-component"] === "Menu.URL") {
      return {
        type: "link",
        title: item.title,
        icon: (_g = item["x-component-props"]) == null ? void 0 : _g.icon,
        options: {
          href: (_h = item["x-component-props"]) == null ? void 0 : _h.href,
          params: (_i = item["x-component-props"]) == null ? void 0 : _i.params
        },
        schemaUid: item["x-uid"],
        hideInMenu: false
      };
    }
    return {
      type: "tabs",
      title: item.title,
      icon: (_j = item["x-component-props"]) == null ? void 0 : _j.icon,
      schemaUid: item["x-uid"],
      tabSchemaName: key,
      hideInMenu: false
    };
  });
  return Promise.all(result);
}
function getIds(desktopRoutes, menuUiSchemas) {
  const uidList = menuUiSchemas.map((item) => item["x-uid"]);
  const needRemoveIds = desktopRoutes.filter((item) => {
    if (item.type === "tabs") {
      const page = desktopRoutes.find((route) => (route == null ? void 0 : route.id) === (item == null ? void 0 : item.parentId));
      return !uidList.includes(page == null ? void 0 : page.menuSchemaUid);
    }
    if (item.type === "page") {
      return !uidList.includes(item == null ? void 0 : item.menuSchemaUid);
    }
    return !uidList.includes(item == null ? void 0 : item.schemaUid);
  }).map((item) => item == null ? void 0 : item.id);
  const needAddIds = desktopRoutes.map((item) => item == null ? void 0 : item.id).filter((id) => !needRemoveIds.includes(id));
  return { needRemoveIds, needAddIds };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getIds,
  schemaToRoutes
});
