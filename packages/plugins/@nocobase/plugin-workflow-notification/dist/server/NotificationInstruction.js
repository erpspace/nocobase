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
var NotificationInstruction_exports = {};
__export(NotificationInstruction_exports, {
  default: () => NotificationInstruction_default
});
module.exports = __toCommonJS(NotificationInstruction_exports);
var import_plugin_notification_manager = __toESM(require("@nocobase/plugin-notification-manager"));
var import_plugin_workflow = require("@nocobase/plugin-workflow");
class NotificationInstruction_default extends import_plugin_workflow.Instruction {
  async run(node, prevJob, processor) {
    const options = processor.getParsedValue(node.config, node.id);
    const scope = processor.getScope(node.id);
    const sendParams = {
      channelName: options.channelName,
      message: { ...options, content: node.config.content },
      triggerFrom: "workflow",
      data: scope
    };
    const notificationServer = this.workflow.pm.get(import_plugin_notification_manager.default);
    const { workflow } = processor.execution;
    const sync = this.workflow.isWorkflowSync(workflow);
    if (sync) {
      try {
        const result = await notificationServer.send(sendParams);
        if (result.status === "success") {
          return {
            status: import_plugin_workflow.JOB_STATUS.RESOLVED,
            result
          };
        } else {
          return {
            status: import_plugin_workflow.JOB_STATUS.FAILED,
            result
          };
        }
      } catch (error) {
        return {
          status: import_plugin_workflow.JOB_STATUS.FAILED,
          result: error
        };
      }
    }
    const job = await processor.saveJob({
      status: import_plugin_workflow.JOB_STATUS.PENDING,
      nodeId: node.id,
      nodeKey: node.key,
      upstreamId: (prevJob == null ? void 0 : prevJob.id) ?? null
    });
    notificationServer.send(sendParams).then((result) => {
      if (result.status === "success") {
        processor.logger.info(`notification (#${node.id}) sent successfully.`);
        job.set({
          status: import_plugin_workflow.JOB_STATUS.RESOLVED,
          result
        });
      } else {
        processor.logger.info(`notification (#${node.id}) sent failed.`);
        job.set({
          status: import_plugin_workflow.JOB_STATUS.FAILED,
          result
        });
      }
    }).catch((error) => {
      processor.logger.warn(`notification (#${node.id}) sent failed: ${error.message}`);
      job.set({
        status: import_plugin_workflow.JOB_STATUS.FAILED,
        result: error
      });
    }).finally(() => {
      processor.logger.debug(`notification (#${node.id}) sending ended, resume workflow...`);
      setImmediate(() => {
        this.workflow.resume(job);
      });
    });
    processor.logger.info(`notification (#${node.id}) sent, waiting for response...`);
    return processor.exit();
  }
  async resume(node, job, processor) {
    return job;
  }
}
