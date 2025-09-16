/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Context, Next } from '@nocobase/actions';
import { Registry } from '@nocobase/utils';
import { Auth, AuthExtend } from './auth';
import { JwtOptions, JwtService } from './base/jwt-service';
import { ITokenBlacklistService } from './base/token-blacklist-service';
import { ITokenControlService } from './base/token-control-service';
export interface Authenticator {
    authType: string;
    options: Record<string, any>;
    [key: string]: any;
}
export interface Storer {
    get: (name: string) => Promise<Authenticator>;
}
export type AuthManagerOptions = {
    authKey: string;
    default?: string;
    jwt?: JwtOptions;
};
type AuthConfig = {
    auth: AuthExtend<Auth>;
    title?: string;
    getPublicOptions?: (options: Record<string, any>) => Record<string, any>;
};
export declare class AuthManager {
    /**
     * @internal
     */
    jwt: JwtService;
    tokenController: ITokenControlService;
    protected options: AuthManagerOptions;
    protected authTypes: Registry<AuthConfig>;
    protected storer: Storer;
    constructor(options: AuthManagerOptions);
    setStorer(storer: Storer): void;
    setTokenBlacklistService(service: ITokenBlacklistService): void;
    setTokenControlService(service: ITokenControlService): void;
    /**
     * registerTypes
     * @description Add a new authenticate type and the corresponding authenticator.
     * The types will show in the authenticators list of the admin panel.
     *
     * @param authType - The type of the authenticator. It is required to be unique.
     * @param authConfig - Configurations of the kind of authenticator.
     */
    registerTypes(authType: string, authConfig: AuthConfig): void;
    listTypes(): {
        name: string;
        title: string;
    }[];
    getAuthConfig(authType: string): AuthConfig;
    /**
     * get
     * @description Get authenticator instance by name.
     * @param name - The name of the authenticator.
     * @return authenticator instance.
     */
    get(name: string, ctx: Context): Promise<Auth>;
    /**
     * middleware
     * @description Auth middleware, used to check the user status.
     */
    middleware(): (ctx: Context & {
        auth: Auth;
    }, next: Next) => Promise<any>;
}
export {};
