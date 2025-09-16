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
var set_collection_schema_exports = {};
__export(set_collection_schema_exports, {
  default: () => set_collection_schema_default
});
module.exports = __toCommonJS(set_collection_schema_exports);
var import_server = require("@nocobase/server");
/* istanbul ignore file -- @preserve */
class set_collection_schema_default extends import_server.Migration {
  appVersion = "<0.14.0-alpha.4";
  async up() {
    if (!this.db.inDialect("postgres")) {
      return;
    }
    if (this.context.app.name !== "main") {
      return;
    }
    const userCollections = await this.db.getRepository("collections").find({
      filter: {
        "options.schema": null,
        "options.from.$ne": "db2cm"
      }
    });
    for (const collection of userCollections) {
      await collection.set("schema", process.env.COLLECTION_MANAGER_SCHEMA || this.db.options.schema || "public");
      await collection.save();
    }
    await this.context.app.emitAsync("loadCollections");
  }
}
