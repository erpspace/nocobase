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
var ai_exports = {};
__export(ai_exports, {
  default: () => ai_default
});
module.exports = __toCommonJS(ai_exports);
const aiResource = {
  name: "ai",
  actions: {
    listLLMProviders: async (ctx, next) => {
      const plugin = ctx.app.pm.get("ai");
      ctx.body = plugin.aiManager.listLLMProviders();
      await next();
    },
    listModels: async (ctx, next) => {
      const { llmService } = ctx.action.params;
      const plugin = ctx.app.pm.get("ai");
      const service = await ctx.db.getRepository("llmServices").findOne({
        filter: {
          name: llmService
        }
      });
      if (!service) {
        ctx.throw(400, "invalid llm service");
      }
      const providerOptions = plugin.aiManager.llmProviders.get(service.provider);
      if (!providerOptions) {
        ctx.throw(400, "invalid llm provider");
      }
      const options = service.options;
      const Provider = providerOptions.provider;
      const provider = new Provider({
        app: ctx.app,
        serviceOptions: options
      });
      const res = await provider.listModels();
      if (res.errMsg) {
        ctx.log.error(res.errMsg);
        ctx.throw(500, ctx.t("Get models list failed, you can enter a model name manually."));
      }
      ctx.body = res.models || [];
      return next();
    }
  }
};
var ai_default = aiResource;
