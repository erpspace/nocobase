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
var import_acl = require("@nocobase/acl");
var import_enum = require("../enum");
const map2obj = (map) => {
  const obj = {};
  for (const [key, value] of map) {
    obj[key] = value;
  }
  return obj;
};
async function checkAction(ctx, next) {
  const currentRoles = ctx.state.currentRoles;
  const roleInstances = await ctx.db.getRepository("roles").find({
    filter: {
      name: currentRoles
    },
    appends: ["menuUiSchemas"]
  });
  if (!roleInstances.length) {
    throw new Error(`Role ${currentRoles} not exists`);
  }
  const anonymous = await ctx.db.getRepository("roles").findOne({
    filter: {
      name: "anonymous"
    }
  });
  let roles = ctx.app.acl.getRoles(currentRoles);
  if (!roles.length) {
    await Promise.all(roleInstances.map((x) => ctx.app.emitAsync("acl:writeRoleToACL", x)));
    roles = ctx.app.acl.getRoles(currentRoles);
  }
  const availableActions = ctx.app.acl.getAvailableActions();
  const role = (0, import_acl.mergeRole)(roles);
  const allowMenuItemIds = roleInstances.flatMap(
    (roleInstance) => roleInstance.get("menuUiSchemas").map((uiSchema) => uiSchema.get("x-uid"))
  );
  let uiButtonSchemasBlacklist = [];
  const currentRole = ctx.state.currentRole;
  if (!currentRoles.includes("root")) {
    const eqCurrentRoleList = await ctx.db.getRepository("uiButtonSchemasRoles").find({
      filter: { roleName: currentRoles }
    }).then((list) => list.map((v) => v.uid));
    const NECurrentRoleList = await ctx.db.getRepository("uiButtonSchemasRoles").find({
      filter: { "roleName.$notIn": currentRoles }
    }).then((list) => list.map((v) => v.uid));
    uiButtonSchemasBlacklist = NECurrentRoleList.filter((uid) => !eqCurrentRoleList.includes(uid));
  }
  const systemSettings = await ctx.db.getRepository("systemSettings").findOne();
  const roleMode = (systemSettings == null ? void 0 : systemSettings.get("roleMode")) || import_enum.SystemRoleMode.default;
  ctx.body = {
    ...role,
    role: currentRole,
    roleMode,
    availableActions: [...availableActions.keys()],
    actionAlias: map2obj(ctx.app.acl.actionAlias),
    allowAll: !!currentRoles.includes("root"),
    allowConfigure: !!roleInstances.find((x) => x.get("allowConfigure")),
    allowMenuItemIds: [...new Set(allowMenuItemIds)],
    allowAnonymous: !!anonymous,
    uiButtonSchemasBlacklist
  };
  await next();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkAction
});
