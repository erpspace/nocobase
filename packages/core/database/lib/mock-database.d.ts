/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Database, IDatabaseOptions } from '@nocobase/database';
export declare class MockDatabase extends Database {
    constructor(options: IDatabaseOptions);
}
export declare function getConfigByEnv(): {
    username: string;
    password: string;
    database: string;
    host: string;
    port: string;
    dialect: string;
    logging: boolean | typeof customLogger;
    storage: string;
    define: {
        charset: string;
        collate: string;
    };
    timezone: string;
    underscored: boolean;
    schema: string;
    dialectOptions: {};
};
declare function customLogger(queryString: any, queryObject: any): void;
export declare function createMockDatabase(options?: IDatabaseOptions): Promise<MockDatabase>;
export declare function mockDatabase(options?: IDatabaseOptions): MockDatabase;
export {};
