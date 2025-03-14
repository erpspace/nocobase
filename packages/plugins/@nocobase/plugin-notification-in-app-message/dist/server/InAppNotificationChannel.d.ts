/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/// <reference types="node" />
import { Application } from '@nocobase/server';
import { SendFnType, BaseNotificationChannel } from '@nocobase/plugin-notification-manager';
import { InAppMessageFormValues } from '../types';
import { PassThrough } from 'stream';
type UserID = string;
type ClientID = string;
export default class InAppNotificationChannel extends BaseNotificationChannel {
    protected app: Application;
    userClientsMap: Record<UserID, Record<ClientID, PassThrough>>;
    constructor(app: Application);
    load(): Promise<void>;
    onMessageCreatedOrUpdated: () => Promise<void>;
    addClient: (userId: UserID, clientId: ClientID, stream: PassThrough) => void;
    getClient: (userId: UserID, clientId: ClientID) => PassThrough;
    removeClient: (userId: UserID, clientId: ClientID) => void;
    sendDataToUser(userId: UserID, message: {
        type: string;
        data: any;
    }): void;
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
export {};
