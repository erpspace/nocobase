/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Plugin } from '@nocobase/client';
import { ComponentType } from 'react';
export type SourceOptions = {
    components: Partial<{
        AdminSettingsForm: ComponentType;
    }>;
};
export declare class PluginUserDataSyncClient extends Plugin {
    sourceTypes: any;
    registerType(sourceType: string, options: SourceOptions): void;
    load(): Promise<void>;
}
export default PluginUserDataSyncClient;
