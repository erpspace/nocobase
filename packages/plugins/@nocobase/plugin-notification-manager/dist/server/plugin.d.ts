/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import type { Logger } from '@nocobase/logger';
import { Plugin } from '@nocobase/server';
import { RegisterServerTypeFnParams, SendOptions, SendUserOptions } from './types';
export declare class PluginNotificationManagerServer extends Plugin {
    private manager;
    logger: Logger;
    get channelTypes(): import("@nocobase/utils").Registry<{
        Channel: import("./types").NotificationChannelConstructor;
    }>;
    registerChannelType(params: RegisterServerTypeFnParams): void;
    send(options: SendOptions): Promise<any>;
    sendToUsers(options: SendUserOptions): Promise<any[]>;
    afterAdd(): Promise<void>;
    beforeLoad(): Promise<void>;
    load(): Promise<void>;
    install(): Promise<void>;
    afterEnable(): Promise<void>;
    afterDisable(): Promise<void>;
    remove(): Promise<void>;
}
export default PluginNotificationManagerServer;
