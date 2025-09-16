/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Model } from '@nocobase/database';
import { Migration } from '@nocobase/server';
import { Transaction } from 'sequelize';
export default class extends Migration {
    on: string;
    appVersion: string;
    getTreeCollections({ transaction }: {
        transaction: any;
    }): Promise<any>;
    up(): Promise<void>;
    getTreePath(model: Model, path: string, collection: Model, pathCollectionName: string, transaction: Transaction): Promise<string>;
}
