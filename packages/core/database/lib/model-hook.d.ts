/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { SequelizeHooks } from 'sequelize/types/hooks';
import Database from './database';
export declare class ModelHook {
    database: Database;
    boundEvents: Set<string>;
    constructor(database: Database);
    match(event: string | symbol): keyof SequelizeHooks | null;
    findModelName(hookArgs: any): any;
    bindEvent(type: any): void;
    hasBoundEvent(type: any): boolean;
    buildSequelizeHook(type: any): (...args: any[]) => Promise<void>;
}
