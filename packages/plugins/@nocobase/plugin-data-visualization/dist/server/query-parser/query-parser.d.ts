/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Context, Next } from '@nocobase/actions';
import { DimensionProps, MeasureProps, OrderProps } from '../types';
import { Formatter } from '../formatter/formatter';
import { Database } from '@nocobase/database';
export declare class QueryParser {
    db: Database;
    formatter: Formatter;
    constructor(db: Database);
    parseMeasures(ctx: Context, measures: MeasureProps[]): {
        attributes: any[];
        fieldMap: {};
        hasAgg: boolean;
    };
    parseDimensions(ctx: Context, dimensions: (DimensionProps & {
        field: string;
    })[], hasAgg: boolean, timezone: string): {
        attributes: any[];
        group: any[];
        fieldMap: {};
    };
    parseOrders(ctx: Context, orders: OrderProps[], hasAgg: boolean): any[];
    parse(): (ctx: Context, next: Next) => Promise<void>;
}
