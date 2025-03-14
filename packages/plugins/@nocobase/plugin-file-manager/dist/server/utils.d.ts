/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare function getFilename(req: any, file: any, cb: any): void;
export declare const cloudFilenameGetter: (storage: any) => (req: any, file: any, cb: any) => void;
export declare function getFileKey(record: any): string;
