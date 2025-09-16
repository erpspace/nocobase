/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Plugin } from '@nocobase/client';
export declare class PluginFileManagerClient extends Plugin {
    static buildInStorage: string[];
    storageTypes: Map<any, any>;
    load(): Promise<void>;
    registerStorageType(name: string, options: any): void;
    getStorageType(name: string): any;
    uploadFile(options?: {
        file: File;
        fileCollectionName?: string;
        storageType?: string;
        /** 后面可能会废弃这个参数 */
        storageId?: number;
        storageRules?: {
            size: number;
        };
    }): Promise<{
        errorMessage?: string;
        data?: any;
    }>;
}
export default PluginFileManagerClient;
