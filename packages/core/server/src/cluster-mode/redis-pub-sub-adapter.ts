/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { Redis } from 'ioredis';
import { EventEmitter } from 'events';
import { ClusterModeManager } from './cluster-mode-manager';
import { IPubSubAdapter, PubSubCallback } from '../pub-sub-manager/types';

export class RedisPubSubAdapter implements IPubSubAdapter {
    private redis: Redis;
    private subscriber: Redis;
    private connected = false;
    private subscriptions = new Map<string, Set<PubSubCallback>>();
    private eventEmitter = new EventEmitter();

    constructor() {
        this.redis = new Redis(ClusterModeManager.getRedisUrl(), {
            retryDelayOnFailover: 100,
            maxRetriesPerRequest: 3,
            lazyConnect: true,
        });

        this.subscriber = new Redis(ClusterModeManager.getRedisUrl(), {
            retryDelayOnFailover: 100,
            maxRetriesPerRequest: 3,
            lazyConnect: true,
        });

        this.setupEventHandlers();
    }

    private setupEventHandlers(): void {
        this.redis.on('connect', () => {
            ClusterModeManager.log('Redis PubSub publisher connected');
        });

        this.redis.on('error', (error) => {
            ClusterModeManager.error('Redis PubSub publisher error', error);
        });

        this.subscriber.on('connect', () => {
            ClusterModeManager.log('Redis PubSub subscriber connected');
        });

        this.subscriber.on('error', (error) => {
            ClusterModeManager.error('Redis PubSub subscriber error', error);
        });

        this.subscriber.on('message', (channel, message) => {
            this.handleMessage(channel, message);
        });
    }

    private handleMessage(channel: string, message: string): void {
        try {
            const callbacks = this.subscriptions.get(channel);
            if (callbacks) {
                const parsedMessage = JSON.parse(message);
                callbacks.forEach((callback) => {
                    callback(parsedMessage).catch((error) => {
                        ClusterModeManager.error(`Error in PubSub callback for channel ${channel}`, error);
                    });
                });
            }
        } catch (error) {
            ClusterModeManager.error(`Error parsing PubSub message for channel ${channel}`, error);
        }
    }

    async connect(): Promise<void> {
        if (this.connected) {
            return;
        }

        try {
            await Promise.all([
                this.redis.connect(),
                this.subscriber.connect(),
            ]);

            this.connected = true;
            ClusterModeManager.log('Redis PubSub adapter connected');
        } catch (error) {
            ClusterModeManager.error('Failed to connect Redis PubSub adapter', error);
            throw error;
        }
    }

    async close(): Promise<void> {
        if (!this.connected) {
            return;
        }

        try {
            await Promise.all([
                this.redis.quit(),
                this.subscriber.quit(),
            ]);

            this.connected = false;
            this.subscriptions.clear();
            ClusterModeManager.log('Redis PubSub adapter closed');
        } catch (error) {
            ClusterModeManager.error('Error closing Redis PubSub adapter', error);
        }
    }

    async isConnected(): Promise<boolean> {
        return this.connected && this.redis.status === 'ready' && this.subscriber.status === 'ready';
    }

    async subscribe(channel: string, callback: PubSubCallback): Promise<void> {
        if (!this.connected) {
            throw new Error('Redis PubSub adapter not connected');
        }

        try {
            // Add callback to subscriptions
            if (!this.subscriptions.has(channel)) {
                this.subscriptions.set(channel, new Set());
            }
            this.subscriptions.get(channel)!.add(callback);

            // Subscribe to Redis channel if this is the first callback
            if (this.subscriptions.get(channel)!.size === 1) {
                await this.subscriber.subscribe(channel);
                ClusterModeManager.log(`Subscribed to Redis channel: ${channel}`);
            }
        } catch (error) {
            ClusterModeManager.error(`Failed to subscribe to channel ${channel}`, error);
            throw error;
        }
    }

    async unsubscribe(channel: string, callback: PubSubCallback): Promise<void> {
        if (!this.connected) {
            return;
        }

        try {
            const callbacks = this.subscriptions.get(channel);
            if (callbacks) {
                callbacks.delete(callback);

                // Unsubscribe from Redis channel if no more callbacks
                if (callbacks.size === 0) {
                    await this.subscriber.unsubscribe(channel);
                    this.subscriptions.delete(channel);
                    ClusterModeManager.log(`Unsubscribed from Redis channel: ${channel}`);
                }
            }
        } catch (error) {
            ClusterModeManager.error(`Failed to unsubscribe from channel ${channel}`, error);
            throw error;
        }
    }

    async publish(channel: string, message: string): Promise<void> {
        if (!this.connected) {
            throw new Error('Redis PubSub adapter not connected');
        }

        try {
            await this.redis.publish(channel, message);
            ClusterModeManager.log(`Published message to Redis channel: ${channel}`);
        } catch (error) {
            ClusterModeManager.error(`Failed to publish to channel ${channel}`, error);
            throw error;
        }
    }

    /**
     * Get subscription count for a channel
     */
    getSubscriptionCount(channel: string): number {
        return this.subscriptions.get(channel)?.size || 0;
    }

    /**
     * Get all subscribed channels
     */
    getSubscribedChannels(): string[] {
        return Array.from(this.subscriptions.keys());
    }
}

export default RedisPubSubAdapter;
