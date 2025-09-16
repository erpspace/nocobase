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
var fix_attachment_field_exports = {};
__export(fix_attachment_field_exports, {
  default: () => fix_attachment_field_default
});
module.exports = __toCommonJS(fix_attachment_field_exports);
var import_database = require("@nocobase/database");
var import_server = require("@nocobase/server");
class fix_attachment_field_default extends import_server.Migration {
  appVersion = "<0.13.0-alpha.5";
  async up() {
    const result = await this.app.version.satisfies("<0.13.0-alpha.5");
    if (!result) {
      return;
    }
    const r = this.db.getRepository("uiSchemas");
    const items = await r.find({
      filter: {
        "schema.x-component": "CollectionField",
        "schema.x-component-props.action": {
          [import_database.Op.like]: "%:create?attachementField%"
        }
      }
    });
    console.log(items == null ? void 0 : items.length);
    await this.db.sequelize.transaction(async (transaction) => {
      for (const item of items) {
        const schema = item.schema;
        if (!schema["x-collection-field"]) {
          continue;
        }
        const field = this.db.getFieldByPath(schema["x-collection-field"]);
        if (!field) {
          continue;
        }
        schema["x-component-props"] = schema["x-component-props"] || {};
        schema["x-component-props"].action = schema["x-component-props"].action.replace(
          "attachementField",
          "attachmentField"
        );
        item.set("schema", schema);
        await item.save({ transaction });
      }
    });
  }
}
