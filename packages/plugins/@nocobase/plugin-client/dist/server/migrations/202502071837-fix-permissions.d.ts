/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Migration } from '@nocobase/server';
export default class extends Migration {
    appVersion: string;
    up(): Promise<void>;
}
export declare function getIds(desktopRoutes: any[], menuUiSchemas: any[]): {
    needRemoveIds: any[];
    needAddIds: any[];
};
