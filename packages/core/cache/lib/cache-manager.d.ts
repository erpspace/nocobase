/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { FactoryStore, Store } from 'cache-manager';
import { Cache } from './cache';
import { BloomFilter } from './bloom-filter';
import { Counter } from './counter';
import { LockManager } from '@nocobase/lock-manager';
type StoreOptions = {
    store?: 'memory' | FactoryStore<Store, any>;
    close?: (store: Store) => Promise<void>;
    [key: string]: any;
};
export type CacheManagerOptions = Partial<{
    defaultStore: string;
    stores: {
        [storeType: string]: StoreOptions;
    };
    prefix: string;
}>;
export declare class CacheManager {
    defaultStore: string;
    prefix?: string;
    private stores;
    /**
     * @internal
     */
    storeTypes: Map<string, StoreOptions>;
    /**
     * @internal
     */
    caches: Map<string, Cache>;
    constructor(options?: CacheManagerOptions);
    private createStore;
    registerStore(options: {
        name: string;
    } & StoreOptions): void;
    private newCache;
    createCache(options: {
        name: string;
        prefix?: string;
        store?: string;
        [key: string]: any;
    }): Promise<Cache>;
    getCache(name: string): Cache;
    flushAll(): Promise<void>;
    close(): Promise<void>;
    /**
     * @experimental
     */
    createBloomFilter(options?: {
        store?: string;
    }): Promise<BloomFilter>;
    /**
     * @experimental
     */
    createCounter(options: {
        name: string;
        prefix?: string;
        store?: string;
    }, lockManager?: LockManager): Promise<Counter>;
}
export {};
