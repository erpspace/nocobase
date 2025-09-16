/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
type IsolatedClusterOptions = {
    script?: string;
    env?: Record<string, any>;
    plugins?: string[];
    instances?: number;
};
export declare class MockIsolatedCluster {
    private options;
    private script;
    private processes;
    private mockApp;
    constructor(options?: IsolatedClusterOptions);
    start(): Promise<number[]>;
    stop(): Promise<unknown[]>;
}
export {};
