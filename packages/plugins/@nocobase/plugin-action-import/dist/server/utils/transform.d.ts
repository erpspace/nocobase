/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare function _({ value, field }: {
    value: any;
    field: any;
}): Promise<any>;
export declare function email({ value, field, ctx }: {
    value: any;
    field: any;
    ctx: any;
}): Promise<any>;
export declare function password({ value, field, ctx }: {
    value: any;
    field: any;
    ctx: any;
}): Promise<string>;
export declare function o2o({ value, column, field, ctx }: {
    value: any;
    column: any;
    field: any;
    ctx: any;
}): Promise<any>;
export declare const oho: typeof o2o;
export declare const obo: typeof o2o;
export declare function o2m({ value, column, field, ctx }: {
    value: any;
    column: any;
    field: any;
    ctx: any;
}): Promise<any[]>;
export declare function m2o({ value, column, field, ctx }: {
    value: any;
    column: any;
    field: any;
    ctx: any;
}): Promise<any>;
export declare function m2m({ value, column, field, ctx }: {
    value: any;
    column: any;
    field: any;
    ctx: any;
}): Promise<any[]>;
export declare function datetime({ value, field, ctx }: {
    value: any;
    field: any;
    ctx: any;
}): Promise<any>;
export declare function time({ value, field, ctx }: {
    value: any;
    field: any;
    ctx: any;
}): Promise<any>;
export declare function percent({ value, field, ctx }: {
    value: any;
    field: any;
    ctx: any;
}): Promise<number>;
export declare function checkbox({ value, column, field, ctx }: {
    value: any;
    column: any;
    field: any;
    ctx: any;
}): Promise<0 | 1>;
export declare const boolean: typeof checkbox;
export declare function select({ value, column, field, ctx }: {
    value: any;
    column: any;
    field: any;
    ctx: any;
}): Promise<any>;
export declare const radio: typeof select;
export declare const radioGroup: typeof select;
export declare function multipleSelect({ value, column, field, ctx }: {
    value: any;
    column: any;
    field: any;
    ctx: any;
}): Promise<any>;
export declare const checkboxes: typeof multipleSelect;
export declare const checkboxGroup: typeof multipleSelect;
export declare function chinaRegion({ value, column, field, ctx }: {
    value: any;
    column: any;
    field: any;
    ctx: any;
}): Promise<any>;
