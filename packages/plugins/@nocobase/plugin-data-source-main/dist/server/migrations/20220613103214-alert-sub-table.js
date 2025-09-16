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
var alert_sub_table_exports = {};
__export(alert_sub_table_exports, {
  default: () => alert_sub_table_default
});
module.exports = __toCommonJS(alert_sub_table_exports);
var import_server = require("@nocobase/server");
/* istanbul ignore file -- @preserve */
class alert_sub_table_default extends import_server.Migration {
  appVersion = "<=0.7.0-alpha.83";
  async up() {
    const result = await this.app.version.satisfies("<=0.7.0-alpha.83");
    if (!result) {
      return;
    }
    const Field = this.context.db.getRepository("fields");
    const fields = await Field.find();
    for (const field of fields) {
      if (field.get("interface") === "subTable") {
        field.set("interface", "o2m");
        await field.save();
      }
    }
  }
}
