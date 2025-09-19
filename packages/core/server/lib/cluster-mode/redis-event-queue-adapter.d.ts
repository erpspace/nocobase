/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { IEventQueueAdapter, QueueEventOptions, QueueMessageOptions } from '../event-queue';
export declare class RedisEventQueueAdapter implements IEventQueueAdapter {
    private redis;
    private connected;
    private events;
    private processing;
    private isProcessing;
    constructor();
    private setupEventHandlers;
    connect(): Promise<void>;
    close(): Promise<void>;
    isConnected(): boolean;
    subscribe(channel: string, event: QueueEventOptions): void;
    unsubscribe(channel: string): void;
    publish(channel: string, content: any, options?: QueueMessageOptions): Promise<void>;
    private startProcessing;
    private processQueues;
    private processChannel;
    private getMessagesFromQueue;
    private processMessage;
    /**
     * Get processing status for a channel
     */
    getProcessingStatus(channel: string): {
        processing: number;
        queued: number;
    };
    /**
     * Get all subscribed channels
     */
    getSubscribedChannels(): string[];
}
export default RedisEventQueueAdapter;
