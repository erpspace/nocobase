/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Database } from '@nocobase/database';
export declare const query: {
    api: (options: any) => Promise<any[]>;
    json: (options: any) => Promise<any>;
    sql: (options: any, { db, transaction, skipError, validateSQL, }: {
        db: Database;
        transaction?: any;
        skipError?: boolean;
        validateSQL?: boolean;
    }) => Promise<unknown[]>;
};
export default query;
