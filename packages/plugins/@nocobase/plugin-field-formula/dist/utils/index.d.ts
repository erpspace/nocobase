/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const DataTypeTransformers: {
    boolean: BooleanConstructor;
    integer: {
        boolean(value: boolean): number;
        number(value: number): number;
        bigint(value: bigint): number;
        string(value: string): number;
        date(value: Date): number;
    };
    bigInt: {
        boolean(value: boolean): number;
        number(value: number): number;
        bigint(value: bigint): number;
        string(value: string): number;
        date(value: Date): number;
    };
    double: {
        boolean(value: boolean): number;
        number(value: number): number;
        bigint(value: bigint): number;
        string(value: string): number;
        date(value: Date): number;
    };
    decimal: {
        boolean(value: boolean): number;
        number(value: number): number;
        bigint(value: bigint): bigint;
        date(value: Date): number;
    };
    string: {
        boolean(value: boolean): string;
        number(value: number): string;
        bigint(value: bigint): string;
        string(value: string): string;
        date(value: Date): string;
    };
    date: {
        boolean(value: boolean): any;
        number(value: number): Date;
        bigint(value: bigint): Date;
        string(value: string): Date;
        date(value: Date): Date;
    };
};
export declare function toDbType(value: any, type: string): any;
