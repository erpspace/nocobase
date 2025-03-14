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
var update_collections_hidden_exports = {};
__export(update_collections_hidden_exports, {
  default: () => UpdateCollectionsHiddenMigration
});
module.exports = __toCommonJS(update_collections_hidden_exports);
var import_server = require("@nocobase/server");
/* istanbul ignore file -- @preserve */
class UpdateCollectionsHiddenMigration extends import_server.Migration {
  appVersion = "<0.8.0-alpha.11";
  async up() {
    const result = await this.app.version.satisfies("<=0.8.0-alpha.9");
    if (!result) {
      return;
    }
    try {
      await this.app.db.getRepository("collections").update({
        filter: {
          options: {
            autoCreate: true,
            isThrough: true
          }
        },
        values: {
          hidden: true
        }
      });
    } catch (error) {
      console.error(error);
    }
  }
}
