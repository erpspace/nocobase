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
var remove_schema_options_exports = {};
__export(remove_schema_options_exports, {
  default: () => remove_schema_options_default
});
module.exports = __toCommonJS(remove_schema_options_exports);
var import_server = require("@nocobase/server");
/* istanbul ignore file -- @preserve */
class remove_schema_options_default extends import_server.Migration {
  on = "afterLoad";
  async up() {
    const CollectionRepository = this.context.db.getRepository("collections");
    const collections = await CollectionRepository.find({
      filter: {
        "options.from": "db2cm"
      }
    });
    for (const collection of collections) {
      const collectionSchema = collection.get("schema");
      const dbSchema = this.context.db.options.schema || "public";
      if (collectionSchema && collectionSchema == dbSchema) {
        collection.set("schema", void 0);
        await collection.save();
      }
    }
  }
}
