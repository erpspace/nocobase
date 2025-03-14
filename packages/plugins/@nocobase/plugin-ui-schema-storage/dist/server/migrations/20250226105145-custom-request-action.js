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
var custom_request_action_exports = {};
__export(custom_request_action_exports, {
  default: () => custom_request_action_default
});
module.exports = __toCommonJS(custom_request_action_exports);
var import_server = require("@nocobase/server");
class custom_request_action_default extends import_server.Migration {
  on = "afterLoad";
  appVersion = "<1.6.0";
  async up() {
    const repo1 = this.db.getRepository("customRequestsRoles");
    const repo2 = this.db.getRepository("uiButtonSchemasRoles");
    const customRequestsRoles = await repo1.find();
    for (const customRequestsRole of customRequestsRoles) {
      await repo2.firstOrCreate({
        values: {
          uid: customRequestsRole.customRequestKey,
          roleName: customRequestsRole.roleName
        },
        filterKeys: ["uid", "roleName"]
      });
    }
  }
}
