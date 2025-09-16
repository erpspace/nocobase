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
var set_main_department_exports = {};
__export(set_main_department_exports, {
  setMainDepartment: () => setMainDepartment
});
module.exports = __toCommonJS(set_main_department_exports);
const setMainDepartment = async (ctx, next) => {
  await next();
  const { associatedName, resourceName, associatedIndex, actionName, values } = ctx.action.params;
  if (associatedName === "departments" && resourceName === "members" && (values == null ? void 0 : values.length)) {
    const throughRepo = ctx.db.getRepository("departmentsUsers");
    const usersHasMain = await throughRepo.find({
      filter: {
        userId: {
          $in: values
        },
        isMain: true
      }
    });
    const userIdsHasMain = usersHasMain.map((item) => item.userId);
    if (actionName === "add" || actionName === "set") {
      await throughRepo.update({
        filter: {
          userId: {
            $in: values.filter((id) => !userIdsHasMain.includes(id))
          },
          departmentId: associatedIndex
        },
        values: {
          isMain: true
        }
      });
      return;
    }
    if (actionName === "remove") {
      const userIdsHasNoMain = values.filter((id) => !userIdsHasMain.includes(id));
      for (const userId of userIdsHasNoMain) {
        const firstDept = await throughRepo.findOne({
          filter: {
            userId
          }
        });
        if (firstDept) {
          await throughRepo.update({
            filter: {
              userId,
              departmentId: firstDept.departmentId
            },
            values: {
              isMain: true
            }
          });
        }
      }
    }
  }
  if (associatedName === "users" && resourceName === "departments" && ["add", "remove", "set"].includes(actionName)) {
    const throughRepo = ctx.db.getRepository("departmentsUsers");
    const hasMain = await throughRepo.findOne({
      filter: {
        userId: associatedIndex,
        isMain: true
      }
    });
    if (hasMain) {
      return;
    }
    const firstDept = await throughRepo.findOne({
      filter: {
        userId: associatedIndex
      }
    });
    if (firstDept) {
      await throughRepo.update({
        filter: {
          userId: associatedIndex,
          departmentId: firstDept.departmentId
        },
        values: {
          isMain: true
        }
      });
    }
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  setMainDepartment
});
