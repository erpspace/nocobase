/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Plugin } from '@nocobase/server';
import { Registry } from '@nocobase/utils';
import { Model, Transactionable } from '@nocobase/database';
import { AttachmentModel, StorageClassType, StorageModel } from './storages';
export type * from './storages';
export type FileRecordOptions = {
    collectionName: string;
    filePath: string;
    storageName?: string;
    values?: any;
} & Transactionable;
export type UploadFileOptions = {
    filePath: string;
    storageName?: string;
    documentRoot?: string;
};
export declare class PluginFileManagerServer extends Plugin {
    storageTypes: Registry<StorageClassType>;
    storagesCache: Map<number, StorageModel>;
    afterDestroy: (record: Model, options: any) => Promise<void>;
    registerStorageType(type: string, Type: StorageClassType): void;
    createFileRecord(options: FileRecordOptions): Promise<any>;
    parseStorage(instance: any): any;
    uploadFile(options: UploadFileOptions): Promise<{
        title: string;
        filename: string;
        extname: string;
        path: any;
        size: any;
        url: string;
        mimetype: any;
        meta: unknown;
        storageId: any;
    }>;
    loadStorages(options?: {
        transaction: any;
    }): Promise<void>;
    install(): Promise<void>;
    handleSyncMessage(message: any): Promise<void>;
    beforeLoad(): Promise<void>;
    load(): Promise<void>;
    getFileURL(file: AttachmentModel): string | Promise<string>;
}
export default PluginFileManagerServer;
