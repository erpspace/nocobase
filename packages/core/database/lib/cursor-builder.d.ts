/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Sequelize } from 'sequelize';
import { FindOptions } from './repository';
import { Model } from './model';
import { Collection } from './collection';
export declare class SmartCursorBuilder {
    private sequelize;
    private tableName;
    private collection;
    constructor(sequelize: Sequelize, tableName: string, collection: Collection);
    /**
     * 根据表结构自动选择最优游标策略
     */
    private getBestCursorStrategy;
    /**
     * Cursor-based pagination query function.
     * Ideal for large datasets (e.g., millions of rows)
     * Note:
     *  1. does not support jumping to arbitrary pages (e.g., "Page 5")
     *  2. Requires a stable, indexed sort field (e.g. ID, createdAt)
     *  3. If custom orderBy is used, it must match the cursor field(s) and direction, otherwise results may be incorrect or unstable.
     * @param options
     */
    chunk(options: FindOptions & {
        chunkSize: number;
        callback: (rows: Model[], options: FindOptions) => Promise<void>;
        find: (options: FindOptions) => Promise<any[]>;
        beforeFind?: (options: FindOptions) => Promise<void>;
        afterFind?: (rows: Model[], options: FindOptions) => Promise<void>;
    }): Promise<void>;
}
