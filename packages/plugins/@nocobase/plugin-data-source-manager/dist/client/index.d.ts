/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Plugin } from '@nocobase/client';
export declare class PluginDataSourceManagerClient extends Plugin {
    types: Map<any, any>;
    extendedTabs: {};
    getExtendedTabs(): {};
    registerPermissionTab(schema: any): void;
    load(): Promise<void>;
    setDataSources(): Promise<any>;
    getThirdDataSource(): Promise<any>;
    registerType(name: string, options: any): void;
}
export default PluginDataSourceManagerClient;
