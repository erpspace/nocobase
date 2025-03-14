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
var llm_exports = {};
__export(llm_exports, {
  LLMInstruction: () => LLMInstruction
});
module.exports = __toCommonJS(llm_exports);
var import_plugin_workflow = require("@nocobase/plugin-workflow");
var import_lodash = __toESM(require("lodash"));
class LLMInstruction extends import_plugin_workflow.Instruction {
  async getLLMProvider(llmService, chatOptions) {
    const service = await this.workflow.db.getRepository("llmServices").findOne({
      filter: {
        name: llmService
      }
    });
    if (!service) {
      throw new Error("invalid llm service");
    }
    const plugin = this.workflow.app.pm.get("ai");
    const providerOptions = plugin.aiManager.llmProviders.get(service.provider);
    if (!providerOptions) {
      throw new Error("invalid llm provider");
    }
    const Provider = providerOptions.provider;
    const provider = new Provider({ app: this.workflow.app, serviceOptions: service.options, chatOptions });
    return provider;
  }
  async run(node, input, processor) {
    const { llmService, ...chatOptions } = processor.getParsedValue(node.config, node.id);
    let provider;
    try {
      provider = await this.getLLMProvider(llmService, chatOptions);
    } catch (e) {
      return {
        status: import_plugin_workflow.JOB_STATUS.ERROR,
        result: e.message
      };
    }
    const job = await processor.saveJob({
      status: import_plugin_workflow.JOB_STATUS.PENDING,
      nodeId: node.id,
      nodeKey: node.key,
      upstreamId: (input == null ? void 0 : input.id) ?? null
    });
    provider.invokeChat().then((aiMsg) => {
      let raw = aiMsg;
      if (aiMsg.raw) {
        raw = aiMsg.raw;
      }
      job.set({
        status: import_plugin_workflow.JOB_STATUS.RESOLVED,
        result: {
          id: raw.id,
          content: raw.content,
          additionalKwargs: raw.additional_kwargs,
          responseMetadata: raw.response_metadata,
          toolCalls: raw.tool_calls,
          structuredContent: aiMsg.parsed
        }
      });
    }).catch((e) => {
      processor.logger.error(`llm invoke failed, ${e.message}`, {
        node: node.id,
        error: e,
        chatOptions: import_lodash.default.omit(chatOptions, "messages")
      });
      job.set({
        status: import_plugin_workflow.JOB_STATUS.ERROR,
        result: e.message
      });
    }).finally(() => {
      setImmediate(() => {
        this.workflow.resume(job);
      });
    });
    processor.logger.trace(`llm invoke, waiting for response...`, {
      node: node.id
    });
    return processor.exit();
  }
  resume(node, job, processor) {
    const { ignoreFail } = node.config;
    if (ignoreFail) {
      job.set("status", import_plugin_workflow.JOB_STATUS.RESOLVED);
    }
    return job;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LLMInstruction
});
