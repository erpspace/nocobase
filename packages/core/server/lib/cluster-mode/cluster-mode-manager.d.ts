/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export interface RedisConfig {
    url: string;
    keyPrefix: string;
    ttl: number;
}
export declare class ClusterModeManager {
    private static _instance;
    private _redisConfig;
    private constructor();
    static getInstance(): ClusterModeManager;
    /**
     * Check if cluster mode is enabled
     */
    static isEnabled(): boolean;
    /**
     * Get Redis configuration for cluster mode
     */
    static getRedisConfig(): RedisConfig | null;
    /**
     * Get Redis URL
     */
    static getRedisUrl(): string;
    /**
     * Get Redis key prefix
     */
    static getRedisKeyPrefix(): string;
    /**
     * Get Redis TTL
     */
    static getRedisTTL(): number;
    /**
     * Create a namespaced Redis key
     */
    static createKey(namespace: string, key: string): string;
    /**
     * Log cluster mode messages
     */
    static log(message: string, data?: any): void;
    /**
     * Log cluster mode errors
     */
    static error(message: string, error?: any): void;
    /**
     * Log cluster mode warnings
     */
    static warn(message: string, data?: any): void;
}
export default ClusterModeManager;
