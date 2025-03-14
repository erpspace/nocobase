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
var sms_aliyun_exports = {};
__export(sms_aliyun_exports, {
  default: () => sms_aliyun_default
});
module.exports = __toCommonJS(sms_aliyun_exports);
var import_dysmsapi20170525 = __toESM(require("@alicloud/dysmsapi20170525"));
var OpenApi = __toESM(require("@alicloud/openapi-client"));
var import_tea_util = require("@alicloud/tea-util");
var import_Provider = require("./Provider");
class sms_aliyun_default extends import_Provider.Provider {
  client;
  constructor(plugin, options) {
    super(plugin, options);
    const { accessKeyId, accessKeySecret, endpoint } = this.options;
    const config = new OpenApi.Config({
      // 您的 AccessKey ID
      accessKeyId,
      // 您的 AccessKey Secret
      accessKeySecret
    });
    config.endpoint = endpoint;
    this.client = new import_dysmsapi20170525.default(config);
  }
  async send(phoneNumbers, data = {}) {
    const request = new import_dysmsapi20170525.SendSmsRequest({
      phoneNumbers,
      signName: this.options.sign,
      templateCode: this.options.template,
      templateParam: JSON.stringify(data)
    });
    try {
      const { body } = await this.client.sendSmsWithOptions(request, new import_tea_util.RuntimeOptions({}));
      const err = new Error(body.message);
      switch (body.code) {
        case "OK":
          break;
        case "isv.MOBILE_NUMBER_ILLEGAL":
          err.name = "InvalidReceiver";
          return Promise.reject(err);
        case "isv.BUSINESS_LIMIT_CONTROL":
          err.name = "RateLimit";
          console.error(body);
          return Promise.reject(err);
        default:
          console.error(body);
          err.name = "SendSMSFailed";
          return Promise.reject(err);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
