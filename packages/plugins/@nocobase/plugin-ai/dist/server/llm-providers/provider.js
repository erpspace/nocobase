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
var provider_exports = {};
__export(provider_exports, {
  LLMProvider: () => LLMProvider
});
module.exports = __toCommonJS(provider_exports);
var import_axios = __toESM(require("axios"));
var import_parse_messages = require("./handlers/parse-messages");
class LLMProvider {
  serviceOptions;
  modelOptions;
  messages;
  chatModel;
  chatHandlers = /* @__PURE__ */ new Map();
  get baseURL() {
    return null;
  }
  constructor(opts) {
    const { app, serviceOptions, chatOptions } = opts;
    this.serviceOptions = app.environment.renderJsonTemplate(serviceOptions);
    if (chatOptions) {
      const { messages, ...modelOptions } = chatOptions;
      this.modelOptions = modelOptions;
      this.messages = messages;
      this.chatModel = this.createModel();
      this.registerChatHandler("parse-messages", import_parse_messages.parseMessages);
    }
  }
  registerChatHandler(name, handler) {
    this.chatHandlers.set(name, handler.bind(this));
  }
  async invokeChat() {
    for (const handler of this.chatHandlers.values()) {
      await handler();
    }
    return this.chatModel.invoke(this.messages);
  }
  async listModels() {
    const options = this.serviceOptions || {};
    const apiKey = options.apiKey;
    let baseURL = options.baseURL || this.baseURL;
    if (!baseURL) {
      return { code: 400, errMsg: "baseURL is required" };
    }
    if (!apiKey) {
      return { code: 400, errMsg: "API Key required" };
    }
    if (baseURL && baseURL.endsWith("/")) {
      baseURL = baseURL.slice(0, -1);
    }
    try {
      if (baseURL && baseURL.endsWith("/")) {
        baseURL = baseURL.slice(0, -1);
      }
      const res = await import_axios.default.get(`${baseURL}/models`, {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      });
      return { models: res == null ? void 0 : res.data.data };
    } catch (e) {
      return { code: 500, errMsg: e.message };
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LLMProvider
});
