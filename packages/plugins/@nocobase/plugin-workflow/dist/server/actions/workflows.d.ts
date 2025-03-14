/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Context } from '@nocobase/actions';
export declare function update(context: Context, next: any): Promise<void>;
export declare function destroy(context: Context, next: any): Promise<void>;
export declare function revision(context: Context, next: any): Promise<void>;
export declare function sync(context: Context, next: any): Promise<void>;
/**
 * @deprecated
 * Keep for action trigger compatibility
 */
export declare function execute(context: Context, next: any): Promise<any>;
