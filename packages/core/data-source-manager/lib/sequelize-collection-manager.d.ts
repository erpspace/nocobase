/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Database } from '@nocobase/database';
import { DataSource } from './data-source';
import { CollectionOptions, ICollection, ICollectionManager, IFieldInterface, IRepository, MergeOptions } from './types';
export declare class SequelizeCollectionManager implements ICollectionManager {
    db: Database;
    options: any;
    dataSource: DataSource;
    constructor(options: any);
    setDataSource(dataSource: DataSource): void;
    collectionsFilter(): any;
    createDB(options?: any): any;
    registerFieldTypes(types: Record<string, any>): void;
    registerFieldInterfaces(): void;
    registerCollectionTemplates(): void;
    registerModels(models: Record<string, any>): void;
    registerRepositories(repositories: Record<string, any>): void;
    getRegisteredRepository(key: any): any;
    defineCollection(options: CollectionOptions): import("@nocobase/database").Collection<any, any>;
    extendCollection(collectionOptions: CollectionOptions, mergeOptions?: MergeOptions): ICollection;
    hasCollection(name: string): boolean;
    getCollection(name: string): import("@nocobase/database").Collection<any, any>;
    removeCollection(name: string): void;
    getCollections(): import("@nocobase/database").Collection<any, any>[];
    getRepository<R = IRepository>(name: string, sourceId?: string | number): R;
    sync(): Promise<void>;
    registerFieldInterface(name: string, fieldInterface: new (options: any) => IFieldInterface): void;
    getFieldInterface(name: string): {
        new (options: any): IFieldInterface | undefined;
    };
}
