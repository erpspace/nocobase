import { Redis } from 'ioredis';

export class RedisWebSocketManager {
  private redis: Redis;
  private subscriber: Redis;
  private connected = false;
  private clients: Map<string, any> = new Map();

  constructor(
    private instanceId: string,
    private redisUrl: string = 'redis://localhost:6379'
  ) {
    this.redis = new Redis(this.redisUrl, {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    });

    this.subscriber = new Redis(this.redisUrl, {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    });

    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    this.redis.on('connect', () => {
      console.log('[Multicore] Redis WebSocket manager connected');
      this.connected = true;
    });

    this.redis.on('error', (error) => {
      console.error('[Multicore] Redis WebSocket manager error', error);
      this.connected = false;
    });

    this.subscriber.on('connect', () => {
      console.log('[Multicore] Redis WebSocket subscriber connected');
    });

    this.subscriber.on('error', (error) => {
      console.error('[Multicore] Redis WebSocket subscriber error', error);
    });

    // Subscribe to WebSocket messages
    this.subscriber.on('message', (channel, message) => {
      if (channel.startsWith('nocobase:websocket:')) {
        this.handleWebSocketMessage(channel, message);
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
      
      // Subscribe to WebSocket channels
      await this.subscriber.subscribe(`nocobase:websocket:${this.instanceId}`);
      await this.subscriber.subscribe('nocobase:websocket:broadcast');
      
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

  public isConnected(): boolean {
    return this.connected && this.redis.status === 'ready' && this.subscriber.status === 'ready';
  }

  public async addClient(clientId: string, clientInfo: any): Promise<void> {
    try {
      const clientData = {
        ...clientInfo,
        instanceId: this.instanceId,
        connectedAt: Date.now()
      };
      
      await this.redis.hset(
        `nocobase:websocket:clients:${this.instanceId}`,
        clientId,
        JSON.stringify(clientData)
      );
      
      this.clients.set(clientId, clientData);
      console.log(`[Multicore] Added WebSocket client: ${clientId}`);
    } catch (error) {
      console.error(`[Multicore] Error adding WebSocket client ${clientId}:`, error);
      throw error;
    }
  }

  public async removeClient(clientId: string): Promise<void> {
    try {
      await this.redis.hdel(
        `nocobase:websocket:clients:${this.instanceId}`,
        clientId
      );
      
      this.clients.delete(clientId);
      console.log(`[Multicore] Removed WebSocket client: ${clientId}`);
    } catch (error) {
      console.error(`[Multicore] Error removing WebSocket client ${clientId}:`, error);
      throw error;
    }
  }

  public async broadcast(type: string, data: any, targetInstance?: string): Promise<void> {
    try {
      const message = {
        type,
        data,
        from: this.instanceId,
        timestamp: Date.now()
      };

      if (targetInstance) {
        // Send to specific instance
        await this.redis.publish(
          `nocobase:websocket:${targetInstance}`,
          JSON.stringify(message)
        );
        console.log(`[Multicore] Broadcasted message to instance ${targetInstance}: ${type}`);
      } else {
        // Broadcast to all instances
        await this.redis.publish(
          'nocobase:websocket:broadcast',
          JSON.stringify(message)
        );
        console.log(`[Multicore] Broadcasted message to all instances: ${type}`);
      }
    } catch (error) {
      console.error(`[Multicore] Error broadcasting message:`, error);
      throw error;
    }
  }

  public async getClients(): Promise<Map<string, any>> {
    try {
      const clients = await this.redis.hgetall(`nocobase:websocket:clients:${this.instanceId}`);
      const clientMap = new Map();
      
      for (const [clientId, clientData] of Object.entries(clients)) {
        clientMap.set(clientId, JSON.parse(clientData as string));
      }
      
      return clientMap;
    } catch (error) {
      console.error('[Multicore] Error getting WebSocket clients:', error);
      return new Map();
    }
  }

  public async getAllInstances(): Promise<string[]> {
    try {
      const keys = await this.redis.keys('nocobase:websocket:clients:*');
      const instances = keys.map(key => key.replace('nocobase:websocket:clients:', ''));
      return instances;
    } catch (error) {
      console.error('[Multicore] Error getting all instances:', error);
      return [];
    }
  }

  private handleWebSocketMessage(channel: string, message: string): void {
    try {
      const parsedMessage = JSON.parse(message);
      console.log(`[Multicore] Received WebSocket message on ${channel}:`, parsedMessage.type);
      
      // Here you would typically forward the message to the appropriate WebSocket clients
      // This is a placeholder for the actual WebSocket forwarding logic
      
    } catch (error) {
      console.error('[Multicore] Error handling WebSocket message:', error);
    }
  }
}