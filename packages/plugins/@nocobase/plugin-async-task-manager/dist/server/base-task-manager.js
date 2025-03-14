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
var base_task_manager_exports = {};
__export(base_task_manager_exports, {
  BaseTaskManager: () => BaseTaskManager
});
module.exports = __toCommonJS(base_task_manager_exports);
var import_events = require("events");
class BaseTaskManager extends import_events.EventEmitter {
  taskTypes = /* @__PURE__ */ new Map();
  tasks = /* @__PURE__ */ new Map();
  // Clean up completed tasks after 30 minutes by default
  cleanupDelay = 30 * 60 * 1e3;
  logger;
  app;
  setLogger(logger) {
    this.logger = logger;
  }
  setApp(app) {
    this.app = app;
  }
  scheduleCleanup(taskId) {
    setTimeout(() => {
      this.tasks.delete(taskId);
      this.logger.debug(`Task ${taskId} cleaned up after ${this.cleanupDelay}ms`);
    }, this.cleanupDelay);
  }
  constructor() {
    super();
  }
  async cancelTask(taskId) {
    const task = this.tasks.get(taskId);
    if (!task) {
      this.logger.warn(`Attempted to cancel non-existent task ${taskId}`);
      return false;
    }
    this.logger.info(`Cancelling task ${taskId}, type: ${task.constructor.name}, tags: ${JSON.stringify(task.tags)}`);
    return task.cancel();
  }
  createTask(options) {
    const taskType = this.taskTypes.get(options.type);
    if (!taskType) {
      this.logger.error(`Task type not found: ${options.type}, params: ${JSON.stringify(options.params)}`);
      throw new Error(`Task type ${options.type} not found`);
    }
    this.logger.info(
      `Creating task of type: ${options.type}, params: ${JSON.stringify(options.params)}, tags: ${JSON.stringify(
        options.tags
      )}`
    );
    const task = new taskType(options.params, options.tags);
    task.title = options.title;
    task.setLogger(this.logger);
    task.setApp(this.app);
    task.setContext(options.context);
    this.tasks.set(task.taskId, task);
    this.logger.info(
      `Created new task ${task.taskId} of type ${options.type}, params: ${JSON.stringify(
        options.params
      )}, tags: ${JSON.stringify(options.tags)}, title: ${task.title}`
    );
    this.emit("taskCreated", { task });
    task.on("progress", (progress) => {
      this.logger.debug(`Task ${task.taskId} progress: ${progress}`);
      this.emit("taskProgress", { task, progress });
    });
    task.on("statusChange", (status) => {
      if (["success", "failed"].includes(status.type)) {
        this.scheduleCleanup(task.taskId);
      } else if (status.type === "cancelled") {
        this.tasks.delete(task.taskId);
      }
      this.emit("taskStatusChange", { task, status });
    });
    return task;
  }
  getTask(taskId) {
    const task = this.tasks.get(taskId);
    if (!task) {
      this.logger.debug(`Task not found: ${taskId}`);
      return void 0;
    }
    this.logger.debug(`Retrieved task ${taskId}, type: ${task.constructor.name}, status: ${task.status.type}`);
    return task;
  }
  async getTaskStatus(taskId) {
    const task = this.tasks.get(taskId);
    if (!task) {
      this.logger.warn(`Attempted to get status of non-existent task ${taskId}`);
      throw new Error(`Task ${taskId} not found`);
    }
    this.logger.debug(`Getting status for task ${taskId}, current status: ${task.status.type}`);
    return task.status;
  }
  registerTaskType(taskType) {
    this.logger.debug(`Registering task type: ${taskType.type}`);
    this.taskTypes.set(taskType.type, taskType);
  }
  async getTasksByTag(tagKey, tagValue) {
    this.logger.debug(`Getting tasks by tag - key: ${tagKey}, value: ${tagValue}`);
    const tasks = Array.from(this.tasks.values()).filter((task) => {
      return task.tags[tagKey] == tagValue;
    });
    this.logger.debug(`Found ${tasks.length} tasks with tag ${tagKey}=${tagValue}`);
    return tasks;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseTaskManager
});
