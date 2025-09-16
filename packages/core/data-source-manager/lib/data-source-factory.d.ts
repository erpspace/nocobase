/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { DataSource } from './data-source';
import { DataSourceManager } from './data-source-manager';
export declare class DataSourceFactory {
    protected dataSourceManager: DataSourceManager;
    collectionTypes: Map<string, typeof DataSource>;
    constructor(dataSourceManager: DataSourceManager);
    register(type: string, dataSourceClass: typeof DataSource): void;
    getClass(type: string): typeof DataSource;
    create(type: string, options?: any): DataSource;
}
