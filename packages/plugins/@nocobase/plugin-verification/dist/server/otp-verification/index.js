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
var otp_verification_exports = {};
__export(otp_verification_exports, {
  OTPVerification: () => OTPVerification
});
module.exports = __toCommonJS(otp_verification_exports);
var import_verification = require("../verification");
var import_constants = require("../constants");
var import_package = __toESM(require("../../../package.json"));
var import_dayjs = __toESM(require("dayjs"));
class OTPVerification extends import_verification.Verification {
  expiresIn = 120;
  maxVerifyAttempts = 5;
  async verify({ resource, action, boundInfo, verifyParams }) {
    const { uuid: receiver } = boundInfo;
    const code = verifyParams.code;
    if (!code) {
      return this.ctx.throw(400, "Verification code is invalid");
    }
    const plugin = this.ctx.app.pm.get("verification");
    const counter = plugin.smsOTPCounter;
    const key = `${resource}:${action}:${receiver}`;
    let attempts = 0;
    try {
      attempts = await counter.get(key);
    } catch (e) {
      this.ctx.logger.error(e.message, {
        module: "verification",
        submodule: "sms-otp",
        method: "verify",
        receiver,
        action: `${resource}:${action}`
      });
      this.ctx.throw(500, "Internal Server Error");
    }
    if (attempts > this.maxVerifyAttempts) {
      this.ctx.throw(
        429,
        this.ctx.t("Too many failed attempts. Please request a new verification code.", { ns: import_package.default.name })
      );
    }
    const repo = this.ctx.db.getRepository("otpRecords");
    const item = await repo.findOne({
      filter: {
        receiver,
        action: `${resource}:${action}`,
        code,
        expiresAt: {
          $dateAfter: /* @__PURE__ */ new Date()
        },
        status: import_constants.CODE_STATUS_UNUSED,
        verifierName: this.verifier.name
      }
    });
    if (!item) {
      let attempts2 = 0;
      try {
        let ttl = this.expiresIn * 1e3;
        const record = await repo.findOne({
          filter: {
            action: `${resource}:${action}`,
            receiver,
            status: import_constants.CODE_STATUS_UNUSED,
            expiresAt: {
              $dateAfter: /* @__PURE__ */ new Date()
            }
          }
        });
        if (record) {
          ttl = (0, import_dayjs.default)(record.get("expiresAt")).diff((0, import_dayjs.default)());
        }
        attempts2 = await counter.incr(key, ttl);
      } catch (e) {
        this.ctx.logger.error(e.message, {
          module: "verification",
          submodule: "totp-authenticator",
          method: "verify",
          receiver,
          action: `${resource}:${action}`
        });
        this.ctx.throw(500, "Internal Server Error");
      }
      if (attempts2 > this.maxVerifyAttempts) {
        this.ctx.throw(
          429,
          this.ctx.t("Too many failed attempts. Please request a new verification code", { ns: import_package.default.name })
        );
      }
      return this.ctx.throw(400, {
        code: "InvalidVerificationCode",
        message: this.ctx.t("Verification code is invalid", { ns: import_package.default.name })
      });
    }
    await counter.reset(key);
    return { codeInfo: item };
  }
  async bind(userId, resource, action) {
    const { uuid, code } = this.ctx.action.params.values || {};
    await this.verify({
      resource: resource || "verifiers",
      action: action || "bind",
      boundInfo: { uuid },
      verifyParams: { code }
    });
    return { uuid };
  }
  async onActionComplete({ verifyResult }) {
    const { codeInfo } = verifyResult;
    await codeInfo.update({
      status: import_constants.CODE_STATUS_USED
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  OTPVerification
});
