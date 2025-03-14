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
var add_pending_tasks_exports = {};
__export(add_pending_tasks_exports, {
  default: () => add_pending_tasks_default
});
module.exports = __toCommonJS(add_pending_tasks_exports);
var import_plugin_workflow = require("@nocobase/plugin-workflow");
var import_server = require("@nocobase/server");
var import_constants = require("../../common/constants");
class add_pending_tasks_default extends import_server.Migration {
  appVersion = "<1.6.0";
  async up() {
    const { db } = this.context;
    const WorkflowTaskModel = db.getModel("workflowTasks");
    const WorkflowManualTaskRepo = db.getRepository("workflowManualTasks");
    await db.sequelize.transaction(async (transaction) => {
      const tasks = await WorkflowManualTaskRepo.find({
        filter: {
          status: import_plugin_workflow.JOB_STATUS.PENDING,
          "execution.status": import_plugin_workflow.EXECUTION_STATUS.STARTED,
          "workflow.enabled": true
        },
        transaction
      });
      const records = tasks.map((item) => ({
        type: import_constants.MANUAL_TASK_TYPE,
        key: `${item.id}`,
        userId: item.userId,
        workflowId: item.workflowId
      }));
      for (const record of records) {
        await WorkflowTaskModel.upsert(record, {
          transaction
        });
      }
    });
  }
}
