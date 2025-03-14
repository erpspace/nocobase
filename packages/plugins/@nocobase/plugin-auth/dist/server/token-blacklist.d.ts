/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ITokenBlacklistService } from '@nocobase/auth';
import { Repository } from '@nocobase/database';
import { CronJob } from 'cron';
import AuthPlugin from './plugin';
import { BloomFilter } from '@nocobase/cache';
export declare class TokenBlacklistService implements ITokenBlacklistService {
    protected plugin: AuthPlugin;
    repo: Repository;
    cronJob: CronJob;
    bloomFilter: BloomFilter;
    cacheKey: string;
    constructor(plugin: AuthPlugin);
    get app(): import("@nocobase/server").default<import("@nocobase/server").DefaultState, import("@nocobase/server").DefaultContext>;
    has(token: string): Promise<boolean>;
    add(values: any): Promise<[import("@nocobase/database").Model<any, any>, boolean]>;
    deleteExpiredTokens(): Promise<any>;
}
