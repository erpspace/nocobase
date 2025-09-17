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

export interface WebSocketClient {
    id: string;
    tags: Set<string>;
    url: string;
    headers: any;
    app: string;
    timestamp: number;
}

export interface WebSocketMessage {
    type: string;
    payload: any;
    targetClientId?: string;
    targetTags?: string[];
    targetApp?: string;
}

export class RedisWebSocketManager extends EventEmitter {
    private redis: Redis;
    private subscriber: Redis;
    private connected = false;
    private instanceId: string;
    private clients = new Map<string, WebSocketClient>();

    constructor(instanceId: string) {
        super();
        this.instanceId = instanceId;
        
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
            ClusterModeManager.log('Redis WebSocket manager publisher connected');
        });

        this.redis.on('error', (error) => {
            ClusterModeManager.error('Redis WebSocket manager publisher error', error);
        });

        this.subscriber.on('connect', () => {
            ClusterModeManager.log('Redis WebSocket manager subscriber connected');
        });

        this.subscriber.on('error', (error) => {
            ClusterModeManager.error('Redis WebSocket manager subscriber error', error);
        });

        this.subscriber.on('message', (channel, message) => {
            this.handleMessage(channel, message);
        });
    }

    private handleMessage(channel: string, message: string): void {
        try {
            const data = JSON.parse(message);
            
            // Ignore messages from this instance
            if (data.instanceId === this.instanceId) {
                return;
            }

            switch (channel) {
                case 'ws:client:connected':
                    this.handleClientConnected(data);
                    break;
                case 'ws:client:disconnected':
                    this.handleClientDisconnected(data);
                    break;
                case 'ws:message':
                    this.handleWebSocketMessage(data);
                    break;
                case 'ws:broadcast':
                    this.handleBroadcastMessage(data);
                    break;
            }
        } catch (error) {
            ClusterModeManager.error(`Error handling WebSocket message from channel ${channel}`, error);
        }
    }

    private handleClientConnected(data: any): void {
        const { app, clientId, clientData } = data;
        ClusterModeManager.log(`Client connected on another instance: ${clientId}`, { app });
        
        // Emit event for local WebSocket server to handle
        this.emit('clientConnected', { app, clientId, clientData });
    }

    private handleClientDisconnected(data: any): void {
        const { app, clientId } = data;
        ClusterModeManager.log(`Client disconnected on another instance: ${clientId}`, { app });
        
        // Emit event for local WebSocket server to handle
        this.emit('clientDisconnected', { app, clientId });
    }

    private handleWebSocketMessage(data: any): void {
        const { app, message, targetClientId, targetTags } = data;
        ClusterModeManager.log(`WebSocket message from another instance`, { app, targetClientId });
        
        // Emit event for local WebSocket server to handle
        this.emit('websocketMessage', { app, message, targetClientId, targetTags });
    }

    private handleBroadcastMessage(data: any): void {
        const { app, message, targetTags } = data;
        ClusterModeManager.log(`Broadcast message from another instance`, { app });
        
        // Emit event for local WebSocket server to handle
        this.emit('broadcastMessage', { app, message, targetTags });
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

            // Subscribe to WebSocket events
            await Promise.all([
                this.subscriber.subscribe('ws:client:connected'),
                this.subscriber.subscribe('ws:client:disconnected'),
                this.subscriber.subscribe('ws:message'),
                this.subscriber.subscribe('ws:broadcast'),
            ]);

            this.connected = true;
            ClusterModeManager.log('Redis WebSocket manager connected');
        } catch (error) {
            ClusterModeManager.error('Failed to connect Redis WebSocket manager', error);
            throw error;
        }
    }

    async close(): Promise<void> {
        if (!this.connected) {
            return;
        }

        try {
            // Unsubscribe from all channels
            await Promise.all([
                this.subscriber.unsubscribe('ws:client:connected'),
                this.subscriber.unsubscribe('ws:client:disconnected'),
                this.subscriber.unsubscribe('ws:message'),
                this.subscriber.unsubscribe('ws:broadcast'),
            ]);

            await Promise.all([
                this.redis.quit(),
                this.subscriber.quit(),
            ]);

            this.connected = false;
            this.clients.clear();
            ClusterModeManager.log('Redis WebSocket manager closed');
        } catch (error) {
            ClusterModeManager.error('Error closing Redis WebSocket manager', error);
        }
    }

    async addConnection(client: WebSocketClient): Promise<void> {
        if (!this.connected) {
            throw new Error('Redis WebSocket manager not connected');
        }

        try {
            const clientData = {
                id: client.id,
                tags: Array.from(client.tags),
                url: client.url,
                headers: client.headers,
                app: client.app,
                timestamp: Date.now(),
            };

            // Store client in local map
            this.clients.set(client.id, client);

            // Store client in Redis
            const clientKey = ClusterModeManager.createKey('ws:clients', client.app);
            await this.redis.hset(clientKey, client.id, JSON.stringify(clientData));

            // Broadcast to other instances
            await this.redis.publish('ws:client:connected', JSON.stringify({
                instanceId: this.instanceId,
                app: client.app,
                clientId: client.id,
                clientData,
            }));

            ClusterModeManager.log(`Added WebSocket connection: ${client.id}`, { app: client.app });
        } catch (error) {
            ClusterModeManager.error(`Failed to add WebSocket connection: ${client.id}`, error);
            throw error;
        }
    }

    async removeConnection(clientId: string, app: string): Promise<void> {
        if (!this.connected) {
            return;
        }

        try {
            // Remove from local map
            this.clients.delete(clientId);

            // Remove from Redis
            const clientKey = ClusterModeManager.createKey('ws:clients', app);
            await this.redis.hdel(clientKey, clientId);

            // Broadcast to other instances
            await this.redis.publish('ws:client:disconnected', JSON.stringify({
                instanceId: this.instanceId,
                app,
                clientId,
            }));

            ClusterModeManager.log(`Removed WebSocket connection: ${clientId}`, { app });
        } catch (error) {
            ClusterModeManager.error(`Failed to remove WebSocket connection: ${clientId}`, error);
            throw error;
        }
    }

    async sendToClient(app: string, clientId: string, message: WebSocketMessage): Promise<void> {
        if (!this.connected) {
            throw new Error('Redis WebSocket manager not connected');
        }

        try {
            await this.redis.publish('ws:message', JSON.stringify({
                instanceId: this.instanceId,
                app,
                message,
                targetClientId: clientId,
            }));

            ClusterModeManager.log(`Sent WebSocket message to client: ${clientId}`, { app });
        } catch (error) {
            ClusterModeManager.error(`Failed to send WebSocket message to client: ${clientId}`, error);
            throw error;
        }
    }

    async sendToClientsByTag(app: string, tagKey: string, tagValue: string, message: WebSocketMessage): Promise<void> {
        if (!this.connected) {
            throw new Error('Redis WebSocket manager not connected');
        }

        try {
            await this.redis.publish('ws:message', JSON.stringify({
                instanceId: this.instanceId,
                app,
                message,
                targetTags: [`${tagKey}#${tagValue}`],
            }));

            ClusterModeManager.log(`Sent WebSocket message to clients with tag: ${tagKey}#${tagValue}`, { app });
        } catch (error) {
            ClusterModeManager.error(`Failed to send WebSocket message to clients with tag: ${tagKey}#${tagValue}`, error);
            throw error;
        }
    }

    async broadcastToApp(app: string, message: WebSocketMessage): Promise<void> {
        if (!this.connected) {
            throw new Error('Redis WebSocket manager not connected');
        }

        try {
            await this.redis.publish('ws:broadcast', JSON.stringify({
                instanceId: this.instanceId,
                app,
                message,
            }));

            ClusterModeManager.log(`Broadcasted WebSocket message to app: ${app}`);
        } catch (error) {
            ClusterModeManager.error(`Failed to broadcast WebSocket message to app: ${app}`, error);
            throw error;
        }
    }

    async getConnectedClients(app: string): Promise<WebSocketClient[]> {
        if (!this.connected) {
            return [];
        }

        try {
            const clientKey = ClusterModeManager.createKey('ws:clients', app);
            const clients = await this.redis.hgetall(clientKey);
            
            return Object.values(clients).map((clientData: string) => {
                const data = JSON.parse(clientData);
                return {
                    id: data.id,
                    tags: new Set(data.tags),
                    url: data.url,
                    headers: data.headers,
                    app: data.app,
                    timestamp: data.timestamp,
                };
            });
        } catch (error) {
            ClusterModeManager.error(`Failed to get connected clients for app: ${app}`, error);
            return [];
        }
    }

    async getClientCount(app: string): Promise<number> {
        if (!this.connected) {
            return 0;
        }

        try {
            const clientKey = ClusterModeManager.createKey('ws:clients', app);
            return await this.redis.hlen(clientKey);
        } catch (error) {
            ClusterModeManager.error(`Failed to get client count for app: ${app}`, error);
            return 0;
        }
    }

    /**
     * Get all clients from this instance
     */
    getLocalClients(): WebSocketClient[] {
        return Array.from(this.clients.values());
    }

    /**
     * Get client by ID from this instance
     */
    getLocalClient(clientId: string): WebSocketClient | undefined {
        return this.clients.get(clientId);
    }

    /**
     * Check if client exists in this instance
     */
    hasLocalClient(clientId: string): boolean {
        return this.clients.has(clientId);
    }
}

export default RedisWebSocketManager;
