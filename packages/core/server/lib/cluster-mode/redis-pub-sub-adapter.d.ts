/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { IPubSubAdapter, PubSubCallback } from '../pub-sub-manager/types';
export declare class RedisPubSubAdapter implements IPubSubAdapter {
    private redis;
    private subscriber;
    private connected;
    private subscriptions;
    private eventEmitter;
    constructor();
    private setupEventHandlers;
    private handleMessage;
    connect(): Promise<void>;
    close(): Promise<void>;
    isConnected(): Promise<boolean>;
    subscribe(channel: string, callback: PubSubCallback): Promise<void>;
    unsubscribe(channel: string, callback: PubSubCallback): Promise<void>;
    publish(channel: string, message: string): Promise<void>;
    /**
     * Get subscription count for a channel
     */
    getSubscriptionCount(channel: string): number;
    /**
     * Get all subscribed channels
     */
    getSubscribedChannels(): string[];
}
export default RedisPubSubAdapter;
