/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Counter as ICounter } from '.';
declare class Cache {
    data: Map<any, any>;
    timers: Map<any, any>;
    set(k: string, v: any, ttl?: number): void;
    get(k: string): any;
    del(k: string): boolean;
}
/**
 * @experimental
 */
export declare class MemoryCounter implements ICounter {
    cache: Cache;
    get(key: string): Promise<any>;
    incr(key: string, ttl?: number): Promise<any>;
    incrby(key: string, value: number, ttl?: number): Promise<any>;
    reset(key: string): Promise<void>;
}
export {};
