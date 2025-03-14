/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { DataTypes } from 'sequelize';
import { BaseColumnFieldOptions, Field } from '@nocobase/database';
import { LockManager } from '@nocobase/lock-manager';
export declare class SortField extends Field {
    static lockManager: LockManager;
    get dataType(): DataTypes.BigIntDataTypeConstructor;
    setSortValue: (instance: any, options: any) => Promise<void>;
    onScopeChange: (instance: any, options: any) => Promise<void>;
    initRecordsSortValue: (options: any) => Promise<void>;
    bind(): void;
    unbind(): void;
}
export interface SortFieldOptions extends BaseColumnFieldOptions {
    type: 'sort';
    scopeKey?: string;
}
