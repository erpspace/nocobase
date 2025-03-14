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
var task_type_exports = {};
__export(task_type_exports, {
  TaskType: () => TaskType
});
module.exports = __toCommonJS(task_type_exports);
var import_uuid = require("uuid");
var import_events = __toESM(require("events"));
var import_async_task_manager = require("./interfaces/async-task-manager");
class TaskType extends import_events.default {
  constructor(options, tags) {
    super();
    this.options = options;
    this.status = {
      type: "pending",
      indicator: "spinner"
    };
    this.taskId = (0, import_uuid.v4)();
    this.tags = tags || {};
    this.createdAt = /* @__PURE__ */ new Date();
  }
  static type;
  static cancelable = true;
  status;
  logger;
  app;
  progress = {
    total: 0,
    current: 0
  };
  startedAt;
  fulfilledAt;
  taskId;
  tags;
  createdAt;
  context;
  title;
  abortController = new AbortController();
  _isCancelled = false;
  get isCancelled() {
    return this._isCancelled;
  }
  setLogger(logger) {
    this.logger = logger;
  }
  setApp(app) {
    this.app = app;
  }
  setContext(context) {
    this.context = context;
  }
  /**
   * Cancel the task
   */
  async cancel() {
    var _a;
    this._isCancelled = true;
    this.abortController.abort();
    (_a = this.logger) == null ? void 0 : _a.debug(`Task ${this.taskId} cancelled`);
    return true;
  }
  /**
   * Report task progress
   * @param progress Progress information containing total and current values
   */
  reportProgress(progress) {
    var _a;
    this.progress = progress;
    (_a = this.logger) == null ? void 0 : _a.debug(`Task ${this.taskId} progress update - current: ${progress.current}, total: ${progress.total}`);
    this.emit("progress", progress);
  }
  /**
   * Run the task
   * This method handles task lifecycle, including:
   * - Status management
   * - Error handling
   * - Progress tracking
   * - Event emission
   */
  async run() {
    var _a, _b, _c, _d, _e, _f;
    this.startedAt = /* @__PURE__ */ new Date();
    (_a = this.logger) == null ? void 0 : _a.info(`Starting task ${this.taskId}, type: ${this.constructor.type}`);
    this.status = {
      type: "running",
      indicator: "progress"
    };
    this.emit("statusChange", this.status);
    try {
      if (this._isCancelled) {
        (_b = this.logger) == null ? void 0 : _b.info(`Task ${this.taskId} was cancelled before execution`);
        this.status = {
          type: "cancelled"
        };
        this.emit("statusChange", this.status);
        return;
      }
      const executePromise = this.execute();
      const result = await executePromise;
      this.status = {
        type: "success",
        indicator: "success",
        payload: result
      };
      (_c = this.logger) == null ? void 0 : _c.info(`Task ${this.taskId} completed successfully with result: ${JSON.stringify(result)}`);
      this.emit("statusChange", this.status);
    } catch (error) {
      if (error instanceof import_async_task_manager.CancelError) {
        this.status = {
          type: "cancelled"
        };
        (_d = this.logger) == null ? void 0 : _d.info(`Task ${this.taskId} was cancelled during execution`);
      } else {
        this.status = {
          type: "failed",
          indicator: "error",
          errors: [{ message: this.renderErrorMessage(error) }]
        };
        (_e = this.logger) == null ? void 0 : _e.error(`Task ${this.taskId} failed with error: ${error.message}`);
      }
      this.emit("statusChange", this.status);
    } finally {
      this.fulfilledAt = /* @__PURE__ */ new Date();
      const duration = this.fulfilledAt.getTime() - this.startedAt.getTime();
      (_f = this.logger) == null ? void 0 : _f.info(`Task ${this.taskId} finished in ${duration}ms`);
    }
  }
  renderErrorMessage(error) {
    const errorHandlerPlugin = this.app.pm.get("error-handler");
    if (!errorHandlerPlugin || !this.context) {
      return error.message;
    }
    const errorHandler = errorHandlerPlugin.errorHandler;
    errorHandler.renderError(error, this.context);
    return this.context.body.errors[0].message;
  }
  toJSON(options) {
    var _a;
    const json = {
      cancelable: this.constructor.cancelable,
      taskId: this.taskId,
      status: { ...this.status },
      progress: this.progress,
      tags: this.tags,
      createdAt: this.createdAt,
      startedAt: this.startedAt,
      fulfilledAt: this.fulfilledAt,
      title: this.title
    };
    if (!(options == null ? void 0 : options.raw) && json.status.type === "success" && ((_a = json.status.payload) == null ? void 0 : _a.filePath)) {
      json.status = {
        type: "success",
        indicator: "success",
        resultType: "file",
        payload: {}
      };
    }
    return json;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TaskType
});
