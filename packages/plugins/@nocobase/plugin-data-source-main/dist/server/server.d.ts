/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Filter } from '@nocobase/database';
import { Plugin } from '@nocobase/server';
export declare class PluginDataSourceMainServer extends Plugin {
    private loadFilter;
    setLoadFilter(filter: Filter): void;
    handleSyncMessage(message: any): Promise<void>;
    beforeLoad(): Promise<void>;
    load(): Promise<void>;
    install(): Promise<void>;
}
export default PluginDataSourceMainServer;
