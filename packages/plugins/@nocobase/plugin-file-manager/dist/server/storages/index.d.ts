/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { StorageEngine } from 'multer';
export interface StorageModel {
    id?: number;
    title: string;
    type: string;
    name: string;
    baseUrl: string;
    options: Record<string, any>;
    rules?: Record<string, any>;
    path?: string;
    default?: boolean;
    paranoid?: boolean;
}
export interface AttachmentModel {
    title: string;
    filename: string;
    path: string;
    url: string;
    storageId: number;
}
export declare abstract class StorageType {
    storage: StorageModel;
    static defaults(): StorageModel;
    static filenameKey?: string;
    constructor(storage: StorageModel);
    abstract make(): StorageEngine;
    abstract delete(records: AttachmentModel[]): [number, AttachmentModel[]] | Promise<[number, AttachmentModel[]]>;
    getFileData?(file: {
        [key: string]: any;
    }): {
        [key: string]: any;
    };
    getFileURL(file: AttachmentModel): string | Promise<string>;
}
export type StorageClassType = {
    new (storage: StorageModel): StorageType;
} & typeof StorageType;
