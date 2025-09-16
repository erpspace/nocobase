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
var verifiers_exports = {};
__export(verifiers_exports, {
  default: () => verifiers_default
});
module.exports = __toCommonJS(verifiers_exports);
var import_package = __toESM(require("../../../package.json"));
var import_lodash = __toESM(require("lodash"));
var verifiers_default = {
  listTypes: async (ctx, next) => {
    const plugin = ctx.app.pm.get("verification");
    ctx.body = plugin.verificationManager.listTypes();
    await next();
  },
  listByScene: async (ctx, next) => {
    const { scene } = ctx.action.params || {};
    const plugin = ctx.app.pm.get("verification");
    const verificationTypes = plugin.verificationManager.getVerificationTypesByScene(scene);
    if (!verificationTypes.length) {
      ctx.body = { verifiers: [], availableTypes: [] };
      return next();
    }
    const verifiers = await ctx.db.getRepository("verifiers").find({
      filter: {
        verificationType: verificationTypes.map((item) => item.type)
      }
    });
    ctx.body = {
      verifiers: (verifiers || []).map((item) => ({
        name: item.name,
        title: item.title
      })),
      availableTypes: verificationTypes.map((item) => ({
        name: item.type,
        title: item.title
      }))
    };
    await next();
  },
  listByUser: async (ctx, next) => {
    const plugin = ctx.app.pm.get("verification");
    const verificationTypes = plugin.verificationManager.verificationTypes;
    const bindingRequiredTypes = Array.from(verificationTypes.getEntities()).filter(([, options]) => options.bindingRequired).map(([type]) => type);
    const verifiers = await ctx.db.getRepository("verifiers").find({
      filter: {
        verificationType: bindingRequiredTypes
      }
    });
    const result = [];
    for (const verifier of verifiers) {
      try {
        const verificationType = plugin.verificationManager.verificationTypes.get(verifier.verificationType);
        const Verification = plugin.verificationManager.getVerification(verifier.verificationType);
        const verification = new Verification({ ctx, verifier, options: verifier.options });
        const boundInfo = await verification.getPublicBoundInfo(ctx.auth.user.id);
        result.push({
          ...import_lodash.default.omit(verifier.dataValues, "options"),
          title: verifier.title || verificationType.title,
          description: verifier.description || verificationType.description,
          boundInfo
        });
      } catch (error) {
        ctx.log.error(error);
      }
    }
    ctx.body = result;
    await next();
  },
  listForVerify: async (ctx, next) => {
    const { scene } = ctx.action.params || {};
    const plugin = ctx.app.pm.get("verification");
    const verificationTypes = plugin.verificationManager.getVerificationTypesByScene(scene);
    if (!verificationTypes.length) {
      ctx.body = [];
      return next();
    }
    const verifiers = await ctx.db.getRepository("verifiers").find({
      filter: {
        verificationType: verificationTypes.map((item) => item.type)
      }
    });
    if (!verifiers.length) {
      ctx.body = [];
      return next();
    }
    const result = [];
    for (const verifier of verifiers) {
      const verificationType = plugin.verificationManager.verificationTypes.get(verifier.verificationType);
      const Verification = plugin.verificationManager.getVerification(verifier.verificationType);
      const verification = new Verification({ ctx, verifier, options: verifier.options });
      const publicBoundInfo = await verification.getPublicBoundInfo(ctx.auth.user.id);
      if (!(publicBoundInfo == null ? void 0 : publicBoundInfo.bound)) {
        continue;
      }
      result.push({
        name: verifier.name,
        title: verifier.title,
        verificationType: verifier.verificationType,
        verificationTypeTitle: verificationType == null ? void 0 : verificationType.title,
        boundInfo: publicBoundInfo
      });
    }
    ctx.body = result;
    await next();
  },
  bind: async (ctx, next) => {
    const { verifier: name } = ctx.action.params.values || {};
    const user = ctx.auth.user;
    const verificationPlugin = ctx.app.pm.get("verification");
    const record = await verificationPlugin.verificationManager.getBoundRecord(user.id, name);
    if (record) {
      return ctx.throw(400, ctx.t("You have already bound this verifier", { ns: import_package.default.name }));
    }
    const verifier = await verificationPlugin.verificationManager.getVerifier(name);
    if (!verifier) {
      return ctx.throw(400, ctx.t("Invalid verifier"));
    }
    const Verification = verificationPlugin.verificationManager.getVerification(verifier.verificationType);
    const verification = new Verification({ ctx, verifier, options: verifier.options });
    const { uuid, meta } = await verification.bind(user.id);
    await verifier.addUser(user.id, {
      through: {
        uuid,
        meta
      }
    });
    ctx.body = {};
    await next();
  },
  unbind: async (ctx, next) => {
    const { unbindVerifier: name } = ctx.action.params.values || {};
    const user = ctx.auth.user;
    const verificationPlugin = ctx.app.pm.get("verification");
    const verifier = await verificationPlugin.verificationManager.getVerifier(name);
    if (!verifier) {
      return ctx.throw(400, ctx.t("Invalid verifier"));
    }
    await verifier.removeUser(user.id);
    await next();
  }
};
