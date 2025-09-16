/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Cache } from '@nocobase/cache';
import { Database } from '@nocobase/database';
import { Action } from '@nocobase/resourcer';
import Koa from 'koa';
import * as actions from './actions';
export * as utils from './utils';
export * from './constants';
export type Next = () => Promise<any>;
export interface Context extends Koa.Context {
    db: Database;
    cache: Cache;
    action: Action;
    body: any;
    app: any;
    [key: string]: any;
}
/**
 * @internal
 */
export declare function registerActions(api: any): void;
export default actions;
