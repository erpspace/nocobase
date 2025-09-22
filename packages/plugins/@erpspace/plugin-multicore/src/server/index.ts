/**
 * @erpspace/plugin-multicore
 * NocoBase Multicore Plugin - Enables cluster mode with Redis adapters
 */

import { Plugin } from '@nocobase/server';
import { RedisPubSubAdapter } from './adapters/redis-pub-sub-adapter';
import { RedisEventQueueAdapter } from './adapters/redis-event-queue-adapter';
import { RedisLockAdapter } from './adapters/redis-lock-adapter';
import { RedisWebSocketManager } from './adapters/redis-websocket-manager';
import { getMulticoreInfo } from './actions/multicore-info';
import { broadcastMessage } from './actions/multicore-broadcast';

export class PluginMulticore extends Plugin {
  private redisUrl: string;
  private wsManager: RedisWebSocketManager;
  private redisPubSubAdapter: RedisPubSubAdapter;
  private redisEventQueueAdapter: RedisEventQueueAdapter;
  private redisLockAdapter: RedisLockAdapter;

  constructor(app, options) {
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
    console.log('[Multicore] Plugin added - registering Redis adapters');
    this.registerAdapters();
  }

  async beforeLoad() {
    console.log('[Multicore] Plugin loading - configuring cache manager');
    this.configureCacheManager();
  }

  async afterLoad() {
    console.log('[Multicore] Plugin loaded - initializing WebSocket manager');
    this.initializeWebSocketManager();
    this.defineAPI();
  }

  async afterStart() {
    console.log('[Multicore] Plugin started - switching to Redis adapters');
    await this.switchToRedisAdapters();
  }

  async beforeStop() {
    console.log('[Multicore] Plugin stopping - cleaning up');
    if (this.wsManager) {
      await this.wsManager.close();
    }
  }

  private registerAdapters() {
    try {
      // Store adapter instances for later use
      this.redisPubSubAdapter = new RedisPubSubAdapter(this.redisUrl);
      this.redisEventQueueAdapter = new RedisEventQueueAdapter(this.redisUrl);
      this.redisLockAdapter = new RedisLockAdapter(this.redisUrl);
      
      console.log('[Multicore] Created Redis adapter instances');
    } catch (error) {
      console.error('[Multicore] Error creating adapters:', error);
    }
  }

  private configureCacheManager() {
    try {
      // Configure cache manager to use Redis
      if (this.app.cacheManager) {
        // Set default store to redis if available
        this.app.cacheManager.defaultStore = 'redis';
        
        console.log('[Multicore] Configured cache manager for Redis');
      }
    } catch (error) {
      console.error('[Multicore] Error configuring cache manager:', error);
    }
  }

  private initializeWebSocketManager() {
    try {
      // Initialize WebSocket manager for inter-instance communication
      this.wsManager = new RedisWebSocketManager(this.app.instanceId, this.redisUrl);
      
      // Set up WebSocket manager on the app (extend app interface)
      (this.app as any).wsManager = this.wsManager;
      
      console.log('[Multicore] Initialized WebSocket manager');
    } catch (error) {
      console.error('[Multicore] Error initializing WebSocket manager:', error);
    }
  }

  private async switchToRedisAdapters() {
    try {
      // Switch PubSub manager to Redis
      if (this.app.pubSubManager && this.redisPubSubAdapter) {
        this.app.pubSubManager.setAdapter(this.redisPubSubAdapter);
        console.log('[Multicore] Switched PubSub manager to Redis');
      }

      // Switch EventQueue to Redis
      if (this.app.eventQueue && this.redisEventQueueAdapter) {
        this.app.eventQueue.setAdapter(this.redisEventQueueAdapter);
        console.log('[Multicore] Switched EventQueue to Redis');
      }

      // Switch LockManager to Redis
      if (this.app.lockManager && this.redisLockAdapter) {
        // LockManager doesn't have setAdapter method, so we'll store the adapter for later use
        (this.app as any).redisLockAdapter = this.redisLockAdapter;
        console.log('[Multicore] Stored Redis Lock adapter');
      }

      // Connect WebSocket manager
      if (this.wsManager) {
        await this.wsManager.connect();
        console.log('[Multicore] Connected WebSocket manager');
      }

      console.log('[Multicore] Successfully switched all adapters to Redis');
    } catch (error) {
      console.error('[Multicore] Error switching to Redis adapters:', error);
      throw error;
    }
  }

  // Public API methods
  public getRedisUrl(): string {
    return this.redisUrl;
  }

  public getWebSocketManager(): RedisWebSocketManager {
    return this.wsManager;
  }

  private defineAPI() {
    // Define API routes for multicore functionality
    this.app.resourceManager.define({
      name: 'multicore',
      actions: {
        info: {
          handler: getMulticoreInfo,
          middleware: ['auth']
        },
        broadcast: {
          handler: broadcastMessage,
          middleware: ['auth']
        }
      }
    });
    
    console.log('[Multicore] Defined API routes');
  }

  public async getInstanceInfo(): Promise<any> {
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

export default PluginMulticore;
