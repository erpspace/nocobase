/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
declare const getDialect: (ctx: any) => any;
declare const isPg: (ctx: any) => boolean;
declare const isMySQL: (ctx: any) => boolean;
export { getDialect, isPg, isMySQL };
