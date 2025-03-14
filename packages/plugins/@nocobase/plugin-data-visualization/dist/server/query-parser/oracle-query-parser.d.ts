/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { QueryParser } from './query-parser';
import { OrderProps } from '../types';
import { Context } from '@nocobase/actions';
import { OracleFormatter } from '../formatter/oracle-formatter';
import { Database } from '@nocobase/database';
export declare class OracleQueryParser extends QueryParser {
    formatter: OracleFormatter;
    constructor(db: Database);
    parseOrders(ctx: Context, orders: OrderProps[], hasAgg: boolean): any[];
}
