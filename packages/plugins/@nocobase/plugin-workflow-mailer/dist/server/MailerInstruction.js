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
var MailerInstruction_exports = {};
__export(MailerInstruction_exports, {
  default: () => MailerInstruction_default
});
module.exports = __toCommonJS(MailerInstruction_exports);
var import_util = require("util");
var import_nodemailer = __toESM(require("nodemailer"));
var import_plugin_workflow = require("@nocobase/plugin-workflow");
class MailerInstruction_default extends import_plugin_workflow.Instruction {
  async run(node, prevJob, processor) {
    const {
      provider,
      contentType,
      to = [],
      cc,
      bcc,
      subject,
      html,
      text,
      ignoreFail,
      ...options
    } = processor.getParsedValue(node.config, node.id);
    const { workflow } = processor.execution;
    const sync = this.workflow.isWorkflowSync(workflow);
    const transporter = import_nodemailer.default.createTransport(provider);
    const send = (0, import_util.promisify)(transporter.sendMail.bind(transporter));
    const payload = {
      ...options,
      ...contentType === "html" ? { html } : { text },
      subject: subject == null ? void 0 : subject.trim(),
      to: to.flat().map((item) => item == null ? void 0 : item.trim()).filter(Boolean),
      cc: cc ? cc.flat().map((item) => item == null ? void 0 : item.trim()).filter(Boolean) : null,
      bcc: bcc ? bcc.flat().map((item) => item == null ? void 0 : item.trim()).filter(Boolean) : null
    };
    if (sync) {
      try {
        const result = await send(payload);
        return {
          status: import_plugin_workflow.JOB_STATUS.RESOLVED,
          result
        };
      } catch (error) {
        return {
          status: ignoreFail ? import_plugin_workflow.JOB_STATUS.RESOLVED : import_plugin_workflow.JOB_STATUS.FAILED,
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
    send(payload).then((response) => {
      processor.logger.info(`smtp-mailer (#${node.id}) sent successfully.`);
      job.set({
        status: import_plugin_workflow.JOB_STATUS.RESOLVED,
        result: response
      });
    }).catch((error) => {
      processor.logger.warn(`smtp-mailer (#${node.id}) sent failed: ${error.message}`);
      job.set({
        status: import_plugin_workflow.JOB_STATUS.FAILED,
        result: error
      });
    }).finally(() => {
      processor.logger.debug(`smtp-mailer (#${node.id}) sending ended, resume workflow...`);
      setImmediate(() => {
        this.workflow.resume(job);
      });
    });
    processor.logger.info(`smtp-mailer (#${node.id}) sent, waiting for response...`);
    return processor.exit();
  }
  async resume(node, job, processor) {
    const { ignoreFail } = node.config;
    if (ignoreFail) {
      job.set("status", import_plugin_workflow.JOB_STATUS.RESOLVED);
    }
    return job;
  }
}
