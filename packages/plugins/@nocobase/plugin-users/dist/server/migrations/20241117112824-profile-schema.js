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
var profile_schema_exports = {};
__export(profile_schema_exports, {
  default: () => profile_schema_default
});
module.exports = __toCommonJS(profile_schema_exports);
var import_server = require("@nocobase/server");
var import_edit_form_schema = require("../profile/edit-form-schema");
class profile_schema_default extends import_server.Migration {
  on = "afterLoad";
  // 'beforeLoad' or 'afterLoad'
  async up() {
    const repo = this.db.getRepository("uiSchemas");
    const adminCreateSchema = await repo.findOne({
      filter: {
        "x-uid": "nocobase-admin-profile-create-form"
      }
    });
    if (!adminCreateSchema) {
      await repo.insert(import_edit_form_schema.adminProfileCreateFormSchema);
    }
    const adminEditSchema = await repo.findOne({
      filter: {
        "x-uid": "nocobase-admin-profile-edit-form"
      }
    });
    if (!adminEditSchema) {
      await repo.insert(import_edit_form_schema.adminProfileEditFormSchema);
    }
    const userSchema = await repo.findOne({
      filter: {
        "x-uid": "nocobase-user-profile-edit-form"
      }
    });
    if (!userSchema) {
      await repo.insert(import_edit_form_schema.userProfileEditFormSchema);
    }
  }
}
