/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Sequelize } from 'sequelize';
export type Col = ReturnType<typeof Sequelize.col>;
export type Literal = ReturnType<typeof Sequelize.literal>;
export type Fn = ReturnType<typeof Sequelize.fn>;
export declare abstract class Formatter {
    sequelize: Sequelize;
    constructor(sequelize: Sequelize);
    abstract formatDate(field: Col, format: string, timezone?: string): Fn | Col;
    abstract formatUnixTimeStamp(field: string, format: string, accuracy?: 'second' | 'millisecond', timezone?: string): Fn | Literal;
    getTimezoneByOffset(offset: string): string;
    convertFormat(format: string): string;
    format(options: {
        type: string;
        field: string;
        format: string;
        options?: any;
        timezone?: string;
    }): import("sequelize/types/utils").Col | import("sequelize/types/utils").Literal | import("sequelize/types/utils").Fn;
}
