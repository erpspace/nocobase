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
var base_task_manager_exports = {};
__export(base_task_manager_exports, {
  BaseTaskManager: () => BaseTaskManager
});
module.exports = __toCommonJS(base_task_manager_exports);
var import_events = require("events");
var import_p_queue = __toESM(require("p-queue"));
class BaseTaskManager extends import_events.EventEmitter {
  taskTypes = /* @__PURE__ */ new Map();
  tasks = /* @__PURE__ */ new Map();
  // Clean up completed tasks after 30 minutes by default
  cleanupDelay = 30 * 60 * 1e3;
  logger;
  app;
  queue;
  queueOptions;
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
    this.queueOptions = {
      concurrency: process.env.ASYNC_TASK_MAX_CONCURRENCY ? parseInt(process.env.ASYNC_TASK_MAX_CONCURRENCY) : 3,
      autoStart: true
    };
    this.queue = new import_p_queue.default(this.queueOptions);
    this.queue.on("idle", () => {
      this.logger.debug("Task queue is idle");
      this.emit("queueIdle");
    });
    this.queue.on("add", () => {
      this.logger.debug(`Task added to queue. Size: ${this.queue.size}, Pending: ${this.queue.pending}`);
      this.emit("queueAdd", { size: this.queue.size, pending: this.queue.pending });
    });
  }
  enqueueTask(task) {
    const taskHandler = async () => {
      if (task.status.type === "pending") {
        try {
          this.logger.debug(`Starting execution of task ${task.taskId} from queue`);
          await task.run();
        } catch (error) {
          this.logger.error(`Error executing task ${task.taskId} from queue: ${error.message}`);
        }
      }
    };
    this.queue.add(taskHandler);
  }
  pauseQueue() {
    this.logger.info("Pausing task queue");
    this.queue.pause();
    this.emit("queuePaused");
  }
  resumeQueue() {
    this.logger.info("Resuming task queue");
    this.queue.start();
    this.emit("queueResumed");
  }
  async cancelTask(taskId) {
    const task = this.tasks.get(taskId);
    if (!task) {
      this.logger.warn(`Attempted to cancel non-existent task ${taskId}`);
      return false;
    }
    this.logger.info(`Cancelling task ${taskId}, type: ${task.constructor.name}, tags: ${JSON.stringify(task.tags)}`);
    if (task.status.type === "pending") {
      await task.statusChange({ type: "cancelled" });
      return true;
    }
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
    if (options.useQueue) {
      this.enqueueTask(task);
    }
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
