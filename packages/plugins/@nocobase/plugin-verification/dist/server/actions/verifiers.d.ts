/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Context, Next } from '@nocobase/actions';
declare const _default: {
    listTypes: (ctx: Context, next: Next) => Promise<void>;
    listByScene: (ctx: Context, next: Next) => Promise<any>;
    listByUser: (ctx: Context, next: Next) => Promise<void>;
    listForVerify: (ctx: Context, next: Next) => Promise<any>;
    bind: (ctx: Context, next: Next) => Promise<never>;
    unbind: (ctx: Context, next: Next) => Promise<never>;
};
export default _default;
