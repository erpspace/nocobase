import { Redis } from 'ioredis';
import { IEventQueueAdapter, QueueEventOptions, QueueMessageOptions } from '@nocobase/server';

export class RedisEventQueueAdapter implements IEventQueueAdapter {
  private redis: Redis;
  private connected = false;

  constructor(private redisUrl: string = 'redis://localhost:6379') {
    this.redis = new Redis(this.redisUrl, {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    });
    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    this.redis.on('connect', () => {
      console.log('[Multicore] Redis EventQueue adapter connected');
      this.connected = true;
    });

    this.redis.on('error', (error) => {
      console.error('[Multicore] Redis EventQueue adapter error', error);
      this.connected = false;
    });
  }

  public async connect(): Promise<void> {
    if (this.connected) {
      return;
    }
    try {
      await this.redis.connect();
      this.connected = true;
      console.log('[Multicore] Redis EventQueue adapter connected');
    } catch (error) {
      console.error('[Multicore] Failed to connect Redis EventQueue adapter', error);
      throw error;
    }
  }

  public async close(): Promise<void> {
    if (!this.connected) {
      return;
    }
    try {
      await this.redis.quit();
      this.connected = false;
      console.log('[Multicore] Redis EventQueue adapter closed');
    } catch (error) {
      console.error('[Multicore] Error closing Redis EventQueue adapter', error);
    }
  }

  public isConnected(): boolean {
    return this.connected && this.redis.status === 'ready';
  }

  public async push(channel: string, event: any): Promise<void> {
    try {
      const eventStr = typeof event === 'string' ? event : JSON.stringify(event);
      await this.redis.lpush(`nocobase:queue:${channel}`, eventStr);
      console.log(`[Multicore] Pushed event to queue: ${channel}`);
    } catch (error) {
      console.error(`[Multicore] Error pushing event to queue ${channel}:`, error);
      throw error;
    }
  }

  public async pop(channel: string, timeout: number = 0): Promise<any> {
    try {
      const result = await this.redis.brpop(`nocobase:queue:${channel}`, timeout);
      if (result && result[1]) {
        const message = JSON.parse(result[1]);
        console.log(`[Multicore] Popped message from queue: ${channel}`);
        return message;
      }
      return null;
    } catch (error) {
      console.error(`[Multicore] Error popping from queue ${channel}:`, error);
      throw error;
    }
  }

  public async length(channel: string): Promise<number> {
    try {
      const len = await this.redis.llen(`nocobase:queue:${channel}`);
      return len;
    } catch (error) {
      console.error(`[Multicore] Error getting queue length for ${channel}:`, error);
      throw error;
    }
  }

  public async clear(channel: string): Promise<void> {
    try {
      await this.redis.del(`nocobase:queue:${channel}`);
      console.log(`[Multicore] Cleared queue: ${channel}`);
    } catch (error) {
      console.error(`[Multicore] Error clearing queue ${channel}:`, error);
      throw error;
    }
  }

  public subscribe(channel: string, event: QueueEventOptions): void {
    // Redis EventQueue adapter doesn't need explicit subscription
    // Events are processed by polling the queue
    console.log(`[Multicore] Subscribed to queue: ${channel}`);
  }

  public unsubscribe(channel: string): void {
    // Redis EventQueue adapter doesn't need explicit unsubscription
    console.log(`[Multicore] Unsubscribed from queue: ${channel}`);
  }

  public async publish(channel: string, message: any, options: QueueMessageOptions = {}): Promise<void> {
    try {
      const messageWithOptions = {
        id: `msg_${Date.now()}_${Math.random()}`, // Generate a unique ID if not provided
        content: message,
        options: {
          retried: options.retried || 0,
          timestamp: options.timestamp || Date.now()
        }
      };
      
      const messageStr = JSON.stringify(messageWithOptions);
      await this.redis.lpush(`nocobase:queue:${channel}`, messageStr);
      console.log(`[Multicore] Published message to queue: ${channel}`);
    } catch (error) {
      console.error(`[Multicore] Error publishing to queue ${channel}:`, error);
      throw error;
    }
  }
}