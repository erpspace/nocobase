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
import { ClusterModeManager } from './cluster-mode-manager';
import { IEventQueueAdapter, QueueEventOptions, QueueMessageOptions } from '../event-queue';

export class RedisEventQueueAdapter implements IEventQueueAdapter {
    private redis: Redis;
    private connected = false;
    private events = new Map<string, QueueEventOptions>();
    private processing = new Map<string, Promise<void>[]>();
    private isProcessing = false;

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
            ClusterModeManager.log('Redis EventQueue adapter connected');
        });

        this.redis.on('error', (error) => {
            ClusterModeManager.error('Redis EventQueue adapter error', error);
        });
    }

    async connect(): Promise<void> {
        if (this.connected) {
            return;
        }

        try {
            await this.redis.connect();
            this.connected = true;
            this.startProcessing();
            ClusterModeManager.log('Redis EventQueue adapter connected');
        } catch (error) {
            ClusterModeManager.error('Failed to connect Redis EventQueue adapter', error);
            throw error;
        }
    }

    async close(): Promise<void> {
        if (!this.connected) {
            return;
        }

        try {
            this.isProcessing = false;
            await this.redis.quit();
            this.connected = false;
            this.events.clear();
            this.processing.clear();
            ClusterModeManager.log('Redis EventQueue adapter closed');
        } catch (error) {
            ClusterModeManager.error('Error closing Redis EventQueue adapter', error);
        }
    }

    isConnected(): boolean {
        return this.connected && this.redis.status === 'ready';
    }

    subscribe(channel: string, event: QueueEventOptions): void {
        if (!this.connected) {
            throw new Error('Redis EventQueue adapter not connected');
        }

        this.events.set(channel, event);
        ClusterModeManager.log(`Subscribed to Redis event queue channel: ${channel}`);
    }

    unsubscribe(channel: string): void {
        if (!this.connected) {
            return;
        }

        this.events.delete(channel);
        ClusterModeManager.log(`Unsubscribed from Redis event queue channel: ${channel}`);
    }

    async publish(channel: string, content: any, options: QueueMessageOptions = {}): Promise<void> {
        if (!this.connected) {
            throw new Error('Redis EventQueue adapter not connected');
        }

        const event = this.events.get(channel);
        if (!event) {
            ClusterModeManager.warn(`No event handler found for channel: ${channel}`);
            return;
        }

        try {
            const queueKey = ClusterModeManager.createKey('queue', channel);
            const messageData = {
                id: randomUUID(),
                content,
                options: {
                    timestamp: Date.now(),
                    ...options,
                },
            };

            await this.redis.lpush(queueKey, JSON.stringify(messageData));
            ClusterModeManager.log(`Published message to Redis queue: ${channel}`, { messageId: messageData.id });
        } catch (error) {
            ClusterModeManager.error(`Failed to publish to queue ${channel}`, error);
            throw error;
        }
    }

    private startProcessing(): void {
        if (this.isProcessing) {
            return;
        }

        this.isProcessing = true;
        this.processQueues();
    }

    private async processQueues(): Promise<void> {
        while (this.isProcessing && this.connected) {
            try {
                for (const [channel, event] of this.events.entries()) {
                    if (event.idle()) {
                        await this.processChannel(channel, event);
                    }
                }

                // Small delay to prevent busy waiting
                await new Promise(resolve => setTimeout(resolve, 100));
            } catch (error) {
                ClusterModeManager.error('Error processing Redis event queues', error);
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    }

    private async processChannel(channel: string, event: QueueEventOptions): Promise<void> {
        const queueKey = ClusterModeManager.createKey('queue', channel);
        const concurrency = event.concurrency || 1;
        const currentProcessing = this.processing.get(channel) || [];

        // Check if we can process more messages
        if (currentProcessing.length >= concurrency) {
            return;
        }

        try {
            // Get messages from Redis queue
            const messages = await this.getMessagesFromQueue(queueKey, concurrency - currentProcessing.length);
            
            for (const message of messages) {
                const processingPromise = this.processMessage(channel, event, message);
                currentProcessing.push(processingPromise);

                // Clean up completed promises
                processingPromise.finally(() => {
                    const index = currentProcessing.indexOf(processingPromise);
                    if (index > -1) {
                        currentProcessing.splice(index, 1);
                    }
                });
            }

            this.processing.set(channel, currentProcessing);
        } catch (error) {
            ClusterModeManager.error(`Error processing channel ${channel}`, error);
        }
    }

    private async getMessagesFromQueue(queueKey: string, count: number): Promise<any[]> {
        const messages = [];
        
        for (let i = 0; i < count; i++) {
            const result = await this.redis.rpop(queueKey);
            if (!result) {
                break;
            }
            
            try {
                messages.push(JSON.parse(result));
            } catch (error) {
                ClusterModeManager.error(`Error parsing message from queue ${queueKey}`, error);
            }
        }

        return messages;
    }

    private async processMessage(channel: string, event: QueueEventOptions, message: any): Promise<void> {
        const { id, content, options } = message;
        const { timeout = 15000, maxRetries = 0, retried = 0 } = options || {};

        try {
            ClusterModeManager.log(`Processing message ${id} from channel ${channel}`);
            
            await event.process(content, {
                id,
                retried,
                signal: AbortSignal.timeout(timeout),
            });

            ClusterModeManager.log(`Successfully processed message ${id} from channel ${channel}`);
        } catch (error) {
            ClusterModeManager.error(`Error processing message ${id} from channel ${channel}`, error);

            // Retry logic
            if (maxRetries > 0 && retried < maxRetries) {
                const retryMessage = {
                    ...message,
                    options: {
                        ...options,
                        retried: retried + 1,
                    },
                };

                // Add back to queue with delay
                setTimeout(async () => {
                    try {
                        const queueKey = ClusterModeManager.createKey('queue', channel);
                        await this.redis.lpush(queueKey, JSON.stringify(retryMessage));
                        ClusterModeManager.log(`Retrying message ${id} (attempt ${retried + 1}/${maxRetries})`);
                    } catch (retryError) {
                        ClusterModeManager.error(`Failed to retry message ${id}`, retryError);
                    }
                }, 500);
            }
        }
    }

    /**
     * Get processing status for a channel
     */
    getProcessingStatus(channel: string): { processing: number; queued: number } {
        const processing = this.processing.get(channel)?.length || 0;
        return { processing, queued: 0 }; // Queued count would require additional Redis call
    }

    /**
     * Get all subscribed channels
     */
    getSubscribedChannels(): string[] {
        return Array.from(this.events.keys());
    }
}

export default RedisEventQueueAdapter;
