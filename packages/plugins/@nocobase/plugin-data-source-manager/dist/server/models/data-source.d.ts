/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ACL } from '@nocobase/acl';
import { Model, Transaction } from '@nocobase/database';
import { Application } from '@nocobase/server';
export declare class DataSourceModel extends Model {
    isMainRecord(): boolean;
    loadIntoACL(options: {
        app: Application;
        acl: ACL;
        transaction?: Transaction;
    }): Promise<void>;
    loadIntoApplication(options: {
        app: Application;
        transaction?: Transaction;
        loadAtAfterStart?: boolean;
        refresh?: boolean;
    }): Promise<void>;
    private loadLocalData;
}
