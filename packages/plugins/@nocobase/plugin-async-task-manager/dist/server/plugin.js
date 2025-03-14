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
var plugin_exports = {};
__export(plugin_exports, {
  PluginAsyncExportServer: () => PluginAsyncExportServer,
  default: () => plugin_default
});
module.exports = __toCommonJS(plugin_exports);
var import_server = require("@nocobase/server");
var import_base_task_manager = require("./base-task-manager");
var import_command_task_type = require("./command-task-type");
var import_async_tasks = __toESM(require("./resourcers/async-tasks"));
var import_lodash = require("lodash");
class PluginAsyncExportServer extends import_server.Plugin {
  progressThrottles = /* @__PURE__ */ new Map();
  async afterAdd() {
  }
  async beforeLoad() {
    this.app.container.register("AsyncTaskManager", () => {
      const manager = new import_base_task_manager.BaseTaskManager();
      manager.setLogger(this.app.logger);
      manager.setApp(this.app);
      return manager;
    });
    this.app.container.get("AsyncTaskManager").registerTaskType(import_command_task_type.CommandTaskType);
    this.app.acl.allow("asyncTasks", ["get", "fetchFile"], "loggedIn");
  }
  getThrottledProgressEmitter(taskId, userId) {
    if (!this.progressThrottles.has(taskId)) {
      this.progressThrottles.set(
        taskId,
        (0, import_lodash.throttle)(
          (progress) => {
            this.app.emit("ws:sendToTag", {
              tagKey: "userId",
              tagValue: userId,
              message: {
                type: "async-tasks:progress",
                payload: {
                  taskId,
                  progress
                }
              }
            });
          },
          500,
          { leading: true, trailing: true }
        )
      );
    }
    return this.progressThrottles.get(taskId);
  }
  async load() {
    this.app.resourceManager.define(import_async_tasks.default);
    const asyncTaskManager = this.app.container.get("AsyncTaskManager");
    this.app.on(`ws:message:request:async-tasks:list`, async (message) => {
      const { tags, clientId } = message;
      this.app.logger.info(`Received request for async tasks with tags: ${JSON.stringify(tags)}`);
      const userTag = tags == null ? void 0 : tags.find((tag) => tag.startsWith("userId#"));
      const userId = userTag ? userTag.split("#")[1] : null;
      if (userId) {
        this.app.logger.info(`Fetching tasks for userId: ${userId}`);
        const tasks = await asyncTaskManager.getTasksByTag("userId", userId);
        this.app.logger.info(`Found ${tasks.length} tasks for userId: ${userId}`);
        this.app.emit("ws:sendToClient", {
          clientId,
          message: {
            type: "async-tasks",
            payload: tasks.map((task) => task.toJSON())
          }
        });
      } else {
        this.app.logger.warn(`No userId found in message tags: ${JSON.stringify(tags)}`);
      }
    });
    asyncTaskManager.on("taskCreated", ({ task }) => {
      const userId = task.tags["userId"];
      if (userId) {
        this.app.emit("ws:sendToTag", {
          tagKey: "userId",
          tagValue: userId,
          message: {
            type: "async-tasks:created",
            payload: task.toJSON()
          }
        });
      }
    });
    asyncTaskManager.on("taskProgress", ({ task, progress }) => {
      const userId = task.tags["userId"];
      if (userId) {
        const throttledEmit = this.getThrottledProgressEmitter(task.taskId, userId);
        throttledEmit(progress);
      }
    });
    asyncTaskManager.on("taskStatusChange", ({ task, status }) => {
      const userId = task.tags["userId"];
      if (!userId) return;
      this.app.emit("ws:sendToTag", {
        tagKey: "userId",
        tagValue: userId,
        message: {
          type: "async-tasks:status",
          payload: {
            taskId: task.taskId,
            status: task.toJSON().status
          }
        }
      });
      if (status.type !== "running" && status.type !== "pending") {
        const throttled = this.progressThrottles.get(task.taskId);
        if (throttled) {
          throttled.cancel();
          this.progressThrottles.delete(task.taskId);
        }
      }
      if (status.type === "success") {
        this.app.emit("workflow:dispatch");
      }
    });
    this.app.on("ws:message:request:async-tasks:cancel", async (message) => {
      const { payload, tags } = message;
      const { taskId } = payload;
      const userTag = tags == null ? void 0 : tags.find((tag) => tag.startsWith("userId#"));
      const userId = userTag ? userTag.split("#")[1] : null;
      if (userId) {
        const task = asyncTaskManager.getTask(taskId);
        if (task.tags["userId"] != userId) {
          return;
        }
        const cancelled = await asyncTaskManager.cancelTask(taskId);
        if (cancelled) {
          this.app.emit("ws:sendToTag", {
            tagKey: "userId",
            tagValue: userId,
            message: {
              type: "async-tasks:cancelled",
              payload: { taskId }
            }
          });
        }
      }
    });
  }
}
var plugin_default = PluginAsyncExportServer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PluginAsyncExportServer
});
