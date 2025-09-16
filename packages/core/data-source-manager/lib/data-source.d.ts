/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/// <reference types="node" />
import { ACL } from '@nocobase/acl';
import { Logger } from '@nocobase/logger';
import { ResourceManager } from '@nocobase/resourcer';
import EventEmitter from 'events';
import { DataSourceManager } from './data-source-manager';
import { ICollectionManager } from './types';
export type DataSourceOptions = any;
export type LoadingProgress = {
    total: number;
    loaded: number;
};
export declare abstract class DataSource extends EventEmitter {
    protected options: DataSourceOptions;
    collectionManager: ICollectionManager;
    resourceManager: ResourceManager;
    acl: ACL;
    dataSourceManager: DataSourceManager;
    logger: Logger;
    constructor(options: DataSourceOptions);
    _sqlLogger: Logger;
    get sqlLogger(): Logger;
    get name(): any;
    static testConnection(options?: any): Promise<boolean>;
    setDataSourceManager(dataSourceManager: DataSourceManager): void;
    setLogger(logger: Logger): void;
    setSqlLogger(logger: Logger): void;
    init(options?: DataSourceOptions): void;
    middleware(middlewares?: any): (ctx: any, next: any) => Promise<void>;
    createACL(): ACL;
    createResourceManager(options: any): ResourceManager;
    publicOptions(): any;
    emitLoadingProgress(progress: LoadingProgress): void;
    load(options?: any): Promise<void>;
    close(): Promise<void>;
    abstract createCollectionManager(options?: any): ICollectionManager;
    protected collectionToResourceMiddleware(): (ctx: any, next: any) => Promise<any>;
}
