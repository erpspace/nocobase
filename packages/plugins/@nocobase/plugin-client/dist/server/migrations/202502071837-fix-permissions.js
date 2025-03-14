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
var fix_permissions_exports = {};
__export(fix_permissions_exports, {
  default: () => fix_permissions_default,
  getIds: () => getIds
});
module.exports = __toCommonJS(fix_permissions_exports);
var import_server = require("@nocobase/server");
class fix_permissions_default extends import_server.Migration {
  appVersion = "<1.6.0";
  async up() {
    const desktopRoutes = this.db.getRepository("desktopRoutes");
    const count = await desktopRoutes.count();
    if (!count) {
      return;
    }
    const rolesRepository = this.db.getRepository("roles");
    try {
      await this.db.sequelize.transaction(async (transaction) => {
        const roles = await rolesRepository.find({
          appends: ["menuUiSchemas"],
          transaction
        });
        const allDesktopRoutes = await desktopRoutes.find({ transaction });
        for (const role of roles) {
          const menuUiSchemas = role.menuUiSchemas || [];
          const { needAddIds } = getIds(allDesktopRoutes, menuUiSchemas);
          if (needAddIds.length > 0) {
            await this.db.getRepository("roles.desktopRoutes", role.name).add({
              tk: needAddIds,
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
  getIds
});
