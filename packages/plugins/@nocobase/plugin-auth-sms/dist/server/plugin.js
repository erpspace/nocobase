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
var plugin_exports = {};
__export(plugin_exports, {
  PluginAuthSMSServer: () => PluginAuthSMSServer,
  default: () => plugin_default
});
module.exports = __toCommonJS(plugin_exports);
var import_server = require("@nocobase/server");
var import_constants = require("../constants");
var import_sms_auth = require("./sms-auth");
var import_utils = require("@nocobase/utils");
class PluginAuthSMSServer extends import_server.Plugin {
  afterAdd() {
  }
  async load() {
    const verificationPlugin = this.app.getPlugin("verification");
    if (!verificationPlugin) {
      this.app.logger.warn("auth-sms: @nocobase/plugin-verification is required");
      return;
    }
    verificationPlugin.interceptors.register("auth:signIn", {
      manual: true,
      getReceiver: (ctx) => {
        return ctx.action.params.values.phone;
      },
      expiresIn: 120,
      validate: async (ctx, phone) => {
        if (!phone) {
          throw new Error(ctx.t("Not a valid cellphone number, please re-enter"));
        }
        return true;
      }
    });
    this.app.authManager.registerTypes(import_constants.authType, {
      auth: import_sms_auth.SMSAuth,
      title: (0, import_utils.tval)("SMS", { ns: import_constants.namespace })
    });
  }
  async install(options) {
  }
  async afterEnable() {
  }
  async afterDisable() {
  }
  async remove() {
  }
}
var plugin_default = PluginAuthSMSServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginAuthSMSServer
});
