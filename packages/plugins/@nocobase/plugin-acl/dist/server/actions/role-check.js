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
var role_check_exports = {};
__export(role_check_exports, {
  checkAction: () => checkAction
});
module.exports = __toCommonJS(role_check_exports);
const map2obj = (map) => {
  const obj = {};
  for (const [key, value] of map) {
    obj[key] = value;
  }
  return obj;
};
async function checkAction(ctx, next) {
  const currentRole = ctx.state.currentRole;
  const roleInstance = await ctx.db.getRepository("roles").findOne({
    filter: {
      name: currentRole
    },
    appends: ["menuUiSchemas"]
  });
  if (!roleInstance) {
    throw new Error(`Role ${currentRole} not exists`);
  }
  const anonymous = await ctx.db.getRepository("roles").findOne({
    filter: {
      name: "anonymous"
    }
  });
  let role = ctx.app.acl.getRole(currentRole);
  if (!role) {
    await ctx.app.emitAsync("acl:writeRoleToACL", roleInstance);
    role = ctx.app.acl.getRole(currentRole);
  }
  const availableActions = ctx.app.acl.getAvailableActions();
  let uiButtonSchemasBlacklist = [];
  if (currentRole !== "root") {
    const eqCurrentRoleList = await ctx.db.getRepository("uiButtonSchemasRoles").find({
      filter: { "roleName.$eq": currentRole }
    }).then((list) => list.map((v) => v.uid));
    const NECurrentRoleList = await ctx.db.getRepository("uiButtonSchemasRoles").find({
      filter: { "roleName.$ne": currentRole }
    }).then((list) => list.map((v) => v.uid));
    uiButtonSchemasBlacklist = NECurrentRoleList.filter((uid) => !eqCurrentRoleList.includes(uid));
  }
  ctx.body = {
    ...role.toJSON(),
    availableActions: [...availableActions.keys()],
    resources: [...role.resources.keys()],
    actionAlias: map2obj(ctx.app.acl.actionAlias),
    allowAll: currentRole === "root",
    allowConfigure: roleInstance.get("allowConfigure"),
    allowMenuItemIds: roleInstance.get("menuUiSchemas").map((uiSchema) => uiSchema.get("x-uid")),
    allowAnonymous: !!anonymous,
    uiButtonSchemasBlacklist
  };
  await next();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkAction
});
