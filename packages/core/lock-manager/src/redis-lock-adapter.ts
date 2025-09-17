/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Redis } from 'ioredis';
import { randomUUID } from 'crypto';
import { ILockAdapter, LockAcquireError, LockAbortError } from './lock-manager';
import { ClusterModeManager } from '../../server/src/cluster-mode/cluster-mode-manager';

export class RedisLockAdapter implements ILockAdapter {
    private redis: Redis;
    private connected = false;

    constructor() {
        this.redis = new Redis(ClusterModeManager.getRedisUrl(), {
            retryDelayOnFailover: 100,
            maxRetriesPerRequest: 3,
            lazyConnect: true,
        });

        this.setupEventHandlers();
    }

    private setupEventHandlers(): void {
        this.redis.on('connect', () => {
            ClusterModeManager.log('Redis Lock adapter connected');
        });

        this.redis.on('error', (error) => {
            ClusterModeManager.error('Redis Lock adapter error', error);
        });
    }

    async connect(): Promise<void> {
        if (this.connected) {
            return;
        }

        try {
            await this.redis.connect();
            this.connected = true;
            ClusterModeManager.log('Redis Lock adapter connected');
        } catch (error) {
            ClusterModeManager.error('Failed to connect Redis Lock adapter', error);
            throw error;
        }
    }

    async close(): Promise<void> {
        if (!this.connected) {
            return;
        }

        try {
            await this.redis.quit();
            this.connected = false;
            ClusterModeManager.log('Redis Lock adapter closed');
        } catch (error) {
            ClusterModeManager.error('Error closing Redis Lock adapter', error);
        }
    }

    async acquire(key: string, ttl: number): Promise<() => Promise<void>> {
        if (!this.connected) {
            throw new Error('Redis Lock adapter not connected');
        }

        const lockKey = ClusterModeManager.createKey('lock', key);
        const lockValue = randomUUID();

        try {
            // Try to acquire the lock with NX (only if not exists) and PX (expire in milliseconds)
            const result = await this.redis.set(lockKey, lockValue, 'PX', ttl, 'NX');
            
            if (!result) {
                throw new LockAcquireError(`Failed to acquire lock for key: ${key}`);
            }

            ClusterModeManager.log(`Acquired lock for key: ${key}`, { lockValue, ttl });

            // Return release function
            return async () => {
                await this.releaseLock(lockKey, lockValue);
            };
        } catch (error) {
            if (error instanceof LockAcquireError) {
                throw error;
            }
            ClusterModeManager.error(`Error acquiring lock for key: ${key}`, error);
            throw new LockAcquireError(`Failed to acquire lock for key: ${key}`);
        }
    }

    async runExclusive<T>(key: string, fn: () => Promise<T>, ttl: number): Promise<T> {
        const release = await this.acquire(key, ttl);
        
        try {
            return await fn();
        } catch (error) {
            throw error;
        } finally {
            await release();
        }
    }

    async tryAcquire(key: string): Promise<{ acquire: (ttl: number) => Promise<() => Promise<void>>; runExclusive: (fn: () => Promise<any>, ttl: number) => Promise<any> }> {
        if (!this.connected) {
            throw new Error('Redis Lock adapter not connected');
        }

        const lockKey = ClusterModeManager.createKey('lock', key);
        
        try {
            // Check if lock exists
            const exists = await this.redis.exists(lockKey);
            
            if (exists) {
                throw new LockAcquireError(`Lock already exists for key: ${key}`);
            }

            return {
                acquire: (ttl: number) => this.acquire(key, ttl),
                runExclusive: (fn: () => Promise<any>, ttl: number) => this.runExclusive(key, fn, ttl),
            };
        } catch (error) {
            if (error instanceof LockAcquireError) {
                throw error;
            }
            ClusterModeManager.error(`Error checking lock for key: ${key}`, error);
            throw new LockAcquireError(`Failed to check lock for key: ${key}`);
        }
    }

    private async releaseLock(lockKey: string, lockValue: string): Promise<void> {
        try {
            // Use Lua script to ensure atomic release (only release if value matches)
            const script = `
                if redis.call("get", KEYS[1]) == ARGV[1] then
                    return redis.call("del", KEYS[1])
                else
                    return 0
                end
            `;
            
            const result = await this.redis.eval(script, 1, lockKey, lockValue);
            
            if (result === 1) {
                ClusterModeManager.log(`Released lock: ${lockKey}`);
            } else {
                ClusterModeManager.warn(`Lock was not released (may have expired): ${lockKey}`);
            }
        } catch (error) {
            ClusterModeManager.error(`Error releasing lock: ${lockKey}`, error);
            throw error;
        }
    }

    /**
     * Check if a lock exists
     */
    async isLocked(key: string): Promise<boolean> {
        if (!this.connected) {
            return false;
        }

        try {
            const lockKey = ClusterModeManager.createKey('lock', key);
            const exists = await this.redis.exists(lockKey);
            return exists === 1;
        } catch (error) {
            ClusterModeManager.error(`Error checking if lock exists for key: ${key}`, error);
            return false;
        }
    }

    /**
     * Get lock TTL
     */
    async getLockTTL(key: string): Promise<number> {
        if (!this.connected) {
            return -1;
        }

        try {
            const lockKey = ClusterModeManager.createKey('lock', key);
            const ttl = await this.redis.pttl(lockKey);
            return ttl;
        } catch (error) {
            ClusterModeManager.error(`Error getting lock TTL for key: ${key}`, error);
            return -1;
        }
    }

    /**
     * Extend lock TTL
     */
    async extendLock(key: string, additionalTtl: number): Promise<boolean> {
        if (!this.connected) {
            return false;
        }

        try {
            const lockKey = ClusterModeManager.createKey('lock', key);
            const currentTtl = await this.redis.pttl(lockKey);
            
            if (currentTtl === -2) {
                // Lock doesn't exist
                return false;
            }
            
            if (currentTtl === -1) {
                // Lock exists but has no expiration
                return false;
            }
            
            const newTtl = currentTtl + additionalTtl;
            const result = await this.redis.pexpire(lockKey, newTtl);
            
            if (result) {
                ClusterModeManager.log(`Extended lock TTL for key: ${key}`, { newTtl });
            }
            
            return result === 1;
        } catch (error) {
            ClusterModeManager.error(`Error extending lock TTL for key: ${key}`, error);
            return false;
        }
    }
}

export default RedisLockAdapter;
