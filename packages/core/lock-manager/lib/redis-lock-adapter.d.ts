/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ILockAdapter } from './lock-manager';
export declare class RedisLockAdapter implements ILockAdapter {
    private redis;
    private connected;
    constructor(redisUrl?: string);
    private setupEventHandlers;
    connect(): Promise<void>;
    close(): Promise<void>;
    acquire(key: string, ttl: number): Promise<() => Promise<void>>;
    runExclusive<T>(key: string, fn: () => Promise<T>, ttl: number): Promise<T>;
    tryAcquire(key: string): Promise<{
        acquire: (ttl: number) => Promise<() => Promise<void>>;
        runExclusive: (fn: () => Promise<any>, ttl: number) => Promise<any>;
    }>;
    private releaseLock;
    /**
     * Check if a lock exists
     */
    isLocked(key: string): Promise<boolean>;
    /**
     * Get lock TTL
     */
    getLockTTL(key: string): Promise<number>;
    /**
     * Extend lock TTL
     */
    extendLock(key: string, additionalTtl: number): Promise<boolean>;
}
export default RedisLockAdapter;
