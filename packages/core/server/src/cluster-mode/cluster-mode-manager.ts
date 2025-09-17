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

export class ClusterModeManager {
    private static _instance: ClusterModeManager;
    private _redisConfig: RedisConfig | null = null;

    private constructor() {}

    static getInstance(): ClusterModeManager {
        if (!this._instance) {
            this._instance = new ClusterModeManager();
        }
        return this._instance;
    }

    /**
     * Check if cluster mode is enabled
     */
    static isEnabled(): boolean {
        return process.env.CLUSTER_MODE === 'max';
    }

    /**
     * Get Redis configuration for cluster mode
     */
    static getRedisConfig(): RedisConfig | null {
        if (!this.isEnabled()) {
            return null;
        }

        const instance = this.getInstance();
        if (!instance._redisConfig) {
            instance._redisConfig = {
                url: process.env.REDIS_URL || 'redis://localhost:6379',
                keyPrefix: process.env.REDIS_KEY_PREFIX || 'nocobase:',
                ttl: parseInt(process.env.REDIS_TTL || '3600'),
            };
        }

        return instance._redisConfig;
    }

    /**
     * Get Redis URL
     */
    static getRedisUrl(): string {
        const config = this.getRedisConfig();
        return config?.url || 'redis://localhost:6379';
    }

    /**
     * Get Redis key prefix
     */
    static getRedisKeyPrefix(): string {
        const config = this.getRedisConfig();
        return config?.keyPrefix || 'nocobase:';
    }

    /**
     * Get Redis TTL
     */
    static getRedisTTL(): number {
        const config = this.getRedisConfig();
        return config?.ttl || 3600;
    }

    /**
     * Create a namespaced Redis key
     */
    static createKey(namespace: string, key: string): string {
        const prefix = this.getRedisKeyPrefix();
        return `${prefix}${namespace}:${key}`;
    }

    /**
     * Log cluster mode messages
     */
    static log(message: string, data?: any): void {
        if (this.isEnabled()) {
            console.log(`[CLUSTER] ${message}`, data || '');
        }
    }

    /**
     * Log cluster mode errors
     */
    static error(message: string, error?: any): void {
        if (this.isEnabled()) {
            console.error(`[CLUSTER ERROR] ${message}`, error || '');
        }
    }

    /**
     * Log cluster mode warnings
     */
    static warn(message: string, data?: any): void {
        if (this.isEnabled()) {
            console.warn(`[CLUSTER WARN] ${message}`, data || '');
        }
    }
}

export default ClusterModeManager;
