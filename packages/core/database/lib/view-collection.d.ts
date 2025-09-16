/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Collection, CollectionContext, CollectionOptions } from './collection';
export declare class ViewCollection extends Collection {
    constructor(options: CollectionOptions, context: CollectionContext);
    isView(): boolean;
    unavailableActions(): Array<string>;
    protected sequelizeModelOptions(): any;
}
