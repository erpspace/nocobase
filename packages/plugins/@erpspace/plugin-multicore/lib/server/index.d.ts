/**
 * @erpspace/plugin-multicore
 * NocoBase Multicore Plugin - Enables cluster mode with Redis adapters
 */
import { Plugin } from '@nocobase/server';
import { RedisWebSocketManager } from './adapters/redis-websocket-manager';
export declare class PluginMulticore extends Plugin {
    private redisUrl;
    private wsManager;
    private redisPubSubAdapter;
    private redisEventQueueAdapter;
    private redisLockAdapter;
    constructor(app: any, options: any);
    afterAdd(): Promise<void>;
    beforeLoad(): Promise<void>;
    afterLoad(): Promise<void>;
    afterStart(): Promise<void>;
    beforeStop(): Promise<void>;
    private registerAdapters;
    private configureCacheManager;
    private initializeWebSocketManager;
    private switchToRedisAdapters;
    getRedisUrl(): string;
    getWebSocketManager(): RedisWebSocketManager;
    private defineAPI;
    getInstanceInfo(): Promise<any>;
}
export default PluginMulticore;
//# sourceMappingURL=index.d.ts.map