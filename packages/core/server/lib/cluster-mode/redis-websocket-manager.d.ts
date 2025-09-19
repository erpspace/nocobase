/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
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
export declare class RedisWebSocketManager extends EventEmitter {
    private redis;
    private subscriber;
    private connected;
    private instanceId;
    private clients;
    constructor(instanceId: string);
    private setupEventHandlers;
    private handleMessage;
    private handleClientConnected;
    private handleClientDisconnected;
    private handleWebSocketMessage;
    private handleBroadcastMessage;
    connect(): Promise<void>;
    close(): Promise<void>;
    addConnection(client: WebSocketClient): Promise<void>;
    removeConnection(clientId: string, app: string): Promise<void>;
    sendToClient(app: string, clientId: string, message: WebSocketMessage): Promise<void>;
    sendToClientsByTag(app: string, tagKey: string, tagValue: string, message: WebSocketMessage): Promise<void>;
    broadcastToApp(app: string, message: WebSocketMessage): Promise<void>;
    getConnectedClients(app: string): Promise<WebSocketClient[]>;
    getClientCount(app: string): Promise<number>;
    /**
     * Get all clients from this instance
     */
    getLocalClients(): WebSocketClient[];
    /**
     * Get client by ID from this instance
     */
    getLocalClient(clientId: string): WebSocketClient | undefined;
    /**
     * Check if client exists in this instance
     */
    hasLocalClient(clientId: string): boolean;
}
export default RedisWebSocketManager;
