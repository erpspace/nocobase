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
var reset_user_departments_cache_exports = {};
__export(reset_user_departments_cache_exports, {
  resetUserDepartmentsCache: () => resetUserDepartmentsCache
});
module.exports = __toCommonJS(reset_user_departments_cache_exports);
const resetUserDepartmentsCache = async (ctx, next) => {
  await next();
  const { associatedName, resourceName, associatedIndex, actionName, values } = ctx.action.params;
  const cache = ctx.app.cache;
  if (associatedName === "departments" && resourceName === "members" && ["add", "remove", "set"].includes(actionName) && (values == null ? void 0 : values.length)) {
    for (const memberId of values) {
      await cache.del(`departments:${memberId}`);
    }
  }
  if (associatedName === "users" && resourceName === "departments" && ["add", "remove", "set"].includes(actionName)) {
    await cache.del(`departments:${associatedIndex}`);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  resetUserDepartmentsCache
});
