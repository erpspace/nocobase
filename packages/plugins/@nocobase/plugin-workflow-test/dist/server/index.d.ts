/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ApplicationOptions, Plugin } from '@nocobase/server';
import { MockClusterOptions, MockServer } from '@nocobase/test';
export { sleep } from '@nocobase/test';
interface WorkflowMockServerOptions extends ApplicationOptions {
    collectionsPath?: string;
}
interface WorkflowMockClusterOptions extends MockClusterOptions {
    collectionsPath?: string;
}
export declare function getApp({ plugins, collectionsPath, ...options }?: WorkflowMockServerOptions): Promise<MockServer>;
export declare function getCluster({ plugins, collectionsPath, ...options }: WorkflowMockClusterOptions): Promise<import("@nocobase/test").MockCluster>;
export default class WorkflowTestPlugin extends Plugin {
    load(): Promise<void>;
}
