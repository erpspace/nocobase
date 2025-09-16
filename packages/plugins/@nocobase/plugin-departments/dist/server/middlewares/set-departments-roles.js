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
var set_departments_roles_exports = {};
__export(set_departments_roles_exports, {
  setDepartmentsInfo: () => setDepartmentsInfo
});
module.exports = __toCommonJS(set_departments_roles_exports);
const setDepartmentsInfo = async (ctx, next) => {
  const currentUser = ctx.state.currentUser;
  if (!currentUser) {
    return next();
  }
  const cache = ctx.cache;
  const repo = ctx.db.getRepository("users.departments", currentUser.id);
  const departments = await cache.wrap(
    `departments:${currentUser.id}`,
    () => repo.find({
      appends: ["owners", "roles", "parent(recursively=true)"],
      raw: true
    })
  );
  if (!departments.length) {
    return next();
  }
  ctx.state.currentUser.departments = departments;
  ctx.state.currentUser.mainDeparmtent = departments.find((dept) => dept.isMain);
  const departmentIds = departments.map((dept) => dept.id);
  const roleRepo = ctx.db.getRepository("roles");
  const roles = await roleRepo.find({
    filter: {
      "departments.id": {
        $in: departmentIds
      }
    }
  });
  if (!roles.length) {
    return next();
  }
  const rolesMap = /* @__PURE__ */ new Map();
  roles.forEach((role) => rolesMap.set(role.name, role));
  ctx.state.attachRoles = Array.from(rolesMap.values());
  await next();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  setDepartmentsInfo
});
