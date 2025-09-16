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
export interface RadioFieldOptions extends BaseColumnFieldOptions {
    type: 'radio';
}
/**
 * 暂时只支持全局，不支持批量
 */
export declare class RadioField extends Field {
    get dataType(): DataTypes.AbstractDataTypeConstructor;
    listener: (model: any, { transaction }: {
        transaction: any;
    }) => Promise<void>;
    bind(): void;
    unbind(): void;
}
