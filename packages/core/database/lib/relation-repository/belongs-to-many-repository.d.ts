/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Transaction } from 'sequelize';
import { AggregateOptions, CreateOptions, DestroyOptions, TargetKey } from '../repository';
import { MultipleRelationRepository } from './multiple-relation-repository';
import { AssociatedOptions, PrimaryKeyWithThroughValues } from './types';
type CreateBelongsToManyOptions = CreateOptions;
export declare class BelongsToManyRepository extends MultipleRelationRepository {
    aggregate(options: AggregateOptions): Promise<any>;
    create(options?: CreateBelongsToManyOptions): Promise<any>;
    destroy(options?: TargetKey | TargetKey[] | DestroyOptions): Promise<boolean>;
    add(options: TargetKey | TargetKey[] | PrimaryKeyWithThroughValues | PrimaryKeyWithThroughValues[] | AssociatedOptions): Promise<void>;
    set(options: TargetKey | TargetKey[] | PrimaryKeyWithThroughValues | PrimaryKeyWithThroughValues[] | AssociatedOptions): Promise<void>;
    toggle(options: TargetKey | {
        tk?: TargetKey;
        transaction?: Transaction;
    }): Promise<void>;
    throughName(): any;
    throughModel(): any;
    protected setTargets(call: 'add' | 'set', options: TargetKey | TargetKey[] | PrimaryKeyWithThroughValues | PrimaryKeyWithThroughValues[] | AssociatedOptions): Promise<void>;
}
export {};
