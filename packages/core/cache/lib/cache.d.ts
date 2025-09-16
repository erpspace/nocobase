/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Cache as BasicCache, Milliseconds } from 'cache-manager';
export declare class Cache {
    name: string;
    prefix?: string;
    store: BasicCache;
    constructor({ name, prefix, store }: {
        name: string;
        store: BasicCache;
        prefix?: string;
    });
    key(key: string): string;
    set(key: string, value: unknown, ttl?: Milliseconds): Promise<void>;
    get<T>(key: string): Promise<T>;
    del(key: string): Promise<void>;
    reset(): Promise<void>;
    wrap<T>(key: string, fn: () => Promise<T>, ttl?: Milliseconds): Promise<T>;
    wrapWithCondition<T>(key: string, fn: () => T | Promise<T>, options?: {
        useCache?: boolean;
        isCacheable?: (val: unknown) => boolean | Promise<boolean>;
        ttl?: Milliseconds;
    }): Promise<T>;
    mset(args: [string, unknown][], ttl?: Milliseconds): Promise<void>;
    mget(...args: string[]): Promise<unknown[]>;
    mdel(...args: string[]): Promise<void>;
    keys(pattern?: string): Promise<string[]>;
    ttl(key: string): Promise<number>;
    setValueInObject(key: string, objectKey: string, value: unknown): Promise<void>;
    getValueInObject(key: string, objectKey: string): Promise<any>;
    delValueInObject(key: string, objectKey: string): Promise<void>;
}
