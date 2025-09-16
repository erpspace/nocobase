/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { BelongsToManyField, Collection, HasManyField } from '@nocobase/database';
export declare function appendCollectionIndexParams(apiDef: object): object;
declare const _default: (collection: Collection, relationField: HasManyField | BelongsToManyField) => {
    [x: string]: object;
};
export default _default;
