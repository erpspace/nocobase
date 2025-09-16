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
var defineMyInAppMessages_exports = {};
__export(defineMyInAppMessages_exports, {
  default: () => defineMyInAppMessages
});
module.exports = __toCommonJS(defineMyInAppMessages_exports);
var import_actions = __toESM(require("@nocobase/actions"));
var import_plugin_notification_manager = require("@nocobase/plugin-notification-manager");
var import_sequelize = require("sequelize");
var import_types = require("../types");
function defineMyInAppMessages(app) {
  const countTotalUnreadMessages = async (userId) => {
    const messagesRepo = app.db.getRepository(import_types.InAppMessagesDefinition.name);
    const channelsCollection = app.db.getCollection(import_plugin_notification_manager.ChannelsCollectionDefinition.name);
    const channelsTableName = channelsCollection.getRealTableName(true);
    const channelsFieldName = {
      name: channelsCollection.getRealFieldName(import_plugin_notification_manager.ChannelsCollectionDefinition.fieldNameMap.name, true)
    };
    const count = await messagesRepo.count({
      // @ts-ignore
      where: {
        userId,
        status: "unread",
        channelName: {
          [import_sequelize.Op.in]: import_sequelize.Sequelize.literal(`(select ${channelsFieldName.name} from ${channelsTableName})`)
        }
      }
    });
    return count;
  };
  app.resourceManager.define({
    name: "myInAppMessages",
    actions: {
      // sse: {
      //   handler: async (ctx, next) => {
      //     const userId = ctx.state.currentUser.id;
      //     const clientId = ctx.action?.params?.id;
      //     if (!clientId) return;
      //     ctx.request.socket.setTimeout(0);
      //     ctx.req.socket.setNoDelay(true);
      //     ctx.req.socket.setKeepAlive(true);
      //     ctx.set({
      //       'Content-Type': 'text/event-stream',
      //       'Cache-Control': 'no-cache',
      //       Connection: 'keep-alive',
      //     });
      //     const stream = new PassThrough();
      //     ctx.status = 200;
      //     ctx.body = stream;
      //     addClient(userId, clientId, stream);
      //     stream.on('close', () => {
      //       removeClient(userId, clientId);
      //     });
      //     stream.on('error', () => {
      //       removeClient(userId, clientId);
      //     });
      //     await next();
      //   },
      // },
      count: {
        handler: async (ctx) => {
          try {
            const userId = ctx.state.currentUser.id;
            const count = await countTotalUnreadMessages(userId);
            ctx.body = { count };
          } catch (error) {
            console.error(error);
          }
        }
      },
      list: {
        handler: async (ctx) => {
          var _a, _b;
          const userId = ctx.state.currentUser.id;
          const messagesRepo = app.db.getRepository(import_types.InAppMessagesDefinition.name);
          const { filter = {} } = ((_a = ctx.action) == null ? void 0 : _a.params) ?? {};
          const messageList = await messagesRepo.find({
            limit: 20,
            ...((_b = ctx.action) == null ? void 0 : _b.params) ?? {},
            filter: {
              ...filter,
              userId
            },
            sort: "-receiveTimestamp"
          });
          ctx.body = { messages: messageList };
        }
      }
    }
  });
  app.resourceManager.define({
    name: import_types.InAppMessagesDefinition.name,
    actions: {
      updateMyOwn: {
        handler: async (ctx, next) => {
          const userId = ctx.state.currentUser.id;
          if (!ctx.action) {
            ctx.throw(400, "ctx.action not found");
          }
          if (ctx.action) {
            ctx.action.mergeParams({
              filter: {
                userId
              }
            });
            return import_actions.default.update(ctx, next);
          }
        }
      }
    }
  });
}
