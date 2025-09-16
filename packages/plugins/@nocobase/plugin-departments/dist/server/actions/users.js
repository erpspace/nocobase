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
var users_exports = {};
__export(users_exports, {
  listExcludeDept: () => listExcludeDept,
  setDepartments: () => setDepartments,
  setMainDepartment: () => setMainDepartment
});
module.exports = __toCommonJS(users_exports);
var import_actions = require("@nocobase/actions");
const listExcludeDept = async (ctx, next) => {
  const { departmentId, page = import_actions.DEFAULT_PAGE, pageSize = import_actions.DEFAULT_PER_PAGE } = ctx.action.params;
  const repo = ctx.db.getRepository("users");
  const members = await repo.find({
    fields: ["id"],
    filter: {
      "departments.id": departmentId
    }
  });
  const memberIds = members.map((member) => member.id);
  if (memberIds.length) {
    ctx.action.mergeParams({
      filter: {
        id: {
          $notIn: memberIds
        }
      }
    });
  }
  const { filter } = ctx.action.params;
  const [rows, count] = await repo.findAndCount({
    context: ctx,
    offset: (page - 1) * pageSize,
    limit: +pageSize,
    filter
  });
  ctx.body = {
    count,
    rows,
    page: Number(page),
    pageSize: Number(pageSize),
    totalPage: Math.ceil(count / pageSize)
  };
  await next();
};
const setDepartments = async (ctx, next) => {
  const { values = {} } = ctx.action.params;
  const { userId, departments = [] } = values;
  const repo = ctx.db.getRepository("users");
  const throughRepo = ctx.db.getRepository("departmentsUsers");
  const user = await repo.findOne({ filterByTk: userId });
  if (!user) {
    ctx.throw(400, ctx.t("User does not exist"));
  }
  const departmentIds = departments.map((department) => department.id);
  const main = departments.find((department) => department.isMain);
  const owners = departments.filter((department) => department.isOwner);
  await ctx.db.sequelize.transaction(async (t) => {
    await user.setDepartments(departmentIds, {
      through: {
        isMain: false,
        isOwner: false
      },
      transaction: t
    });
    if (main) {
      await throughRepo.update({
        filter: {
          userId,
          departmentId: main.id
        },
        values: {
          isMain: true
        },
        transaction: t
      });
    }
    if (owners.length) {
      await throughRepo.update({
        filter: {
          userId,
          departmentId: {
            $in: owners.map((owner) => owner.id)
          }
        },
        values: {
          isOwner: true
        },
        transaction: t
      });
    }
  });
  await next();
};
const setMainDepartment = async (ctx, next) => {
  const { userId, departmentId } = ctx.action.params.values || {};
  const throughRepo = ctx.db.getRepository("departmentsUsers");
  await ctx.db.sequelize.transaction(async (t) => {
    await throughRepo.update({
      filter: {
        userId,
        isMain: true
      },
      values: {
        isMain: false
      },
      transaction: t
    });
    await throughRepo.update({
      filter: {
        userId,
        departmentId
      },
      values: {
        isMain: true
      },
      transaction: t
    });
  });
  await next();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  listExcludeDept,
  setDepartments,
  setMainDepartment
});
