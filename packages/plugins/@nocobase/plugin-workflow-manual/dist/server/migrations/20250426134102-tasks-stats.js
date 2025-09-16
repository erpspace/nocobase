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
var tasks_stats_exports = {};
__export(tasks_stats_exports, {
  default: () => tasks_stats_default
});
module.exports = __toCommonJS(tasks_stats_exports);
var import_plugin_workflow = require("@nocobase/plugin-workflow");
var import_server = require("@nocobase/server");
var import_constants = require("../../common/constants");
class tasks_stats_default extends import_server.Migration {
  appVersion = "<1.7.0";
  async up() {
    const { db } = this.context;
    const UserTaskModel = db.getModel("userWorkflowTasks");
    const WorkflowManualTaskModel = db.getModel("workflowManualTasks");
    const WorkflowRepo = db.getRepository("workflows");
    const ExecutionRepo = db.getRepository("executions");
    await db.sequelize.transaction(async (transaction) => {
      const workflows = await WorkflowRepo.find({
        filter: {
          enabled: true
        },
        fields: ["id"],
        transaction
      });
      const workflowId = workflows.map((item) => item.id);
      const executions = await ExecutionRepo.find({
        filter: {
          status: import_plugin_workflow.EXECUTION_STATUS.STARTED,
          workflowId
        },
        fields: ["id"],
        transaction
      });
      const executionId = executions.map((item) => item.id);
      const pendingCounts = await WorkflowManualTaskModel.count({
        where: {
          status: import_constants.TASK_STATUS.PENDING,
          workflowId,
          executionId
        },
        col: "id",
        group: ["userId"],
        transaction
      });
      const allCounts = await WorkflowManualTaskModel.count({
        where: {
          workflowId
        },
        col: "id",
        group: ["userId"],
        transaction
      });
      const userStatsMap = /* @__PURE__ */ new Map();
      for (const row of pendingCounts) {
        if (!userStatsMap.get(row.userId)) {
          userStatsMap.set(row.userId, {});
        }
        userStatsMap.set(row.userId, { ...userStatsMap.get(row.userId), pending: row.count });
      }
      for (const row of allCounts) {
        if (!userStatsMap.get(row.userId)) {
          userStatsMap.set(row.userId, {});
        }
        userStatsMap.set(row.userId, { ...userStatsMap.get(row.userId), all: row.count });
      }
      for (const [userId, stats] of userStatsMap.entries()) {
        const existed = await UserTaskModel.findOne({
          where: {
            type: import_constants.TASK_TYPE_MANUAL,
            userId
          },
          transaction
        });
        if (existed) {
          await existed.update(
            {
              stats
            },
            {
              transaction
            }
          );
        } else {
          await UserTaskModel.create(
            {
              type: import_constants.TASK_TYPE_MANUAL,
              userId,
              stats
            },
            {
              transaction
            }
          );
        }
      }
    });
  }
}
