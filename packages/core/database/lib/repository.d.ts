/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/// <reference types="node" />
import { Association, BulkCreateOptions, ModelStatic, FindAndCountOptions as SequelizeAndCountOptions, CountOptions as SequelizeCountOptions, CreateOptions as SequelizeCreateOptions, DestroyOptions as SequelizeDestroyOptions, FindOptions as SequelizeFindOptions, UpdateOptions as SequelizeUpdateOptions, Transactionable, WhereOperators } from 'sequelize';
import { BelongsToArrayRepository } from './belongs-to-array/belongs-to-array-repository';
import { Collection } from './collection';
import { SmartCursorBuilder } from './cursor-builder';
import { Database } from './database';
import { ArrayFieldRepository } from './field-repository/array-field-repository';
import { Model } from './model';
import operators from './operators';
import { BelongsToManyRepository } from './relation-repository/belongs-to-many-repository';
import { BelongsToRepository } from './relation-repository/belongs-to-repository';
import { HasManyRepository } from './relation-repository/hasmany-repository';
import { HasOneRepository } from './relation-repository/hasone-repository';
import { RelationRepository } from './relation-repository/relation-repository';
import { valuesToFilter } from './utils/filter-utils';
interface CreateManyOptions extends BulkCreateOptions {
    records: Values[];
}
export { Transactionable } from 'sequelize';
export interface FilterAble {
    filter: Filter;
}
export type BaseTargetKey = string | number;
export type MultiTargetKey = Record<string, BaseTargetKey>;
export type TargetKey = BaseTargetKey | MultiTargetKey;
export type TK = TargetKey | TargetKey[];
type FieldValue = string | number | bigint | boolean | Date | Buffer | null | FieldValue[] | FilterWithOperator;
type Operators = keyof typeof operators & keyof WhereOperators;
export type FilterWithOperator = {
    [key: string]: {
        [K in Operators]: FieldValue;
    } | FieldValue;
};
export type FilterWithValue = {
    [key: string]: FieldValue;
};
type FilterAnd = {
    $and: Filter[];
};
type FilterOr = {
    $or: Filter[];
};
export type Filter = FilterWithOperator | FilterWithValue | FilterAnd | FilterOr;
export type Appends = string[];
export type Except = string[];
export type Fields = string[];
export type Sort = string[] | string;
export type WhiteList = string[];
export type BlackList = string[];
export type AssociationKeysToBeUpdate = string[];
export type Values = any;
export type CountOptions = Omit<SequelizeCountOptions, 'distinct' | 'where' | 'include'> & Transactionable & {
    filter?: Filter;
    context?: any;
} & FilterByTk;
export interface FilterByTk {
    filterByTk?: TargetKey;
    targetCollection?: string;
}
export type FindOptions = SequelizeFindOptions & CommonFindOptions & FilterByTk;
export interface CommonFindOptions extends Transactionable {
    filter?: Filter;
    fields?: Fields;
    appends?: Appends;
    except?: Except;
    sort?: Sort;
    context?: any;
    tree?: boolean;
}
export type FindOneOptions = Omit<FindOptions, 'limit'> & {
    targetCollection?: string;
};
export interface DestroyOptions extends SequelizeDestroyOptions {
    filter?: Filter;
    filterByTk?: TargetKey | TargetKey[];
    truncate?: boolean;
    context?: any;
}
export type FindAndCountOptions = Omit<SequelizeAndCountOptions, 'where' | 'include' | 'order'> & CommonFindOptions;
export interface CreateOptions extends SequelizeCreateOptions {
    values?: Values | Values[];
    whitelist?: WhiteList;
    blacklist?: BlackList;
    updateAssociationValues?: AssociationKeysToBeUpdate;
    context?: any;
}
export interface UpdateOptions extends Omit<SequelizeUpdateOptions, 'where'> {
    values: Values;
    filter?: Filter;
    filterByTk?: TargetKey;
    whitelist?: WhiteList;
    blacklist?: BlackList;
    updateAssociationValues?: AssociationKeysToBeUpdate;
    targetCollection?: string;
    context?: any;
}
interface UpdateManyOptions extends Omit<UpdateOptions, 'values'> {
    records: Values[];
}
declare class RelationRepositoryBuilder<R extends RelationRepository> {
    collection: Collection;
    associationName: string;
    association: Association | {
        associationType: string;
    };
    builderMap: {
        HasOne: typeof HasOneRepository;
        BelongsTo: typeof BelongsToRepository;
        BelongsToMany: typeof BelongsToManyRepository;
        HasMany: typeof HasManyRepository;
        ArrayField: typeof ArrayFieldRepository;
        BelongsToArray: typeof BelongsToArrayRepository;
    };
    constructor(collection: Collection, associationName: string);
    of(id: TargetKey): R;
    protected builder(): {
        HasOne: typeof HasOneRepository;
        BelongsTo: typeof BelongsToRepository;
        BelongsToMany: typeof BelongsToManyRepository;
        HasMany: typeof HasManyRepository;
        ArrayField: typeof ArrayFieldRepository;
        BelongsToArray: typeof BelongsToArrayRepository;
    };
}
export interface AggregateOptions {
    method: 'avg' | 'count' | 'min' | 'max' | 'sum';
    field?: string;
    filter?: Filter;
    distinct?: boolean;
}
export interface FirstOrCreateOptions extends Transactionable {
    filterKeys: string[];
    values?: Values;
    hooks?: boolean;
    context?: any;
    updateAssociationValues?: AssociationKeysToBeUpdate;
}
export declare class Repository<TModelAttributes extends {} = any, TCreationAttributes extends {} = TModelAttributes> {
    database: Database;
    collection: Collection;
    model: ModelStatic<Model>;
    cursorBuilder: SmartCursorBuilder;
    constructor(collection: Collection);
    static valuesToFilter: typeof valuesToFilter;
    /**
     * return count by filter
     */
    count(countOptions?: CountOptions): Promise<number>;
    getEstimatedRowCount(): Promise<number>;
    private getOracleSchema;
    aggregate(options: AggregateOptions & {
        optionsTransformer?: (options: any) => any;
    }): Promise<any>;
    chunk(options: FindOptions & {
        chunkSize: number;
        callback: (rows: Model[], options: FindOptions) => Promise<void>;
        beforeFind?: (options: FindOptions) => Promise<void>;
        afterFind?: (rows: Model[], options: FindOptions & {
            offset: number;
        }) => Promise<void>;
    }): Promise<void>;
    /**
     * Cursor-based pagination query function.
     * Ideal for large datasets (e.g., millions of rows)
     * Note:
     *  1. does not support jumping to arbitrary pages (e.g., "Page 5")
     *  2. Requires a stable, indexed sort field (e.g. ID, createdAt)
     *  3. If custom orderBy is used, it must match the cursor field(s) and direction, otherwise results may be incorrect or unstable.
     * @param options
     */
    chunkWithCursor(options: FindOptions & {
        chunkSize: number;
        callback: (rows: Model[], options: FindOptions) => Promise<void>;
        beforeFind?: (options: FindOptions) => Promise<void>;
        afterFind?: (rows: Model[], options: FindOptions) => Promise<void>;
    }): Promise<void>;
    /**
     * find
     * @param options
     */
    find(options?: FindOptions): any;
    /**
     * find and count
     * @param options
     */
    findAndCount(options?: FindAndCountOptions): Promise<[Model[], number]>;
    /**
     * Find By Id
     *
     */
    findById(id: string | number): Promise<Model<any, any>>;
    findByTargetKey(targetKey: TargetKey): Promise<any>;
    /**
     * Find one record from database
     *
     * @param options
     */
    findOne(options?: FindOneOptions): Promise<any>;
    /**
     * Get the first record matching the attributes or create it.
     */
    firstOrCreate(options: FirstOrCreateOptions): Promise<any>;
    updateOrCreate(options: FirstOrCreateOptions): Promise<any>;
    /**
     * Save instance to database
     *
     * @param values
     * @param options
     */
    create(options: CreateOptions): Promise<any>;
    /**
     * Save Many instances to database
     *
     * @param records
     * @param options
     */
    createMany(options: CreateManyOptions): Promise<any[]>;
    /**
     * Update model value
     *
     * @param values
     * @param options
     */
    update(options: UpdateOptions & {
        forceUpdate?: boolean;
    }): Promise<any>;
    updateMany(options: UpdateManyOptions): Promise<any[]>;
    destroy(options?: TargetKey | TargetKey[] | DestroyOptions): any;
    /**
     * @param association target association
     */
    relation<R extends RelationRepository>(association: string): RelationRepositoryBuilder<R>;
    buildQueryOptions(options: any): any;
    protected parseFilter(filter: Filter, options?: any): any;
    protected getTransaction(options: any, autoGen?: boolean): Promise<any>;
}
