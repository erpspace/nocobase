/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { AssociationScope, BelongsToManyOptions as SequelizeBelongsToManyOptions } from 'sequelize';
import { Reference } from '../features/references-map';
import { MultipleRelationFieldOptions, RelationField } from './relation-field';
export declare class BelongsToManyField extends RelationField {
    get dataType(): string;
    get through(): any;
    get otherKey(): any;
    references(association: any): Reference[];
    checkAssociationKeys(database: any): void;
    bind(): boolean;
    unbind(): void;
}
export interface BelongsToManyFieldOptions extends MultipleRelationFieldOptions, Omit<SequelizeBelongsToManyOptions, 'through'> {
    type: 'belongsToMany';
    target?: string;
    through?: string;
    throughScope?: AssociationScope;
    throughUnique?: boolean;
    throughParanoid?: boolean;
}
