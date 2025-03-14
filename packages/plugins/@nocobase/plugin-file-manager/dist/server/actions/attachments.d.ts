/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Context, Next } from '@nocobase/actions';
export declare function getFileData(ctx: Context): {
    title: string;
    filename: string;
    extname: string;
    path: any;
    size: any;
    url: string;
    mimetype: any;
    meta: unknown;
    storageId: any;
};
export declare function createMiddleware(ctx: Context, next: Next): Promise<any>;
