/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Association, ModelStatic, Transaction } from 'sequelize';
import { Collection } from '../collection';
import Database from '../database';
import { RelationField } from '../fields/relation-field';
import { Model } from '../model';
import { CreateOptions, Filter, FindOptions, FirstOrCreateOptions, TargetKey, UpdateOptions } from './types';
export declare const transaction: (transactionInjector?: any) => (target: any, name: any, descriptor: any) => any;
export declare abstract class RelationRepository {
    sourceCollection: Collection;
    association: Association;
    targetModel: ModelStatic<any>;
    targetCollection: Collection;
    associationName: string;
    associationField: RelationField;
    sourceKeyValue: TargetKey;
    sourceInstance: Model;
    db: Database;
    database: Database;
    constructor(sourceCollection: Collection, association: string, sourceKeyValue: TargetKey);
    decodeMultiTargetKey(str: string): any;
    setSourceKeyValue(sourceKeyValue: TargetKey): void;
    isMultiTargetKey(value?: any): boolean;
    get collection(): Collection<any, any>;
    abstract find(options?: FindOptions): Promise<any>;
    abstract findOne(options?: FindOptions): Promise<any>;
    abstract update(options: UpdateOptions): Promise<any>;
    chunk(options: FindOptions & {
        chunkSize: number;
        callback: (rows: Model[], options: FindOptions) => Promise<void>;
    }): Promise<void>;
    convertTk(options: any): any;
    convertTks(options: any): any[];
    targetKey(): any;
    firstOrCreate(options: FirstOrCreateOptions): Promise<any>;
    updateOrCreate(options: FirstOrCreateOptions): Promise<any>;
    create(options?: CreateOptions): Promise<any>;
    getSourceModel(transaction?: Transaction): Promise<Model<any, any>>;
    accessors(): import("sequelize").SingleAssociationAccessors | import("sequelize").MultiAssociationAccessors;
    protected buildQueryOptions(options: FindOptions): any;
    protected parseFilter(filter: Filter, options?: any): any;
    protected getTransaction(options: any, autoGen?: boolean): Promise<Transaction | null>;
}
