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
var user_setDefaultRole_exports = {};
__export(user_setDefaultRole_exports, {
  setDefaultRole: () => setDefaultRole
});
module.exports = __toCommonJS(user_setDefaultRole_exports);
async function setDefaultRole(ctx, next) {
  const {
    values: { roleName }
  } = ctx.action.params;
  const {
    db,
    state: { currentUser },
    action: {
      params: { values }
    }
  } = ctx;
  if (values.roleName == "anonymous") {
    return next();
  }
  const repository = db.getRepository("rolesUsers");
  await db.sequelize.transaction(async (transaction) => {
    await repository.update({
      filter: {
        userId: currentUser.id
      },
      values: {
        default: false
      },
      transaction
    });
    await repository.update({
      filter: {
        userId: currentUser.id,
        roleName
      },
      values: {
        default: true
      },
      transaction
    });
  });
  ctx.body = "ok";
  await next();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  setDefaultRole
});
