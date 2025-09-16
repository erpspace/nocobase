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
var set_audit_local_exports = {};
__export(set_audit_local_exports, {
  default: () => SetAuditPluginAsLocalMigration
});
module.exports = __toCommonJS(set_audit_local_exports);
var import_server = require("@nocobase/server");
const _SetAuditPluginAsLocalMigration = class _SetAuditPluginAsLocalMigration extends import_server.Migration {
  on = "beforeLoad";
  appVersion = "<0.13.0-alpha.5";
  async up() {
    await this.pm.repository.update({
      values: {
        builtIn: false
      },
      filter: {
        name: "audit-logs"
      }
    });
  }
};
__name(_SetAuditPluginAsLocalMigration, "SetAuditPluginAsLocalMigration");
let SetAuditPluginAsLocalMigration = _SetAuditPluginAsLocalMigration;
