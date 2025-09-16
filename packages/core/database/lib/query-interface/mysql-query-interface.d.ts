/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Transaction, Transactionable } from 'sequelize';
import { Collection } from '../collection';
import QueryInterface, { TableInfo } from './query-interface';
export default class MysqlQueryInterface extends QueryInterface {
    constructor(db: any);
    collectionTableExists(collection: Collection, options?: Transactionable): Promise<boolean>;
    listViews(): Promise<[unknown[], unknown]>;
    viewColumnUsage(options: {
        viewName: string;
        schema?: string;
    }): Promise<{
        [view_column_name: string]: {
            column_name: string;
            table_name: string;
            table_schema?: string;
        };
    }>;
    parseSQL(sql: string): any;
    viewDef(viewName: string): Promise<string>;
    showTableDefinition(tableInfo: TableInfo): Promise<any>;
    getAutoIncrementInfo(options: {
        tableInfo: TableInfo;
        fieldName: string;
        transaction: Transaction;
    }): Promise<{
        seqName?: string;
        currentVal: number;
    }>;
    setAutoIncrementVal(options: {
        tableInfo: TableInfo;
        columnName: string;
        seqName?: string;
        currentVal: number;
        transaction?: Transaction;
    }): Promise<void>;
    generateJoinOnForJSONArray(left: string, right: string): import("sequelize/types/utils").Literal;
}
