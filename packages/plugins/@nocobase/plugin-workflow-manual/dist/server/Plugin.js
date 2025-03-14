/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var Plugin_exports = {};
__export(Plugin_exports, {
  default: () => Plugin_default
});
module.exports = __toCommonJS(Plugin_exports);
var import_server = require("@nocobase/server");
var import_actions = __toESM(require("@nocobase/actions"));
var import_plugin_workflow = __toESM(require("@nocobase/plugin-workflow"));
var jobActions = __toESM(require("./actions"));
var import_ManualInstruction = __toESM(require("./ManualInstruction"));
var import_constants = require("../common/constants");
class Plugin_default extends import_server.Plugin {
  async load() {
    this.app.resourceManager.define({
      name: "workflowManualTasks",
      actions: {
        list: {
          filter: {
            $or: [
              {
                "workflow.enabled": true
              },
              {
                "workflow.enabled": false,
                status: {
                  $ne: import_plugin_workflow.JOB_STATUS.PENDING
                }
              }
            ]
          },
          handler: import_actions.default.list
        },
        ...jobActions
      }
    });
    this.app.acl.allow("workflowManualTasks", ["list", "get", "submit"], "loggedIn");
    const workflowPlugin = this.app.pm.get(import_plugin_workflow.default);
    workflowPlugin.registerInstruction("manual", import_ManualInstruction.default);
    this.db.on("workflowManualTasks.afterSave", async (task, options) => {
      await workflowPlugin.toggleTaskStatus(
        {
          type: import_constants.MANUAL_TASK_TYPE,
          key: `${task.id}`,
          userId: task.userId,
          workflowId: task.workflowId
        },
        Boolean(task.status),
        options
      );
    });
  }
}
