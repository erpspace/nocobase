/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { InstallOptions, Plugin } from '@nocobase/server';
import Resources from './resources';
import { SourceManager } from './source-manager';
export declare class PluginLocalizationServer extends Plugin {
    resources: Resources;
    sourceManager: SourceManager;
    addNewTexts: (texts: {
        text: string;
        module: string;
    }[], options?: any) => Promise<void>;
    afterAdd(): void;
    beforeLoad(): void;
    load(): Promise<void>;
    handleSyncMessage(message: any): Promise<void>;
    install(options?: InstallOptions): Promise<void>;
    afterEnable(): Promise<void>;
    afterDisable(): Promise<void>;
    remove(): Promise<void>;
}
export default PluginLocalizationServer;
