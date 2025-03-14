/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Context, Next } from '@nocobase/actions';
export declare const postProcess: (ctx: Context, next: Next) => Promise<void>;
export declare const queryData: (ctx: Context, next: Next) => Promise<void>;
export declare const parseFieldAndAssociations: (ctx: Context, next: Next) => Promise<void>;
export declare const parseVariables: (ctx: Context, next: Next) => Promise<void>;
export declare const cacheMiddleware: (ctx: Context, next: Next) => Promise<void>;
export declare const checkPermission: (ctx: Context, next: Next) => Promise<any>;
export declare const query: (ctx: Context, next: Next) => Promise<void>;
