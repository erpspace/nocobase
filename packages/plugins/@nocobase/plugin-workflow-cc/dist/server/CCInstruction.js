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
var CCInstruction_exports = {};
__export(CCInstruction_exports, {
  default: () => CCInstruction
});
module.exports = __toCommonJS(CCInstruction_exports);
var import_utils = require("@nocobase/utils");
var import_plugin_workflow = require("@nocobase/plugin-workflow");
var import_constants = require("../common/constants");
async function getUsers(config, { db, transaction }) {
  const users = /* @__PURE__ */ new Set();
  const UserRepo = db.getRepository("users");
  for (const item of config) {
    if (typeof item === "object") {
      if (!(0, import_utils.isValidFilter)(item.filter)) {
        continue;
      }
      const result = await UserRepo.find({
        ...item,
        fields: ["id"],
        transaction
      });
      result.forEach((item2) => users.add(item2.id));
    } else {
      users.add(item);
    }
  }
  return [...users];
}
class CCInstruction extends import_plugin_workflow.Instruction {
  static type = "cc";
  async run(node, prevJob, processor) {
    const { db } = processor.options.plugin;
    const job = processor.saveJob({
      status: import_plugin_workflow.JOB_STATUS.RESOLVED,
      nodeId: node.id,
      nodeKey: node.key,
      upstreamId: (prevJob == null ? void 0 : prevJob.id) ?? null
    });
    const usersConfig = processor.getParsedValue(node.config.users ?? [], node.id).flat().filter(Boolean);
    const users = await getUsers(usersConfig, { db, transaction: processor.mainTransaction });
    const RecordRepo = db.getRepository("workflowCcTasks");
    const title = node.config.title ? processor.getParsedValue(node.config.title, node.id) : node.title;
    const records = await RecordRepo.createMany({
      records: users.map((userId, index) => ({
        userId,
        jobId: job.id,
        nodeId: node.id,
        executionId: job.executionId,
        workflowId: node.workflowId,
        status: import_constants.TASK_STATUS.UNREAD,
        title
      })),
      transaction: processor.mainTransaction
    });
    return job;
  }
  async duplicateConfig(node, { transaction }) {
    const uiSchemaRepo = this.workflow.app.db.getRepository("uiSchemas");
    if (!node.config.ccDetail) {
      return node.config;
    }
    const result = await uiSchemaRepo.duplicate(node.config.ccDetail, {
      transaction
    });
    return {
      ...node.config,
      ccDetail: (result == null ? void 0 : result["x-uid"]) ?? (0, import_utils.uid)()
    };
  }
}
