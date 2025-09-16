/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/// <reference types="node" />
import { StorageEngine } from 'multer';
import type { Readable } from 'stream';
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
    mimetype?: string;
    path: string;
    url?: string;
    storageId: number;
}
export declare abstract class StorageType {
    storage: StorageModel;
    static defaults(): StorageModel;
    static filenameKey?: string;
    constructor(storage: StorageModel);
    abstract make(): StorageEngine;
    abstract delete(records: AttachmentModel[]): [number, AttachmentModel[]] | Promise<[number, AttachmentModel[]]>;
    getFileKey(record: AttachmentModel): any;
    getFileData(file: any, meta?: {}): {
        title: string;
        filename: string;
        extname: string;
        path: string;
        size: any;
        mimetype: any;
        meta: {};
        storageId: number;
    };
    getFileURL(file: AttachmentModel, preview?: boolean): string | Promise<string>;
    getFileStream(file: AttachmentModel): Promise<{
        stream: Readable;
        contentType?: string;
    }>;
}
export type StorageClassType = {
    new (storage: StorageModel): StorageType;
} & typeof StorageType;
