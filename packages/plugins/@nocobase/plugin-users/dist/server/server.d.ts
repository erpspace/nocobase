/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { InstallOptions, Plugin } from '@nocobase/server';
export default class PluginUsersServer extends Plugin {
    beforeLoad(): Promise<void>;
    load(): Promise<void>;
    getInstallingData(options?: any): {
        rootEmail: any;
        rootPassword: any;
        rootNickname: any;
        rootUsername: any;
    };
    initUserCollection(options: InstallOptions): Promise<void>;
    initProfileSchema(): Promise<void>;
    install(options: InstallOptions): Promise<void>;
}
