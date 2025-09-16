/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ModelStatic } from 'sequelize';
import { Collection } from './collection';
import { Database } from './database';
import { Model } from './model';
type FilterType = any;
interface FilterParserContext {
    collection: Collection;
    app?: any;
}
export default class FilterParser {
    collection: Collection;
    database: Database;
    model: ModelStatic<Model>;
    filter: FilterType;
    context: FilterParserContext;
    constructor(filter: FilterType, context: FilterParserContext);
    prepareFilter(filter: FilterType): any;
    toSequelizeParams(): any;
    private getFieldNameFromQueryPath;
}
export {};
