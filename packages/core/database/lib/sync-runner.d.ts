/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Model as SequelizeModel } from 'sequelize';
import { Model } from './model';
export declare class SyncRunner {
    private model;
    private readonly collection;
    private readonly database;
    private tableDescMap;
    private uniqueAttributes;
    constructor(model: typeof Model);
    get tableName(): string | {
        tableName: string;
        schema: string;
        delimiter: string;
    };
    get sequelize(): import("sequelize").Sequelize;
    get queryInterface(): import("sequelize").QueryInterface;
    get rawAttributes(): {
        [attribute: string]: import("sequelize").ModelAttributeColumnOptions<SequelizeModel<any, any>>;
    };
    runSync(options: any): Promise<any>;
    handleUniqueFieldBeforeSync(beforeColumns: any, options: any): Promise<void>;
    handlePrimaryKeyBeforeSync(columns: any, options: any): Promise<void>;
    handlePrimaryKey(columns: any, options: any): Promise<void>;
    handleDefaultValues(columns: any, options: any): Promise<void>;
    handleUniqueIndex(options: any): Promise<void>;
    getColumns(options: any): Promise<import("sequelize").ColumnsDescription>;
    isParentColumn(columnName: string, options: any): Promise<boolean>;
    removeUnusedColumns(columns: any, options: any): Promise<void>;
    findAttributeByColumnName(columnName: string): any;
    performSync(options: any): Promise<any>;
    handleZeroColumnModel(options: any): Promise<void>;
    handleSchema(options: any): Promise<void>;
}
