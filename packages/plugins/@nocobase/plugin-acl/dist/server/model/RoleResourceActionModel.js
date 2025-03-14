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
var RoleResourceActionModel_exports = {};
__export(RoleResourceActionModel_exports, {
  RoleResourceActionModel: () => RoleResourceActionModel
});
module.exports = __toCommonJS(RoleResourceActionModel_exports);
var import_database = require("@nocobase/database");
class RoleResourceActionModel extends import_database.Model {
  async writeToACL(options) {
    const { resourceName, role } = options;
    const actionName = this.get("name");
    const fields = this.get("fields");
    const actionPath = `${resourceName}:${actionName}`;
    const actionParams = {
      fields
    };
    const scope = await this.getScope();
    if (scope) {
      actionParams["own"] = scope.get("key") === "own";
      actionParams["filter"] = scope.get("scope");
    }
    role.grantAction(actionPath, actionParams);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RoleResourceActionModel
});
