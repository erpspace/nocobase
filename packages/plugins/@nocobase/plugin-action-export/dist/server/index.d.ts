/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Plugin } from '@nocobase/server';
import { Logger } from '@nocobase/logger';
export declare class PluginActionExportServer extends Plugin {
    logger: Logger;
    beforeLoad(): void;
    load(): Promise<void>;
    getLogger(): Logger;
}
export default PluginActionExportServer;
export * from './services/base-exporter';
export * from './services/xlsx-exporter';
