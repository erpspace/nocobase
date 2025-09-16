/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import ws from 'ws';
export { createMockDatabase, MockDatabase, mockDatabase } from '@nocobase/database';
export { default as supertest } from 'supertest';
export * from './memory-pub-sub-adapter';
export * from './mock-isolated-cluster';
export * from './mock-server';
export declare const isPg: () => boolean;
export declare const isMysql: () => boolean;
export declare function randomStr(): string;
export declare function sleep(ms?: number): Promise<unknown>;
export declare const waitSecond: typeof sleep;
export declare const startServerWithRandomPort: (startServer: any) => Promise<unknown>;
export declare const createWsClient: ({ serverPort, options }: {
    serverPort: any;
    options?: {};
}) => Promise<{
    wsc: ws;
    messages: any[];
    stop(): Promise<void>;
    lastMessage(): any;
}>;
