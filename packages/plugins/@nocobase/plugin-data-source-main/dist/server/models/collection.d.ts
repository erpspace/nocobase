/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import Database, { Collection, MagicAttributeModel, SyncOptions, Transactionable } from '@nocobase/database';
import { QueryInterfaceDropTableOptions } from 'sequelize';
interface LoadOptions extends Transactionable {
    skipField?: boolean | Array<string>;
    skipExist?: boolean;
    resetFields?: boolean;
}
export declare class CollectionModel extends MagicAttributeModel {
    get db(): Database;
    toJSON(): any;
    load(loadOptions?: LoadOptions): Promise<Collection<any, any>>;
    loadFields(options?: Transactionable & {
        skipField?: Array<string>;
        includeFields?: Array<string>;
    }): Promise<void>;
    remove(options?: Transactionable & QueryInterfaceDropTableOptions): Promise<void>;
    migrate(options?: SyncOptions & Transactionable): Promise<void>;
}
export {};
