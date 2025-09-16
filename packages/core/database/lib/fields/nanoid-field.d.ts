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
export declare class NanoidField extends Field {
    get dataType(): DataTypes.StringDataTypeConstructor;
    init(): void;
    bind(): void;
    unbind(): void;
}
export interface NanoidFieldOptions extends BaseColumnFieldOptions {
    type: 'nanoid';
    size?: number;
    customAlphabet?: string;
    autoFill?: boolean;
}
