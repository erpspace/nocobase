/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { SendFnType, BaseNotificationChannel } from '@nocobase/plugin-notification-manager';
import { InAppMessageFormValues } from '../types';
export default class InAppNotificationChannel extends BaseNotificationChannel {
    load(): Promise<void>;
    onMessageCreated: (model: any, options: any) => Promise<void>;
    onMessageUpdated: (model: any, options: any) => Promise<void>;
    saveMessageToDB: ({ content, status, userId, title, channelName, receiveTimestamp, options, }: {
        content: string;
        userId: number;
        title: string;
        channelName: string;
        status: 'read' | 'unread';
        receiveTimestamp?: number;
        options?: Record<string, any>;
    }) => Promise<any>;
    send: SendFnType<InAppMessageFormValues>;
    defineActions(): void;
}
