/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Model } from '@nocobase/database';
export declare class SQLModel extends Model {
    static sql: string;
    static get queryInterface(): import("sequelize").QueryInterface;
    static sync(): Promise<any>;
    private static getTableNameWithSchema;
    private static parseSelectAST;
    private static parseTablesAndColumns;
    static inferFields(): {
        [field: string]: {
            type: string;
            source: string;
            collection: string;
            interface: string;
        };
    };
}
