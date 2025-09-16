/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare class BaseValueParser {
    ctx: any;
    field: any;
    value: any;
    errors: string[];
    constructor(field: any, ctx: any);
    trim(value: any): any;
    toArr(value: any, splitter?: string): any[];
    toString(): any;
    getValue(): any;
    setValue(value: any): Promise<void>;
}
