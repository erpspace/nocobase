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
var sms_tencent_exports = {};
__export(sms_tencent_exports, {
  default: () => sms_tencent_default
});
module.exports = __toCommonJS(sms_tencent_exports);
var tencentcloud = __toESM(require("tencentcloud-sdk-nodejs"));
var import_Provider = require("./Provider");
const smsClient = tencentcloud.sms.v20210111.Client;
class sms_tencent_default extends import_Provider.Provider {
  client;
  constructor(plugin, options) {
    super(plugin, options);
    const { secretId, secretKey, region, endpoint } = this.options;
    this.client = new smsClient({
      credential: {
        secretId,
        secretKey
      },
      region,
      profile: {
        httpProfile: {
          endpoint
        }
      }
    });
  }
  async send(phoneNumbers, data) {
    const { SignName, TemplateId, SmsSdkAppId } = this.options;
    const result = await this.client.SendSms({
      PhoneNumberSet: [phoneNumbers],
      SignName,
      TemplateId,
      SmsSdkAppId,
      TemplateParamSet: [data.code]
    });
    const errCode = result.SendStatusSet[0].Code;
    const error = new Error(`${errCode}:${result.SendStatusSet[0].Message}`);
    switch (errCode) {
      case "Ok":
        return result.RequestId;
      case "InvalidParameterValue.IncorrectPhoneNumber":
        error.name = "InvalidReceiver";
        break;
      case "LimitExceeded.DeliveryFrequencyLimit":
      case "LimitExceeded.PhoneNumberDailyLimit":
      case "LimitExceeded.PhoneNumberThirtySecondLimit":
      case "LimitExceeded.PhoneNumberOneHourLimit":
        error.name = "RateLimit";
    }
    throw error;
  }
}
