/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Context } from '@nocobase/actions';
/**
 * Template data middleware
 * Handles UI Schema related requests and fills template data
 *
 * @param ctx - Context object containing request and response information
 * @param next - Next middleware function
 */
export declare function templateDataMiddleware(ctx: Context, next: any): Promise<void>;
