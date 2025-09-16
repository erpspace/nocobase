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
var sms_exports = {};
__export(sms_exports, {
  SMSOTPProviderManager: () => SMSOTPProviderManager,
  SMSOTPVerification: () => SMSOTPVerification
});
module.exports = __toCommonJS(sms_exports);
var import_utils = require("@nocobase/utils");
var import__ = require("..");
class SMSOTPProviderManager {
  providers = new import_utils.Registry();
  registerProvider(type, options) {
    this.providers.register(type, options);
  }
  listProviders() {
    return Array.from(this.providers.getEntities()).map(([providerType, options]) => ({
      name: providerType,
      title: options.title
    }));
  }
}
class SMSOTPVerification extends import__.OTPVerification {
  async getProvider() {
    const { provider: providerType, settings } = this.options;
    if (!providerType) {
      return null;
    }
    const plugin = this.ctx.app.pm.get("verification");
    const providerOptions = plugin.smsOTPProviderManager.providers.get(providerType);
    if (!providerOptions) {
      return null;
    }
    const Provider = providerOptions.provider;
    if (!Provider) {
      return null;
    }
    const options = this.ctx.app.environment.renderJsonTemplate(settings);
    return new Provider(options);
  }
  async getPublicBoundInfo(userId) {
    const boundInfo = await this.getBoundInfo(userId);
    if (!boundInfo) {
      return { bound: false };
    }
    const { uuid: phone } = boundInfo;
    return {
      bound: true,
      publicInfo: "*".repeat(phone.length - 4) + phone.slice(-4)
    };
  }
  async validateBoundInfo({ uuid: phone }) {
    if (!phone) {
      throw new Error(this.ctx.t("Not a valid cellphone number, please re-enter"));
    }
    return true;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SMSOTPProviderManager,
  SMSOTPVerification
});
