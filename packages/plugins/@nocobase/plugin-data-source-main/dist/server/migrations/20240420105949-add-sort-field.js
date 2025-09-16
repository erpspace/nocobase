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
var add_sort_field_exports = {};
__export(add_sort_field_exports, {
  default: () => add_sort_field_default
});
module.exports = __toCommonJS(add_sort_field_exports);
var import_server = require("@nocobase/server");
class add_sort_field_default extends import_server.Migration {
  on = "afterLoad";
  // 'beforeLoad' or 'afterLoad'
  appVersion = "<0.21.0-alpha.13";
  async up() {
    const repository = this.db.getRepository("collections");
    await repository.load();
    const collections = await this.db.getRepository("collections").find();
    const fields = [];
    for (const item of collections) {
      const collection = this.db.getCollection(item.name);
      collection.forEachField((field) => {
        if (field.type === "sort") {
          fields.push({
            collectionName: item.name,
            name: field.name
          });
        }
      });
    }
    const fieldRepository = this.db.getRepository("fields");
    for (const field of fields) {
      this.app.log.info(`field path: ${field.collectionName}.${field.name}`);
      const instance = await fieldRepository.findOne({
        filter: field
      });
      if (instance == null ? void 0 : instance.interface) {
        continue;
      }
      await fieldRepository.updateOrCreate({
        values: {
          ...field,
          interface: "sort",
          type: "sort",
          hidden: false,
          uiSchema: {
            type: "number",
            title: field.name,
            "x-component": "InputNumber",
            "x-component-props": { stringMode: true, step: "1" },
            "x-validator": "integer"
          },
          scopeKey: instance == null ? void 0 : instance.scopeKey
        },
        filterKeys: ["collectionName", "name"]
      });
    }
  }
}
