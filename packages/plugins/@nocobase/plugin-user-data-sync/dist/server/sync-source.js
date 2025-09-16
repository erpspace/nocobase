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
var sync_source_exports = {};
__export(sync_source_exports, {
  SyncSource: () => SyncSource
});
module.exports = __toCommonJS(sync_source_exports);
var import_dayjs = __toESM(require("dayjs"));
class SyncSource {
  instance;
  options;
  ctx;
  constructor(config) {
    const { options, ctx, sourceInstance } = config;
    this.instance = sourceInstance;
    this.options = options;
    this.ctx = ctx;
  }
  async newTask() {
    const batch = generateUniqueNumber();
    return await this.instance.createTask({ batch, status: "init" });
  }
  async beginTask(taskId) {
    const tasks = await this.instance.getTasks({ where: { id: taskId } });
    if (!tasks && !tasks.length) {
      throw new Error(`Task [${taskId}] is not found.`);
    }
    const task = tasks[0];
    if (task.status !== "init") {
      throw new Error(`Task [${taskId}] is not init.`);
    }
    task.status = "processing";
    await task.save();
  }
  async endTask(params) {
    const { taskId, success, cost, message } = params;
    const tasks = await this.instance.getTasks({ where: { id: taskId } });
    if (!tasks && !tasks.length) {
      throw new Error(`Task [${taskId}] is not found.`);
    }
    const task = tasks[0];
    if (task.status !== "processing") {
      throw new Error(`Task [${taskId}] is not processing.`);
    }
    task.status = success ? "success" : "failed";
    task.cost = cost;
    task.message = message;
    await task.save();
  }
  async retryTask(taskId) {
    const tasks = await this.instance.getTasks({ where: { id: taskId } });
    if (!tasks && !tasks.length) {
      throw new Error(`Task [${taskId}] is not found.`);
    }
    const task = tasks[0];
    if (task.status !== "failed") {
      throw new Error(`Task [${taskId}] is not failed.`);
    }
    task.status = "processing";
    task.message = "";
    await task.save();
    return task;
  }
}
function generateUniqueNumber() {
  const formattedDate = (0, import_dayjs.default)().format("YYYYMMDDHHmmss");
  const randomDigits = Math.floor(1e5 + Math.random() * 9e5);
  return formattedDate + randomDigits;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SyncSource
});
