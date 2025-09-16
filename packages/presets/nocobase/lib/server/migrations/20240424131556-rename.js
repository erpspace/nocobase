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
var rename_exports = {};
__export(rename_exports, {
  default: () => rename_default
});
module.exports = __toCommonJS(rename_exports);
var import_server = require("@nocobase/server");
const _rename_default = class _rename_default extends import_server.Migration {
  on = "beforeLoad";
  // 'beforeLoad' or 'afterLoad'
  appVersion = "<1.0.0-alpha.1";
  async up() {
    const names = {
      "collection-manager": "@nocobase/plugin-data-source-main",
      "china-region": "@nocobase/plugin-field-china-region",
      "custom-request": "@nocobase/plugin-action-custom-request",
      export: "@nocobase/plugin-action-export",
      import: "@nocobase/plugin-action-import",
      "formula-field": "@nocobase/plugin-field-formula",
      "iframe-block": "@nocobase/plugin-block-iframe",
      "localization-management": "@nocobase/plugin-localization",
      "sequence-field": "@nocobase/plugin-field-sequence",
      "sms-auth": "@nocobase/plugin-auth-sms"
    };
    for (const original of Object.keys(names)) {
      await this.pm.repository.update({
        filter: {
          name: original
        },
        values: {
          name: names[original].replace("@nocobase/plugin-", ""),
          packageName: names[original]
        }
      });
    }
  }
};
__name(_rename_default, "default");
let rename_default = _rename_default;
