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
var RoleResourceModel_exports = {};
__export(RoleResourceModel_exports, {
  RoleResourceModel: () => RoleResourceModel
});
module.exports = __toCommonJS(RoleResourceModel_exports);
var import_acl = require("@nocobase/acl");
var import_database = require("@nocobase/database");
class RoleResourceModel extends import_database.Model {
  async revoke(options) {
    const { role, resourceName } = options;
    role.revokeResource(resourceName);
  }
  async writeToACL(options) {
    const { acl } = options;
    const resourceName = this.get("name");
    const roleName = this.get("roleName");
    const role = acl.getRole(roleName);
    if (!role) {
      console.log(`${roleName} role does not exist`);
      return;
    }
    await this.revoke({ role, resourceName });
    if (this.usingActionsConfig === false) {
      return;
    }
    const resource = new import_acl.ACLResource({
      role,
      name: resourceName
    });
    role.resources.set(resourceName, resource);
    const actions = await this.getActions({
      transaction: options.transaction
    });
    for (const action of actions) {
      await action.writeToACL({
        acl,
        role,
        resourceName
      });
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RoleResourceModel
});
