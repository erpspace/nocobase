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
var departments_exports = {};
__export(departments_exports, {
  aggregateSearch: () => aggregateSearch,
  getAppendsOwners: () => getAppendsOwners,
  removeOwner: () => removeOwner,
  setOwner: () => setOwner
});
module.exports = __toCommonJS(departments_exports);
const getAppendsOwners = async (ctx, next) => {
  const { filterByTk, appends } = ctx.action.params;
  const repo = ctx.db.getRepository("departments");
  const department = await repo.findOne({
    filterByTk,
    appends
  });
  const owners = await department.getOwners();
  department.setDataValue("owners", owners);
  ctx.body = department;
  await next();
};
const aggregateSearch = async (ctx, next) => {
  const { keyword, type, last = 0, limit = 10 } = ctx.action.params.values || {};
  let users = [];
  let departments = [];
  if (!type || type === "user") {
    const repo = ctx.db.getRepository("users");
    users = await repo.find({
      filter: {
        id: { $gt: last },
        $or: [
          { username: { $includes: keyword } },
          { nickname: { $includes: keyword } },
          { phone: { $includes: keyword } },
          { email: { $includes: keyword } }
        ]
      },
      limit
    });
  }
  if (!type || type === "department") {
    const repo = ctx.db.getRepository("departments");
    departments = await repo.find({
      filter: {
        id: { $gt: last },
        title: { $includes: keyword }
      },
      appends: ["parent(recursively=true)"],
      limit
    });
  }
  ctx.body = { users, departments };
  await next();
};
const setOwner = async (ctx, next) => {
  const { userId, departmentId } = ctx.action.params.values || {};
  const throughRepo = ctx.db.getRepository("departmentsUsers");
  await throughRepo.update({
    filter: {
      userId,
      departmentId
    },
    values: {
      isOwner: true
    }
  });
  await next();
};
const removeOwner = async (ctx, next) => {
  const { userId, departmentId } = ctx.action.params.values || {};
  const throughRepo = ctx.db.getRepository("departmentsUsers");
  await throughRepo.update({
    filter: {
      userId,
      departmentId
    },
    values: {
      isOwner: false
    }
  });
  await next();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  aggregateSearch,
  getAppendsOwners,
  removeOwner,
  setOwner
});
