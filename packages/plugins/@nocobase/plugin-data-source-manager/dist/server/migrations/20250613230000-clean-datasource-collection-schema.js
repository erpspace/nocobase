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
var clean_datasource_collection_schema_exports = {};
__export(clean_datasource_collection_schema_exports, {
  default: () => clean_datasource_collection_schema_default
});
module.exports = __toCommonJS(clean_datasource_collection_schema_exports);
var import_database = require("@nocobase/database");
var import_server = require("@nocobase/server");
/* istanbul ignore file -- @preserve */
class clean_datasource_collection_schema_default extends import_server.Migration {
  on = "afterLoad";
  appVersion = "<1.8.0";
  async up() {
    const repository = this.context.db.getRepository("dataSourcesCollections");
    const transaction = await repository.model.sequelize.transaction();
    try {
      const collections = await repository.find({
        where: {
          [import_database.Op.or]: [
            { "options.schema": "{{$deps[0].split('@')?.[0]}}" },
            { "options.viewName": "{{$deps[0].split('@')?.[1]}}" }
          ]
        },
        transaction
      });
      for (const collection of collections) {
        const { key, options } = collection;
        const newOptions = { ...options };
        if (options.schema === "{{$deps[0].split('@')?.[0]}}") {
          newOptions.schema = "";
        }
        if (options.viewName === "{{$deps[0].split('@')?.[1]}}") {
          newOptions.viewName = "";
        }
        await repository.model.update(
          { options: newOptions },
          {
            where: { key },
            transaction
          }
        );
      }
      await transaction.commit();
    } catch (error) {
      console.error("Error during migration:", error);
      await transaction.rollback();
    }
  }
}
