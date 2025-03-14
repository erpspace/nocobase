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
var verifications_exports = {};
__export(verifications_exports, {
  create: () => create
});
module.exports = __toCommonJS(verifications_exports);
var import_actions = __toESM(require("@nocobase/actions"));
var import_database = require("@nocobase/database");
var import_dayjs = __toESM(require("dayjs"));
var import_crypto = require("crypto");
var import_util = require("util");
var import__ = require("..");
var import_constants = require("../constants");
const asyncRandomInt = (0, import_util.promisify)(import_crypto.randomInt);
async function create(context, next) {
  const plugin = context.app.getPlugin("verification");
  const { values } = context.action.params;
  const interceptor = plugin.interceptors.get(values == null ? void 0 : values.type);
  if (!interceptor) {
    return context.throw(400, "Invalid action type");
  }
  const providerItem = await plugin.getDefault();
  if (!providerItem) {
    console.error(`[verification] no provider for action (${values.type}) provided`);
    return context.throw(500);
  }
  const receiver = interceptor.getReceiver(context);
  if (!receiver) {
    return context.throw(400, {
      code: "InvalidReceiver",
      message: context.t("Not a valid cellphone number, please re-enter", { ns: import__.namespace })
    });
  }
  const VerificationModel = context.db.getModel("verifications");
  const record = await VerificationModel.findOne({
    where: {
      type: values.type,
      receiver,
      status: import_constants.CODE_STATUS_UNUSED,
      expiresAt: {
        [import_database.Op.gt]: /* @__PURE__ */ new Date()
      }
    }
  });
  if (record) {
    const seconds = (0, import_dayjs.default)(record.get("expiresAt")).diff((0, import_dayjs.default)(), "seconds");
    return context.throw(429, {
      code: "RateLimit",
      message: context.t("Please don't retry in {{time}} seconds", { time: seconds, ns: import__.namespace })
    });
  }
  const code = (await asyncRandomInt(999999)).toString(10).padStart(6, "0");
  if (interceptor.validate) {
    try {
      await interceptor.validate(context, receiver);
    } catch (err) {
      return context.throw(400, { code: "InvalidReceiver", message: err.message });
    }
  }
  const ProviderType = plugin.providers.get(providerItem.get("type"));
  const provider = new ProviderType(plugin, providerItem.get("options"));
  try {
    await provider.send(receiver, { code });
    console.log("verification code sent");
  } catch (error) {
    switch (error.name) {
      case "InvalidReceiver":
        return context.throw(400, {
          code: "InvalidReceiver",
          message: context.t("Not a valid cellphone number, please re-enter", { ns: import__.namespace })
        });
      case "RateLimit":
        return context.throw(429, context.t("You are trying so frequently, please slow down", { ns: import__.namespace }));
      default:
        console.error(error);
        return context.throw(
          500,
          context.t("Verification send failed, please try later or contact to administrator", { ns: import__.namespace })
        );
    }
  }
  const data = {
    id: (0, import_crypto.randomUUID)(),
    type: values.type,
    receiver,
    content: code,
    expiresAt: Date.now() + (interceptor.expiresIn ?? 60) * 1e3,
    status: import_constants.CODE_STATUS_UNUSED,
    providerId: providerItem.get("id")
  };
  context.action.mergeParams(
    {
      values: data
    },
    {
      values: "overwrite"
    }
  );
  await import_actions.default.create(context, async () => {
    const { body: result } = context;
    context.body = {
      id: result.id,
      expiresAt: result.expiresAt
    };
    return next();
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create
});
