/**
 * @erpspace/plugin-multicore
 * NocoBase Multicore Plugin - Enables cluster mode with Redis adapters
 */

const { Plugin } = require('@nocobase/server');
const { Redis } = require('ioredis');
const { randomUUID } = require('crypto');
const { EventEmitter } = require('events');

// Redis PubSub Adapter
class RedisPubSubAdapter {
  constructor(redisUrl = 'redis://localhost:6379') {
    this.redis = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    });

    this.subscriber = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      lazyConnect: true,
    });

    this.connected = false;
    this.setupEventHandlers();
  }

  setupEventHandlers() {
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

  async connect() {
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

  async close() {
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

  async isConnected() {
    return this.connected && this.redis.status === 'ready' && this.subscriber.status === 'ready';
  }

  async publish(channel, message) {
    try {
      const messageStr = typeof message === 'string' ? message : JSON.stringify(message);
      await this.redis.publish(channel, messageStr);
      console.log(`[Multicore] Published message to channel: ${channel}`);
    } catch (error) {
      console.error(`[Multicore] Error publishing to channel ${channel}:`, error);
      throw error;
    }
  }

  async subscribe(channel, callback) {
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

  async unsubscribe(channel) {
    try {
      await this.subscriber.unsubscribe(channel);
      console.log(`[Multicore] Unsubscribed from channel: ${channel}`);
    } catch (error) {
      console.error(`[Multicore] Error unsubscribing from channel ${channel}:`, error);
      throw error;
    }
  }
}

// Main Plugin Class
class PluginMulticore extends Plugin {
  constructor(app, options) {
    console.log('[Multicore] PluginMulticore constructor called');
    super(app, options);
    
        // Get Redis URL from environment or options
    this.redisUrl = process.env.REDIS_URL || 
            process.env.REDIS_HOST ?
                   `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT || 6379}` : 
            'redis://localhost:6379';
    
        // Add Redis password if provided
        if (process.env.REDIS_PASSWORD) {
      this.redisUrl = this.redisUrl.replace('redis://', `redis://:${process.env.REDIS_PASSWORD}@`);
        }
    
        // Add Redis database if provided
        if (process.env.REDIS_DB) {
      this.redisUrl += `/${process.env.REDIS_DB}`;
    }
  }

  async afterAdd() {
    console.log('[Multicore] Plugin added - creating Redis adapters');
    this.createAdapters();
  }

  async beforeLoad() {
    console.log('[Multicore] Plugin beforeLoad called');
    console.log('[Multicore] Plugin loading - configuring cache manager');
    this.configureCacheManager();
    this.defineAPI();
  }

  async afterLoad() {
    console.log('[Multicore] Plugin afterLoad called');
                this.defineAPI();
  }

  async afterStart() {
    console.log('[Multicore] Plugin afterStart called');
                        console.log('[Multicore] Plugin started - switching to Redis adapters');
    await this.switchToRedisAdapters();
  }

  async beforeStop() {
                        console.log('[Multicore] Plugin stopping - cleaning up');
    if (this.redisPubSubAdapter) {
      await this.redisPubSubAdapter.close();
    }
  }

  createAdapters() {
    try {
      // Create adapter instances
      this.redisPubSubAdapter = new RedisPubSubAdapter(this.redisUrl);
      
            console.log('[Multicore] Created Redis adapter instances');
    } catch (error) {
            console.error('[Multicore] Error creating adapters:', error);
        }
  }

  configureCacheManager() {
        try {
            if (this.app.cacheManager) {
                this.app.cacheManager.defaultStore = 'redis';
                console.log('[Multicore] Configured cache manager for Redis');
            }
    } catch (error) {
            console.error('[Multicore] Error configuring cache manager:', error);
        }
  }

  defineAPI() {
    try {
      this.app.resourceManager.define({
        name: 'multicore',
        actions: {
          info: {
            handler: async (ctx) => {
              const info = await this.getInstanceInfo();
              ctx.body = { data: info };
            },
            middleware: ['auth']
          },
          broadcast: {
            handler: async (ctx) => {
              const { type, data, targetInstance } = ctx.request.body;
              const wsManager = this.getWebSocketManager();
              if (wsManager) {
                await wsManager.broadcast(type, data, targetInstance);
                ctx.body = { status: 'ok', message: `Message of type "${type}" broadcasted.` };
              } else {
                ctx.throw(500, 'WebSocket manager not initialized');
              }
            },
            middleware: ['auth']
          }
        }
      });
      console.log('[Multicore] Defined API routes');
    } catch (error) {
      console.error('[Multicore] Error defining API routes:', error);
    }
  }

  async switchToRedisAdapters() {
    try {
                        // Switch PubSub manager to Redis
                        if (this.app.pubSubManager && this.redisPubSubAdapter) {
                            this.app.pubSubManager.setAdapter(this.redisPubSubAdapter);
                            console.log('[Multicore] Switched PubSub manager to Redis');
                        }

      console.log('[Multicore] Successfully switched all adapters to Redis');
    } catch (error) {
      console.error('[Multicore] Error switching to Redis adapters:', error);
      throw error;
    }
  }

    // Public API methods
  getRedisUrl() {
        return this.redisUrl;
  }

  getWebSocketManager() {
        return this.wsManager;
  }

  async getInstanceInfo() {
    if (this.wsManager) {
      const clients = await this.wsManager.getClients();
      const instances = await this.wsManager.getAllInstances();
      
      return {
                                instanceId: this.app.instanceId,
                                redisUrl: this.redisUrl,
                                clientCount: clients.size,
                                totalInstances: instances.length,
                                instances: instances
      };
    }
    
    return {
                            instanceId: this.app.instanceId,
                            redisUrl: this.redisUrl,
                            clientCount: 0,
                            totalInstances: 1,
                            instances: [this.app.instanceId]
    };
  }
}

console.log('[Multicore] Plugin module loaded');
module.exports = PluginMulticore;