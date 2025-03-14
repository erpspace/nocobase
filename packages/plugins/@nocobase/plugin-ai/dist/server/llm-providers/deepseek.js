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
var deepseek_exports = {};
__export(deepseek_exports, {
  DeepSeekProvider: () => DeepSeekProvider,
  deepseekProviderOptions: () => deepseekProviderOptions
});
module.exports = __toCommonJS(deepseek_exports);
var import_deepseek = require("@langchain/deepseek");
var import_provider = require("./provider");
class DeepSeekProvider extends import_provider.LLMProvider {
  get baseURL() {
    return "https://api.deepseek.com";
  }
  createModel() {
    const { baseURL, apiKey } = this.serviceOptions || {};
    const { responseFormat } = this.modelOptions || {};
    return new import_deepseek.ChatDeepSeek({
      apiKey,
      ...this.modelOptions,
      modelKwargs: {
        response_format: {
          type: responseFormat
        }
      },
      configuration: {
        baseURL: baseURL || this.baseURL
      }
    });
  }
}
const deepseekProviderOptions = {
  title: "DeepSeek",
  provider: DeepSeekProvider
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeepSeekProvider,
  deepseekProviderOptions
});
