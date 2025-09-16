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
var authenticators_exports = {};
__export(authenticators_exports, {
  default: () => authenticators_default
});
module.exports = __toCommonJS(authenticators_exports);
var import_preset = require("../../preset");
async function checkCount(repository, id) {
  const count = await repository.count({
    filter: {
      enabled: true,
      id: {
        $ne: id
      }
    }
  });
  if (count <= 0) {
    throw new Error("Please keep and enable at least one authenticator");
  }
}
var authenticators_default = {
  listTypes: async (ctx, next) => {
    ctx.body = ctx.app.authManager.listTypes();
    await next();
  },
  publicList: async (ctx, next) => {
    const repo = ctx.db.getRepository("authenticators");
    const authManager = ctx.app.authManager;
    const authenticators = await repo.find({
      fields: ["name", "authType", "title", "options", "sort"],
      filter: {
        enabled: true
      },
      sort: "sort"
    });
    ctx.body = authenticators.map((authenticator) => {
      var _a, _b;
      const authType = authManager.getAuthConfig(authenticator.authType);
      return {
        name: authenticator.name,
        authType: authenticator.authType,
        authTypeTitle: (authType == null ? void 0 : authType.title) || "",
        title: authenticator.title,
        options: ((_a = authType == null ? void 0 : authType.getPublicOptions) == null ? void 0 : _a.call(authType, authenticator.options)) || ((_b = authenticator.options) == null ? void 0 : _b.public) || {}
      };
    });
    await next();
  },
  destroy: async (ctx, next) => {
    const repository = ctx.db.getRepository("authenticators");
    const { filterByTk, filter } = ctx.action.params;
    try {
      await checkCount(repository, filterByTk);
    } catch (err) {
      ctx.throw(400, ctx.t(err.message, { ns: import_preset.namespace }));
    }
    const instance = await repository.destroy({
      filter,
      filterByTk,
      context: ctx
    });
    ctx.body = instance;
    await next();
  },
  update: async (ctx, next) => {
    const repository = ctx.db.getRepository("authenticators");
    const { forceUpdate, filterByTk, values, whitelist, blacklist, filter, updateAssociationValues } = ctx.action.params;
    if (!values.enabled) {
      try {
        await checkCount(repository, values.id);
      } catch (err) {
        ctx.throw(400, ctx.t(err.message, { ns: import_preset.namespace }));
      }
    }
    ctx.body = await repository.update({
      filterByTk,
      values,
      whitelist,
      blacklist,
      filter,
      updateAssociationValues,
      context: ctx,
      forceUpdate
    });
    await next();
  }
};
