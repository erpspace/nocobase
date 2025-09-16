/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Plugin } from '@nocobase/client';
import { RegisterChannelOptions } from './manager/channel/types';
export declare class PluginNotificationManagerClient extends Plugin {
    private manager;
    useNotificationTypes: () => RegisterChannelOptions[];
    get channelTypes(): any;
    registerChannelType(options: RegisterChannelOptions): void;
    afterAdd(): Promise<void>;
    beforeLoad(): Promise<void>;
    load(): Promise<void>;
}
export { NotificationVariableContext, NotificationVariableProvider, useNotificationVariableOptions } from './hooks';
export { MessageConfigForm } from './manager/message/components/MessageConfigForm';
export { ContentConfigForm } from './manager/message/components/ContentConfigForm';
export { UserSelect, UserAddition } from './manager/receiver/components/User';
export default PluginNotificationManagerClient;
