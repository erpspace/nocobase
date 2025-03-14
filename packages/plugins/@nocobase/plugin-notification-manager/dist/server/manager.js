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
var manager_exports = {};
__export(manager_exports, {
  NotificationManager: () => NotificationManager,
  default: () => manager_default
});
module.exports = __toCommonJS(manager_exports);
var import_utils = require("@nocobase/utils");
var import_constant = require("../constant");
var import_compile = require("./utils/compile");
class NotificationManager {
  plugin;
  channelTypes = new import_utils.Registry();
  constructor({ plugin }) {
    this.plugin = plugin;
  }
  registerType({ type, Channel }) {
    this.channelTypes.register(type, { Channel });
  }
  createSendingRecord = async (options) => {
    const logsRepo = this.plugin.app.db.getRepository(import_constant.COLLECTION_NAME.logs);
    return logsRepo.create({ values: options });
  };
  async findChannel(name) {
    const repository = this.plugin.app.db.getRepository(import_constant.COLLECTION_NAME.channels);
    const instance = await repository.findOne({ filterByTk: name });
    return this.plugin.app.environment.renderJsonTemplate(instance.toJSON());
  }
  async send(params) {
    this.plugin.logger.info("receive sending message request", params);
    console.log("receive sending message request", params);
    const message = (0, import_compile.compile)(params.message ?? {}, params.data ?? {});
    const messageData = { ...params.receivers ? { receivers: params.receivers } : {}, ...message };
    const logData = {
      triggerFrom: params.triggerFrom,
      channelName: params.channelName,
      message: messageData
    };
    try {
      const channel = await this.findChannel(params.channelName);
      if (channel) {
        const Channel = this.channelTypes.get(channel.notificationType).Channel;
        const instance = new Channel(this.plugin.app);
        logData.channelTitle = channel.title;
        logData.notificationType = channel.notificationType;
        logData.receivers = params.receivers;
        const result = await instance.send({ message, channel, receivers: params.receivers });
        logData.status = result.status;
        logData.reason = result.reason;
      } else {
        logData.status = "failure";
        logData.reason = "channel not found";
      }
      this.createSendingRecord(logData);
      return logData;
    } catch (error) {
      logData.status = "failure";
      this.plugin.logger.error(`notification send failed, options: ${JSON.stringify(error)}`);
      logData.reason = JSON.stringify(error);
      this.createSendingRecord(logData);
      return logData;
    }
  }
  async sendToUsers(options) {
    this.plugin.logger.info(`notificationManager.sendToUsers options: ${JSON.stringify(options)}`);
    const { userIds, channels, message, data = {} } = options;
    return await Promise.all(
      channels.map(
        (channelName) => this.send({
          channelName,
          message,
          data,
          triggerFrom: "sendToUsers",
          receivers: { value: userIds, type: "userId" }
        })
      )
    );
  }
}
var manager_default = NotificationManager;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NotificationManager
});
