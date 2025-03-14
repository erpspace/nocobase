/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Plugin } from '@nocobase/server';
import { UserDataResourceManager } from './user-data-resource-manager';
import { UserDataSyncService } from './user-data-sync-service';
import { SyncSourceManager } from './sync-source-manager';
import { Logger } from '@nocobase/logger';
export declare class PluginUserDataSyncServer extends Plugin {
    sourceManager: SyncSourceManager;
    resourceManager: UserDataResourceManager;
    syncService: UserDataSyncService;
    afterAdd(): Promise<void>;
    beforeLoad(): Promise<void>;
    getLogger(): Logger;
    load(): Promise<void>;
    install(): Promise<void>;
    afterEnable(): Promise<void>;
    afterDisable(): Promise<void>;
    remove(): Promise<void>;
}
export default PluginUserDataSyncServer;
