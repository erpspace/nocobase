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
var listByCurrentRole_exports = {};
__export(listByCurrentRole_exports, {
  listByCurrentRole: () => listByCurrentRole
});
module.exports = __toCommonJS(listByCurrentRole_exports);
async function listByCurrentRole(ctx) {
  const repo = ctx.db.getRepository("customRequests");
  const data = await repo.find({
    appends: ["roles"]
  });
  const crRepo = ctx.db.getRepository("customRequestsRoles");
  ctx.body = data.filter((item) => {
    return !item.roles.length;
  }).map((item) => item.key).concat(
    (await crRepo.find({
      filter: {
        roleName: ctx.state.currentRole
      }
    })).map((item) => item.customRequestKey)
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  listByCurrentRole
});
