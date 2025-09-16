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
var fix_schema_in_field_exports = {};
__export(fix_schema_in_field_exports, {
  default: () => fix_schema_in_field_default
});
module.exports = __toCommonJS(fix_schema_in_field_exports);
var import_server = require("@nocobase/server");
class fix_schema_in_field_default extends import_server.Migration {
  on = "afterLoad";
  // 'beforeLoad' or 'afterLoad'
  async up() {
    const FieldRepo = this.db.getRepository("fields");
    const SchemaRepo = this.db.getRepository("uiSchemas");
    await this.db.sequelize.transaction(async (transaction) => {
      const fields = await FieldRepo.find({
        filter: {
          type: "belongsToMany",
          interface: "attachment"
        },
        transaction
      });
      let fieldCount = 0;
      for (const item of fields) {
        if (item.options.target === "attachments" && item.options.uiSchema && item.options.uiSchema["x-component"] === "Upload.Attachment" && !item.options.uiSchema["x-use-component-props"]) {
          fieldCount++;
          const { uiSchema, ...options } = item.options;
          uiSchema["x-use-component-props"] = "useAttachmentFieldProps";
          item.set("options", {
            ...options,
            uiSchema
          });
          item.changed("options");
          await item.save({ transaction });
        }
      }
      console.log("fields updated:", fieldCount);
      const items = await SchemaRepo.find({
        filter: {
          "schema.x-component": "CollectionField"
        },
        transaction
      });
      let schemaCount = 0;
      for (const item of items) {
        const [collectionName, name] = item.schema["x-collection-field"].split(".");
        const field = await FieldRepo.findOne({
          filter: {
            name,
            collectionName,
            "options.target": "attachments"
          },
          transaction
        });
        if (!field || item.schema["x-use-component-props"] === "useAttachmentFieldProps") {
          continue;
        }
        schemaCount++;
        item.set("schema", {
          ...item.schema,
          "x-use-component-props": "useAttachmentFieldProps"
        });
        item.changed("schema");
        await item.save({ transaction });
      }
      console.log("schema updated:", fieldCount);
    });
  }
}
