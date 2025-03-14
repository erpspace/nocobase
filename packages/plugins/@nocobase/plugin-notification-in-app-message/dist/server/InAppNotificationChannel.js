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
  constructor(app) {
    super(app);
    this.app = app;
    this.userClientsMap = {};
  }
  userClientsMap;
  async load() {
    this.onMessageCreatedOrUpdated();
    this.defineActions();
  }
  onMessageCreatedOrUpdated = async () => {
    this.app.db.on(`${import_types2.InAppMessagesDefinition.name}.afterUpdate`, async (model, options) => {
      const userId = model.userId;
      this.sendDataToUser(userId, { type: "message:updated", data: model.dataValues });
    });
    this.app.db.on(`${import_types2.InAppMessagesDefinition.name}.afterCreate`, async (model, options) => {
      const userId = model.userId;
      this.sendDataToUser(userId, { type: "message:created", data: model.dataValues });
    });
  };
  addClient = (userId, clientId, stream) => {
    if (!this.userClientsMap[userId]) {
      this.userClientsMap[userId] = {};
    }
    this.userClientsMap[userId][clientId] = stream;
  };
  getClient = (userId, clientId) => {
    var _a;
    return (_a = this.userClientsMap[userId]) == null ? void 0 : _a[clientId];
  };
  removeClient = (userId, clientId) => {
    if (this.userClientsMap[userId]) {
      delete this.userClientsMap[userId][clientId];
    }
  };
  sendDataToUser(userId, message) {
    const clients = this.userClientsMap[userId];
    if (clients) {
      for (const clientId in clients) {
        const stream = clients[clientId];
        stream.write(
          `data: ${JSON.stringify({
            type: message.type,
            data: {
              ...message.data,
              title: message.data.title || "",
              content: message.data.content || ""
            }
          })}

`
        );
      }
    }
  }
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
    (0, import_defineMyInAppMessages.default)({
      app: this.app,
      addClient: this.addClient,
      removeClient: this.removeClient,
      getClient: this.getClient
    });
    (0, import_defineMyInAppChannels.default)({ app: this.app });
    this.app.acl.allow("myInAppMessages", "*", "loggedIn");
    this.app.acl.allow("myInAppChannels", "*", "loggedIn");
    this.app.acl.allow("notificationInAppMessages", "*", "loggedIn");
  }
}
