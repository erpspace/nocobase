/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { AggregateOptions, DestroyOptions, FindOptions, TargetKey, TK } from '../repository';
import { MultipleRelationRepository } from './multiple-relation-repository';
import { AssociatedOptions } from './types';
export declare class HasManyRepository extends MultipleRelationRepository {
    find(options?: FindOptions): Promise<any>;
    aggregate(options: AggregateOptions): Promise<any>;
    destroy(options?: TK | DestroyOptions): Promise<boolean>;
    set(options: TargetKey | TargetKey[] | AssociatedOptions): Promise<void>;
    add(options: TargetKey | TargetKey[] | AssociatedOptions): Promise<void>;
    /**
     * @internal
     */
    accessors(): import("sequelize").MultiAssociationAccessors;
}
