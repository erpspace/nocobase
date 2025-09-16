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
var association_field_exports = {};
__export(association_field_exports, {
  default: () => association_field_default
});
module.exports = __toCommonJS(association_field_exports);
var import_server = require("@nocobase/server");
/* istanbul ignore file -- @preserve */
class association_field_default extends import_server.Migration {
  appVersion = "<0.9.4-alpha.1";
  async up() {
    const result = await this.app.version.satisfies("<0.9.3-alpha.2");
    if (!result) {
      return;
    }
    const r = this.db.getRepository("uiSchemas");
    const items = await r.find({
      filter: {
        "schema.x-component": "CollectionField"
      }
    });
    console.log(items == null ? void 0 : items.length);
    await this.db.sequelize.transaction(async (transaction) => {
      for (const item of items) {
        const schema = item.schema;
        if (!schema["x-collection-field"]) {
          continue;
        }
        if (schema["type"] === "string") {
          continue;
        }
        const field = this.db.getFieldByPath(schema["x-collection-field"]);
        if (!field) {
          continue;
        }
        console.log(schema["x-collection-field"], schema["type"]);
        if (["hasOne", "belongsTo"].includes(field.type)) {
          schema["type"] = "string";
        } else if (["hasMany", "belongsToMany"].includes(field.type)) {
          schema["type"] = "string";
        } else {
          continue;
        }
        item.set("schema", schema);
        await item.save({ transaction });
      }
    });
  }
}
