/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { BloomFilter as IBloomFilter } from '.';
import { Cache } from '../cache';
/**
 * @experimental
 */
export declare class MemoryBloomFilter implements IBloomFilter {
    cache: Cache;
    constructor(cache: Cache);
    reserve(key: string, errorRate: number, capacity: number): Promise<void>;
    add(key: string, value: string): Promise<void>;
    mAdd(key: string, values: string[]): Promise<void>;
    exists(key: string, value: string): Promise<boolean>;
}
