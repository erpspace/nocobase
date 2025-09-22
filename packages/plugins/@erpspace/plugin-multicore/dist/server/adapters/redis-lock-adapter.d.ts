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
export declare class LockAcquireError extends Error {
    constructor(message: string);
}
export declare class LockAbortError extends Error {
    constructor(message: string);
}
export declare class RedisLockAdapter implements ILockAdapter {
    private redisUrl;
    private redis;
    private connected;
    constructor(redisUrl?: string);
    private setupEventHandlers;
    connect(): Promise<void>;
    close(): Promise<void>;
    acquire(key: string, ttl?: number): Promise<string>;
    release(key: string, lockValue: string): Promise<void>;
    exists(key: string): Promise<boolean>;
    getTtl(key: string): Promise<number>;
    extend(key: string, lockValue: string, newTtl: number): Promise<boolean>;
    runExclusive<T>(key: string, fn: () => Promise<T>, ttl: number): Promise<T>;
    tryAcquire(key: string, timeout?: number): Promise<any>;
}
