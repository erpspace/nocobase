/**
 * Redis WebSocket Manager for NocoBase Multicore Plugin
 * Manages WebSocket connections across multiple instances using Redis
 */

import { Redis } from 'ioredis';
import { EventEmitter } from 'events';

export interface WebSocketMessage {
  type: string;
  data: any;
  instanceId: string;
  targetApp?: string;
}

export class RedisWebSocketManager extends EventEmitter {
  private redis: Redis;
  private subscriber: Redis;
  private connected = false;
  private instanceId: string;

  constructor(instanceId: string, redisUrl: string = 'redis://localhost:6379') {
    super();
    this.instanceId = instanceId;
    
    this.redis = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    });

    this.subscriber = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    this.redis.on('connect', () => {
      console.log('[Multicore] Redis WebSocket publisher connected');
    });

    this.redis.on('error', (error) => {
      console.error('[Multicore] Redis WebSocket publisher error', error);
    });

    this.subscriber.on('connect', () => {
      console.log('[Multicore] Redis WebSocket subscriber connected');
    });

    this.subscriber.on('error', (error) => {
      console.error('[Multicore] Redis WebSocket subscriber error', error);
    });

    // Listen for WebSocket messages
    this.subscriber.on('message', (channel, message) => {
      if (channel.startsWith('nocobase:websocket:')) {
        try {
          const parsedMessage: WebSocketMessage = JSON.parse(message);
          // Don't process messages from our own instance
          if (parsedMessage.instanceId !== this.instanceId) {
            this.emit('message', parsedMessage);
          }
        } catch (error) {
          console.error('[Multicore] Error parsing WebSocket message:', error);
        }
      }
    });
  }

  public async connect(): Promise<void> {
    if (this.connected) {
      return;
    }
    try {
      await Promise.all([
        this.redis.connect(),
        this.subscriber.connect()
      ]);
      
      // Subscribe to WebSocket messages
      await this.subscriber.subscribe('nocobase:websocket:*');
      
      this.connected = true;
      console.log('[Multicore] Redis WebSocket manager connected');
    } catch (error) {
      console.error('[Multicore] Failed to connect Redis WebSocket manager', error);
      throw error;
    }
  }

  public async close(): Promise<void> {
    if (!this.connected) {
      return;
    }
    try {
      await Promise.all([
        this.redis.quit(),
        this.subscriber.quit()
      ]);
      this.connected = false;
      console.log('[Multicore] Redis WebSocket manager closed');
    } catch (error) {
      console.error('[Multicore] Error closing Redis WebSocket manager', error);
    }
  }

  public async isConnected(): Promise<boolean> {
    return this.connected && this.redis.status === 'ready' && this.subscriber.status === 'ready';
  }

  public async broadcast(message: WebSocketMessage): Promise<void> {
    try {
      const messageWithInstance = {
        ...message,
        instanceId: this.instanceId,
        timestamp: Date.now()
      };
      
      const messageStr = JSON.stringify(messageWithInstance);
      await this.redis.publish('nocobase:websocket:broadcast', messageStr);
      console.log(`[Multicore] Broadcasted WebSocket message: ${message.type}`);
    } catch (error) {
      console.error('[Multicore] Error broadcasting WebSocket message:', error);
      throw error;
    }
  }

  public async sendToInstance(targetInstanceId: string, message: WebSocketMessage): Promise<void> {
    try {
      const messageWithInstance = {
        ...message,
        instanceId: this.instanceId,
        targetInstanceId,
        timestamp: Date.now()
      };
      
      const messageStr = JSON.stringify(messageWithInstance);
      await this.redis.publish(`nocobase:websocket:instance:${targetInstanceId}`, messageStr);
      console.log(`[Multicore] Sent WebSocket message to instance ${targetInstanceId}: ${message.type}`);
    } catch (error) {
      console.error('[Multicore] Error sending WebSocket message to instance:', error);
      throw error;
    }
  }

  public async addClient(clientId: string, clientInfo: any): Promise<void> {
    try {
      const clientKey = `nocobase:websocket:clients:${this.instanceId}`;
      await this.redis.hset(clientKey, clientId, JSON.stringify({
        ...clientInfo,
        instanceId: this.instanceId,
        connectedAt: Date.now()
      }));
      console.log(`[Multicore] Added WebSocket client: ${clientId}`);
    } catch (error) {
      console.error('[Multicore] Error adding WebSocket client:', error);
      throw error;
    }
  }

  public async removeClient(clientId: string): Promise<void> {
    try {
      const clientKey = `nocobase:websocket:clients:${this.instanceId}`;
      await this.redis.hdel(clientKey, clientId);
      console.log(`[Multicore] Removed WebSocket client: ${clientId}`);
    } catch (error) {
      console.error('[Multicore] Error removing WebSocket client:', error);
      throw error;
    }
  }

  public async getClients(): Promise<Map<string, any>> {
    try {
      const clientKey = `nocobase:websocket:clients:${this.instanceId}`;
      const clients = await this.redis.hgetall(clientKey);
      
      const clientMap = new Map();
      for (const [clientId, clientData] of Object.entries(clients)) {
        try {
          clientMap.set(clientId, JSON.parse(clientData as string));
        } catch (error) {
          console.error(`[Multicore] Error parsing client data for ${clientId}:`, error);
        }
      }
      
      return clientMap;
    } catch (error) {
      console.error('[Multicore] Error getting WebSocket clients:', error);
      throw error;
    }
  }

  public async getAllInstances(): Promise<string[]> {
    try {
      const pattern = 'nocobase:websocket:clients:*';
      const keys = await this.redis.keys(pattern);
      return keys.map(key => key.replace('nocobase:websocket:clients:', ''));
    } catch (error) {
      console.error('[Multicore] Error getting all instances:', error);
      throw error;
    }
  }
}
