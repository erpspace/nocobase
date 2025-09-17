/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { RedisWebSocketManager } from '../redis-websocket-manager';

describe('Redis WebSocket Synchronization', () => {
    let manager1: RedisWebSocketManager;
    let manager2: RedisWebSocketManager;

    beforeEach(async () => {
        // Set cluster mode for testing
        process.env.CLUSTER_MODE = 'max';
        process.env.REDIS_URL = 'redis://localhost:6379';

        manager1 = new RedisWebSocketManager('instance-1');
        manager2 = new RedisWebSocketManager('instance-2');

        await Promise.all([
            manager1.connect(),
            manager2.connect(),
        ]);
    });

    afterEach(async () => {
        await Promise.all([
            manager1.close(),
            manager2.close(),
        ]);

        // Clean up environment
        delete process.env.CLUSTER_MODE;
        delete process.env.REDIS_URL;
    });

    it('should synchronize client connections between instances', async () => {
        const testClient = {
            id: 'client-1',
            tags: new Set(['user#123', 'app#main']),
            url: '/test',
            headers: { 'user-agent': 'test' },
            app: 'main',
            timestamp: Date.now(),
        };

        let clientConnectedEvent: any = null;
        manager2.on('clientConnected', (data) => {
            clientConnectedEvent = data;
        });

        // Add client to instance 1
        await manager1.addConnection(testClient);

        // Wait for synchronization
        await new Promise(resolve => setTimeout(resolve, 100));

        expect(clientConnectedEvent).toBeDefined();
        expect(clientConnectedEvent.app).toBe('main');
        expect(clientConnectedEvent.clientId).toBe('client-1');
    });

    it('should synchronize client disconnections between instances', async () => {
        const testClient = {
            id: 'client-2',
            tags: new Set(['user#456']),
            url: '/test',
            headers: {},
            app: 'main',
            timestamp: Date.now(),
        };

        let clientDisconnectedEvent: any = null;
        manager2.on('clientDisconnected', (data) => {
            clientDisconnectedEvent = data;
        });

        // Add and then remove client from instance 1
        await manager1.addConnection(testClient);
        await manager1.removeConnection('client-2', 'main');

        // Wait for synchronization
        await new Promise(resolve => setTimeout(resolve, 100));

        expect(clientDisconnectedEvent).toBeDefined();
        expect(clientDisconnectedEvent.app).toBe('main');
        expect(clientDisconnectedEvent.clientId).toBe('client-2');
    });

    it('should broadcast messages between instances', async () => {
        const testMessage = {
            type: 'notification',
            payload: { message: 'Hello from instance 1' },
        };

        let broadcastEvent: any = null;
        manager2.on('broadcastMessage', (data) => {
            broadcastEvent = data;
        });

        // Broadcast message from instance 1
        await manager1.broadcastToApp('main', testMessage);

        // Wait for synchronization
        await new Promise(resolve => setTimeout(resolve, 100));

        expect(broadcastEvent).toBeDefined();
        expect(broadcastEvent.app).toBe('main');
        expect(broadcastEvent.message).toEqual(testMessage);
    });

    it('should send targeted messages between instances', async () => {
        const testMessage = {
            type: 'private',
            payload: { message: 'Private message' },
        };

        let messageEvent: any = null;
        manager2.on('websocketMessage', (data) => {
            messageEvent = data;
        });

        // Send targeted message from instance 1
        await manager1.sendToClient('main', 'client-3', testMessage);

        // Wait for synchronization
        await new Promise(resolve => setTimeout(resolve, 100));

        expect(messageEvent).toBeDefined();
        expect(messageEvent.app).toBe('main');
        expect(messageEvent.targetClientId).toBe('client-3');
        expect(messageEvent.message).toEqual(testMessage);
    });

    it('should send messages to clients by tag', async () => {
        const testMessage = {
            type: 'group',
            payload: { message: 'Group message' },
        };

        let messageEvent: any = null;
        manager2.on('websocketMessage', (data) => {
            messageEvent = data;
        });

        // Send message to clients with specific tag
        await manager1.sendToClientsByTag('main', 'user', '123', testMessage);

        // Wait for synchronization
        await new Promise(resolve => setTimeout(resolve, 100));

        expect(messageEvent).toBeDefined();
        expect(messageEvent.app).toBe('main');
        expect(messageEvent.targetTags).toEqual(['user#123']);
        expect(messageEvent.message).toEqual(testMessage);
    });

    it('should track connected clients across instances', async () => {
        const testClient1 = {
            id: 'client-4',
            tags: new Set(['user#789']),
            url: '/test',
            headers: {},
            app: 'main',
            timestamp: Date.now(),
        };

        const testClient2 = {
            id: 'client-5',
            tags: new Set(['user#101']),
            url: '/test',
            headers: {},
            app: 'main',
            timestamp: Date.now(),
        };

        // Add clients to different instances
        await manager1.addConnection(testClient1);
        await manager2.addConnection(testClient2);

        // Wait for synchronization
        await new Promise(resolve => setTimeout(resolve, 100));

        // Check client count
        const clientCount = await manager1.getClientCount('main');
        expect(clientCount).toBe(2);

        // Check connected clients
        const connectedClients = await manager1.getConnectedClients('main');
        expect(connectedClients).toHaveLength(2);
        expect(connectedClients.map(c => c.id)).toContain('client-4');
        expect(connectedClients.map(c => c.id)).toContain('client-5');
    });

    it('should handle local client operations', () => {
        const testClient = {
            id: 'local-client',
            tags: new Set(['local']),
            url: '/local',
            headers: {},
            app: 'main',
            timestamp: Date.now(),
        };

        // Add client locally
        manager1.addConnection(testClient);

        // Check local operations
        expect(manager1.hasLocalClient('local-client')).toBe(true);
        expect(manager1.getLocalClient('local-client')).toBeDefined();
        expect(manager1.getLocalClients()).toHaveLength(1);
    });
});
