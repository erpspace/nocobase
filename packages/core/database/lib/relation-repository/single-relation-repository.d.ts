/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { SingleAssociationAccessors, Transactionable } from 'sequelize';
import { Model } from '../model';
import { FindOptions, TargetKey, UpdateOptions } from './types';
import { RelationRepository } from './relation-repository';
interface SetOption extends Transactionable {
    tk?: TargetKey;
}
export declare abstract class SingleRelationRepository extends RelationRepository {
    abstract filterOptions(sourceModel: any): any;
    remove(options?: Transactionable): Promise<void>;
    set(options: TargetKey | SetOption): Promise<void>;
    find(options?: FindOptions): Promise<any>;
    findOne(options?: FindOptions): Promise<Model<any>>;
    destroy(options?: Transactionable): Promise<boolean>;
    update(options: UpdateOptions): Promise<any>;
    /**
     * @internal
     */
    accessors(): SingleAssociationAccessors;
}
export {};
