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
var Plugin_exports = {};
__export(Plugin_exports, {
  default: () => Plugin_default
});
module.exports = __toCommonJS(Plugin_exports);
var import_server = require("@nocobase/server");
var import_actions = __toESM(require("@nocobase/actions"));
var import_plugin_workflow = __toESM(require("@nocobase/plugin-workflow"));
var jobActions = __toESM(require("./actions"));
var import_ManualInstruction = __toESM(require("./ManualInstruction"));
var import_constants = require("../common/constants");
class Plugin_default extends import_server.Plugin {
  onTaskSave = async (task, { transaction }) => {
    const workflowPlugin = this.app.pm.get(import_plugin_workflow.default);
    const workflowId = Array.from(workflowPlugin.enabledCache.keys());
    const ModelClass = task.constructor;
    const pending = await ModelClass.count({
      where: {
        userId: task.userId,
        workflowId,
        status: import_constants.TASK_STATUS.PENDING
      },
      include: [
        {
          association: "execution",
          attributes: [],
          where: {
            status: import_plugin_workflow.EXECUTION_STATUS.STARTED
          },
          required: true
        }
      ],
      col: "id",
      distinct: true,
      transaction
    });
    const all = await ModelClass.count({
      where: {
        userId: task.userId,
        workflowId
      },
      col: "id",
      transaction
    });
    await workflowPlugin.updateTasksStats(task.userId, import_constants.TASK_TYPE_MANUAL, { pending, all }, { transaction });
  };
  onExecutionStatusChange = async (execution, { transaction }) => {
    if (!execution.status) {
      return;
    }
    const workflowPlugin = this.app.pm.get(import_plugin_workflow.default);
    if (!execution.workflow) {
      execution.workflow = workflowPlugin.enabledCache.get(execution.workflowId) || await execution.getWorkflow({ transaction });
    }
    if (!execution.workflow.nodes) {
      execution.workflow.nodes = await execution.workflow.getNodes({ transaction });
    }
    const manualNodes = execution.workflow.nodes.filter((node) => node.type === "manual");
    if (!manualNodes.length) {
      return;
    }
    const manualNodeIds = new Set(manualNodes.map((node) => node.id));
    const WorkflowManualTaskModel = this.db.getModel("workflowManualTasks");
    const manualTasks = await WorkflowManualTaskModel.findAll({
      attributes: ["id", "userId"],
      where: {
        nodeId: Array.from(manualNodeIds),
        executionId: execution.id
      },
      transaction
    });
    const userStatsMap = /* @__PURE__ */ new Map();
    const userId = [];
    for (const item of manualTasks) {
      userId.push(item.userId);
      userStatsMap.set(item.userId, { pending: 0, all: 0 });
    }
    const pendingCounts = await WorkflowManualTaskModel.count({
      where: {
        status: import_constants.TASK_STATUS.PENDING,
        userId,
        workflowId: execution.workflowId
      },
      include: [
        {
          association: "execution",
          attributes: [],
          where: {
            status: import_plugin_workflow.EXECUTION_STATUS.STARTED
          },
          required: true
        }
      ],
      col: "id",
      group: ["userId"],
      transaction
    });
    const allCounts = await WorkflowManualTaskModel.count({
      where: {
        userId,
        workflowId: execution.workflowId
      },
      col: "id",
      group: ["userId"],
      transaction
    });
    for (const row of pendingCounts) {
      if (!userStatsMap.get(row.userId)) {
        userStatsMap.set(row.userId, { pending: 0, all: 0 });
      }
      userStatsMap.set(row.userId, { ...userStatsMap.get(row.userId), pending: row.count });
    }
    for (const row of allCounts) {
      if (!userStatsMap.get(row.userId)) {
        userStatsMap.set(row.userId, { pending: 0, all: 0 });
      }
      userStatsMap.set(row.userId, { ...userStatsMap.get(row.userId), all: row.count });
    }
    for (const [userId2, stats] of userStatsMap.entries()) {
      await workflowPlugin.updateTasksStats(userId2, import_constants.TASK_TYPE_MANUAL, stats, { transaction });
    }
  };
  onWorkflowStatusChange = async (workflow, { transaction }) => {
    const workflowPlugin = this.app.pm.get(import_plugin_workflow.default);
    const WorkflowManualTaskModel = this.db.getModel("workflowManualTasks");
    const enalbedSet = new Set(workflowPlugin.enabledCache.keys());
    let pendingCounts = [];
    let allCounts = [];
    const userStatsMap = /* @__PURE__ */ new Map();
    if (workflow.enabled) {
      enalbedSet.add(workflow.id);
      const workflowId = [...enalbedSet];
      pendingCounts = await WorkflowManualTaskModel.count({
        where: {
          status: import_constants.TASK_STATUS.PENDING,
          workflowId
        },
        include: [
          {
            association: "execution",
            attributes: [],
            where: {
              status: import_plugin_workflow.EXECUTION_STATUS.STARTED
            },
            required: true
          }
        ],
        col: "id",
        group: ["userId"],
        transaction
      });
      allCounts = await WorkflowManualTaskModel.count({
        where: {
          workflowId
        },
        col: "id",
        group: ["userId"],
        transaction
      });
    } else {
      enalbedSet.delete(workflow.id);
      const workflowId = [...enalbedSet];
      const tasksByUser = await WorkflowManualTaskModel.count({
        col: "userId",
        where: {
          status: import_constants.TASK_STATUS.PENDING,
          workflowId: workflow.id
        },
        distinct: true,
        group: ["userId"],
        transaction
      });
      const userId = [];
      for (const item of tasksByUser) {
        userId.push(item.userId);
        userStatsMap.set(item.userId, { pending: 0, all: 0 });
      }
      pendingCounts = await WorkflowManualTaskModel.count({
        where: {
          status: import_constants.TASK_STATUS.PENDING,
          userId,
          workflowId
        },
        include: [
          {
            association: "execution",
            attributes: [],
            where: {
              status: import_plugin_workflow.EXECUTION_STATUS.STARTED
            },
            required: true
          }
        ],
        col: "id",
        group: ["userId"],
        transaction
      });
      allCounts = await WorkflowManualTaskModel.count({
        where: {
          userId,
          workflowId
        },
        col: "id",
        group: ["userId"],
        transaction
      });
    }
    for (const row of pendingCounts) {
      if (!userStatsMap.get(row.userId)) {
        userStatsMap.set(row.userId, { pending: 0, all: 0 });
      }
      userStatsMap.set(row.userId, { ...userStatsMap.get(row.userId), pending: row.count });
    }
    for (const row of allCounts) {
      if (!userStatsMap.get(row.userId)) {
        userStatsMap.set(row.userId, { pending: 0, all: 0 });
      }
      userStatsMap.set(row.userId, { ...userStatsMap.get(row.userId), all: row.count });
    }
    for (const [userId, stats] of userStatsMap.entries()) {
      await workflowPlugin.updateTasksStats(userId, import_constants.TASK_TYPE_MANUAL, stats, { transaction });
    }
  };
  async load() {
    this.app.resourceManager.define({
      name: "workflowManualTasks",
      actions: {
        list: {
          filter: {
            $or: [
              {
                "workflow.enabled": true
              },
              {
                "workflow.enabled": false,
                status: {
                  $ne: import_plugin_workflow.JOB_STATUS.PENDING
                }
              }
            ]
          },
          handler: import_actions.default.list
        },
        ...jobActions
      }
    });
    this.app.acl.allow("workflowManualTasks", ["list", "listMine", "get", "submit"], "loggedIn");
    const workflowPlugin = this.app.pm.get(import_plugin_workflow.default);
    workflowPlugin.registerInstruction("manual", import_ManualInstruction.default);
    this.db.on("workflowManualTasks.afterSave", this.onTaskSave);
    this.db.on("workflowManualTasks.afterDestroy", this.onTaskSave);
    this.db.on("executions.afterUpdate", this.onExecutionStatusChange);
    this.db.on("workflows.afterUpdate", this.onWorkflowStatusChange);
  }
}
