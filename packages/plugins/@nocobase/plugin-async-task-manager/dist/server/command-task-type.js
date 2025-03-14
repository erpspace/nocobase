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
var command_task_type_exports = {};
__export(command_task_type_exports, {
  CommandTaskType: () => CommandTaskType
});
module.exports = __toCommonJS(command_task_type_exports);
var import_async_task_manager = require("./interfaces/async-task-manager");
var import_node_process = __toESM(require("node:process"));
var import_worker_threads = require("worker_threads");
var import_path = __toESM(require("path"));
var import_task_type = require("./task-type");
class CommandTaskType extends import_task_type.TaskType {
  static type = "command";
  workerThread;
  async execute() {
    var _a;
    const { argv } = this.options;
    const isDev = (((_a = import_node_process.default.argv[1]) == null ? void 0 : _a.endsWith(".ts")) || import_node_process.default.argv[1].includes("tinypool")) ?? false;
    const appRoot = import_node_process.default.env.APP_PACKAGE_ROOT || "packages/core/app";
    const workerPath = import_path.default.resolve(import_node_process.default.cwd(), appRoot, isDev ? "src/index.ts" : "lib/index.js");
    const workerPromise = new Promise((resolve, reject) => {
      var _a2, _b;
      try {
        (_a2 = this.logger) == null ? void 0 : _a2.info(
          `Creating worker for task ${this.taskId} - path: ${workerPath}, argv: ${JSON.stringify(
            argv
          )}, isDev: ${isDev}`
        );
        const worker = new import_worker_threads.Worker(workerPath, {
          execArgv: isDev ? ["--require", "tsx/cjs"] : [],
          workerData: {
            argv
          }
        });
        this.workerThread = worker;
        (_b = this.logger) == null ? void 0 : _b.debug(`Worker created successfully for task ${this.taskId}`);
        let isCancelling = false;
        this.abortController.signal.addEventListener("abort", () => {
          var _a3;
          isCancelling = true;
          (_a3 = this.logger) == null ? void 0 : _a3.info(`Terminating worker for task ${this.taskId} due to cancellation`);
          worker.terminate();
        });
        worker.on("message", (message) => {
          var _a3, _b2;
          (_a3 = this.logger) == null ? void 0 : _a3.debug(`Worker message received for task ${this.taskId} - type: ${message.type}`);
          if (message.type === "progress") {
            this.reportProgress(message.payload);
          }
          if (message.type === "success") {
            (_b2 = this.logger) == null ? void 0 : _b2.info(
              `Worker completed successfully for task ${this.taskId} with payload: ${JSON.stringify(message.payload)}`
            );
            resolve(message.payload);
          }
        });
        worker.on("error", (error) => {
          var _a3;
          (_a3 = this.logger) == null ? void 0 : _a3.error(`Worker error for task ${this.taskId}`, error);
          reject(error);
        });
        worker.on("exit", (code) => {
          var _a3;
          (_a3 = this.logger) == null ? void 0 : _a3.info(`Worker exited for task ${this.taskId} with code ${code}`);
          if (isCancelling) {
            reject(new import_async_task_manager.CancelError());
          } else if (code !== 0) {
            reject(new Error(`Worker stopped with exit code ${code}`));
          } else {
            resolve(code);
          }
        });
        worker.on("messageerror", (error) => {
          reject(error);
        });
      } catch (error) {
        reject(error);
      }
    });
    return workerPromise;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CommandTaskType
});
