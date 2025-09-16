/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export type Releaser = () => void | Promise<void>;
export interface ILock {
    acquire(ttl: number): Releaser | Promise<Releaser>;
    runExclusive<T>(fn: () => Promise<T>, ttl: number): Promise<T>;
}
export interface ILockAdapter {
    connect(): Promise<void>;
    close(): Promise<void>;
    acquire(key: string, ttl: number): Releaser | Promise<Releaser>;
    runExclusive<T>(key: string, fn: () => Promise<T>, ttl: number): Promise<T>;
    tryAcquire(key: string, timeout?: number): Promise<ILock>;
}
export declare class LockAbortError extends Error {
    constructor(message: any, options: any);
}
export declare class LockAcquireError extends Error {
    constructor(message: any, options?: any);
}
export interface LockAdapterConfig<C extends ILockAdapter = ILockAdapter> {
    Adapter: new (...args: any[]) => C;
    options?: Record<string, any>;
}
export interface LockManagerOptions {
    defaultAdapter?: string;
}
export declare class LockManager {
    private options;
    private registry;
    private adapters;
    constructor(options?: LockManagerOptions);
    registerAdapter(name: string, adapterConfig: LockAdapterConfig): void;
    private getAdapter;
    close(): Promise<void>;
    acquire(key: string, ttl?: number): Promise<Releaser>;
    runExclusive<T>(key: string, fn: () => Promise<T>, ttl?: number): Promise<T>;
    tryAcquire(key: string): Promise<ILock>;
}
export default LockManager;
