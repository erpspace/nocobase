/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { BaseColumnFieldOptions, CreateOptions, DataTypes, Field, Model } from '@nocobase/database';
export declare class SnapshotField extends Field {
    get dataType(): DataTypes.AbstractDataTypeConstructor;
    createSnapshot: (model: Model, { transaction, values }: CreateOptions) => Promise<void>;
    bind(): void;
    unbind(): void;
}
export interface SnapshotFieldOptions extends BaseColumnFieldOptions {
    type: 'snapshot';
    targetField: string;
    targetCollection?: string;
    appends?: string[];
}
