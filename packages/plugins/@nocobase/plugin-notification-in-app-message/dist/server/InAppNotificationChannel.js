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
var InAppNotificationChannel_exports = {};
__export(InAppNotificationChannel_exports, {
  default: () => InAppNotificationChannel
});
module.exports = __toCommonJS(InAppNotificationChannel_exports);
var import_plugin_notification_manager = require("@nocobase/plugin-notification-manager");
var import_types2 = require("../types");
var import_parseUserSelectionConf = require("./parseUserSelectionConf");
var import_defineMyInAppMessages = __toESM(require("./defineMyInAppMessages"));
var import_defineMyInAppChannels = __toESM(require("./defineMyInAppChannels"));
class InAppNotificationChannel extends import_plugin_notification_manager.BaseNotificationChannel {
  // userClientsMap: Record<UserID, Record<ClientID, PassThrough>>;
  // constructor(protected app: Application) {
  //   super(app);
  //   this.userClientsMap = {};
  // }
  async load() {
    this.app.db.on(`${import_types2.InAppMessagesDefinition.name}.afterCreate`, this.onMessageCreated);
    this.app.db.on(`${import_types2.InAppMessagesDefinition.name}.afterUpdate`, this.onMessageUpdated);
    this.defineActions();
  }
  onMessageCreated = async (model, options) => {
    const userId = model.userId;
    this.app.emit("ws:sendToTag", {
      tagKey: "userId",
      tagValue: userId,
      message: {
        type: "in-app-message:created",
        payload: model.toJSON()
      }
    });
  };
  onMessageUpdated = async (model, options) => {
    const userId = model.userId;
    this.app.emit("ws:sendToTag", {
      tagKey: "userId",
      tagValue: userId,
      message: {
        type: "in-app-message:updated",
        payload: model.toJSON()
      }
    });
  };
  saveMessageToDB = async ({
    content,
    status,
    userId,
    title,
    channelName,
    receiveTimestamp,
    options = {}
  }) => {
    const messagesRepo = this.app.db.getRepository(import_types2.InAppMessagesDefinition.name);
    const message = await messagesRepo.create({
      values: {
        content,
        title,
        channelName,
        status,
        userId,
        receiveTimestamp: receiveTimestamp ?? Date.now(),
        options
      }
    });
    return message;
  };
  send = async (params) => {
    const { channel, message, receivers } = params;
    let userIds;
    const { content, title, options = {} } = message;
    const userRepo = this.app.db.getRepository("users");
    if ((receivers == null ? void 0 : receivers.type) === "userId") {
      userIds = receivers.value;
    } else {
      userIds = (await (0, import_parseUserSelectionConf.parseUserSelectionConf)(message.receivers, userRepo)).map((i) => parseInt(i));
    }
    await Promise.all(
      userIds.map(async (userId) => {
        await this.saveMessageToDB({
          title,
          content,
          status: "unread",
          userId,
          channelName: channel.name,
          options
        });
      })
    );
    return { status: "success", message };
  };
  defineActions() {
    (0, import_defineMyInAppMessages.default)(this.app);
    (0, import_defineMyInAppChannels.default)(this.app);
    this.app.acl.allow("myInAppMessages", "*", "loggedIn");
    this.app.acl.allow("myInAppChannels", "*", "loggedIn");
    this.app.acl.allow("notificationInAppMessages", "*", "loggedIn");
  }
}
