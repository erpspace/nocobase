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
var add_default_field_exports = {};
__export(add_default_field_exports, {
  default: () => add_default_field_default
});
module.exports = __toCommonJS(add_default_field_exports);
var import_server = require("@nocobase/server");
class add_default_field_default extends import_server.Migration {
  appVersion = "<0.17.0-alpha.5";
  async up() {
    var _a;
    const result = await this.app.version.satisfies("<0.17.0-alpha.5");
    if (!result) {
      return;
    }
    const repository = this.db.getRepository("themeConfig");
    if (!repository) {
      return;
    }
    await repository.collection.sync();
    const systemSettings = await this.db.getRepository("systemSettings").findOne();
    const defaultThemeId = (_a = systemSettings.options) == null ? void 0 : _a.themeId;
    if (!defaultThemeId) {
      return;
    }
    await this.db.sequelize.transaction(async (t) => {
      await repository.update({
        values: {
          default: false
        },
        filter: {
          default: true
        },
        transaction: t
      });
      await repository.update({
        values: {
          default: true,
          optional: true
        },
        filterByTk: defaultThemeId,
        transaction: t
      });
    });
  }
  async down() {
  }
}
