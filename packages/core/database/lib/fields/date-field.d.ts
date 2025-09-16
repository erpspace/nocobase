/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { BaseColumnFieldOptions, Field } from './field';
export declare class DateField extends Field {
    get dataType(): any;
    get timezone(): string;
    getProps(): any;
    isDateOnly(): boolean;
    isGMT(): any;
    init(): void;
    setter(value: any, options: any): any;
    additionalSequelizeOptions(): {
        get(): any;
    };
    bind(): void;
    unbind(): void;
}
export interface DateFieldOptions extends BaseColumnFieldOptions {
    type: 'date';
}
