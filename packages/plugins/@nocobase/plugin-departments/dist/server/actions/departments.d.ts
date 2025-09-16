/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This program is offered under a commercial license.
 * For more information, see <https://www.nocobase.com/agreement>
 */
import { Context, Next } from '@nocobase/actions';
export declare const getAppendsOwners: (ctx: Context, next: Next) => Promise<void>;
export declare const aggregateSearch: (ctx: Context, next: Next) => Promise<void>;
export declare const setOwner: (ctx: Context, next: Next) => Promise<void>;
export declare const removeOwner: (ctx: Context, next: Next) => Promise<void>;
