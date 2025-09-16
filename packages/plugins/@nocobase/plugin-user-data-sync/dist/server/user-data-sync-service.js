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
var user_data_sync_service_exports = {};
__export(user_data_sync_service_exports, {
  UserDataSyncService: () => UserDataSyncService
});
module.exports = __toCommonJS(user_data_sync_service_exports);
var import_error = require("./error");
class UserDataSyncService {
  resourceManager;
  sourceManager;
  logger;
  constructor(resourceManager, sourceManager, logger) {
    this.resourceManager = resourceManager;
    this.sourceManager = sourceManager;
    this.logger = logger;
  }
  async pull(sourceName, ctx) {
    const source = await this.sourceManager.getByName(sourceName, ctx);
    const task = await source.newTask();
    await source.beginTask(task.id);
    ctx.log.info("begin sync task of source", { source: sourceName, sourceType: source.instance.sourceType });
    this.runSync(source, task, ctx);
  }
  async push(data) {
    const { dataType, records } = data;
    if (dataType === void 0) {
      throw new Error("dataType for user data synchronize is required");
    }
    if (dataType !== "user" && dataType !== "department") {
      throw new Error("dataType must be user or department");
    }
    if (records === void 0) {
      throw new Error("records for user data synchronize is required");
    }
    if (records.length === 0) {
      throw new Error("records must have at least one piece of data");
    }
    const userData = {
      dataType: data.dataType,
      matchKey: data.matchKey,
      records: data.records,
      sourceName: data.sourceName ? data.sourceName : "api"
    };
    this.logger.info({
      source: data.sourceName ? data.sourceName : "api",
      sourceType: "api",
      data
    });
    return await this.resourceManager.updateOrCreate(userData);
  }
  async retry(sourceId, taskId, ctx) {
    const source = await this.sourceManager.getById(sourceId, ctx);
    const task = await source.retryTask(taskId);
    ctx.log.info("retry sync task of source", {
      source: source.instance.name,
      sourceType: source.instance.name,
      task: task.id
    });
    this.runSync(source, task, ctx);
  }
  async runSync(source, task, ctx) {
    const currentTimeMillis = (/* @__PURE__ */ new Date()).getTime();
    try {
      ctx.log.info("begin pull data of source", {
        source: source.instance.name,
        sourceType: source.instance.sourceType
      });
      const data = await source.pull();
      this.logger.info({
        source: source.instance.name,
        sourceType: source.instance.sourceType,
        batch: task.batch,
        data
      });
      ctx.log.info("end pull data of source", { source: source.instance.name, sourceType: source.instance.sourceType });
      ctx.log.info("begin update data of source", {
        source: source.instance.name,
        sourceType: source.instance.sourceType
      });
      for (const item of data) {
        await this.resourceManager.updateOrCreate(item);
      }
      ctx.log.info("end update data of source", {
        source: source.instance.name,
        sourceType: source.instance.sourceType
      });
      const costTime = (/* @__PURE__ */ new Date()).getTime() - currentTimeMillis;
      await source.endTask({ taskId: task.id, success: true, cost: costTime });
    } catch (err) {
      ctx.log.error(
        `sync task of source: ${source.instance.name} sourceType: ${source.instance.sourceType} error: ${err.message}`,
        { method: "runSync", err: err.stack, cause: err.cause }
      );
      let message = err.message;
      if (err instanceof import_error.ExternalAPIError) {
        message = "The sync source API call failed. Please check the logs to troubleshoot the issue.";
      }
      await source.endTask({ taskId: task.id, success: false, message });
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  UserDataSyncService
});
