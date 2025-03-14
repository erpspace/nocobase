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
var set_mobileMenuUiSchemas_exports = {};
__export(set_mobileMenuUiSchemas_exports, {
  default: () => set_mobileMenuUiSchemas_default
});
module.exports = __toCommonJS(set_mobileMenuUiSchemas_exports);
var import_server = require("@nocobase/server");
/* istanbul ignore file -- @preserve */
class set_mobileMenuUiSchemas_default extends import_server.Migration {
  appVersion = "<1.4.0-beta";
  async up() {
    await this.db.sequelize.transaction(async (transaction) => {
      const mobileRoutes = await this.db.getRepository("mobileRoutes").find({
        sort: "sort",
        transaction
      });
      const roles = await this.db.getRepository("roles").find({
        filter: {
          "allowNewMobileMenu.$isFalsy": true
        },
        transaction
      });
      const mobileRouteIds = mobileRoutes.map((item) => item.get("id"));
      for (const role of roles) {
        if (role.allowNewMobileMenu === false) {
          continue;
        }
        role.allowNewMobileMenu = true;
        await role.save({ transaction });
        await this.db.getRepository("roles.mobileRoutes", role.get("name")).add({
          tk: mobileRouteIds,
          transaction
        });
      }
    });
  }
  async down() {
  }
}
