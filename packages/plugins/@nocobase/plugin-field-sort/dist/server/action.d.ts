/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Collection, TargetKey, Model } from '@nocobase/database';
import { Context } from '@nocobase/actions';
import { SortField } from './sort-field';
export declare function move(ctx: Context, next: any): Promise<any>;
interface MoveOptions {
    insertAfter?: boolean;
}
export declare class SortableCollection {
    collection: Collection;
    field: SortField;
    scopeKey: string;
    constructor(collection: Collection, fieldName?: string);
    move(sourceInstanceId: TargetKey, targetInstanceId: TargetKey, options?: MoveOptions): Promise<void>;
    changeScope(sourceInstanceId: TargetKey, targetScope: any, method?: string): Promise<void>;
    sticky(sourceInstanceId: TargetKey): Promise<void>;
    sameScopeMove(sourceInstance: Model, targetInstance: Model, options: MoveOptions): Promise<void>;
}
export {};
