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
var update_bigint_to_unixtimestamp_exports = {};
__export(update_bigint_to_unixtimestamp_exports, {
  default: () => update_bigint_to_unixtimestamp_default
});
module.exports = __toCommonJS(update_bigint_to_unixtimestamp_exports);
var import_server = require("@nocobase/server");
/* istanbul ignore file -- @preserve */
class update_bigint_to_unixtimestamp_default extends import_server.Migration {
  on = "afterLoad";
  async up() {
    var _a, _b;
    const Field = this.context.db.getRepository("fields");
    const fields = await Field.find({
      filter: {
        interface: "unixTimestamp",
        type: "bigInt"
      }
    });
    for (const field of fields) {
      const uiSchema = field.get("uiSchema");
      uiSchema["x-component-props"] = {
        picker: "date",
        dateFormat: "YYYY-MM-DD",
        timeFormat: "HH:mm:ss",
        showTime: ((_a = uiSchema["x-component-props"]) == null ? void 0 : _a.showTime) || true,
        accuracy: ((_b = uiSchema["x-component-props"]) == null ? void 0 : _b.accuracy) || "second"
      };
      field.set("type", "unixTimestamp");
      field.set("uiSchema", uiSchema);
      await field.save();
    }
  }
}
