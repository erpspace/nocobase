/**
 * Redis PubSub Adapter for NocoBase Multicore Plugin
 * Implements IPubSubAdapter using Redis for inter-instance communication
 */
import { IPubSubAdapter } from '@nocobase/server';
export declare class RedisPubSubAdapter implements IPubSubAdapter {
    private redis;
    private subscriber;
    private connected;
    constructor(redisUrl?: string);
    private setupEventHandlers;
    connect(): Promise<void>;
    close(): Promise<void>;
    isConnected(): Promise<boolean>;
    publish(channel: string, message: any): Promise<void>;
    subscribe(channel: string, callback: (message: any) => void): Promise<void>;
    unsubscribe(channel: string): Promise<void>;
}
//# sourceMappingURL=redis-pub-sub-adapter.d.ts.map