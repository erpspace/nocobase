/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export type Message = {
    id: string;
    title: string;
    receiveTimestamp: number;
    content: string;
    status: 'read' | 'unread';
};
export type Group = {
    id: string;
    title: string;
    msgMap: Record<string, Message>;
    unreadMsgCnt: number;
    latestMsgReceiveTimestamp: number;
    latestMsgTitle: string;
};
declare const useChats: () => {
    chatMap: Record<string, Group>;
    chatList: Group[];
    addChat: (chat: any) => void;
    addChats: (groups: any) => void;
    fetchChats: ({ filter, limit }: {
        filter?: Record<string, any>;
        limit?: number;
    }) => Promise<void>;
    fetchMessages: ({ filter }: {
        filter: any;
    }) => Promise<void>;
    addMessagesToGroup: (groupId: string, messages: Message[]) => Promise<void>;
};
export default useChats;
