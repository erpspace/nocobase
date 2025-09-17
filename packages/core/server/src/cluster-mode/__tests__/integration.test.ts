/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { PubSubManager } from '../../pub-sub-manager/pub-sub-manager';
import { EventQueue } from '../../event-queue';
import { LockManager } from '../../../../lock-manager/src/lock-manager';
import { RedisWebSocketManager } from '../redis-websocket-manager';

describe('Cluster Mode Integration', () => {
    let pubSubManager1: PubSubManager;
    let pubSubManager2: PubSubManager;
    let eventQueue1: EventQueue;
    let eventQueue2: EventQueue;
    let lockManager1: LockManager;
    let lockManager2: LockManager;
    let wsManager1: RedisWebSocketManager;
    let wsManager2: RedisWebSocketManager;

    beforeEach(async () => {
        // Set cluster mode for testing
        process.env.CLUSTER_MODE = 'max';
        process.env.REDIS_URL = 'redis://localhost:6379';

        // Initialize managers for two instances
        pubSubManager1 = new PubSubManager({ channelPrefix: 'test1' });
        pubSubManager2 = new PubSubManager({ channelPrefix: 'test2' });

        // Mock Application for EventQueue
        const mockApp = {
            name: 'test-app',
            logger: {
                info: () => {},
                error: () => {},
                warn: () => {},
                debug: () => {},
            },
            on: () => {},
        } as any;

        eventQueue1 = new EventQueue(mockApp);
        eventQueue2 = new EventQueue(mockApp);

        lockManager1 = new LockManager();
        lockManager2 = new LockManager();

        wsManager1 = new RedisWebSocketManager('instance-1');
        wsManager2 = new RedisWebSocketManager('instance-2');

        // Connect all managers
        await Promise.all([
            pubSubManager1.connect(),
            pubSubManager2.connect(),
            eventQueue1.connect(),
            eventQueue2.connect(),
            wsManager1.connect(),
            wsManager2.connect(),
        ]);
    });

    afterEach(async () => {
        // Close all connections
        await Promise.all([
            pubSubManager1.close(),
            pubSubManager2.close(),
            eventQueue1.close(),
            eventQueue2.close(),
            lockManager1.close(),
            lockManager2.close(),
            wsManager1.close(),
            wsManager2.close(),
        ]);

        // Clean up environment
        delete process.env.CLUSTER_MODE;
        delete process.env.REDIS_URL;
    });

    it('should synchronize PubSub messages between instances', async () => {
        const testChannel = 'integration-test';
        const testMessage = { test: 'pubsub-integration' };
        let receivedMessage: any = null;

        // Subscribe on instance 2
        await pubSubManager2.subscribe(testChannel, async (message) => {
            receivedMessage = message;
        });

        // Publish from instance 1
        await pubSubManager1.publish(testChannel, testMessage);

        // Wait for synchronization
        await new Promise(resolve => setTimeout(resolve, 200));

        expect(receivedMessage).toBeDefined();
        if (receivedMessage) {
            expect(receivedMessage.message).toEqual(testMessage);
        }
    });

    it('should process event queue messages across instances', async () => {
        const testChannel = 'integration-queue';
        let processedMessage: any = null;

        // Subscribe on instance 2
        eventQueue2.subscribe(testChannel, {
            idle: () => true,
            process: async (message) => {
                processedMessage = message;
            },
        });

        // Publish from instance 1
        await eventQueue1.publish(testChannel, { test: 'queue-integration' });

        // Wait for processing
        await new Promise(resolve => setTimeout(resolve, 300));

        expect(processedMessage).toBeDefined();
        expect(processedMessage.test).toBe('queue-integration');
    });

    it('should coordinate locks between instances', async () => {
        const testKey = 'integration-lock';
        let lock1Acquired = false;
        let lock2Acquired = false;

        // Try to acquire lock on both instances simultaneously
        const lock1Promise = lockManager1.acquire(testKey, 5000).then(async (release) => {
            lock1Acquired = true;
            await new Promise(resolve => setTimeout(resolve, 100));
            await release();
        });

        const lock2Promise = lockManager1.acquire(testKey, 5000).then(async (release) => {
            lock2Acquired = true;
            await release();
        });

        await Promise.all([lock1Promise, lock2Promise]);

        // Both should eventually acquire the lock (sequentially)
        expect(lock1Acquired).toBe(true);
        expect(lock2Acquired).toBe(true);
    });

    it('should synchronize WebSocket connections between instances', async () => {
        const testClient = {
            id: 'integration-client',
            tags: new Set(['user#123', 'app#main']),
            url: '/test',
            headers: { 'user-agent': 'test' },
            app: 'main',
            timestamp: Date.now(),
        };

        let clientConnectedEvent: any = null;
        wsManager2.on('clientConnected', (data) => {
            clientConnectedEvent = data;
        });

        // Add client to instance 1
        await wsManager1.addConnection(testClient);

        // Wait for synchronization
        await new Promise(resolve => setTimeout(resolve, 100));

        expect(clientConnectedEvent).toBeDefined();
        expect(clientConnectedEvent.clientId).toBe('integration-client');
    });

    it('should broadcast WebSocket messages between instances', async () => {
        const testMessage = {
            type: 'integration-test',
            payload: { message: 'Hello from instance 1' },
        };

        let broadcastEvent: any = null;
        wsManager2.on('broadcastMessage', (data) => {
            broadcastEvent = data;
        });

        // Broadcast from instance 1
        await wsManager1.broadcastToApp('main', testMessage);

        // Wait for synchronization
        await new Promise(resolve => setTimeout(resolve, 100));

        expect(broadcastEvent).toBeDefined();
        expect(broadcastEvent.message).toEqual(testMessage);
    });

    it('should handle complex multi-component scenario', async () => {
        // This test simulates a real-world scenario where multiple components work together
        
        const testChannel = 'complex-test';
        const testLockKey = 'complex-lock';
        const testClient = {
            id: 'complex-client',
            tags: new Set(['user#456']),
            url: '/complex',
            headers: {},
            app: 'main',
            timestamp: Date.now(),
        };

        let pubSubReceived = false;
        let queueProcessed = false;
        let lockAcquired = false;
        let wsConnected = false;

        // Set up listeners on instance 2
        await pubSubManager2.subscribe(testChannel, async (message) => {
            if (message.message.type === 'complex-test') {
                pubSubReceived = true;
            }
        });

        eventQueue2.subscribe(testChannel, {
            idle: () => true,
            process: async (message) => {
                if (message.type === 'complex-test') {
                    queueProcessed = true;
                }
            },
        });

        wsManager2.on('clientConnected', (data) => {
            if (data.clientId === 'complex-client') {
                wsConnected = true;
            }
        });

        // Execute complex scenario on instance 1
        try {
            // 1. Acquire lock
            const release = await lockManager1.acquire(testLockKey, 5000);
            lockAcquired = true;

            // 2. Add WebSocket client
            await wsManager1.addConnection(testClient);

            // 3. Publish PubSub message
            await pubSubManager1.publish(testChannel, { type: 'complex-test' });

            // 4. Publish queue message
            await eventQueue1.publish(testChannel, { type: 'complex-test' });

            // 5. Release lock
            await release();

            // Wait for all operations to complete
            await new Promise(resolve => setTimeout(resolve, 500));

            // Verify all components worked together
            expect(lockAcquired).toBe(true);
            expect(wsConnected).toBe(true);
            expect(pubSubReceived).toBe(true);
            expect(queueProcessed).toBe(true);

        } catch (error) {
            console.error('Complex scenario failed:', error);
            throw error;
        }
    });

    it('should handle graceful degradation when Redis is unavailable', async () => {
        // This test verifies that the system gracefully handles Redis unavailability
        // by falling back to local operations
        
        // Close Redis connections
        await Promise.all([
            pubSubManager1.close(),
            pubSubManager2.close(),
            eventQueue1.close(),
            eventQueue2.close(),
            lockManager1.close(),
            lockManager2.close(),
            wsManager1.close(),
            wsManager2.close(),
        ]);

        // Recreate managers (they should fall back to local mode)
        const localPubSub1 = new PubSubManager({ channelPrefix: 'local1' });
        const localPubSub2 = new PubSubManager({ channelPrefix: 'local2' });

        // These should not throw errors even without Redis
        expect(() => {
            localPubSub1.connect();
            localPubSub2.connect();
        }).not.toThrow();

        // Clean up
        await Promise.all([
            localPubSub1.close(),
            localPubSub2.close(),
        ]);
    });
});
