/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Database, IDatabaseOptions } from './database';
export declare function parseDatabaseOptionsFromEnv(): Promise<IDatabaseOptions>;
export declare function checkDatabaseVersion(db: Database): Promise<void>;
export declare function registerDialects(): void;
