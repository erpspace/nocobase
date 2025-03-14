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
var timestamps_exports = {};
__export(timestamps_exports, {
  default: () => timestamps_default
});
module.exports = __toCommonJS(timestamps_exports);
var import_server = require("@nocobase/server");
/* istanbul ignore file -- @preserve */
class timestamps_default extends import_server.Migration {
  appVersion = "<0.8.1-alpha.2";
  async up() {
    const result = await this.app.version.satisfies("<=0.8.0-alpha.14");
    if (!result) {
      return;
    }
    try {
      const collections = await this.app.db.getRepository("collections").find();
      console.log("migrating...");
      for (const collection of collections) {
        if (collection.get("autoCreate") && collection.get("isThrough")) {
          collection.set("timestamps", true);
          await collection.save();
          console.log(`collection name: ${collection.name}`);
        }
      }
    } catch (error) {
      console.error(error);
    }
  }
}
