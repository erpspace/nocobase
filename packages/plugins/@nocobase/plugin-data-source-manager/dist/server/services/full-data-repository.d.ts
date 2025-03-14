/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { CountOptions, FindOptions } from '@nocobase/database';
export declare class FullDataRepository<T> {
    data: Array<T>;
    constructor(data: Array<T>);
    count(countOptions?: CountOptions): Promise<number>;
    find(options?: FindOptions): Promise<Array<T>>;
    findAndCount(options?: {}): Promise<[Array<T>, number]>;
}
