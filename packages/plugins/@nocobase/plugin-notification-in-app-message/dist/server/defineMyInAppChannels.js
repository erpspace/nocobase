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
var defineMyInAppChannels_exports = {};
__export(defineMyInAppChannels_exports, {
  default: () => defineMyInAppChannels
});
module.exports = __toCommonJS(defineMyInAppChannels_exports);
var import_sequelize = require("sequelize");
var import_plugin_notification_manager = require("@nocobase/plugin-notification-manager");
var import_types = require("../types");
function defineMyInAppChannels({ app }) {
  app.resourceManager.define({
    name: "myInAppChannels",
    actions: {
      list: {
        handler: async (ctx) => {
          var _a, _b;
          const { filter = {}, limit = 30 } = ((_a = ctx.action) == null ? void 0 : _a.params) ?? {};
          const messagesCollection = app.db.getCollection(import_types.InAppMessagesDefinition.name);
          const messagesTableName = messagesCollection.getRealTableName(true);
          const channelsCollection = app.db.getCollection(import_plugin_notification_manager.ChannelsCollectionDefinition.name);
          const channelsTableAliasName = app.db.sequelize.getQueryInterface().quoteIdentifier(channelsCollection.name);
          const channelsFieldName = {
            name: channelsCollection.getRealFieldName(import_plugin_notification_manager.ChannelsCollectionDefinition.fieldNameMap.name, true)
          };
          const messagesFieldName = {
            channelName: messagesCollection.getRealFieldName(import_types.InAppMessagesDefinition.fieldNameMap.channelName, true),
            status: messagesCollection.getRealFieldName(import_types.InAppMessagesDefinition.fieldNameMap.status, true),
            userId: messagesCollection.getRealFieldName(import_types.InAppMessagesDefinition.fieldNameMap.userId, true),
            receiveTimestamp: messagesCollection.getRealFieldName(
              import_types.InAppMessagesDefinition.fieldNameMap.receiveTimestamp,
              true
            ),
            title: messagesCollection.getRealFieldName(import_types.InAppMessagesDefinition.fieldNameMap.title, true)
          };
          const userId = ctx.state.currentUser.id;
          const userFilter = userId ? {
            name: {
              [import_sequelize.Op.in]: import_sequelize.Sequelize.literal(`(
                                SELECT messages.${messagesFieldName.channelName}
                                FROM ${messagesTableName} AS messages
                                WHERE
                                   messages.${messagesFieldName.userId} = ${userId}
                            )`)
            }
          } : null;
          const latestMsgReceiveTimestampSQL = `(
                                SELECT messages.${messagesFieldName.receiveTimestamp}
                                FROM ${messagesTableName} AS messages
                                WHERE
                                    messages.${messagesFieldName.channelName} = ${channelsTableAliasName}.${channelsFieldName.name}
                                    AND messages.${messagesFieldName.userId} = ${userId}
                                ORDER BY messages.${messagesFieldName.receiveTimestamp} DESC
                                LIMIT 1
                            )`;
          const latestMsgReceiveTSFilter = ((_b = filter == null ? void 0 : filter.latestMsgReceiveTimestamp) == null ? void 0 : _b.$lt) ? import_sequelize.Sequelize.literal(`${latestMsgReceiveTimestampSQL} < ${filter.latestMsgReceiveTimestamp.$lt}`) : null;
          const channelIdFilter = (filter == null ? void 0 : filter.id) ? { id: filter.id } : null;
          const statusMap = {
            all: "read|unread",
            unread: "unread",
            read: "read"
          };
          const filterChannelsByStatusSQL = ({ status }) => {
            const sql = import_sequelize.Sequelize.literal(`(
              SELECT  messages.${messagesFieldName.channelName}
              FROM ${messagesTableName} AS messages
              WHERE messages.${messagesFieldName.status} = '${status}'
              AND messages.${messagesFieldName.userId} = ${userId}
          )`);
            return { name: { [import_sequelize.Op.in]: sql } };
          };
          const channelStatusFilter = filter.status === "all" || !filter.status ? null : filterChannelsByStatusSQL({ status: statusMap[filter.status] });
          const channelsRepo = app.db.getRepository(import_plugin_notification_manager.ChannelsCollectionDefinition.name);
          try {
            const channelsRes = channelsRepo.find({
              logging: console.log,
              limit,
              attributes: {
                include: [
                  [
                    import_sequelize.Sequelize.literal(`(
                                SELECT COUNT(*)
                                FROM ${messagesTableName} AS messages
                                WHERE
                                    messages.${messagesFieldName.channelName} = ${channelsTableAliasName}.${channelsFieldName.name}
                                    AND messages.${messagesFieldName.userId} = ${userId}
                            )`),
                    "totalMsgCnt"
                  ],
                  [import_sequelize.Sequelize.literal(`'${userId}'`), "userId"],
                  [
                    import_sequelize.Sequelize.literal(`(
                                SELECT COUNT(*)
                                FROM ${messagesTableName} AS messages
                                WHERE
                                    messages.${messagesFieldName.channelName} = ${channelsTableAliasName}.${channelsFieldName.name}
                                    AND messages.${messagesFieldName.status} = 'unread'
                                    AND messages.${messagesFieldName.userId} = ${userId}
                            )`),
                    "unreadMsgCnt"
                  ],
                  [import_sequelize.Sequelize.literal(latestMsgReceiveTimestampSQL), "latestMsgReceiveTimestamp"],
                  [
                    import_sequelize.Sequelize.literal(`(
                      SELECT messages.${messagesFieldName.title}
                              FROM ${messagesTableName} AS messages
                              WHERE
                                  messages.${messagesFieldName.channelName} = ${channelsTableAliasName}.${channelsFieldName.name}
                                  AND messages.${messagesFieldName.userId} = ${userId}
                              ORDER BY messages.${messagesFieldName.receiveTimestamp} DESC
                              LIMIT 1
                  )`),
                    "latestMsgTitle"
                  ]
                ]
              },
              //@ts-ignore
              where: {
                [import_sequelize.Op.and]: [userFilter, latestMsgReceiveTSFilter, channelIdFilter, channelStatusFilter].filter(Boolean)
              },
              sort: ["-latestMsgReceiveTimestamp"]
            });
            const countRes = channelsRepo.count({
              //@ts-ignore
              where: {
                [import_sequelize.Op.and]: [userFilter, channelStatusFilter].filter(Boolean)
              }
            });
            const [channels, count] = await Promise.all([channelsRes, countRes]);
            ctx.body = { rows: channels, count };
          } catch (error) {
            console.error(error);
          }
        }
      }
    }
  });
}
