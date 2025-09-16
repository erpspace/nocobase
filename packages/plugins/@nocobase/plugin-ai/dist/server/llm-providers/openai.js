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
var openai_exports = {};
__export(openai_exports, {
  OpenAIProvider: () => OpenAIProvider,
  openaiProviderOptions: () => openaiProviderOptions
});
module.exports = __toCommonJS(openai_exports);
var import_openai = require("@langchain/openai");
var import_provider = require("./provider");
class OpenAIProvider extends import_provider.LLMProvider {
  get baseURL() {
    return "https://api.openai.com/v1";
  }
  createModel() {
    const { baseURL, apiKey } = this.serviceOptions || {};
    const { responseFormat, structuredOutput } = this.modelOptions || {};
    const { schema } = structuredOutput || {};
    const responseFormatOptions = {
      type: responseFormat
    };
    if (responseFormat === "json_schema" && schema) {
      responseFormatOptions["json_schema"] = schema;
    }
    return new import_openai.ChatOpenAI({
      apiKey,
      ...this.modelOptions,
      modelKwargs: {
        response_format: responseFormatOptions
      },
      configuration: {
        baseURL: baseURL || this.baseURL
      }
    });
  }
}
const openaiProviderOptions = {
  title: "OpenAI",
  provider: OpenAIProvider
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OpenAIProvider,
  openaiProviderOptions
});
