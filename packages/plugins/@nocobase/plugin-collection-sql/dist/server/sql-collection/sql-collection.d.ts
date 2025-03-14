/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Collection, CollectionContext, CollectionOptions } from '@nocobase/database';
import { QueryInterfaceDropTableOptions } from 'sequelize';
export declare class SQLCollection extends Collection {
    constructor(options: CollectionOptions, context: CollectionContext);
    get filterTargetKey(): string | string[];
    isSql(): boolean;
    unavailableActions(): Array<string>;
    collectionSchema(): any;
    modelInit(): void;
    removeFromDb(options?: QueryInterfaceDropTableOptions & {
        dropCollection?: boolean;
    }): Promise<Collection<any, any>>;
}
