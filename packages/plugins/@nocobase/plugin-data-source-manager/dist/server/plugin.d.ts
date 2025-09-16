/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Plugin } from '@nocobase/server';
import { LoadingProgress } from '@nocobase/data-source-manager';
type DataSourceState = 'loading' | 'loaded' | 'loading-failed' | 'reloading' | 'reloading-failed';
export declare class PluginDataSourceManagerServer extends Plugin {
    dataSourceErrors: {
        [dataSourceKey: string]: Error;
    };
    dataSourceStatus: {
        [dataSourceKey: string]: DataSourceState;
    };
    handleSyncMessage(message: any): Promise<void>;
    dataSourceLoadingProgress: {
        [dataSourceKey: string]: LoadingProgress;
    };
    renderJsonTemplate(template: any): any;
    beforeLoad(): Promise<void>;
    load(): Promise<void>;
}
export default PluginDataSourceManagerServer;
