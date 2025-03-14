/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ITokenControlService, TokenPolicyConfig, NumericTokenPolicyConfig, TokenInfo } from '@nocobase/auth';
import type { SystemLogger } from '@nocobase/logger';
import { Cache } from '@nocobase/cache';
import Application from '@nocobase/server';
import Database from '@nocobase/database';
type TokenControlService = ITokenControlService;
export declare class TokenController implements TokenControlService {
    cache: Cache;
    app: Application;
    db: Database;
    logger: SystemLogger;
    constructor({ cache, app, logger }: {
        cache: Cache;
        app: Application;
        logger: SystemLogger;
    });
    setTokenInfo(id: string, value: TokenInfo): Promise<void>;
    getConfig(): Promise<NumericTokenPolicyConfig>;
    setConfig(config: TokenPolicyConfig): Promise<void>;
    removeSessionExpiredTokens(userId: number): Promise<any>;
    add({ userId }: {
        userId: number;
    }): Promise<{
        jti: `${string}-${string}-${string}-${string}-${string}`;
        issuedTime: number;
        signInTime: number;
        renewed: boolean;
        userId: number;
    }>;
    renew: TokenControlService['renew'];
}
export {};
