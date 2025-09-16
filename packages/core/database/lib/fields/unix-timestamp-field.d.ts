/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { DataTypes } from 'sequelize';
import { DateField } from './date-field';
import { BaseColumnFieldOptions } from './field';
export declare class UnixTimestampField extends DateField {
    get dataType(): DataTypes.BigIntDataTypeConstructor;
    dateToValue(val: any): any;
    additionalSequelizeOptions(): {
        get(): any;
        set(value: any): void;
    };
}
export interface UnixTimestampFieldOptions extends BaseColumnFieldOptions {
    type: 'unixTimestamp';
}
