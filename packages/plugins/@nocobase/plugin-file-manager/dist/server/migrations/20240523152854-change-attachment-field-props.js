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
var change_attachment_field_props_exports = {};
__export(change_attachment_field_props_exports, {
  default: () => change_attachment_field_props_default
});
module.exports = __toCommonJS(change_attachment_field_props_exports);
var import_server = require("@nocobase/server");
class change_attachment_field_props_default extends import_server.Migration {
  on = "afterLoad";
  // 'beforeLoad' or 'afterLoad'
  appVersion = "<1.0.0-alpha.16";
  async up() {
    const r = this.db.getRepository("uiSchemas");
    await this.db.sequelize.transaction(async (transaction) => {
      var _a, _b;
      const items = await r.find({
        filter: {
          "schema.x-component": "CollectionField"
        },
        transaction
      });
      let count = 0;
      for (const item of items) {
        if ((_b = (_a = item.schema["x-component-props"]) == null ? void 0 : _a.action) == null ? void 0 : _b.match(/^.+:create(\?attachmentField=.+)?/)) {
          count++;
          const {
            schema: { action, ...schema }
          } = item;
          item.set("schema", {
            ...schema,
            "x-use-component-props": "useAttachmentFieldProps"
          });
          item.changed("schema");
          await item.save({ transaction });
        }
      }
      console.log("item updated:", count);
    });
  }
}
