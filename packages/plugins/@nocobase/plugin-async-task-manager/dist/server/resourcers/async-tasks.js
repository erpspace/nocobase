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
var async_tasks_exports = {};
__export(async_tasks_exports, {
  default: () => async_tasks_default
});
module.exports = __toCommonJS(async_tasks_exports);
var import_fs = __toESM(require("fs"));
var import_path = require("path");
var async_tasks_default = {
  name: "asyncTasks",
  actions: {
    async get(ctx, next) {
      const { filterByTk } = ctx.action.params;
      const taskManager = ctx.app.container.get("AsyncTaskManager");
      const taskStatus = await taskManager.getTaskStatus(filterByTk);
      ctx.body = taskStatus;
      await next();
    },
    async fetchFile(ctx, next) {
      const { filterByTk } = ctx.action.params;
      const taskManager = ctx.app.container.get("AsyncTaskManager");
      const taskStatus = await taskManager.getTaskStatus(filterByTk);
      if (taskStatus.type !== "success") {
        throw new Error("Task is not success status");
      }
      const { filePath } = taskStatus.payload;
      if (!filePath) {
        throw new Error("not a file task");
      }
      ctx.body = import_fs.default.createReadStream(filePath);
      ctx.set({
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename=${(0, import_path.basename)(filePath)}`
      });
      await next();
    }
  }
};
