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
var remove_sample_hello_exports = {};
__export(remove_sample_hello_exports, {
  default: () => remove_sample_hello_default
});
module.exports = __toCommonJS(remove_sample_hello_exports);
var import_server = require("@nocobase/server");
const _remove_sample_hello_default = class _remove_sample_hello_default extends import_server.Migration {
  on = "afterSync";
  // 'beforeLoad' or 'afterLoad'
  appVersion = "<0.19.0-alpha.4";
  async up() {
    await this.pm.repository.destroy({
      filter: {
        name: ["sample-hello"]
      }
    });
  }
};
__name(_remove_sample_hello_default, "default");
let remove_sample_hello_default = _remove_sample_hello_default;
