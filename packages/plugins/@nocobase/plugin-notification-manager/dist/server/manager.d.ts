/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Registry } from '@nocobase/utils';
import PluginNotificationManagerServer from './plugin';
import type { NotificationChannelConstructor, RegisterServerTypeFnParams, SendOptions, SendUserOptions, WriteLogOptions } from './types';
export declare class NotificationManager implements NotificationManager {
    private plugin;
    channelTypes: Registry<{
        Channel: NotificationChannelConstructor;
    }>;
    constructor({ plugin }: {
        plugin: PluginNotificationManagerServer;
    });
    registerType({ type, Channel }: RegisterServerTypeFnParams): void;
    createSendingRecord: (options: WriteLogOptions) => Promise<any>;
    findChannel(name: string): Promise<any>;
    send(params: SendOptions): Promise<any>;
    sendToUsers(options: SendUserOptions): Promise<any[]>;
}
export default NotificationManager;
