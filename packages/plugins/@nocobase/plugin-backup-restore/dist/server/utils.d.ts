/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Database } from '@nocobase/database';
export declare const DUMPED_EXTENSION = "nbdump";
export declare function sqlAdapter(database: Database, sql: string): string;
export declare function readLines(filePath: string): Promise<any[]>;
export declare function humanFileSize(bytes: any, si?: boolean, dp?: number): string;
