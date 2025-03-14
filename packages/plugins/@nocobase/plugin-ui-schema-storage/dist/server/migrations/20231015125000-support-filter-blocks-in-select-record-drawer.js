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
var support_filter_blocks_in_select_record_drawer_exports = {};
__export(support_filter_blocks_in_select_record_drawer_exports, {
  default: () => support_filter_blocks_in_select_record_drawer_default
});
module.exports = __toCommonJS(support_filter_blocks_in_select_record_drawer_exports);
var import_server = require("@nocobase/server");
/* istanbul ignore file -- @preserve */
class support_filter_blocks_in_select_record_drawer_default extends import_server.Migration {
  appVersion = "<0.14.0-alpha.8";
  async up() {
    const result = await this.app.version.satisfies("<=0.14.0-alpha.7");
    if (!result) {
      return;
    }
    const r = this.db.getRepository("uiSchemas");
    const items = await r.find({
      filter: {
        "schema.x-designer": "TableSelectorDesigner"
      }
    });
    await this.db.sequelize.transaction(async (transaction) => {
      for (const item of items) {
        const schema = item.schema;
        schema["x-component"] = "CardItem";
        await item.save({ transaction });
      }
    });
  }
}
