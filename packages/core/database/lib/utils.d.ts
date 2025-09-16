/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import Database from './database';
export declare function md5(value: string): string;
export declare function checkIdentifier(value: string): void;
export declare function getTableName(collectionName: string, options: any): any;
export declare function snakeCase(name: string): any;
export declare function patchSequelizeQueryInterface(db: Database): void;
export declare function percent2float(value: string): number;
export declare function isUndefinedOrNull(value: any): boolean;
export declare function isStringOrNumber(value: any): boolean;
export declare function getKeysByPrefix(keys: string[], prefix: string): string[];
export declare function processIncludes(includes: any[], model: any, parentAs?: string): any[];
