import { IEventQueueAdapter, QueueEventOptions, QueueMessageOptions } from '@nocobase/server';
export declare class RedisEventQueueAdapter implements IEventQueueAdapter {
    private redisUrl;
    private redis;
    private connected;
    constructor(redisUrl?: string);
    private setupEventHandlers;
    connect(): Promise<void>;
    close(): Promise<void>;
    isConnected(): boolean;
    push(channel: string, event: any): Promise<void>;
    pop(channel: string, timeout?: number): Promise<any>;
    length(channel: string): Promise<number>;
    clear(channel: string): Promise<void>;
    subscribe(channel: string, event: QueueEventOptions): void;
    unsubscribe(channel: string): void;
    publish(channel: string, message: any, options?: QueueMessageOptions): Promise<void>;
}
