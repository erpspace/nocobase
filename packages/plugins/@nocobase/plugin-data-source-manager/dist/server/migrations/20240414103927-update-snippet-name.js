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
var update_snippet_name_exports = {};
__export(update_snippet_name_exports, {
  default: () => update_snippet_name_default
});
module.exports = __toCommonJS(update_snippet_name_exports);
var import_server = require("@nocobase/server");
class update_snippet_name_default extends import_server.Migration {
  on = "afterLoad";
  // 'beforeLoad' or 'afterLoad'
  appVersion = "<0.21.0-alpha.8";
  async up() {
    const roles = await this.db.getRepository("roles").find();
    for (const role of roles) {
      const snippets = await role.get("snippets");
      let roleNeedsUpdate = false;
      for (let i = 0; i < snippets.length; i++) {
        if (snippets[i].includes("pm.database-connections.manager")) {
          snippets[i] = snippets[i].replace("pm.database-connections.manager", "pm.data-source-manager");
          roleNeedsUpdate = true;
        }
      }
      if (roleNeedsUpdate) {
        await this.db.getRepository("roles").update({
          filter: {
            name: role.get("name")
          },
          values: {
            snippets: JSON.parse(JSON.stringify(snippets))
          }
        });
      }
    }
  }
}
