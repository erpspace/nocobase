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
var api_keys_exports = {};
__export(api_keys_exports, {
  create: () => create,
  destroy: () => destroy
});
module.exports = __toCommonJS(api_keys_exports);
var import_actions = __toESM(require("@nocobase/actions"));
async function create(ctx, next) {
  const { values } = ctx.action.params;
  if (!values.role) {
    return;
  }
  const repository = ctx.db.getRepository("users.roles", ctx.auth.user.id);
  const role = await repository.findOne({
    filter: {
      name: values.role.name
    }
  });
  if (!role) {
    throw ctx.throw(400, ctx.t("Role not found"));
  }
  const token = ctx.app.authManager.jwt.sign(
    { userId: ctx.auth.user.id, roleName: role.name },
    { expiresIn: values.expiresIn }
  );
  ctx.action.mergeParams({
    values: {
      token
    }
  });
  return import_actions.default.create(ctx, async () => {
    ctx.body = {
      token
    };
    await next();
  });
}
async function destroy(ctx, next) {
  const repo = ctx.db.getRepository(ctx.action.resourceName);
  const { filterByTk } = ctx.action.params;
  const data = await repo.findById(filterByTk);
  const token = data == null ? void 0 : data.get("token");
  if (token) {
    await ctx.app.authManager.jwt.block(token);
  }
  return import_actions.default.destroy(ctx, next);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  create,
  destroy
});
