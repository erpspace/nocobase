/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { DataType, ModelAttributeColumnOptions, ModelIndexesOptions, SyncOptions, Transactionable } from 'sequelize';
import { Collection } from '../collection';
import { Database } from '../database';
import { ModelEventTypes } from '../types';
export interface FieldContext {
    database: Database;
    collection: Collection;
}
export interface BaseFieldOptions {
    name?: string;
    hidden?: boolean;
    translation?: boolean;
    [key: string]: any;
}
export interface BaseColumnFieldOptions extends BaseFieldOptions, Omit<ModelAttributeColumnOptions, 'type'> {
    dataType?: DataType;
    index?: boolean | ModelIndexesOptions;
}
export declare abstract class Field {
    options: any;
    context: FieldContext;
    database: Database;
    collection: Collection;
    [key: string]: any;
    constructor(options?: any, context?: FieldContext);
    get name(): any;
    get type(): any;
    abstract get dataType(): any;
    isRelationField(): boolean;
    sync(syncOptions: SyncOptions): Promise<void>;
    init(): void;
    on(eventName: ModelEventTypes, listener: (...args: any[]) => void): this;
    off(eventName: string, listener: (...args: any[]) => void): this;
    get(name: string): any;
    remove(): void | Field;
    columnName(): any;
    existsInDb(options?: Transactionable): Promise<boolean>;
    merge(obj: any): void;
    bind(): void;
    unbind(): void;
    toSequelize(): any;
    additionalSequelizeOptions(): {};
    typeToString(): any;
}
