/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var form_field_exports = {};
__export(form_field_exports, {
  default: () => form_field_default
});
module.exports = __toCommonJS(form_field_exports);
var import_json_schema = require("@formily/json-schema");
var import_server = require("@nocobase/server");
var import_utils = require("@nocobase/utils");
var import_lodash = __toESM(require("lodash"));
/* istanbul ignore file -- @preserve */
class form_field_default extends import_server.Migration {
  appVersion = "<0.9.3-alpha.1";
  async up() {
    const result = await this.app.version.satisfies("<0.9.2-alpha.5");
    if (!result) {
      return;
    }
    const r = this.db.getRepository("uiSchemas");
    const items = await r.find({
      filter: {
        "schema.x-component": "FormField"
      }
    });
    console.log(items == null ? void 0 : items.length);
    await this.db.sequelize.transaction(async (transaction) => {
      var _a, _b;
      for (const item of items) {
        const schema = item.schema;
        schema["type"] = "object";
        schema["x-component"] = "CollectionField";
        import_lodash.default.set(schema, "x-component-props.mode", "Nester");
        item.set("schema", schema);
        await item.save({ transaction });
        const s = await r.getProperties(item["x-uid"], { transaction });
        const instance = new import_json_schema.Schema(s);
        const find = (instance2, component) => {
          return instance2.reduceProperties((buf, ss) => {
            if (ss["x-component"] === component) {
              return ss;
            }
            const result2 = find(ss, component);
            if (result2) {
              return result2;
            }
            return buf;
          }, null);
        };
        const gridSchema = find(instance, "Grid").toJSON();
        await r.insertAdjacent("afterBegin", item["x-uid"], gridSchema, {
          wrap: {
            type: "void",
            "x-uid": (0, import_utils.uid)(),
            "x-component": "AssociationField.Nester"
          },
          transaction
        });
        const removed = (_b = (_a = Object.values(instance.properties)) == null ? void 0 : _a[0]) == null ? void 0 : _b["x-uid"];
        if (removed) {
          await r.remove(removed, { transaction });
        }
      }
    });
  }
}
