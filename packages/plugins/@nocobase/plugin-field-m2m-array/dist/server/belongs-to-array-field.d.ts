/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { BaseColumnFieldOptions, RelationField } from '@nocobase/database';
export declare const elementTypeMap: {
    nanoid: string;
    sequence: string;
    uid: string;
};
export declare class BelongsToArrayField extends RelationField {
    get dataType(): string;
    private setForeignKeyArray;
    checkTargetCollection(): boolean;
    checkAssociationKeys(): void;
    bind(): boolean;
    unbind(): void;
}
export interface BelongsToArrayFieldOptions extends BaseColumnFieldOptions {
    type: 'belongsToArray';
    foreignKey: string;
    target: string;
    targetKey: string;
}
