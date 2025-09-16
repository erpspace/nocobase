/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { DataTypes } from 'sequelize';
import { BaseColumnFieldOptions, Field } from './field';
export declare abstract class NumberField extends Field {
}
export declare class IntegerField extends NumberField {
    get dataType(): DataTypes.IntegerDataTypeConstructor;
}
export interface IntegerFieldOptions extends BaseColumnFieldOptions {
    type: 'integer';
}
export declare class BigIntField extends NumberField {
    get dataType(): DataTypes.BigIntDataTypeConstructor;
}
export interface BigIntFieldOptions extends BaseColumnFieldOptions {
    type: 'bigInt';
}
export declare class FloatField extends NumberField {
    get dataType(): DataTypes.FloatDataTypeConstructor;
}
export interface FloatFieldOptions extends BaseColumnFieldOptions {
    type: 'float';
}
export declare class DoubleField extends NumberField {
    get dataType(): DataTypes.DoubleDataTypeConstructor;
}
export interface DoubleFieldOptions extends BaseColumnFieldOptions {
    type: 'double';
}
export declare class RealField extends NumberField {
    get dataType(): DataTypes.RealDataTypeConstructor;
}
export interface RealFieldOptions extends BaseColumnFieldOptions {
    type: 'real';
}
export declare class DecimalField extends NumberField {
    get dataType(): DataTypes.DecimalDataType;
    static optionsFromRawType(rawType: string): {
        precision: number;
        scale: number;
    };
}
export interface DecimalFieldOptions extends BaseColumnFieldOptions {
    type: 'decimal';
    precision: number;
    scale: number;
}
