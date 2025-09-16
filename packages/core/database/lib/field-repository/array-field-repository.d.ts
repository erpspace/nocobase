/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Transactionable } from 'sequelize/types';
import { Collection } from '../collection';
export declare class ArrayFieldRepository {
    protected collection: Collection;
    protected fieldName: string;
    protected targetValue: string | number;
    constructor(collection: Collection, fieldName: string, targetValue: string | number);
    get(options?: Transactionable): Promise<any>;
    find(options?: Transactionable): Promise<any>;
    set(options: Transactionable & {
        values: Array<string | number> | string | number;
        hooks?: boolean;
    }): Promise<void>;
    protected emitAfterSave(instance: any, options: any): Promise<void>;
    toggle(options: Transactionable & {
        value: string | number;
        hooks?: boolean;
    }): Promise<void>;
    add(options: Transactionable & {
        values: Array<string | number> | string | number;
        hooks?: boolean;
    }): Promise<void>;
    remove(options: Transactionable & {
        values: Array<string | number> | string | number;
        hooks?: boolean;
    }): Promise<void>;
    protected getInstance(options: Transactionable): Promise<any>;
}
