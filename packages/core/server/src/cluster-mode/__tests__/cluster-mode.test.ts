/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { ClusterModeManager } from '../cluster-mode-manager';
import { RedisPubSubAdapter } from '../redis-pub-sub-adapter';
import { RedisEventQueueAdapter } from '../redis-event-queue-adapter';
import { RedisLockAdapter } from '../../../../lock-manager/src/redis-lock-adapter';

describe('Cluster Mode', () => {
    beforeEach(() => {
        // Set cluster mode for testing
        process.env.CLUSTER_MODE = 'max';
        process.env.REDIS_URL = 'redis://localhost:6379';
    });

    afterEach(() => {
        // Clean up environment
        delete process.env.CLUSTER_MODE;
        delete process.env.REDIS_URL;
    });

    describe('ClusterModeManager', () => {
        it('should detect cluster mode when enabled', () => {
            expect(ClusterModeManager.isEnabled()).toBe(true);
        });

        it('should get Redis configuration', () => {
            const config = ClusterModeManager.getRedisConfig();
            expect(config).toBeDefined();
            expect(config?.url).toBe('redis://localhost:6379');
            expect(config?.keyPrefix).toBe('nocobase:');
            expect(config?.ttl).toBe(3600);
        });

        it('should create namespaced keys', () => {
            const key = ClusterModeManager.createKey('test', 'key');
            expect(key).toBe('nocobase:test:key');
        });

        it('should not detect cluster mode when disabled', () => {
            delete process.env.CLUSTER_MODE;
            expect(ClusterModeManager.isEnabled()).toBe(false);
            expect(ClusterModeManager.getRedisConfig()).toBeNull();
        });
    });

    describe('RedisPubSubAdapter', () => {
        let adapter: RedisPubSubAdapter;

        beforeEach(async () => {
            adapter = new RedisPubSubAdapter();
            await adapter.connect();
        });

        afterEach(async () => {
            await adapter.close();
        });

        it('should connect to Redis', async () => {
            expect(await adapter.isConnected()).toBe(true);
        });

        it('should publish and subscribe to messages', async () => {
            const testChannel = 'test-channel';
            const testMessage = { test: 'data' };
            let receivedMessage: any = null;

            // Subscribe to channel
            await adapter.subscribe(testChannel, async (message) => {
                receivedMessage = message;
            });

            // Publish message
            await adapter.publish(testChannel, JSON.stringify(testMessage));

            // Wait for message to be received
            await new Promise(resolve => setTimeout(resolve, 100));

            expect(receivedMessage).toEqual(testMessage);
        });

        it('should handle multiple subscribers', async () => {
            const testChannel = 'multi-channel';
            const testMessage = { test: 'multi-data' };
            const receivedMessages: any[] = [];

            // Subscribe with multiple callbacks
            await adapter.subscribe(testChannel, async (message) => {
                receivedMessages.push(message);
            });

            await adapter.subscribe(testChannel, async (message) => {
                receivedMessages.push(message);
            });

            // Publish message
            await adapter.publish(testChannel, JSON.stringify(testMessage));

            // Wait for messages to be received
            await new Promise(resolve => setTimeout(resolve, 100));

            expect(receivedMessages).toHaveLength(2);
            expect(receivedMessages[0]).toEqual(testMessage);
            expect(receivedMessages[1]).toEqual(testMessage);
        });
    });

    describe('RedisEventQueueAdapter', () => {
        let adapter: RedisEventQueueAdapter;

        beforeEach(async () => {
            adapter = new RedisEventQueueAdapter();
            await adapter.connect();
        });

        afterEach(async () => {
            await adapter.close();
        });

        it('should connect to Redis', () => {
            expect(adapter.isConnected()).toBe(true);
        });

        it('should publish messages to queue', async () => {
            const testChannel = 'test-queue';
            const testMessage = { test: 'queue-data' };
            let processedMessage: any = null;

            // Subscribe to queue
            adapter.subscribe(testChannel, {
                idle: () => true,
                process: async (message) => {
                    processedMessage = message;
                },
            });

            // Publish message
            await adapter.publish(testChannel, testMessage);

            // Wait for message to be processed
            await new Promise(resolve => setTimeout(resolve, 200));

            expect(processedMessage).toEqual(testMessage);
        });
    });

    describe('RedisLockAdapter', () => {
        let adapter: RedisLockAdapter;

        beforeEach(async () => {
            adapter = new RedisLockAdapter();
            await adapter.connect();
        });

        afterEach(async () => {
            await adapter.close();
        });

        it('should connect to Redis', async () => {
            expect(await adapter.isLocked('test-key')).toBe(false);
        });

        it('should acquire and release locks', async () => {
            const testKey = 'test-lock';
            
            // Acquire lock
            const release = await adapter.acquire(testKey, 5000);
            expect(await adapter.isLocked(testKey)).toBe(true);

            // Release lock
            await release();
            expect(await adapter.isLocked(testKey)).toBe(false);
        });

        it('should run exclusive operations', async () => {
            const testKey = 'exclusive-lock';
            let operationExecuted = false;

            await adapter.runExclusive(testKey, async () => {
                operationExecuted = true;
                return 'success';
            }, 5000);

            expect(operationExecuted).toBe(true);
        });

        it('should prevent concurrent access', async () => {
            const testKey = 'concurrent-lock';
            let firstOperationStarted = false;
            let secondOperationStarted = false;

            const firstOperation = adapter.acquire(testKey, 1000).then(async (release) => {
                firstOperationStarted = true;
                await new Promise(resolve => setTimeout(resolve, 100));
                await release();
            });

            const secondOperation = adapter.acquire(testKey, 1000).then(async (release) => {
                secondOperationStarted = true;
                await release();
            });

            await Promise.all([firstOperation, secondOperation]);

            expect(firstOperationStarted).toBe(true);
            expect(secondOperationStarted).toBe(true);
        });
    });
});
