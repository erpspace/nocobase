import { IPubSubAdapter } from '@nocobase/server';
export declare class RedisPubSubAdapter implements IPubSubAdapter {
    private redisUrl;
    private redis;
    private subscriber;
    private connected;
    constructor(redisUrl?: string);
    private setupEventHandlers;
    connect(): Promise<void>;
    close(): Promise<void>;
    isConnected(): boolean;
    publish(channel: string, message: any): Promise<void>;
    subscribe(channel: string, callback: (message: any) => void): Promise<void>;
    unsubscribe(channel: string): Promise<void>;
}
