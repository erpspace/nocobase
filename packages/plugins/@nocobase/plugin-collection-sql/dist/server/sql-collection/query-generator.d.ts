/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { GroupOption, Order, ProjectionAlias, WhereOptions } from 'sequelize';
import { SQLModel } from './sql-model';
export declare function selectQuery(tableName: string, options: {
    attributes?: (string | ProjectionAlias)[];
    where?: WhereOptions;
    order?: Order;
    group?: GroupOption;
    limit?: number;
    offset?: number;
}, model: SQLModel): string;
