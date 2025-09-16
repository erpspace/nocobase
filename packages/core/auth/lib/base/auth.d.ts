/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Collection, Model } from '@nocobase/database';
import { Auth, AuthConfig } from '../auth';
import { JwtService } from './jwt-service';
import { ITokenControlService } from './token-control-service';
/**
 * BaseAuth
 * @description A base class with jwt provide some common methods.
 */
export declare class BaseAuth extends Auth {
    protected userCollection: Collection;
    constructor(config: AuthConfig & {
        userCollection: Collection;
    });
    get userRepository(): import("@nocobase/database").Repository<any, any>;
    /**
     * @internal
     */
    get jwt(): JwtService;
    get tokenController(): ITokenControlService;
    set user(user: Model);
    get user(): Model;
    /**
     * @internal
     */
    getCacheKey(userId: number): string;
    /**
     * @internal
     */
    validateUsername(username: string): boolean;
    checkToken(): Promise<{
        tokenStatus: 'valid' | 'expired' | 'invalid';
        user: Awaited<ReturnType<Auth['check']>>;
        jti?: string;
        temp: any;
        roleName?: any;
        signInTime?: number;
    }>;
    check(): ReturnType<Auth['check']>;
    validate(): Promise<Model>;
    signNewToken(userId: number): Promise<string>;
    signIn(): Promise<{
        user: Model<any, any>;
        token: string;
    }>;
    signOut(): Promise<any>;
}
