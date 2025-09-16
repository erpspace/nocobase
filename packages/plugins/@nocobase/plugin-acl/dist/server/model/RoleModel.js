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
var RoleModel_exports = {};
__export(RoleModel_exports, {
  RoleModel: () => RoleModel
});
module.exports = __toCommonJS(RoleModel_exports);
var import_database = require("@nocobase/database");
class RoleModel extends import_database.Model {
  writeToAcl(options) {
    const { acl } = options;
    const roleName = this.get("name");
    let role = acl.getRole(roleName);
    if (!role) {
      role = acl.define({
        role: roleName
      });
    }
    if (options.withOutStrategy !== true) {
      role.setStrategy({
        ...this.get("strategy") || {},
        allowConfigure: this.get("allowConfigure")
      });
    }
    role.snippets = new Set(this.get("snippets"));
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RoleModel
});
