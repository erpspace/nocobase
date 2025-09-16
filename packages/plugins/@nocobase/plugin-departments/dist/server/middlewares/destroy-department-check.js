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
var destroy_department_check_exports = {};
__export(destroy_department_check_exports, {
  destroyDepartmentCheck: () => destroyDepartmentCheck
});
module.exports = __toCommonJS(destroy_department_check_exports);
const destroyCheck = async (ctx) => {
  const { filterByTk } = ctx.action.params;
  const repo = ctx.db.getRepository("departments");
  const children = await repo.count({
    filter: {
      parentId: filterByTk
    }
  });
  if (children) {
    ctx.throw(400, ctx.t("The department has sub-departments, please delete them first", { ns: "departments" }));
  }
  const members = await ctx.db.getRepository("departmentsUsers").count({
    filter: {
      departmentId: filterByTk
    }
  });
  if (members) {
    ctx.throw(400, ctx.t("The department has members, please remove them first", { ns: "departments" }));
  }
};
const destroyDepartmentCheck = async (ctx, next) => {
  const { resourceName, actionName } = ctx.action.params;
  if (resourceName === "departments" && actionName === "destroy") {
    await destroyCheck(ctx);
  }
  await next();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  destroyDepartmentCheck
});
