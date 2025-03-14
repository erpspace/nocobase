/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Message } from '../../types';
export declare const messageMapObs: {
    value: Record<string, Message>;
};
export declare const isFecthingMessageObs: {
    value: boolean;
};
export declare const messageListObs: {
    value: Message[];
};
export declare const selectedMessageListObs: {
    value: Message[];
};
export declare const fetchMessages: (params?: any) => Promise<void>;
export declare const updateMessage: (params: {
    filterByTk: any;
    values: Record<any, any>;
}) => Promise<void>;
export declare const unreadMsgsCountObs: {
    value: number | null;
};
export declare const updateUnreadMsgsCount: () => Promise<void>;
export declare const showMsgLoadingMoreObs: {
    value: boolean;
};
