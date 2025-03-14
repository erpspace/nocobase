/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export interface Channel {
    name: string;
    title: string;
    userId: string;
    unreadMsgCnt: number;
    totalMsgCnt: number;
    latestMsgReceiveTimestamp: number;
    latestMsgTitle: string;
}
export interface Message {
    id: string;
    title: string;
    userId: string;
    channelName: string;
    content: string;
    receiveTimestamp: number;
    status: 'read' | 'unread';
    url: string;
    options: Record<string, any>;
}
export type SSEData = {
    type: 'message:created';
    data: Message;
};
export interface InAppMessageFormValues {
    receivers: string[];
    content: string;
    senderName: string;
    senderId: string;
    url: string;
    title: string;
    options: Record<string, any>;
}
export declare const InAppMessagesDefinition: {
    readonly name: "notificationInAppMessages";
    readonly fieldNameMap: {
        readonly id: "id";
        readonly channelName: "channelName";
        readonly userId: "userId";
        readonly content: "content";
        readonly status: "status";
        readonly title: "title";
        readonly receiveTimestamp: "receiveTimestamp";
        readonly options: "options";
    };
};
export declare const ChannelsDefinition: {
    readonly name: "notificationInAppChannels";
    readonly fieldNameMap: {
        readonly id: "id";
        readonly senderId: "senderId";
        readonly title: "title";
        readonly lastMsgId: "lastMsgId";
    };
};
export declare const inAppTypeName = "in-app-message";
