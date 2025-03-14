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
var Plugin_exports = {};
__export(Plugin_exports, {
  default: () => PluginVerficationServer
});
module.exports = __toCommonJS(Plugin_exports);
var import_path = __toESM(require("path"));
var import_database = require("@nocobase/database");
var import_server = require("@nocobase/server");
var import_utils = require("@nocobase/utils");
var import__ = require(".");
var import_actions2 = __toESM(require("./actions"));
var import_constants = require("./constants");
var import_providers = __toESM(require("./providers"));
class PluginVerficationServer extends import_server.Plugin {
  providers = new import_utils.Registry();
  interceptors = new import_utils.Registry();
  intercept = async (context, next) => {
    const { resourceName, actionName, values } = context.action.params;
    const key = `${resourceName}:${actionName}`;
    const interceptor = this.interceptors.get(key);
    if (!interceptor) {
      return context.throw(400);
    }
    const receiver = interceptor.getReceiver(context);
    const content = interceptor.getCode ? interceptor.getCode(context) : values.code;
    if (!receiver || !content) {
      return context.throw(400);
    }
    const VerificationRepo = this.db.getRepository("verifications");
    const item = await VerificationRepo.findOne({
      filter: {
        receiver,
        type: key,
        content,
        expiresAt: {
          [import_database.Op.gt]: /* @__PURE__ */ new Date()
        },
        status: import_constants.CODE_STATUS_UNUSED
      }
    });
    if (!item) {
      return context.throw(400, {
        code: "InvalidVerificationCode",
        message: context.t("Verification code is invalid", { ns: import__.namespace })
      });
    }
    try {
      await next();
    } finally {
      await item.update({
        status: import_constants.CODE_STATUS_USED
      });
    }
  };
  async install() {
    const {
      DEFAULT_SMS_VERIFY_CODE_PROVIDER,
      INIT_ALI_SMS_ACCESS_KEY,
      INIT_ALI_SMS_ACCESS_KEY_SECRET,
      INIT_ALI_SMS_ENDPOINT = "dysmsapi.aliyuncs.com",
      INIT_ALI_SMS_VERIFY_CODE_TEMPLATE,
      INIT_ALI_SMS_VERIFY_CODE_SIGN
    } = process.env;
    if (DEFAULT_SMS_VERIFY_CODE_PROVIDER && INIT_ALI_SMS_ACCESS_KEY && INIT_ALI_SMS_ACCESS_KEY_SECRET && INIT_ALI_SMS_VERIFY_CODE_TEMPLATE && INIT_ALI_SMS_VERIFY_CODE_SIGN) {
      const ProviderRepo = this.db.getRepository("verifications_providers");
      const existed = await ProviderRepo.count({
        filterByTk: DEFAULT_SMS_VERIFY_CODE_PROVIDER
      });
      if (existed) {
        return;
      }
      await ProviderRepo.create({
        values: {
          id: DEFAULT_SMS_VERIFY_CODE_PROVIDER,
          type: import_constants.PROVIDER_TYPE_SMS_ALIYUN,
          title: "Default SMS sender",
          options: {
            accessKeyId: INIT_ALI_SMS_ACCESS_KEY,
            accessKeySecret: INIT_ALI_SMS_ACCESS_KEY_SECRET,
            endpoint: INIT_ALI_SMS_ENDPOINT,
            sign: INIT_ALI_SMS_VERIFY_CODE_SIGN,
            template: INIT_ALI_SMS_VERIFY_CODE_TEMPLATE
          },
          default: true
        }
      });
    }
  }
  async load() {
    const { app, db, options } = this;
    await this.importCollections(import_path.default.resolve(__dirname, "collections"));
    await (0, import_providers.default)(this);
    (0, import_actions2.default)(this);
    const self = this;
    app.resourceManager.use(async function verificationIntercept(context, next) {
      const { resourceName, actionName, values } = context.action.params;
      const key = `${resourceName}:${actionName}`;
      const interceptor = self.interceptors.get(key);
      if (!interceptor || interceptor.manual) {
        return next();
      }
      return self.intercept(context, next);
    });
    app.acl.allow("verifications", "create", "public");
    this.app.acl.registerSnippet({
      name: `pm.${this.name}.providers`,
      actions: ["verifications_providers:*"]
    });
  }
  async getDefault() {
    const providerRepo = this.db.getRepository("verifications_providers");
    return providerRepo.findOne({
      filter: {
        default: true
      }
    });
  }
}
