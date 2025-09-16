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
var stats_exports = {};
__export(stats_exports, {
  default: () => stats_default
});
module.exports = __toCommonJS(stats_exports);
var import_server = require("@nocobase/server");
class stats_default extends import_server.Migration {
  appVersion = "<1.7.0";
  on = "afterLoad";
  async up() {
    const { db } = this.context;
    const WorkflowRepo = db.getRepository("workflows");
    const WorkflowStatsModel = db.getModel("workflowStats");
    const WorkflowVersionStatsModel = db.getModel("workflowVersionStats");
    await db.sequelize.transaction(async (transaction) => {
      const workflows = await WorkflowRepo.find({
        fields: ["id", "key", "executed", "allExecuted"],
        transaction
      });
      const groupCounts = {};
      for (const workflow of workflows) {
        const versionStats = await WorkflowVersionStatsModel.findOne({
          where: {
            id: workflow.id
          },
          transaction
        });
        if (!versionStats) {
          await WorkflowVersionStatsModel.create(
            {
              id: workflow.id,
              executed: workflow.get("executed")
            },
            { transaction }
          );
        }
        const key = workflow.get("key");
        groupCounts[key] = {
          key,
          executed: workflow.get("allExecuted") || 0
        };
      }
      for (const values of Object.values(groupCounts)) {
        const stats = await WorkflowStatsModel.findOne({
          where: {
            key: values.key
          },
          transaction
        });
        if (!stats) {
          await WorkflowStatsModel.create(values, { transaction });
        }
      }
    });
  }
}
