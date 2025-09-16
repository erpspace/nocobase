/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { BaseColumnFieldOptions, Field } from './field';
import { DataTypes } from 'sequelize';
declare class DatetimeNoTzTypeMySQL extends DataTypes.ABSTRACT {
    key: string;
}
export declare class DatetimeNoTzField extends Field {
    get dataType(): typeof DatetimeNoTzTypeMySQL;
    beforeSave: (instances: any, options: any) => Promise<void>;
    additionalSequelizeOptions(): {};
    bind(): void;
    unbind(): void;
}
export interface DatetimeNoTzFieldOptions extends BaseColumnFieldOptions {
    type: 'datetimeNoTz';
}
export {};
