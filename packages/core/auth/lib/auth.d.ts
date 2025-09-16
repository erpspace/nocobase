/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Context } from '@nocobase/actions';
import { Model } from '@nocobase/database';
import { Authenticator } from './auth-manager';
export type AuthConfig = {
    authenticator: Authenticator;
    options: {
        [key: string]: any;
    };
    ctx: Context;
};
export declare const AuthErrorCode: {
    EMPTY_TOKEN: "EMPTY_TOKEN";
    EXPIRED_TOKEN: "EXPIRED_TOKEN";
    INVALID_TOKEN: "INVALID_TOKEN";
    TOKEN_RENEW_FAILED: "TOKEN_RENEW_FAILED";
    BLOCKED_TOKEN: "BLOCKED_TOKEN";
    EXPIRED_SESSION: "EXPIRED_SESSION";
    NOT_EXIST_USER: "NOT_EXIST_USER";
    SKIP_TOKEN_RENEW: "SKIP_TOKEN_RENEW";
};
export type AuthErrorType = keyof typeof AuthErrorCode;
export declare class AuthError extends Error {
    code: AuthErrorType;
    constructor(options: {
        code: AuthErrorType;
        message: string;
    });
}
export type AuthExtend<T extends Auth> = new (config: AuthConfig) => T;
interface IAuth {
    user: Model;
    check(): Promise<Model>;
    signIn(): Promise<any>;
    signUp(): Promise<any>;
    signOut(): Promise<any>;
}
export declare abstract class Auth implements IAuth {
    /**
     * options keys that are not allowed to use environment variables
     */
    static optionsKeysNotAllowedInEnv: string[];
    abstract user: Model;
    protected authenticator: Authenticator;
    protected options: {
        [key: string]: any;
    };
    protected ctx: Context;
    constructor(config: AuthConfig);
    skipCheck(): Promise<any>;
    abstract check(): Promise<Model>;
    abstract checkToken(): Promise<{
        tokenStatus: 'valid' | 'expired' | 'invalid';
        user: Awaited<ReturnType<Auth['check']>>;
        jti?: string;
        temp: any;
        roleName?: any;
        signInTime?: number;
    }>;
    signIn(): Promise<any>;
    signUp(): Promise<any>;
    signOut(): Promise<any>;
}
export {};
