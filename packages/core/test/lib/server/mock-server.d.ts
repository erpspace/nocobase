/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Application, ApplicationOptions } from '@nocobase/server';
import supertest, { SuperAgentTest } from 'supertest';
interface ActionParams {
    filterByTk?: any;
    fields?: string[];
    filter?: any;
    sort?: string[];
    page?: number;
    pageSize?: number;
    values?: any;
    /**
     * @deprecated
     */
    resourceName?: string;
    /**
     * @deprecated
     */
    resourceIndex?: string;
    /**
     * @deprecated
     */
    associatedName?: string;
    /**
     * @deprecated
     */
    associatedIndex?: string;
    [key: string]: any;
}
interface SortActionParams {
    resourceName?: string;
    resourceIndex?: any;
    associatedName?: string;
    associatedIndex?: any;
    sourceId?: any;
    targetId?: any;
    sortField?: string;
    method?: string;
    target?: any;
    sticky?: boolean;
    [key: string]: any;
}
interface Resource {
    get: (params?: ActionParams) => Promise<supertest.Response>;
    list: (params?: ActionParams) => Promise<supertest.Response>;
    create: (params?: ActionParams) => Promise<supertest.Response>;
    update: (params?: ActionParams) => Promise<supertest.Response>;
    destroy: (params?: ActionParams) => Promise<supertest.Response>;
    sort: (params?: SortActionParams) => Promise<supertest.Response>;
    [name: string]: (params?: ActionParams) => Promise<supertest.Response>;
}
export interface ExtendedAgent extends SuperAgentTest {
    login: (user: any, roleName?: string) => Promise<ExtendedAgent>;
    loginUsingId: (userId: number, roleName?: string) => Promise<ExtendedAgent>;
    resource: (name: string, resourceOf?: any) => Resource;
}
export declare class MockServer extends Application {
    registerMockDataSource(): void;
    loadAndInstall(options?: any): Promise<void>;
    cleanDb(): Promise<void>;
    quickstart(options?: {
        clean?: boolean;
    }): Promise<void>;
    destroy(options?: any): Promise<void>;
    agent(callback?: any): ExtendedAgent;
    protected createDatabase(options: ApplicationOptions): import("@nocobase/database").MockDatabase;
}
export declare function mockServer(options?: ApplicationOptions): MockServer;
export declare function startMockServer(options?: ApplicationOptions): Promise<MockServer>;
type BeforeInstallFn = (app: any) => Promise<void>;
export type MockServerOptions = ApplicationOptions & {
    version?: string;
    beforeInstall?: BeforeInstallFn;
    skipInstall?: boolean;
    skipStart?: boolean;
};
export type MockClusterOptions = MockServerOptions & {
    number?: number;
    clusterName?: string;
    appName?: string;
};
export type MockCluster = {
    nodes: MockServer[];
    destroy: () => Promise<void>;
};
export declare function createMockCluster({ number, clusterName, appName, ...options }?: MockClusterOptions): Promise<MockCluster>;
export declare function createMockServer(options?: MockServerOptions): Promise<MockServer>;
export default mockServer;
