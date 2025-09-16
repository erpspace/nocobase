/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Collection } from '../collection';
import QueryInterface, { TableInfo } from './query-interface';
import { Transaction } from 'sequelize';
export default class PostgresQueryInterface extends QueryInterface {
    constructor(db: any);
    setAutoIncrementVal(options: {
        tableInfo: TableInfo;
        columnName: string;
        seqName?: string;
        currentVal?: number;
        transaction?: Transaction;
    }): Promise<void>;
    getAutoIncrementInfo(options: {
        tableInfo: TableInfo;
        fieldName: string;
        transaction: Transaction;
    }): Promise<{
        seqName?: string;
        currentVal: number;
    }>;
    collectionTableExists(collection: Collection, options?: any): Promise<any>;
    listViews(options?: {
        schema?: string;
    }): Promise<[unknown[], unknown]>;
    viewDef(viewName: string): Promise<string>;
    parseSQL(sql: string): any;
    viewColumnUsage(options: any): Promise<{
        [view_column_name: string]: {
            column_name: string;
            table_name: string;
            table_schema?: string;
        };
    }>;
    showTableDefinition(tableInfo: TableInfo): Promise<any>;
    generateJoinOnForJSONArray(left: string, right: string): import("sequelize/types/utils").Literal;
}
