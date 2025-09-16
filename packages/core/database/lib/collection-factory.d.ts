/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Collection, CollectionOptions } from './collection';
import Database from './database';
import { Model } from './model';
type CollectionTypeOptions = {
    condition: (options: CollectionOptions) => boolean;
    onSync?: (model: typeof Model, options: any) => Promise<void>;
    onDump?: (dumper: any, collection: Collection) => Promise<void>;
};
export declare class CollectionFactory {
    private database;
    collectionTypes: Map<typeof Collection, CollectionTypeOptions>;
    constructor(database: Database);
    registerCollectionType(collectionClass: typeof Collection, // Using the collection class as the key
    options: CollectionTypeOptions): void;
    createCollection<T extends Collection>(collectionOptions: CollectionOptions): T;
}
export {};
