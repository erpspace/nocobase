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
var workflow_options_exports = {};
__export(workflow_options_exports, {
  default: () => workflow_options_default
});
module.exports = __toCommonJS(workflow_options_exports);
var import_server = require("@nocobase/server");
class workflow_options_default extends import_server.Migration {
  appVersion = "<0.14.0-alpha.8";
  async up() {
    const match = await this.app.version.satisfies("<0.14.0-alpha.8");
    if (!match) {
      return;
    }
    const { db } = this.context;
    const WorkflowRepo = db.getRepository("workflows");
    await db.sequelize.transaction(async (transaction) => {
      const workflows = await WorkflowRepo.find({
        transaction
      });
      await workflows.reduce(
        (promise, workflow) => promise.then(() => {
          if (!workflow.useTransaction) {
            return;
          }
          workflow.set("options", {
            useTransaction: workflow.get("useTransaction")
          });
          workflow.changed("options", true);
          return workflow.save({
            silent: true,
            transaction
          });
        }),
        Promise.resolve()
      );
    });
  }
}
