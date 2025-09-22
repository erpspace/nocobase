import { Plugin } from '@nocobase/server';
import { RedisWebSocketManager } from './adapters/redis-websocket-manager';
export declare class PluginMulticore extends Plugin {
    private redisUrl;
    private redisPubSubAdapter?;
    private redisEventQueueAdapter?;
    private redisLockAdapter?;
    private wsManager?;
    constructor(app: any, options?: any);
    afterAdd(): Promise<void>;
    beforeLoad(): Promise<void>;
    afterLoad(): Promise<void>;
    afterStart(): Promise<void>;
    beforeStop(): Promise<void>;
    private createAdapters;
    private configureCacheManager;
    private defineAPI;
    private switchToRedisAdapters;
    private initializeWebSocketManager;
    getRedisUrl(): string;
    getWebSocketManager(): RedisWebSocketManager | undefined;
    getInstanceInfo(): Promise<any>;
}
export default PluginMulticore;
