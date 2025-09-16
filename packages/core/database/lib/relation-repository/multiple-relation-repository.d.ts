/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { MultiAssociationAccessors, Transaction } from 'sequelize';
import { RelationRepository } from './relation-repository';
import { AssociatedOptions, CountOptions, DestroyOptions, Filter, FindOptions, TargetKey, UpdateOptions, FirstOrCreateOptions } from './types';
export declare abstract class MultipleRelationRepository extends RelationRepository {
    targetRepositoryFilterOptionsBySourceValue(): Promise<any>;
    find(options?: FindOptions): Promise<any>;
    findAndCount(options?: FindOptions): Promise<[any[], number]>;
    count(options?: CountOptions): Promise<number>;
    findOne(options?: FindOptions): Promise<any>;
    remove(options: TargetKey | TargetKey[] | AssociatedOptions): Promise<void>;
    update(options?: UpdateOptions): Promise<any>;
    destroy(options?: TargetKey | DestroyOptions): Promise<boolean>;
    protected destroyByFilter(options: {
        filter?: Filter;
        filterByTk?: TargetKey | TargetKey[];
    }, transaction?: Transaction): Promise<boolean>;
    protected filterHasInclude(filter: Filter, options?: any): boolean;
    accessors(): MultiAssociationAccessors;
    updateOrCreate(options: FirstOrCreateOptions): Promise<any>;
}
