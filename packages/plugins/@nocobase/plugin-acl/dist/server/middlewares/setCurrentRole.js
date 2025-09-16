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
var setCurrentRole_exports = {};
__export(setCurrentRole_exports, {
  setCurrentRole: () => setCurrentRole
});
module.exports = __toCommonJS(setCurrentRole_exports);
var import_constants = require("../constants");
var import_enum = require("../enum");
var import_lodash = __toESM(require("lodash"));
async function setCurrentRole(ctx, next) {
  var _a, _b, _c;
  let currentRole = ctx.get("X-Role");
  if (currentRole === "anonymous") {
    ctx.state.currentRole = currentRole;
    return next();
  }
  if (!ctx.state.currentUser) {
    return next();
  }
  const attachRoles = ctx.state.attachRoles || [];
  const cache = ctx.cache;
  const repository = ctx.db.getRepository("users.roles", ctx.state.currentUser.id);
  const roles = await cache.wrap(
    `roles:${ctx.state.currentUser.id}`,
    () => repository.find({
      raw: true
    })
  );
  if (!roles.length && !attachRoles.length) {
    ctx.state.currentRole = void 0;
    return ctx.throw(401, {
      code: "USER_HAS_NO_ROLES_ERR",
      message: ctx.t("The current user has no roles. Please try another account.", { ns: "acl" })
    });
  }
  const rolesMap = /* @__PURE__ */ new Map();
  attachRoles.forEach((role2) => rolesMap.set(role2.name, role2));
  roles.forEach((role2) => rolesMap.set(role2.name, role2));
  const userRoles = Array.from(rolesMap.values());
  ctx.state.currentUser.roles = userRoles;
  const systemSettings = await cache.wrap(
    `app:systemSettings`,
    () => ctx.db.getRepository("systemSettings").findOne({ raw: true })
  );
  const roleMode = (systemSettings == null ? void 0 : systemSettings.roleMode) || import_enum.SystemRoleMode.default;
  if ([currentRole, ctx.state.currentRole].includes(import_constants.UNION_ROLE_KEY) && roleMode === import_enum.SystemRoleMode.default) {
    currentRole = userRoles[0].name;
    ctx.state.currentRole = userRoles[0].name;
    ctx.headers["x-role"] = userRoles[0].name;
  } else if (roleMode === import_enum.SystemRoleMode.onlyUseUnion) {
    ctx.state.currentRole = import_constants.UNION_ROLE_KEY;
    ctx.headers["x-role"] = import_constants.UNION_ROLE_KEY;
    ctx.state.currentRoles = userRoles.map((role2) => role2.name);
    return next();
  }
  if (currentRole === import_constants.UNION_ROLE_KEY) {
    ctx.state.currentRole = import_constants.UNION_ROLE_KEY;
    ctx.state.currentRoles = userRoles.map((role2) => role2.name);
    return next();
  }
  let role;
  if (currentRole) {
    role = (_a = userRoles.find((role2) => role2.name === currentRole)) == null ? void 0 : _a.name;
    if (!role) {
      return ctx.throw(401, {
        code: "ROLE_NOT_FOUND_FOR_USER",
        message: ctx.t("The role does not belong to the user", { ns: "acl" })
      });
    }
  }
  if (!role) {
    const defaultRoleModel = await cache.wrapWithCondition(
      `roles:${ctx.state.currentUser.id}:defaultRole`,
      () => ctx.db.getRepository("rolesUsers").findOne({ where: { userId: ctx.state.currentUser.id, default: true } }),
      {
        isCacheable: (x) => !import_lodash.default.isEmpty(x)
      }
    );
    role = (defaultRoleModel == null ? void 0 : defaultRoleModel.roleName) || ((_b = userRoles[0]) == null ? void 0 : _b.name);
  }
  ctx.state.currentRole = role;
  ctx.state.currentRoles = role === import_constants.UNION_ROLE_KEY ? [(_c = userRoles[0]) == null ? void 0 : _c.name] : [role];
  if (!ctx.state.currentRoles.length) {
    return ctx.throw(401, {
      code: "ROLE_NOT_FOUND_ERR",
      message: ctx.t("The user role does not exist. Please try signing in again", { ns: "acl" })
    });
  }
  await next();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  setCurrentRole
});
