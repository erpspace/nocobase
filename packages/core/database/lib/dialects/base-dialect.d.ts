/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Database, DatabaseOptions } from '../database';
export interface DialectVersionGuard {
    sql: string;
    get: (v: string) => string;
    version: string;
}
export declare abstract class BaseDialect {
    static dialectName: string;
    getSequelizeOptions(options: DatabaseOptions): import("../database").IDatabaseOptions;
    checkDatabaseVersion(db: Database): Promise<boolean>;
    getVersionGuard(): DialectVersionGuard;
}
