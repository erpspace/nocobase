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
var logging_exports = {};
__export(logging_exports, {
  default: () => LoggingMigration
});
module.exports = __toCommonJS(logging_exports);
var import_server = require("@nocobase/server");
class LoggingMigration extends import_server.Migration {
  appVersion = "<0.7.1-alpha.4";
  async up() {
    const result = await this.app.version.satisfies("<=0.7.0-alpha.83");
    if (!result) {
      return;
    }
    const repository = this.context.db.getRepository("collections");
    const collections = await repository.find();
    for (const collection of collections) {
      if (!collection.get("logging")) {
        collection.set("logging", true);
        await collection.save();
      }
    }
  }
}
