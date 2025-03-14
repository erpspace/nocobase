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
var user_data_sync_resource_exports = {};
__export(user_data_sync_resource_exports, {
  UserDataSyncResource: () => UserDataSyncResource
});
module.exports = __toCommonJS(user_data_sync_resource_exports);
var import_lodash = __toESM(require("lodash"));
var import_plugin_user_data_sync = require("@nocobase/plugin-user-data-sync");
class UserDataSyncResource extends import_plugin_user_data_sync.UserDataResource {
  name = "users";
  accepts = ["user"];
  get userRepo() {
    return this.db.getRepository("users");
  }
  getFlteredSourceUser(sourceUser) {
    const deleteProps = [
      "id",
      "uid",
      "createdAt",
      "updatedAt",
      "appLang",
      "resetToken",
      "systemSettings",
      "password",
      "sort",
      "createdById",
      "updatedById",
      "isDeleted",
      "departments"
    ];
    return import_lodash.default.omit(sourceUser, deleteProps);
  }
  async updateUser(user, sourceUser) {
    if (sourceUser.isDeleted) {
      const roles = await user.getRoles();
      for (const role of roles) {
        if (role.name === "root") {
          return;
        }
      }
      await user.destroy();
      return;
    }
    let dataChanged = false;
    const filteredSourceUser = this.getFlteredSourceUser(sourceUser);
    import_lodash.default.forOwn(filteredSourceUser, (value, key) => {
      if (user[key] !== value) {
        user[key] = value;
        dataChanged = true;
      }
    });
    if (dataChanged) {
      await user.save();
    }
  }
  async update(record, resourcePks, matchKey) {
    const { metaData: sourceUser } = record;
    const resourcePk = resourcePks[0];
    const user = await this.userRepo.findOne({
      filterByTk: resourcePk
    });
    if (!user) {
      const result = await this.create(record, matchKey);
      return [...result, { resourcesPk: resourcePk, isDeleted: true }];
    }
    await this.updateUser(user, sourceUser);
    return [];
  }
  async create(record, matchKey) {
    const { metaData: sourceUser } = record;
    const filter = {};
    let user;
    if (["phone", "email", "username"].includes(matchKey)) {
      filter[matchKey] = sourceUser[matchKey];
      user = await this.userRepo.findOne({
        filter
      });
    }
    if (user) {
      await this.updateUser(user, sourceUser);
    } else {
      const filteredSourceUser = this.getFlteredSourceUser(sourceUser);
      user = await this.userRepo.create({
        values: filteredSourceUser
      });
    }
    return [{ resourcesPk: user.id, isDeleted: false }];
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserDataSyncResource
});
