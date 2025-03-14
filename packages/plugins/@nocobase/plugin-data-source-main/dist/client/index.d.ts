/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Plugin } from '@nocobase/client';
type PresetFieldConfig = {
    order: number;
    description: string;
    value: {
        name: string;
        interface: string;
        type: string;
        uiSchema: Record<string, any>;
        field?: string;
        [T: string]: any;
    };
};
declare class PluginDataSourceMainClient extends Plugin {
    collectionPresetFields: {
        order: number;
        value: any;
    }[];
    addCollectionPresetField(config: PresetFieldConfig): void;
    removeCollectionPresetField(fieldName: string): void;
    getCollectionPresetFields(): {
        order: number;
        value: any;
    }[];
    load(): Promise<void>;
}
export default PluginDataSourceMainClient;
