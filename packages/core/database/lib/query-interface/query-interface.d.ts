/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { QueryInterface as SequelizeQueryInterface, Transaction, Transactionable } from 'sequelize';
import { Collection } from '../collection';
import Database from '../database';
export type TableInfo = {
    tableName: string;
    schema?: string;
};
export default abstract class QueryInterface {
    db: Database;
    sequelizeQueryInterface: SequelizeQueryInterface;
    protected constructor(db: Database);
    abstract collectionTableExists(collection: Collection, options?: Transactionable): Promise<boolean>;
    abstract listViews(options?: {
        schema?: string;
    }): any;
    abstract viewDef(viewName: string): Promise<string>;
    abstract viewColumnUsage(options: {
        viewName: string;
        schema?: string;
    }): Promise<{
        [view_column_name: string]: {
            column_name: string;
            table_name: string;
            table_schema?: string;
        };
    }>;
    abstract parseSQL(sql: string): any;
    abstract showTableDefinition(tableInfo: TableInfo): Promise<any>;
    dropAll(options: any): Promise<void>;
    abstract getAutoIncrementInfo(options: {
        tableInfo: TableInfo;
        fieldName: string;
        transaction?: Transaction;
    }): Promise<{
        seqName?: string;
        currentVal: number;
    }>;
    abstract setAutoIncrementVal(options: {
        tableInfo: TableInfo;
        columnName: string;
        seqName?: string;
        currentVal: number;
        transaction?: Transaction;
    }): Promise<void>;
    quoteIdentifier(identifier: string): any;
    generateJoinOnForJSONArray(left: string, right: string): void;
}
