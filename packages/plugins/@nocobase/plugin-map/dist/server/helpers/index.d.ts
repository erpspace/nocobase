/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const joinComma: (value: any[]) => string;
export declare const toValue: (value?: string) => any;
export declare const getDialect: (ctx: any) => any;
export declare const isPg: (ctx: any) => boolean;
export declare const isSqlite: (ctx: any) => boolean;
export declare const isMysql: (ctx: any) => boolean;
