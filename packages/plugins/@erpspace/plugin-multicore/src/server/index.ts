import { Plugin } from '@nocobase/server';
import { RedisPubSubAdapter } from './adapters/redis-pub-sub-adapter';
import { RedisEventQueueAdapter } from './adapters/redis-event-queue-adapter';
import { RedisLockAdapter } from './adapters/redis-lock-adapter';
import { RedisWebSocketManager } from './adapters/redis-websocket-manager';

export class PluginMulticore extends Plugin {
  private redisUrl: string;
  private redisPubSubAdapter?: RedisPubSubAdapter;
  private redisEventQueueAdapter?: RedisEventQueueAdapter;
  private redisLockAdapter?: RedisLockAdapter;
  private wsManager?: RedisWebSocketManager;

  constructor(app: any, options?: any) {
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

  private createAdapters() {
    try {
      // Create adapter instances
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
      if (this.app.cacheManager) {
        this.app.cacheManager.defaultStore = 'redis';
        console.log('[Multicore] Configured cache manager for Redis');
      }
    } catch (error) {
      console.error('[Multicore] Error configuring cache manager:', error);
    }
  }

  private defineAPI() {
    try {
      this.app.resourceManager.define({
        name: 'multicore',
        actions: {
          info: {
            handler: async (ctx: any) => {
              const info = await this.getInstanceInfo();
              ctx.body = { data: info };
            },
            middleware: ['auth']
          },
          broadcast: {
            handler: async (ctx: any) => {
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

      // Store Redis Lock adapter for later use
      if (this.app.lockManager && this.redisLockAdapter) {
        (this.app as any).redisLockAdapter = this.redisLockAdapter;
        console.log('[Multicore] Stored Redis Lock adapter');
      }

      // Initialize WebSocket manager
      this.initializeWebSocketManager();
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

  private initializeWebSocketManager() {
    try {
      this.wsManager = new RedisWebSocketManager(this.app.instanceId, this.redisUrl);
      (this.app as any).wsManager = this.wsManager;
      console.log('[Multicore] Initialized WebSocket manager');
    } catch (error) {
      console.error('[Multicore] Error initializing WebSocket manager:', error);
    }
  }

  // Public API methods
  public getRedisUrl(): string {
    return this.redisUrl;
  }

  public getWebSocketManager(): RedisWebSocketManager | undefined {
    return this.wsManager;
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

console.log('[Multicore] Plugin module loaded');
export default PluginMulticore;