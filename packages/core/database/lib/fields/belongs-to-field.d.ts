/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { BelongsToOptions as SequelizeBelongsToOptions } from 'sequelize';
import { Reference, ReferencePriority } from '../features/references-map';
import { BaseRelationFieldOptions, RelationField } from './relation-field';
export declare class BelongsToField extends RelationField {
    static type: string;
    get dataType(): string;
    get target(): any;
    static toReference(db: any, association: any, onDelete: any, priority?: ReferencePriority): Reference;
    reference(association: any): Reference;
    checkAssociationKeys(): void;
    bind(): boolean;
    unbind(): void;
}
export interface BelongsToFieldOptions extends BaseRelationFieldOptions, SequelizeBelongsToOptions {
    type: 'belongsTo';
    target?: string;
}
