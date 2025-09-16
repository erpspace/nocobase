/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/// <reference types="node" />
import { IPubSubAdapter } from '@nocobase/server';
import { EventEmitter } from 'events';
declare class TestEventEmitter extends EventEmitter {
    emitAsync: (event: string | symbol, ...args: any[]) => Promise<boolean>;
}
export declare class MemoryPubSubAdapter implements IPubSubAdapter {
    protected options: any;
    protected emitter: TestEventEmitter;
    connected: boolean;
    static instances: Map<string, MemoryPubSubAdapter>;
    static create(name?: string, options?: any): MemoryPubSubAdapter;
    constructor(options?: any);
    connect(): Promise<void>;
    close(): Promise<void>;
    isConnected(): Promise<boolean>;
    subscribe(channel: any, callback: any): Promise<void>;
    unsubscribe(channel: any, callback: any): Promise<void>;
    publish(channel: any, message: any): Promise<void>;
    subscribeAll(callback: any): Promise<void>;
}
export {};
