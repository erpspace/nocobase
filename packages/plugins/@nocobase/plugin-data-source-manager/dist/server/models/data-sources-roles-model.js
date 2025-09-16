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
var data_sources_roles_model_exports = {};
__export(data_sources_roles_model_exports, {
  DataSourcesRolesModel: () => DataSourcesRolesModel
});
module.exports = __toCommonJS(data_sources_roles_model_exports);
var import_database = require("@nocobase/database");
class DataSourcesRolesModel extends import_database.Model {
  async writeToAcl(options) {
    const { acl, transaction } = options;
    const roleName = this.get("roleName");
    let role = acl.getRole(roleName);
    if (!role) {
      role = acl.define({
        role: roleName
      });
    }
    role.setStrategy({
      ...this.get("strategy") || {}
    });
    const resources = await this.db.getRepository("dataSourcesRolesResources").find({
      filter: {
        roleName,
        dataSourceKey: this.get("dataSourceKey")
      },
      transaction
    });
    for (const resource of resources) {
      await resource.writeToACL({
        acl,
        transaction
      });
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DataSourcesRolesModel
});
