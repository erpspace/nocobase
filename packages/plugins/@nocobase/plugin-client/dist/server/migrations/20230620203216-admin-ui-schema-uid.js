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
var admin_ui_schema_uid_exports = {};
__export(admin_ui_schema_uid_exports, {
  default: () => admin_ui_schema_uid_default
});
module.exports = __toCommonJS(admin_ui_schema_uid_exports);
var import_server = require("@nocobase/server");
class admin_ui_schema_uid_default extends import_server.Migration {
  appVersion = "<0.14.0-alpha.1";
  async up() {
    var _a, _b, _c;
    const result = await this.app.version.satisfies("<0.14.0-alpha.1");
    if (!result) {
      return;
    }
    await this.db.getCollection("systemSettings").sync({
      force: false,
      alter: {
        drop: false
      }
    });
    const systemSettings = this.db.getRepository("systemSettings");
    let instance = await systemSettings.findOne();
    if ((_a = instance == null ? void 0 : instance.options) == null ? void 0 : _a.adminSchemaUid) {
      return;
    }
    const uiRoutes = this.db.getRepository("uiRoutes");
    if (!uiRoutes) {
      return;
    }
    const routes = await uiRoutes.find();
    for (const route of routes) {
      if (route.uiSchemaUid && ((_b = route == null ? void 0 : route.options) == null ? void 0 : _b.component) === "AdminLayout") {
        const options = instance.options || {};
        options["adminSchemaUid"] = route.uiSchemaUid;
        instance.set("options", options);
        instance.changed("options", true);
        await instance.save();
        return;
      }
    }
    instance = await systemSettings.findOne();
    if (!((_c = instance == null ? void 0 : instance.options) == null ? void 0 : _c.adminSchemaUid)) {
      throw new Error("adminSchemaUid invalid");
    }
    this.app.log.info("systemSettings.options", instance.toJSON());
  }
}
