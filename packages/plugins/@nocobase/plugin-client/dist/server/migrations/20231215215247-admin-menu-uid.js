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
var admin_menu_uid_exports = {};
__export(admin_menu_uid_exports, {
  default: () => admin_menu_uid_default
});
module.exports = __toCommonJS(admin_menu_uid_exports);
var import_server = require("@nocobase/server");
class admin_menu_uid_default extends import_server.Migration {
  appVersion = "<0.17.0-alpha.8";
  async up() {
    var _a, _b;
    const result = await this.app.version.satisfies("<0.17.0-alpha.8");
    if (!result) {
      return;
    }
    const systemSettings = this.db.getRepository("systemSettings");
    const instance = await systemSettings.findOne();
    if (!((_a = instance == null ? void 0 : instance.options) == null ? void 0 : _a.adminSchemaUid)) {
      return;
    }
    const UiSchemas = this.db.getModel("uiSchemas");
    await this.db.sequelize.transaction(async (transaction) => {
      var _a2, _b2, _c;
      await UiSchemas.update(
        {
          "x-uid": "nocobase-admin-menu"
        },
        {
          transaction,
          where: {
            "x-uid": (_a2 = instance == null ? void 0 : instance.options) == null ? void 0 : _a2.adminSchemaUid
          }
        }
      );
      await this.db.getModel("uiSchemaTreePath").update(
        {
          descendant: "nocobase-admin-menu"
        },
        {
          transaction,
          where: {
            descendant: (_b2 = instance == null ? void 0 : instance.options) == null ? void 0 : _b2.adminSchemaUid
          }
        }
      );
      await this.db.getModel("uiSchemaTreePath").update(
        {
          ancestor: "nocobase-admin-menu"
        },
        {
          transaction,
          where: {
            ancestor: (_c = instance == null ? void 0 : instance.options) == null ? void 0 : _c.adminSchemaUid
          }
        }
      );
    });
    console.log((_b = instance == null ? void 0 : instance.options) == null ? void 0 : _b.adminSchemaUid);
  }
}
