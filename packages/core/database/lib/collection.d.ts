/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
import { ModelOptions, ModelStatic, QueryInterfaceDropTableOptions, QueryInterfaceOptions, SyncOptions, Transactionable } from 'sequelize';
import { BuiltInGroup } from './collection-group-manager';
import { Database } from './database';
import { BelongsToField, Field, FieldOptions, HasManyField } from './fields';
import { Model } from './model';
import { Repository } from './repository';
export type RepositoryType = typeof Repository;
export type CollectionSortable = string | boolean | {
    name?: string;
    scopeKey?: string;
};
export type BaseDumpRules = {
    delayRestore?: any;
};
export type DumpRules = BuiltInGroup | ({
    required: true;
} & BaseDumpRules) | ({
    skipped: true;
} & BaseDumpRules) | ({
    group: BuiltInGroup | string;
} & BaseDumpRules);
export type MigrationRule = 'overwrite' | 'skip' | 'upsert' | 'schema-only' | 'insert-ignore' | (string & {}) | null;
export interface CollectionOptions extends Omit<ModelOptions, 'name' | 'hooks'> {
    name: string;
    title?: string;
    namespace?: string;
    migrationRules?: MigrationRule[];
    dumpRules?: DumpRules;
    tableName?: string;
    inherits?: string[] | string;
    viewName?: string;
    writableView?: boolean;
    isThrough?: boolean;
    filterTargetKey?: string | string[];
    fields?: FieldOptions[];
    fieldSort?: string[];
    model?: string | ModelStatic<Model>;
    repository?: string | RepositoryType;
    sortable?: CollectionSortable;
    /**
     * @default true
     */
    autoGenId?: boolean;
    /**
     * @default 'options'
     */
    magicAttribute?: string;
    tree?: string;
    template?: string;
    simplePaginate?: boolean;
    /**
     * where is the collection from
     *
     * values
     * - 'plugin' - collection is from plugin
     * - 'core' - collection is from core
     * - 'user' - collection is from user
     */
    origin?: string;
    asStrategyResource?: boolean;
    [key: string]: any;
}
export interface CollectionContext {
    database: Database;
}
export declare class Collection<TModelAttributes extends {} = any, TCreationAttributes extends {} = TModelAttributes> extends EventEmitter {
    options: CollectionOptions;
    context: CollectionContext;
    isThrough?: boolean;
    fields: Map<string, any>;
    model: ModelStatic<Model>;
    repository: Repository<TModelAttributes, TCreationAttributes>;
    constructor(options: CollectionOptions, context: CollectionContext);
    get filterTargetKey(): string | string[];
    get name(): string;
    get origin(): string;
    get titleField(): string;
    get db(): Database;
    get treeParentField(): BelongsToField | null;
    get treeChildrenField(): HasManyField | null;
    isMultiFilterTargetKey(): boolean;
    tableName(): any;
    /**
     * @internal
     */
    modelInit(): void;
    setRepository(repository?: RepositoryType | string): void;
    forEachField(callback: (field: Field) => void): void;
    findField(callback: (field: Field) => boolean): any;
    hasField(name: string): boolean;
    getField<F extends Field>(name: string): F;
    getFieldByField(field: string): Field;
    getFields(): any[];
    addField(name: string, options: FieldOptions): Field;
    checkFieldType(name: string, options: FieldOptions): void;
    /**
     * @internal
     */
    correctOptions(options: any): void;
    setField(name: string, options: FieldOptions): Field;
    setFields(fields: FieldOptions[], resetFields?: boolean): void;
    resetFields(): void;
    remove(): Collection<any, any>;
    removeFieldFromDb(name: string, options?: QueryInterfaceOptions): Promise<void>;
    removeFromDb(options?: QueryInterfaceDropTableOptions & {
        dropCollection?: boolean;
    }): Promise<Collection<any, any>>;
    existsInDb(options?: Transactionable): Promise<boolean>;
    removeField(name: string): void | Field;
    updateOptions(options: CollectionOptions, mergeOptions?: any): this;
    setSortable(sortable: any): void;
    updateField(name: string, options: FieldOptions): void;
    addIndex(index: string | string[] | {
        fields: string[];
        unique?: boolean;
        [key: string]: any;
    }): void;
    removeIndex(fields: any): void;
    /**
     * @internal
     */
    refreshIndexes(): void;
    sync(syncOptions?: SyncOptions): Promise<void>;
    isInherited(): boolean;
    isParent(): boolean;
    getTableNameWithSchema(): any;
    tableNameAsString(options?: {
        ignorePublicSchema: boolean;
    }): any;
    getRealTableName(quoted?: boolean): any;
    getRealFieldName(name: string, quoted?: boolean): string;
    getTableNameWithSchemaAsString(): string;
    quotedTableName(): any;
    collectionSchema(): string;
    isView(): boolean;
    unavailableActions(): any[];
    protected sequelizeModelOptions(): {
        modelName: string;
        sequelize: import("sequelize").Sequelize;
        tableName: any;
    };
    protected bindFieldEventListener(): void;
    private checkOptions;
    private checkTableName;
}
