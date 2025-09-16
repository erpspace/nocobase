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
import FilterParser from './filter-parser';
import { Appends, Except, FindOptions } from './repository';
interface OptionsParserContext {
    collection: Collection;
    targetKey?: string;
}
export declare class OptionsParser {
    options: FindOptions;
    database: Database;
    collection: Collection;
    model: ModelStatic<any>;
    filterParser: FilterParser;
    context: OptionsParserContext;
    constructor(options: FindOptions, context: OptionsParserContext);
    static appendInheritInspectAttribute(include: any, collection: any): any;
    isAssociation(key: string): boolean;
    isAssociationPath(path: string): boolean;
    filterByTkToWhereOption(): {};
    toSequelizeParams(options?: {
        parseSort?: boolean;
    }): any;
    /**
     * parser sort options
     * @param filterParams
     * @protected
     */
    protected parseSort(filterParams: any): any;
    protected parseFields(filterParams: any): any;
    protected parseExcept(except: Except, filterParams: any): any;
    protected parseAppendWithOptions(append: string): {
        name: string;
        options?: object;
        raw?: string;
    };
    protected parseAppends(appends: Appends, filterParams: any): any;
}
export {};
