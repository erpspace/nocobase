/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Database } from '@nocobase/database';
import { Migration } from '@nocobase/server';
export declare const getSchemaUid: (db: Database, migrate?: boolean) => Promise<{
    adminSchemaUid: any;
    mobileSchemaUid: any;
}>;
export declare const getTextsFromMenu: (db: Database, migrate?: boolean) => Promise<{}>;
export default class FixModuleMigration extends Migration {
    appVersion: string;
    up(): Promise<void>;
    down(): Promise<void>;
}
