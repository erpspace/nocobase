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
var fix_assign_field_config_exports = {};
__export(fix_assign_field_config_exports, {
  default: () => fix_assign_field_config_default
});
module.exports = __toCommonJS(fix_assign_field_config_exports);
var import_database = require("@nocobase/database");
var import_server = require("@nocobase/server");
class fix_assign_field_config_default extends import_server.Migration {
  on = "afterSync";
  async up() {
    const { db } = this.context;
    const NodeRepo = db.getRepository("flow_nodes");
    await db.sequelize.transaction(async (transaction) => {
      const nodes = await NodeRepo.find({
        filter: {
          type: {
            [import_database.Op.or]: ["create", "update"]
          }
        }
      });
      for (const node of nodes) {
        if (node.usingAssignFormSchema || !node.assignFormSchema) {
          continue;
        }
        node.set({
          config: { ...node.config, usingAssignFormSchema: true }
        });
        node.changed("config");
        await node.save({
          silent: true,
          transaction
        });
      }
    });
  }
}
