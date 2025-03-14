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
var update_ns_for_routes_exports = {};
__export(update_ns_for_routes_exports, {
  default: () => update_ns_for_routes_default
});
module.exports = __toCommonJS(update_ns_for_routes_exports);
var import_server = require("@nocobase/server");
class update_ns_for_routes_default extends import_server.Migration {
  on = "afterLoad";
  // 'beforeLoad' or 'afterLoad'
  appVersion = "<1.6.1";
  async up() {
    await this.db.getRepository("localizationTexts").update({
      values: {
        module: "resources.lm-desktop-routes"
      },
      filter: {
        module: "resources.lm-menus"
      }
    });
  }
}
