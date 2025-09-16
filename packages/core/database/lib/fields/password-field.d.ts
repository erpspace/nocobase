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
export interface PasswordFieldOptions extends BaseColumnFieldOptions {
    type: 'password';
    /**
     * @default 64
     */
    length?: number;
    /**
     * @default 8
     */
    randomBytesSize?: number;
}
export declare class PasswordField extends Field {
    get dataType(): DataTypes.StringDataTypeConstructor;
    verify(password: string, hash: string): Promise<unknown>;
    hash(password: string): Promise<unknown>;
    init(): void;
    bind(): void;
    unbind(): void;
}
