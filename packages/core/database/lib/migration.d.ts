/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { QueryInterface, Sequelize } from 'sequelize';
import Database from './database';
export interface MigrationContext {
    db: Database;
    queryInterface: QueryInterface;
    sequelize: Sequelize;
}
export declare class Migration {
    name: string;
    context: {
        db: Database;
        [key: string]: any;
    };
    constructor(context: MigrationContext);
    get db(): Database;
    get sequelize(): Sequelize;
    get queryInterface(): QueryInterface;
    up(): Promise<void>;
    down(): Promise<void>;
}
export interface MigrationItem {
    name: string;
    migration?: typeof Migration | string;
    context?: any;
    up?: any;
    down?: any;
}
export declare class Migrations {
    items: any[];
    context: any;
    constructor(context: any);
    clear(): void;
    add(item: MigrationItem): void;
    callback(): (ctx: any) => Promise<any[]>;
}
