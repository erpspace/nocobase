/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import multer from 'multer';
import { AttachmentModel, StorageType } from '.';
export default class extends StorageType {
    static defaults(): {
        title: string;
        type: string;
        name: string;
        baseUrl: string;
        options: {
            documentRoot: string;
        };
        path: string;
        rules: {
            size: number;
        };
    };
    make(): multer.StorageEngine;
    delete(records: AttachmentModel[]): Promise<[number, AttachmentModel[]]>;
    getFileURL(file: AttachmentModel): string;
}
