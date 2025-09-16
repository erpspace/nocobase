/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Plugin } from '@nocobase/server';
export declare class PluginActionImportServer extends Plugin {
    beforeLoad(): void;
    load(): Promise<void>;
}
export default PluginActionImportServer;
export * from './services/xlsx-importer';
export * from './services/template-creator';
