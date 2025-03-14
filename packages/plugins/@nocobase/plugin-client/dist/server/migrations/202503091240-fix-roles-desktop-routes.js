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
var fix_roles_desktop_routes_exports = {};
__export(fix_roles_desktop_routes_exports, {
  default: () => fix_roles_desktop_routes_default
});
module.exports = __toCommonJS(fix_roles_desktop_routes_exports);
var import_server = require("@nocobase/server");
var import_lodash = __toESM(require("lodash"));
class fix_roles_desktop_routes_default extends import_server.Migration {
  appVersion = "<1.6.0";
  async up() {
    const rolesDesktopRoutesRepo = this.db.getRepository("rolesDesktopRoutes");
    const count = await rolesDesktopRoutesRepo.count();
    if (!count) {
      return;
    }
    const desktopRoutesRepo = this.db.getRepository("desktopRoutes");
    try {
      await this.db.sequelize.transaction(async (transaction) => {
        const rolesDesktopRoutes = await rolesDesktopRoutesRepo.find({ transaction });
        const rolesDesktopRouteIds = rolesDesktopRoutes.map((x) => x.get("desktopRouteId"));
        const desktopRoutes = await desktopRoutesRepo.find({
          filter: { $or: [{ id: rolesDesktopRouteIds }, { parentId: rolesDesktopRouteIds }] },
          transaction
        });
        const records = findMissingRoutes(rolesDesktopRoutes, desktopRoutes);
        await rolesDesktopRoutesRepo.createMany({ records, transaction });
      });
    } catch (error) {
      console.error("Migration failed:", error);
      throw error;
    }
  }
}
function findMissingRoutes(rolesDesktopRoutes, desktopRoutes) {
  const routeMap = import_lodash.default.keyBy(desktopRoutes, "id");
  const group = (id, roleName) => `${id}_${roleName}`;
  const existingMap = new Set(rolesDesktopRoutes.map((x) => group(x.desktopRouteId, x.roleName)));
  const missingRoutes = [];
  rolesDesktopRoutes.forEach((route) => {
    const parentRoute = routeMap[route.desktopRouteId];
    desktopRoutes.forEach((child) => {
      if (child.hidden && child.parentId === parentRoute.id) {
        const key = group(child.id, route.roleName);
        if (!existingMap.has(key)) {
          missingRoutes.push({ desktopRouteId: child.id, roleName: route.roleName });
        }
      }
    });
  });
  return missingRoutes;
}
