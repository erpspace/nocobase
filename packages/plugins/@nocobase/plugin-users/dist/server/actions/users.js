/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var users_exports = {};
__export(users_exports, {
  getSystemSettings: () => getSystemSettings,
  listExcludeRole: () => listExcludeRole,
  updateLang: () => updateLang,
  updateProfile: () => updateProfile,
  updateSystemSettings: () => updateSystemSettings
});
module.exports = __toCommonJS(users_exports);
var import_actions = require("@nocobase/actions");
var import_lodash = __toESM(require("lodash"));
var import__ = require("..");
var import_sequelize = require("sequelize");
function parseProfileFormSchema(schema) {
  const properties = import_lodash.default.get(schema, "properties.form.properties.edit.properties.grid.properties") || {};
  const fields = [];
  const requiredFields = [];
  Object.values(properties).forEach((row) => {
    const col = Object.values(row.properties)[0];
    const [name, props] = Object.entries(col.properties)[0];
    if (props["x-read-pretty"] || props["x-disable"]) {
      return;
    }
    if (props["required"]) {
      requiredFields.push(name);
    }
    fields.push(name);
  });
  return { fields, requiredFields };
}
async function updateProfile(ctx, next) {
  const systemSettings = ctx.db.getRepository("systemSettings");
  const settings = await systemSettings.findOne();
  const enableEditProfile = settings.get("enableEditProfile");
  if (enableEditProfile === false) {
    ctx.throw(403, ctx.t("User profile is not allowed to be edited", { ns: import__.namespace }));
  }
  const values = ctx.action.params.values || {};
  const { currentUser } = ctx.state;
  if (!currentUser) {
    ctx.throw(401);
  }
  const schemaRepo = ctx.db.getRepository("uiSchemas");
  const schema = await schemaRepo.getJsonSchema("nocobase-user-profile-edit-form");
  const { fields, requiredFields } = parseProfileFormSchema(schema);
  const userRepo = ctx.db.getRepository("users");
  const user = await userRepo.findOne({ filter: { id: currentUser.id } });
  for (const field of requiredFields) {
    if (!values[field]) {
      throw new import_sequelize.ValidationError(`${field} can not be null`, [
        new import_sequelize.ValidationErrorItem(
          `${field} can not be null`,
          // @ts-ignore
          "notNull violation",
          field,
          null,
          user,
          "is_null",
          null,
          null
        )
      ]);
    }
  }
  const result = await userRepo.update({
    filterByTk: currentUser.id,
    values: import_lodash.default.pick(values, fields)
  });
  ctx.body = result;
  await next();
}
async function updateLang(ctx, next) {
  const { appLang } = ctx.action.params.values || {};
  const { currentUser } = ctx.state;
  if (!currentUser) {
    ctx.throw(401);
  }
  const userRepo = ctx.db.getRepository("users");
  await userRepo.update({
    filterByTk: currentUser.id,
    values: {
      appLang
    }
  });
  await next();
}
const listExcludeRole = async (ctx, next) => {
  const { roleName, page = import_actions.DEFAULT_PAGE, pageSize = import_actions.DEFAULT_PER_PAGE } = ctx.action.params;
  const repo = ctx.db.getRepository("users");
  const users = await repo.find({
    fields: ["id"],
    filter: {
      "roles.name": roleName
    }
  });
  const userIds = users.map((user) => user.id);
  if (userIds.length) {
    ctx.action.mergeParams({
      filter: {
        id: {
          $notIn: userIds
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
const getSystemSettings = async (ctx, next) => {
  const systemSettings = ctx.db.getRepository("systemSettings");
  const settings = await systemSettings.findOne();
  ctx.body = {
    enableEditProfile: settings.get("enableEditProfile"),
    enableChangePassword: settings.get("enableChangePassword")
  };
  await next();
};
const updateSystemSettings = async (ctx, next) => {
  const { enableEditProfile, enableChangePassword } = ctx.action.params.values || {};
  const systemSettings = ctx.db.getRepository("systemSettings");
  const values = {};
  if (enableEditProfile !== void 0) {
    values["enableEditProfile"] = enableEditProfile;
  }
  if (enableChangePassword !== void 0) {
    values["enableChangePassword"] = enableChangePassword;
  }
  if (!Object.keys(values).length) {
    ctx.throw(400);
  }
  await systemSettings.update({
    filterByTk: 1,
    values
  });
  await next();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getSystemSettings,
  listExcludeRole,
  updateLang,
  updateProfile,
  updateSystemSettings
});
