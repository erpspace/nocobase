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
var record_picker_exports = {};
__export(record_picker_exports, {
  default: () => record_picker_default
});
module.exports = __toCommonJS(record_picker_exports);
var import_server = require("@nocobase/server");
/* istanbul ignore file -- @preserve */
class record_picker_default extends import_server.Migration {
  appVersion = "<0.9.3-alpha.1";
  async up() {
    const result = await this.app.version.satisfies("<0.9.2-alpha.5");
    if (!result) {
      return;
    }
    await this.migrateFields();
    await this.migrateSelector();
    await this.migrateViewer();
  }
  async migrateFields() {
    const r = this.db.getRepository("uiSchemas");
    const items = await r.find({
      filter: {
        "schema.x-component": "CollectionField"
      }
    });
    console.log(items == null ? void 0 : items.length);
    await this.db.sequelize.transaction(async (transaction) => {
      var _a, _b, _c, _d;
      for (const item of items) {
        const schema = item.schema;
        if (!schema["x-collection-field"]) {
          continue;
        }
        const field = this.db.getFieldByPath(schema["x-collection-field"]);
        if (!field) {
          continue;
        }
        const component = (_a = field.get("uiSchema")) == null ? void 0 : _a["x-component"];
        if (!["AssociationField", "RecordPicker"].includes(component)) {
          continue;
        }
        console.log(field.options.interface, component, schema["x-collection-field"]);
        if (["createdBy", "updatedBy"].includes((_b = field == null ? void 0 : field.options) == null ? void 0 : _b.interface)) {
        } else if (["hasOne", "belongsTo"].includes(field.type)) {
          schema["type"] = "object";
        } else if (["hasMany", "belongsToMany"].includes(field.type)) {
          schema["type"] = "array";
        } else {
          continue;
        }
        if (((_c = schema["x-component-props"]) == null ? void 0 : _c.mode) === "tags") {
          schema["x-component-props"]["enableLink"] = true;
          schema["x-component-props"]["mode"] = "Select";
        } else if (((_d = schema["x-component-props"]) == null ? void 0 : _d.mode) === "links") {
          schema["x-component-props"]["enableLink"] = true;
          schema["x-component-props"]["mode"] = "Select";
        }
        item.set("schema", schema);
        await item.save({ transaction });
      }
    });
  }
  async migrateViewer() {
    const r = this.db.getRepository("uiSchemas");
    const items = await r.find({
      filter: {
        "schema.x-component": "RecordPicker.Viewer"
      }
    });
    await this.db.sequelize.transaction(async (transaction) => {
      for (const item of items) {
        const schema = item.schema;
        schema["x-component"] = "AssociationField.Viewer";
        item.set("schema", schema);
        await item.save({ transaction });
      }
    });
  }
  async migrateSelector() {
    const r = this.db.getRepository("uiSchemas");
    const items = await r.find({
      filter: {
        "schema.x-component": "RecordPicker.Selector"
      }
    });
    await this.db.sequelize.transaction(async (transaction) => {
      for (const item of items) {
        const schema = item.schema;
        schema["x-component"] = "AssociationField.Selector";
        item.set("schema", schema);
        await item.save({ transaction });
      }
    });
  }
}
