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
var fix_storage_exports = {};
__export(fix_storage_exports, {
  default: () => fix_storage_default
});
module.exports = __toCommonJS(fix_storage_exports);
var import_server = require("@nocobase/server");
class fix_storage_default extends import_server.Migration {
  appVersion = "<0.16.0-alpha.1";
  async up() {
    const result = await this.app.version.satisfies("<0.15.0-alpha.5");
    if (!result) {
      return;
    }
    const r = this.db.getRepository("storages");
    await r.collection.sync();
    const items = await r.find({
      filter: {
        type: "local"
      }
    });
    for (const item of items) {
      const baseUrl = item.get("baseUrl");
      if (baseUrl === "/storage/uploads") {
        continue;
      }
      if (!baseUrl.includes("/storage/uploads")) {
        continue;
      }
      item.set("baseUrl", "/storage/uploads");
      const options = item.get("options");
      options.documentRoot = "storage/uploads";
      item.changed("options", true);
      item.set("options", options);
      const [, pathname] = baseUrl.split("/storage/uploads/");
      if (pathname && item.get("path")) {
        item.set("path", pathname.replace(/\/$/, "") + "/" + item.get("path"));
      } else if (pathname) {
        item.set("path", pathname.replace(/\/$/, ""));
      }
      await item.save();
    }
    const c = this.db.getCollection("attachments");
    const table = c.getTableNameWithSchemaAsString();
    await this.db.sequelize.query(`update ${table} set url = replace(url, 'http://localhost:13000', '')`);
  }
}
