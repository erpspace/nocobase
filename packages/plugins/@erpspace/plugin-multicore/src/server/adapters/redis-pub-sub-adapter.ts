/**
 * Redis PubSub Adapter for NocoBase Multicore Plugin
 * Implements IPubSubAdapter using Redis for inter-instance communication
 */

import { Redis } from 'ioredis';
import { IPubSubAdapter } from '@nocobase/server';

export class RedisPubSubAdapter implements IPubSubAdapter {
  private redis: Redis;
  private subscriber: Redis;
  private connected = false;

  constructor(redisUrl: string = 'redis://localhost:6379') {
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
      console.log('[Multicore] Redis PubSub publisher connected');
    });

    this.redis.on('error', (error) => {
      console.error('[Multicore] Redis PubSub publisher error', error);
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

  public async isConnected(): Promise<boolean> {
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
            let parsedMessage;
            try {
              parsedMessage = JSON.parse(message);
            } catch {
              parsedMessage = message;
            }
            callback(parsedMessage);
          } catch (error) {
            console.error(`[Multicore] Error processing message from channel ${channel}:`, error);
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
