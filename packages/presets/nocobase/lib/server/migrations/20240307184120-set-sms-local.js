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
var set_sms_local_exports = {};
__export(set_sms_local_exports, {
  default: () => set_sms_local_default
});
module.exports = __toCommonJS(set_sms_local_exports);
var import_server = require("@nocobase/server");
const _set_sms_local_default = class _set_sms_local_default extends import_server.Migration {
  on = "afterLoad";
  // 'beforeLoad' or 'afterLoad'
  appVersion = "<0.20.0-alpha.6";
  async up() {
    await this.pm.repository.update({
      values: {
        builtIn: false
      },
      filter: {
        name: "sms-auth"
      }
    });
  }
};
__name(_set_sms_local_default, "default");
let set_sms_local_default = _set_sms_local_default;
