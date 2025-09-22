import { Redis } from 'ioredis';
import { IPubSubAdapter } from '@nocobase/server';

export class RedisPubSubAdapter implements IPubSubAdapter {
  private redis: Redis;
  private subscriber: Redis;
  private connected = false;

  constructor(private redisUrl: string = 'redis://localhost:6379') {
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
      console.log('[Multicore] Redis PubSub adapter connected');
      this.connected = true;
    });

    this.redis.on('error', (error) => {
      console.error('[Multicore] Redis PubSub adapter error', error);
      this.connected = false;
    });

    this.subscriber.on('connect', () => {
      console.log('[Multicore] Redis PubSub subscriber connected');
    });

    this.subscriber.on('error', (error) => {
      console.error('[Multicore] Redis PubSub subscriber error', error);
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
      this.connected = true;
      console.log('[Multicore] Redis PubSub adapter connected');
    } catch (error) {
      console.error('[Multicore] Failed to connect Redis PubSub adapter', error);
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
      console.log('[Multicore] Redis PubSub adapter closed');
    } catch (error) {
      console.error('[Multicore] Error closing Redis PubSub adapter', error);
    }
  }

  public isConnected(): boolean {
    return this.connected && this.redis.status === 'ready' && this.subscriber.status === 'ready';
  }

  public async publish(channel: string, message: any): Promise<void> {
    try {
      const messageStr = typeof message === 'string' ? message : JSON.stringify(message);
      await this.redis.publish(channel, messageStr);
      console.log(`[Multicore] Published message to channel: ${channel}`);
    } catch (error) {
      console.error(`[Multicore] Error publishing to channel ${channel}:`, error);
      throw error;
    }
  }

  public async subscribe(channel: string, callback: (message: any) => void): Promise<void> {
    try {
      await this.subscriber.subscribe(channel);
      this.subscriber.on('message', (receivedChannel, message) => {
        if (receivedChannel === channel) {
          try {
            const parsedMessage = JSON.parse(message);
            callback(parsedMessage);
          } catch (error) {
            // If parsing fails, pass the raw message
            callback(message);
          }
        }
      });
      console.log(`[Multicore] Subscribed to channel: ${channel}`);
    } catch (error) {
      console.error(`[Multicore] Error subscribing to channel ${channel}:`, error);
      throw error;
    }
  }

  public async unsubscribe(channel: string): Promise<void> {
    try {
      await this.subscriber.unsubscribe(channel);
      console.log(`[Multicore] Unsubscribed from channel: ${channel}`);
    } catch (error) {
      console.error(`[Multicore] Error unsubscribing from channel ${channel}:`, error);
      throw error;
    }
  }
}