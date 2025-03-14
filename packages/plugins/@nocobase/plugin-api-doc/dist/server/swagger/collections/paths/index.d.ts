/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Collection } from '@nocobase/database';
declare const _default: (collection: Collection, options: any) => any;
export default _default;
export declare function hasSortField(collection: Collection): boolean;
export declare function readOnlyCollection(collection: Collection): boolean;
export declare function isViewCollection(collection: Collection): boolean;
