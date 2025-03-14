/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Context, Next } from '@nocobase/actions';
export declare function updateProfile(ctx: Context, next: Next): Promise<void>;
export declare function updateLang(ctx: Context, next: Next): Promise<void>;
export declare const listExcludeRole: (ctx: Context, next: Next) => Promise<void>;
export declare const getSystemSettings: (ctx: Context, next: Next) => Promise<void>;
export declare const updateSystemSettings: (ctx: Context, next: Next) => Promise<void>;
