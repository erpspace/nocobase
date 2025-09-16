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
var import_server = require("@nocobase/server");
var import_utils = require("@nocobase/utils");
var import__ = require(".");
var import_constants = require("../constants");
var import_verification_manager = require("./verification-manager");
var import_sms = require("./otp-verification/sms");
var import_constants2 = require("../constants");
var import_verifiers = __toESM(require("./actions/verifiers"));
var import_sms_aliyun = __toESM(require("./otp-verification/sms/providers/sms-aliyun"));
var import_sms_tencent = __toESM(require("./otp-verification/sms/providers/sms-tencent"));
var import_sms_otp_providers = __toESM(require("./otp-verification/sms/resource/sms-otp-providers"));
var import_sms_otp = __toESM(require("./otp-verification/sms/resource/sms-otp"));
class PluginVerficationServer extends import_server.Plugin {
  verificationManager = new import_verification_manager.VerificationManager({ db: this.db });
  smsOTPProviderManager = new import_sms.SMSOTPProviderManager();
  smsOTPCounter;
  async afterAdd() {
    this.app.on("afterLoad", async () => {
      this.smsOTPCounter = await this.app.cacheManager.createCounter(
        {
          name: "smsOTPCounter",
          prefix: "sms-otp:attempts"
        },
        this.app.lockManager
      );
    });
  }
  async load() {
    this.app.dataSourceManager.use(this.verificationManager.middleware());
    this.app.resourceManager.define(import_sms_otp_providers.default);
    this.app.resourceManager.define(import_sms_otp.default);
    Object.entries(import_verifiers.default).forEach(
      ([action, handler]) => this.app.resourceManager.registerActionHandler(`verifiers:${action}`, handler)
    );
    this.app.acl.allow("verifiers", "listByUser", "loggedIn");
    this.app.acl.allow("verifiers", "listForVerify", "loggedIn");
    this.app.acl.allow("verifiers", "bind", "loggedIn");
    this.app.acl.allow("verifiers", "unbind", "loggedIn");
    this.app.acl.allow("smsOTP", "create", "loggedIn");
    this.app.acl.allow("smsOTP", "publicCreate");
    this.app.acl.registerSnippet({
      name: `pm.${this.name}.verifiers`,
      actions: ["verifiers:*", "smsOTPProviders:*"]
    });
    this.verificationManager.registerVerificationType(import_constants2.SMS_OTP_VERIFICATION_TYPE, {
      title: (0, import_utils.tval)("SMS OTP", { ns: import__.namespace }),
      description: (0, import_utils.tval)("Get one-time codes sent to your phone via SMS to complete authentication requests.", {
        ns: import__.namespace
      }),
      bindingRequired: true,
      verification: import_sms.SMSOTPVerification
    });
    this.verificationManager.addSceneRule(
      (scene, verificationType) => ["auth-sms", "unbind-verifier"].includes(scene) && verificationType === import_constants2.SMS_OTP_VERIFICATION_TYPE
    );
    this.verificationManager.registerAction("verifiers:bind", {
      manual: true,
      getBoundInfoFromCtx: (ctx) => {
        return ctx.action.params.values || {};
      }
    });
    this.verificationManager.registerScene("unbind-verifier", {
      actions: {
        "verifiers:unbind": {}
      }
    });
    this.smsOTPProviderManager.registerProvider(import_constants.PROVIDER_TYPE_SMS_ALIYUN, {
      title: (0, import_utils.tval)("Aliyun SMS", { ns: import__.namespace }),
      provider: import_sms_aliyun.default
    });
    this.smsOTPProviderManager.registerProvider(import_constants.PROVIDER_TYPE_SMS_TENCENT, {
      title: (0, import_utils.tval)("Tencent SMS", { ns: import__.namespace }),
      provider: import_sms_tencent.default
    });
  }
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
}
