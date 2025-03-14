/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { AttachmentModel, StorageType } from '.';
export default class extends StorageType {
    static defaults(): {
        title: string;
        name: string;
        type: string;
        baseUrl: string;
        options: {
            region: string;
            accessKeyId: string;
            secretAccessKey: string;
            bucket: string;
        };
    };
    static filenameKey: string;
    make(): any;
    delete(records: AttachmentModel[]): Promise<[number, AttachmentModel[]]>;
}
