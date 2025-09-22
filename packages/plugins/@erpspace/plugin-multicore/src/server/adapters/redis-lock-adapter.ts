/**
 * Redis Lock Adapter for NocoBase Multicore Plugin
 * Implements ILockAdapter using Redis for distributed locking
 */

import { Redis } from 'ioredis';
import { randomUUID } from 'crypto';
// Define interfaces locally since they're not exported from @nocobase/lock-manager
export interface ILockAdapter {
  connect(): Promise<void>;
  close(): Promise<void>;
  acquire(key: string, ttl: number): Promise<string>;
  release(key: string, lockValue: string): Promise<void>;
  exists(key: string): Promise<boolean>;
  getTtl(key: string): Promise<number>;
  extend(key: string, lockValue: string, newTtl: number): Promise<boolean>;
  runExclusive<T>(key: string, fn: () => Promise<T>, ttl: number): Promise<T>;
  tryAcquire(key: string, timeout?: number): Promise<any>;
}

export class LockAcquireError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LockAcquireError';
  }
}

export class LockAbortError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'LockAbortError';
  }
}

export class RedisLockAdapter implements ILockAdapter {
  private redis: Redis;
  private connected = false;

  constructor(redisUrl: string = 'redis://localhost:6379') {
    this.redis = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    this.redis.on('connect', () => {
      console.log('[Multicore] Redis Lock adapter connected');
    });

    this.redis.on('error', (error) => {
      console.error('[Multicore] Redis Lock adapter error', error);
    });
  }

  public async connect(): Promise<void> {
    if (this.connected) {
      return;
    }
    try {
      await this.redis.connect();
      this.connected = true;
      console.log('[Multicore] Redis Lock adapter connected');
    } catch (error) {
      console.error('[Multicore] Failed to connect Redis Lock adapter', error);
      throw error;
    }
  }

  public async close(): Promise<void> {
    if (!this.connected) {
      return;
    }
    try {
      await this.redis.quit();
      this.connected = false;
      console.log('[Multicore] Redis Lock adapter closed');
    } catch (error) {
      console.error('[Multicore] Error closing Redis Lock adapter', error);
    }
  }

  public async acquire(key: string, ttl: number = 5000): Promise<string> {
    const lockValue = randomUUID();
    const lockKey = `nocobase:lock:${key}`;
    const startTime = Date.now();

    while (Date.now() - startTime < ttl) {
      try {
        const result = await this.redis.set(lockKey, lockValue, 'PX', ttl, 'NX');
        if (result === 'OK') {
          console.log(`[Multicore] Acquired lock for key: ${key}`, { lockValue, ttl });
          return lockValue;
        }
      } catch (error) {
        console.error(`[Multicore] Error acquiring lock for key: ${key}`, error);
        throw new LockAcquireError(`Failed to acquire lock for key: ${key}`);
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    throw new LockAcquireError(`Failed to acquire lock for key: ${key} within ${ttl}ms`);
  }

  public async release(key: string, lockValue: string): Promise<void> {
    const lockKey = `nocobase:lock:${key}`;
    const script = `
      if redis.call("get",KEYS[1]) == ARGV[1] then
        return redis.call("del",KEYS[1])
      else
        return 0
      end
    `;
    try {
      const result = await this.redis.eval(script, 1, lockKey, lockValue);
      if (result === 1) {
        console.log(`[Multicore] Released lock: ${lockKey}`);
      } else {
        console.warn(`[Multicore] Lock was not released (may have expired): ${lockKey}`);
      }
    } catch (error) {
      console.error(`[Multicore] Error releasing lock: ${lockKey}`, error);
      throw error;
    }
  }

  public async exists(key: string): Promise<boolean> {
    const lockKey = `nocobase:lock:${key}`;
    try {
      const result = await this.redis.exists(lockKey);
      return result === 1;
    } catch (error) {
      console.error(`[Multicore] Error checking if lock exists for key: ${key}`, error);
      throw error;
    }
  }

  public async getTtl(key: string): Promise<number> {
    const lockKey = `nocobase:lock:${key}`;
    try {
      const ttl = await this.redis.pttl(lockKey);
      return ttl > 0 ? ttl : 0;
    } catch (error) {
      console.error(`[Multicore] Error getting lock TTL for key: ${key}`, error);
      throw error;
    }
  }

  public async extend(key: string, lockValue: string, newTtl: number): Promise<boolean> {
    const lockKey = `nocobase:lock:${key}`;
    const script = `
      if redis.call("get",KEYS[1]) == ARGV[1] then
        return redis.call("pexpire",KEYS[1],ARGV[2])
      else
        return 0
      end
    `;
    try {
      const result = await this.redis.eval(script, 1, lockKey, lockValue, newTtl);
      if (result) {
        console.log(`[Multicore] Extended lock TTL for key: ${key}`, { newTtl });
        return true;
      }
      return false;
    } catch (error) {
      console.error(`[Multicore] Error extending lock TTL for key: ${key}`, error);
      throw error;
    }
  }

  public async runExclusive<T>(key: string, fn: () => Promise<T>, ttl: number): Promise<T> {
    const lockValue = await this.acquire(key, ttl);
    try {
      return await fn();
    } finally {
      await this.release(key, lockValue);
    }
  }

  public async tryAcquire(key: string, timeout: number = 1000): Promise<any> {
    const lockValue = randomUUID();
    const lockKey = `nocobase:lock:${key}`;
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      try {
        const result = await this.redis.set(lockKey, lockValue, 'PX', timeout, 'NX');
        if (result === 'OK') {
          console.log(`[Multicore] Acquired lock for key: ${key}`, { lockValue, timeout });
          return {
            acquire: async (ttl: number) => {
              return async () => {
                await this.release(key, lockValue);
              };
            },
            runExclusive: async (fn: () => Promise<any>, ttl: number) => {
              try {
                return await fn();
              } finally {
                await this.release(key, lockValue);
              }
            }
          };
        }
      } catch (error) {
        console.error(`[Multicore] Error acquiring lock for key: ${key}`, error);
        throw new LockAcquireError(`Failed to acquire lock for key: ${key}`);
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    throw new LockAcquireError(`Failed to acquire lock for key: ${key} within ${timeout}ms`);
  }
}
