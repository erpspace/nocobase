/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { SyncResult, UserDataResourceManager } from './user-data-resource-manager';
import { SyncSourceManager } from './sync-source-manager';
import { Context } from '@nocobase/actions';
import { SyncSource } from './sync-source';
import { Logger } from '@nocobase/logger';
export declare class UserDataSyncService {
    resourceManager: UserDataResourceManager;
    sourceManager: SyncSourceManager;
    logger: Logger;
    constructor(resourceManager: UserDataResourceManager, sourceManager: SyncSourceManager, logger: Logger);
    pull(sourceName: string, ctx: Context): Promise<void>;
    push(data: any): Promise<SyncResult[]>;
    retry(sourceId: number, taskId: number, ctx: Context): Promise<void>;
    runSync(source: SyncSource, task: any, ctx: Context): Promise<void>;
}
