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
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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
var parse_variables_exports = {};
__export(parse_variables_exports, {
  parseVariables: () => parseVariables
});
module.exports = __toCommonJS(parse_variables_exports);
var import_utils = require("@nocobase/utils");
function getUser(ctx) {
  return async ({ fields }) => {
    var _a, _b;
    const userFields = fields.filter((f) => f && ctx.db.getFieldByPath("users." + f));
    (_a = ctx.logger) == null ? void 0 : _a.info("filter-parse: ", { userFields });
    if (!ctx.state.currentUser) {
      return;
    }
    if (!userFields.length) {
      return;
    }
    const user = await ctx.db.getRepository("users").findOne({
      filterByTk: ctx.state.currentUser.id,
      fields: userFields
    });
    (_b = ctx.logger) == null ? void 0 : _b.info("filter-parse: ", {
      $user: user == null ? void 0 : user.toJSON()
    });
    return user;
  };
}
__name(getUser, "getUser");
function isNumeric(str) {
  if (typeof str === "number") return true;
  if (typeof str != "string") return false;
  return !isNaN(str) && !isNaN(parseFloat(str));
}
__name(isNumeric, "isNumeric");
async function parseVariables(ctx, next) {
  const filter = ctx.action.params.filter;
  if (!filter) {
    return next();
  }
  ctx.action.params.filter = await (0, import_utils.parseFilter)(filter, {
    timezone: ctx.get("x-timezone"),
    now: (/* @__PURE__ */ new Date()).toISOString(),
    getField: /* @__PURE__ */ __name((path) => {
      const fieldPath = path.split(".").filter((p) => !p.startsWith("$") && !isNumeric(p)).join(".");
      const { resourceName } = ctx.action;
      return ctx.db.getFieldByPath(`${resourceName}.${fieldPath}`);
    }, "getField"),
    vars: {
      // @deprecated
      $system: {
        now: (/* @__PURE__ */ new Date()).toISOString()
      },
      // @deprecated
      $date: (0, import_utils.getDateVars)(),
      // 新的命名方式，防止和 formily 内置变量冲突
      $nDate: (0, import_utils.getDateVars)(),
      $user: getUser(ctx),
      $nRole: ctx.state.currentRole === "__union__" ? ctx.state.currentRoles : ctx.state.currentRole
    }
  });
  await next();
}
__name(parseVariables, "parseVariables");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  parseVariables
});
