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
var change_loop_result_exports = {};
__export(change_loop_result_exports, {
  default: () => change_loop_result_default
});
module.exports = __toCommonJS(change_loop_result_exports);
var import_server = require("@nocobase/server");
class change_loop_result_default extends import_server.Migration {
  async up() {
    const { db, app } = this.context;
    const JobRepo = db.getRepository("jobs");
    await db.sequelize.transaction(async (transaction) => {
      const records = await JobRepo.find({
        filter: {
          node: {
            type: "loop"
          }
        },
        transaction
      });
      app.logger.debug(`${records.length} records need to be migrated.`);
      for (const record of records) {
        const { result } = record;
        if (typeof result === "number") {
          await record.update({ result: { looped: result } }, { transaction });
        }
      }
    });
  }
}
