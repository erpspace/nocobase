/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { MagicAttributeModel } from '@nocobase/database';
import { Application } from '@nocobase/server';
import { Transaction } from 'sequelize';
export declare class DataSourcesCollectionModel extends MagicAttributeModel {
    load(loadOptions: {
        app: Application;
        transaction: Transaction;
    }): Promise<import("@nocobase/data-source-manager").ICollection>;
}
