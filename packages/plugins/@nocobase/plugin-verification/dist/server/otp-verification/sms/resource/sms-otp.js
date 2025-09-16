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
var sms_otp_exports = {};
__export(sms_otp_exports, {
  default: () => sms_otp_default
});
module.exports = __toCommonJS(sms_otp_exports);
var import_dayjs = __toESM(require("dayjs"));
var import_crypto = require("crypto");
var import_util = require("util");
var import_constants = require("../../../constants");
var import__2 = require("../../..");
const asyncRandomInt = (0, import_util.promisify)(import_crypto.randomInt);
async function create(ctx, next) {
  var _a;
  const { action: actionName, verifier: verifierName } = ((_a = ctx.action.params) == null ? void 0 : _a.values) || {};
  const plugin = ctx.app.getPlugin("verification");
  const verificationManager = plugin.verificationManager;
  const action = verificationManager.actions.get(actionName);
  if (!action) {
    return ctx.throw(400, "Invalid action type");
  }
  if (!verifierName) {
    return ctx.throw(400, "Invalid verifier");
  }
  const verifier = await ctx.db.getRepository("verifiers").findOne({
    filter: {
      name: verifierName
    }
  });
  if (!verifier) {
    return ctx.throw(400, "Invalid verifier");
  }
  const Verification = verificationManager.getVerification(verifier.verificationType);
  const verification = new Verification({
    ctx,
    verifier,
    options: verifier.options
  });
  const provider = await verification.getProvider();
  if (!provider) {
    ctx.log.error(`[verification] no provider for action (${actionName}) provided`);
    return ctx.throw(500, "Invalid provider");
  }
  const { boundInfo } = await verificationManager.getAndValidateBoundInfo(ctx, action, verification);
  const { uuid: receiver } = boundInfo;
  const record = await ctx.db.getRepository("otpRecords").findOne({
    filter: {
      action: actionName,
      receiver,
      status: import_constants.CODE_STATUS_UNUSED,
      expiresAt: {
        $dateAfter: /* @__PURE__ */ new Date()
      }
    }
  });
  if (record) {
    const seconds = (0, import_dayjs.default)(record.get("expiresAt")).diff((0, import_dayjs.default)(), "seconds");
    return ctx.throw(429, {
      code: "RateLimit",
      message: ctx.t("Please don't retry in {{time}} seconds", { time: seconds, ns: import__2.namespace })
    });
  }
  const code = (await asyncRandomInt(999999)).toString(10).padStart(6, "0");
  try {
    await provider.send(receiver, { code });
  } catch (error) {
    switch (error.name) {
      case "InvalidReceiver":
        return ctx.throw(400, {
          code: "InvalidReceiver",
          message: ctx.t("Not a valid cellphone number, please re-enter", { ns: import__2.namespace })
        });
      case "RateLimit":
        return ctx.throw(429, ctx.t("You are trying so frequently, please slow down", { ns: import__2.namespace }));
      default:
        ctx.log.error(error);
        return ctx.throw(
          500,
          ctx.t("Verification send failed, please try later or contact to administrator", { ns: import__2.namespace })
        );
    }
  }
  const result = await ctx.db.getRepository("otpRecords").create({
    values: {
      id: (0, import_crypto.randomUUID)(),
      action: actionName,
      receiver,
      code,
      expiresAt: Date.now() + (verification.expiresIn ?? 60) * 1e3,
      status: import_constants.CODE_STATUS_UNUSED,
      verifierName
    }
  });
  ctx.body = {
    id: result.id,
    expiresAt: result.expiresAt
  };
  return next();
}
var sms_otp_default = {
  name: "smsOTP",
  actions: {
    create,
    publicCreate: create
  }
};
