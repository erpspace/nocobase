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
var plugin_exports = {};
__export(plugin_exports, {
  PluginAIServer: () => PluginAIServer,
  default: () => plugin_default
});
module.exports = __toCommonJS(plugin_exports);
var import_server = require("@nocobase/server");
var import_ai_manager = require("./manager/ai-manager");
var import_openai = require("./llm-providers/openai");
var import_deepseek = require("./llm-providers/deepseek");
var import_ai = __toESM(require("./resource/ai"));
var import_llm = require("./workflow/nodes/llm");
class PluginAIServer extends import_server.Plugin {
  aiManager = new import_ai_manager.AIManager();
  async afterAdd() {
  }
  async beforeLoad() {
  }
  async load() {
    this.aiManager.registerLLMProvider("openai", import_openai.openaiProviderOptions);
    this.aiManager.registerLLMProvider("deepseek", import_deepseek.deepseekProviderOptions);
    this.app.resourceManager.define(import_ai.default);
    this.app.acl.registerSnippet({
      name: `pm.${this.name}.llm-services`,
      actions: ["ai:*", "llmServices:*"]
    });
    const workflowSnippet = this.app.acl.snippetManager.snippets.get("pm.workflow.workflows");
    if (workflowSnippet) {
      workflowSnippet.actions.push("ai:listModels");
    }
    const workflow = this.app.pm.get("workflow");
    workflow.registerInstruction("llm", import_llm.LLMInstruction);
  }
  async install() {
  }
  async afterEnable() {
  }
  async afterDisable() {
  }
  async remove() {
  }
}
var plugin_default = PluginAIServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginAIServer
});
