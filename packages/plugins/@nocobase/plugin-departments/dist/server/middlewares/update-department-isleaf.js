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
var update_department_isleaf_exports = {};
__export(update_department_isleaf_exports, {
  updateDepartmentIsLeaf: () => updateDepartmentIsLeaf
});
module.exports = __toCommonJS(update_department_isleaf_exports);
const updateIsLeafWhenAddChild = async (repo, parent) => {
  if (parent && parent.isLeaf !== false) {
    await repo.update({
      filter: {
        id: parent.id
      },
      values: {
        isLeaf: false
      }
    });
  }
};
const updateIsLeafWhenChangeChild = async (repo, oldParentId, newParentId) => {
  if (oldParentId && oldParentId !== newParentId) {
    const hasChild = await repo.count({
      filter: {
        parentId: oldParentId
      }
    });
    if (!hasChild) {
      await repo.update({
        filter: {
          id: oldParentId
        },
        values: {
          isLeaf: true
        }
      });
    }
  }
};
const updateDepartmentIsLeaf = async (ctx, next) => {
  const { filterByTk, values = {}, resourceName, actionName } = ctx.action.params;
  const repo = ctx.db.getRepository("departments");
  const { parent } = values;
  if (resourceName === "departments" && actionName === "create") {
    ctx.action.params.values = { ...values, isLeaf: true };
    await next();
    await updateIsLeafWhenAddChild(repo, parent);
    return;
  }
  if (resourceName === "departments" && actionName === "update") {
    const department = await repo.findOne({ filterByTk });
    await next();
    await Promise.all([
      updateIsLeafWhenChangeChild(repo, department.parentId, parent == null ? void 0 : parent.id),
      updateIsLeafWhenAddChild(repo, parent)
    ]);
    return;
  }
  if (resourceName === "departments" && actionName === "destroy") {
    const department = await repo.findOne({ filterByTk });
    await next();
    await updateIsLeafWhenChangeChild(repo, department.parentId, null);
    return;
  }
  return next();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  updateDepartmentIsLeaf
});
