/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { AuthManager, Storer as IStorer } from '@nocobase/auth';
import { Cache } from '@nocobase/cache';
import { Database } from '@nocobase/database';
import { Application } from '@nocobase/server';
import { AuthModel } from './model/authenticator';
export declare class Storer implements IStorer {
    db: Database;
    cache: Cache;
    app: Application;
    authManager: AuthManager;
    key: string;
    constructor({ app, db, cache, authManager, }: {
        app?: Application;
        db: Database;
        cache: Cache;
        authManager: AuthManager;
    });
    renderJsonTemplate(authenticator: any): any;
    getCache(): Promise<AuthModel[]>;
    setCache(authenticators: AuthModel[]): Promise<void>;
    get(name: string): Promise<AuthModel>;
}
