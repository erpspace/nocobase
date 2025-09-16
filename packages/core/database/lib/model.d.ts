/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Model as SequelizeModel } from 'sequelize';
import { Collection } from './collection';
import { Database } from './database';
interface IModel {
    [key: string]: any;
}
export declare class Model<TModelAttributes extends {} = any, TCreationAttributes extends {} = TModelAttributes> extends SequelizeModel<TModelAttributes, TCreationAttributes> implements IModel {
    static database: Database;
    static collection: Collection;
    [key: string]: any;
    protected _changedWithAssociations: Set<unknown>;
    protected _previousDataValuesWithAssociations: {};
    get db(): Database;
    static sync(options: any): Promise<any>;
    static callSetters(values: any, options: any): {};
    toChangedWithAssociations(): void;
    changedWithAssociations(key?: string, value?: any): boolean | unknown[] | this;
    clearChangedWithAssociations(): void;
    toJSON<T extends TModelAttributes>(): T;
    private hiddenObjKey;
    private handleBigInt;
    private sortAssociations;
    private sortArray;
}
export {};
