/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { DataSource } from './data-source';
import { CollectionOptions, ICollection, ICollectionManager, IFieldInterface, IRepository, MergeOptions } from './types';
export declare class CollectionManager implements ICollectionManager {
    dataSource: DataSource;
    protected collections: Map<string, ICollection>;
    protected repositories: Map<string, IRepository>;
    protected models: Map<string, any>;
    constructor(options?: any);
    setDataSource(dataSource: DataSource): void;
    getRegisteredFieldType(type: any): void;
    getRegisteredFieldInterface(key: string): void;
    getRegisteredModel(key: string): any;
    getRegisteredRepository(key: any): any;
    registerFieldTypes(): void;
    registerFieldInterfaces(interfaces: Record<string, new (options: any) => IFieldInterface>): void;
    registerFieldInterface(name: string, fieldInterface: new (options: any) => IFieldInterface): void;
    getFieldInterface(name: string): {
        new (options: any): IFieldInterface | undefined;
    };
    registerCollectionTemplates(): void;
    registerModels(models: Record<string, any>): void;
    registerRepositories(repositories: Record<string, any>): void;
    defineCollection(options: CollectionOptions): ICollection;
    extendCollection(collectionOptions: CollectionOptions, mergeOptions?: MergeOptions): ICollection;
    hasCollection(name: string): boolean;
    getCollection(name: string): ICollection;
    getCollections(): Array<ICollection>;
    getRepository(name: string, sourceId?: string | number): IRepository;
    sync(): Promise<void>;
    removeCollection(name: string): void;
    protected newCollection(options: any): ICollection;
}
