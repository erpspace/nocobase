/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Logger, LoggerOptions } from '@nocobase/logger';
import { ToposortOptions } from '@nocobase/utils';
import { DataSource } from './data-source';
import { DataSourceFactory } from './data-source-factory';
type DataSourceHook = (dataSource: DataSource) => void;
type DataSourceManagerOptions = {
    logger?: LoggerOptions | Logger;
    app?: any;
};
export declare class DataSourceManager {
    options: DataSourceManagerOptions;
    dataSources: Map<string, DataSource>;
    /**
     * @internal
     */
    factory: DataSourceFactory;
    protected middlewares: any[];
    private onceHooks;
    private beforeAddHooks;
    constructor(options?: DataSourceManagerOptions);
    get(dataSourceKey: string): DataSource;
    add(dataSource: DataSource, options?: any): Promise<void>;
    use(fn: any, options?: ToposortOptions): void;
    middleware(): (ctx: any, next: any) => Promise<void>;
    registerDataSourceType(type: string, DataSourceClass: typeof DataSource): void;
    getDataSourceType(type: string): typeof DataSource | undefined;
    buildDataSourceByType(type: string, options?: any): DataSource;
    beforeAddDataSource(hook: DataSourceHook): void;
    afterAddDataSource(hook: DataSourceHook): void;
    private addHookAndRun;
}
export {};
