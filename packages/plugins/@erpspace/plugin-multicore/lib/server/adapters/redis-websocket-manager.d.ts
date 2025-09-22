/**
 * Redis WebSocket Manager for NocoBase Multicore Plugin
 * Manages WebSocket connections across multiple instances using Redis
 */
/// <reference types="node" />
import { EventEmitter } from 'events';
export interface WebSocketMessage {
    type: string;
    data: any;
    instanceId: string;
    targetApp?: string;
}
export declare class RedisWebSocketManager extends EventEmitter {
    private redis;
    private subscriber;
    private connected;
    private instanceId;
    constructor(instanceId: string, redisUrl?: string);
    private setupEventHandlers;
    connect(): Promise<void>;
    close(): Promise<void>;
    isConnected(): Promise<boolean>;
    broadcast(message: WebSocketMessage): Promise<void>;
    sendToInstance(targetInstanceId: string, message: WebSocketMessage): Promise<void>;
    addClient(clientId: string, clientInfo: any): Promise<void>;
    removeClient(clientId: string): Promise<void>;
    getClients(): Promise<Map<string, any>>;
    getAllInstances(): Promise<string[]>;
}
//# sourceMappingURL=redis-websocket-manager.d.ts.map