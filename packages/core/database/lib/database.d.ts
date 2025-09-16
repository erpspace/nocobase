/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/// <reference types="node" />
import { Logger, LoggerOptions } from '@nocobase/logger';
import { AsyncEmitter } from '@nocobase/utils';
import merge from 'deepmerge';
import { EventEmitter } from 'events';
import { ModelStatic, Options, QueryInterfaceDropAllTablesOptions, QueryOptions, Sequelize, SyncOptions, Transactionable } from 'sequelize';
import { Umzug } from 'umzug';
import { Collection, CollectionOptions, RepositoryType } from './collection';
import { CollectionFactory } from './collection-factory';
import { ImportFileExtension } from './collection-importer';
import DatabaseUtils from './database-utils';
import ReferencesMap from './features/references-map';
import { ArrayFieldRepository } from './field-repository/array-field-repository';
import * as FieldTypes from './fields';
import { Field, FieldContext, RelationField } from './fields';
import InheritanceMap from './inherited-map';
import { InterfaceManager } from './interface-manager';
import { MigrationItem, Migrations } from './migration';
import { Model } from './model';
import { ModelHook } from './model-hook';
import QueryInterface from './query-interface/query-interface';
import { RelationRepository } from './relation-repository/relation-repository';
import { Repository, TargetKey } from './repository';
import { AfterDefineCollectionListener, BeforeDefineCollectionListener, CreateListener, CreateWithAssociationsListener, DatabaseAfterDefineCollectionEventType, DatabaseAfterRemoveCollectionEventType, DatabaseBeforeDefineCollectionEventType, DatabaseBeforeRemoveCollectionEventType, DestroyListener, EventType, ModelCreateEventTypes, ModelCreateWithAssociationsEventTypes, ModelDestroyEventTypes, ModelSaveEventTypes, ModelSaveWithAssociationsEventTypes, ModelUpdateEventTypes, ModelUpdateWithAssociationsEventTypes, ModelValidateEventTypes, RemoveCollectionListener, SaveListener, SaveWithAssociationsListener, SyncListener, UpdateListener, UpdateWithAssociationsListener, ValidateListener } from './types';
import { BaseValueParser } from './value-parsers';
import { BaseDialect } from './dialects/base-dialect';
export type MergeOptions = merge.Options;
export interface PendingOptions {
    field: RelationField;
    model: ModelStatic<Model>;
}
interface MapOf<T> {
    [key: string]: T;
}
export interface IDatabaseOptions extends Options {
    tablePrefix?: string;
    migrator?: any;
    usingBigIntForId?: boolean;
    underscored?: boolean;
    logger?: LoggerOptions | Logger;
    customHooks?: any;
    instanceId?: string;
    addAllCollections?: boolean;
}
export type DatabaseOptions = IDatabaseOptions;
interface RegisterOperatorsContext {
    db?: Database;
    path?: string;
    field?: Field;
    app?: any;
}
export interface CleanOptions extends QueryInterfaceDropAllTablesOptions {
    drop?: boolean;
}
export type AddMigrationsOptions = {
    context?: any;
    namespace?: string;
    extensions?: string[];
    directory: string;
};
type OperatorFunc = (value: any, ctx?: RegisterOperatorsContext) => any;
export declare class Database extends EventEmitter implements AsyncEmitter {
    static dialects: Map<string, typeof BaseDialect>;
    sequelize: Sequelize;
    migrator: Umzug;
    migrations: Migrations;
    fieldTypes: Map<any, any>;
    fieldValueParsers: Map<any, any>;
    options: IDatabaseOptions;
    models: Map<string, ModelStatic<Model<any, any>>>;
    repositories: Map<string, typeof Repository>;
    operators: Map<any, any>;
    collections: Map<string, Collection<any, any>>;
    collectionsSort: Map<string, number>;
    pendingFields: Map<string, FieldTypes.RelationField[]>;
    modelCollection: Map<ModelStatic<any>, Collection<any, any>>;
    modelNameCollectionMap: Map<string, Collection<any, any>>;
    tableNameCollectionMap: Map<string, Collection<any, any>>;
    context: any;
    queryInterface: QueryInterface;
    utils: DatabaseUtils;
    referenceMap: ReferencesMap;
    inheritanceMap: InheritanceMap;
    importedFrom: Map<string, Set<string>>;
    modelHook: ModelHook;
    delayCollectionExtend: Map<string, {
        collectionOptions: CollectionOptions;
        mergeOptions?: any;
    }[]>;
    logger: Logger;
    interfaceManager: InterfaceManager;
    collectionFactory: CollectionFactory;
    dialect: BaseDialect;
    emitAsync: (event: string | symbol, ...args: any[]) => Promise<boolean>;
    static registerDialect(dialect: typeof BaseDialect): void;
    static getDialect(name: string): typeof BaseDialect;
    constructor(options: DatabaseOptions);
    _instanceId: string;
    get instanceId(): string;
    /**
     * @internal
     */
    createMigrator({ migrations }: {
        migrations: any;
    }): Umzug<any>;
    /**
     * @internal
     */
    setContext(context: any): void;
    /**
     * @internal
     */
    sequelizeOptions(options: any): IDatabaseOptions;
    /**
     * @internal
     */
    initListener(): void;
    addMigration(item: MigrationItem): void;
    addMigrations(options: AddMigrationsOptions): void;
    inDialect(...dialect: string[]): boolean;
    isMySQLCompatibleDialect(): boolean;
    isPostgresCompatibleDialect(): boolean;
    /**
     * Add collection to database
     * @param options
     */
    collection<Attributes = any, CreateAttributes = Attributes>(options: CollectionOptions): Collection<Attributes, CreateAttributes>;
    getTablePrefix(): string;
    getFieldByPath(path: string): any;
    getCollectionByModelName(name: string): Collection<any, any>;
    /**
     * get exists collection by its name
     * @param name
     */
    getCollection(name: string): Collection;
    hasCollection(name: string): boolean;
    removeCollection(name: string): Collection<any, any>;
    getModel<M extends Model>(name: string): ModelStatic<M>;
    getRepository<R extends Repository>(name: string): R;
    getRepository<R extends RelationRepository>(name: string, relationId: TargetKey): R;
    getRepository<R extends ArrayFieldRepository>(name: string, relationId: TargetKey): R;
    /**
     * @internal
     */
    addPendingField(field: RelationField): void;
    /**
     * @internal
     */
    removePendingField(field: RelationField): void;
    registerFieldTypes(fieldTypes: MapOf<typeof Field>): void;
    registerFieldValueParsers(parsers: MapOf<any>): void;
    buildFieldValueParser<T extends BaseValueParser>(field: Field, ctx: any): T;
    registerModels(models: MapOf<ModelStatic<any>>): void;
    registerRepositories(repositories: MapOf<RepositoryType>): void;
    /**
     * @internal
     */
    initOperators(): void;
    registerOperators(operators: MapOf<OperatorFunc>): void;
    /**
     * @internal
     */
    buildField(options: any, context: FieldContext): any;
    sync(options?: SyncOptions): Promise<Sequelize>;
    clean(options: CleanOptions): Promise<void>;
    collectionExistsInDb(name: string, options?: Transactionable): Promise<boolean>;
    isSqliteMemory(): boolean;
    auth(options?: Omit<QueryOptions, 'retry'> & {
        retry?: number | Pick<QueryOptions, 'retry'>;
    }): Promise<void>;
    /**
     * @internal
     */
    checkVersion(): Promise<true | void>;
    /**
     * @internal
     */
    prepare(): Promise<void>;
    reconnect(): Promise<void>;
    closed(): any;
    close(): Promise<void>;
    on(event: EventType, listener: any): this;
    on(event: ModelValidateEventTypes, listener: SyncListener): this;
    on(event: ModelValidateEventTypes, listener: ValidateListener): this;
    on(event: ModelCreateEventTypes, listener: CreateListener): this;
    on(event: ModelUpdateEventTypes, listener: UpdateListener): this;
    on(event: ModelSaveEventTypes, listener: SaveListener): this;
    on(event: ModelDestroyEventTypes, listener: DestroyListener): this;
    on(event: ModelCreateWithAssociationsEventTypes, listener: CreateWithAssociationsListener): this;
    on(event: ModelUpdateWithAssociationsEventTypes, listener: UpdateWithAssociationsListener): this;
    on(event: ModelSaveWithAssociationsEventTypes, listener: SaveWithAssociationsListener): this;
    on(event: DatabaseBeforeDefineCollectionEventType, listener: BeforeDefineCollectionListener): this;
    on(event: DatabaseAfterDefineCollectionEventType, listener: AfterDefineCollectionListener): this;
    on(event: DatabaseBeforeRemoveCollectionEventType | DatabaseAfterRemoveCollectionEventType, listener: RemoveCollectionListener): this;
    extendCollection(collectionOptions: CollectionOptions, mergeOptions?: MergeOptions): void;
    import(options: {
        directory: string;
        from?: string;
        extensions?: ImportFileExtension[];
    }): Promise<Map<string, Collection>>;
    private registerCollectionType;
}
export declare function extendCollection(collectionOptions: CollectionOptions, mergeOptions?: MergeOptions): {
    collectionOptions: CollectionOptions;
    mergeOptions: merge.Options;
    extend: boolean;
};
export declare const extend: typeof extendCollection;
export declare const defineCollection: (collectionOptions: CollectionOptions) => CollectionOptions;
export default Database;
