/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Registry } from '@nocobase/utils';
import { SyncSource, SyncSourceExtend } from './sync-source';
import { Context } from '@nocobase/actions';
import { SyncSourceModel } from './models/sync-source';
type SyncSourceConfig = {
    syncSource: SyncSourceExtend<SyncSource>;
    title?: string;
};
export declare class SyncSourceManager {
    protected syncSourceTypes: Registry<SyncSourceConfig>;
    registerType(syncSourceType: string, syncSourceConfig: SyncSourceConfig): void;
    listTypes(): {
        name: string;
        title: string;
    }[];
    getByName(name: string, ctx: Context): Promise<SyncSource>;
    getById(id: number, ctx: Context): Promise<SyncSource>;
    create(sourceInstance: SyncSourceModel, ctx: Context): SyncSource;
}
export {};
