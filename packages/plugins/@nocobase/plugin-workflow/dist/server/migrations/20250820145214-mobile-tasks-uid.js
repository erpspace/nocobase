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
var mobile_tasks_uid_exports = {};
__export(mobile_tasks_uid_exports, {
  default: () => mobile_tasks_uid_default
});
module.exports = __toCommonJS(mobile_tasks_uid_exports);
var import_server = require("@nocobase/server");
class mobile_tasks_uid_default extends import_server.Migration {
  appVersion = "<1.9.0";
  async up() {
    const { db, app } = this.context;
    const MobileRouteRepo = db.getRepository("mobileRoutes");
    const route = await MobileRouteRepo.findOne({
      filter: {
        type: "page",
        schemaUid: "workflow/tasks"
      }
    });
    if (!route) {
      app.logger.debug(`no route found to be migrated.`);
      return;
    }
    await route.update({
      schemaUid: "workflow-tasks",
      options: {
        url: "/page/workflow-tasks",
        schema: {
          "x-component": "MobileTabBarWorkflowTasksItem"
        }
      }
    });
  }
}
