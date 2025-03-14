/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Context } from '@nocobase/actions';
import { SyncSourceModel } from './models/sync-source';
import { UserData } from './user-data-resource-manager';
export type SyncSourceConfig = {
    sourceInstance: SyncSourceModel;
    options: {
        [key: string]: any;
    };
    ctx: Context;
};
interface ISyncSource {
    pull(): Promise<UserData[]>;
}
export declare abstract class SyncSource implements ISyncSource {
    instance: SyncSourceModel;
    protected options: {
        [key: string]: any;
    };
    protected ctx: Context;
    constructor(config: SyncSourceConfig);
    abstract pull(): Promise<UserData[]>;
    newTask(): Promise<any>;
    beginTask(taskId: number): Promise<void>;
    endTask(params: EndTaskParams): Promise<void>;
    retryTask(taskId: number): Promise<any>;
}
export type SyncSourceExtend<T extends SyncSource> = new (config: SyncSourceConfig) => T;
type EndTaskParams = {
    taskId: number;
    success: boolean;
    cost?: number;
    message?: string;
};
export {};
