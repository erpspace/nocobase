/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { AxiosInstance, AxiosRequestConfig, AxiosResponse, RawAxiosRequestHeaders } from 'axios';
export interface ActionParams {
    filterByTk?: any;
    [key: string]: any;
}
type ResourceActionOptions<P = any> = {
    resource?: string;
    resourceOf?: any;
    action?: string;
    params?: P;
};
type ResourceAction = (params?: ActionParams, opts?: any) => Promise<any>;
export type IResource = {
    [key: string]: ResourceAction;
};
export declare class Auth {
    protected api: APIClient;
    get storagePrefix(): string;
    get KEYS(): {
        locale: string;
        role: string;
        token: string;
        authenticator: string;
        theme: string;
    };
    protected options: {
        locale: any;
        role: any;
        authenticator: any;
        token: any;
    };
    constructor(api: APIClient);
    get locale(): string;
    set locale(value: string);
    get role(): string;
    set role(value: string);
    get token(): string;
    set token(value: string);
    get authenticator(): string;
    set authenticator(value: string);
    /**
     * @internal
     */
    getOption(key: string): string;
    /**
     * @internal
     */
    setOption(key: string, value?: string): void;
    /**
     * @internal
     * use {@link Auth#locale} instead
     */
    getLocale(): string;
    /**
     * @internal
     * use {@link Auth#locale} instead
     */
    setLocale(locale: string): void;
    /**
     * @internal
     * use {@link Auth#role} instead
     */
    getRole(): string;
    /**
     * @internal
     * use {@link Auth#role} instead
     */
    setRole(role: string): void;
    /**
     * @internal
     * use {@link Auth#token} instead
     */
    getToken(): string;
    /**
     * @internal
     * use {@link Auth#token} instead
     */
    setToken(token: string): void;
    /**
     * @internal
     * use {@link Auth#authenticator} instead
     */
    getAuthenticator(): string;
    /**
     * @internal
     * use {@link Auth#authenticator} instead
     */
    setAuthenticator(authenticator: string): void;
    middleware(config: AxiosRequestConfig): AxiosRequestConfig<any>;
    signIn(values: any, authenticator?: string): Promise<AxiosResponse<any>>;
    signUp(values: any, authenticator?: string): Promise<AxiosResponse<any>>;
    signOut(): Promise<AxiosResponse<any, any>>;
    lostPassword(values: any): Promise<AxiosResponse<any>>;
    resetPassword(values: any): Promise<AxiosResponse<any>>;
    checkResetToken(values: any): Promise<AxiosResponse<any>>;
}
export declare abstract class Storage {
    abstract clear(): void;
    abstract getItem(key: string): string | null;
    abstract removeItem(key: string): void;
    abstract setItem(key: string, value: string): void;
}
export declare class MemoryStorage extends Storage {
    items: Map<any, any>;
    clear(): void;
    getItem(key: string): any;
    setItem(key: string, value: string): Map<any, any>;
    removeItem(key: string): boolean;
}
interface ExtendedOptions {
    authClass?: any;
    storageType?: 'localStorage' | 'sessionStorage' | 'memory';
    storageClass?: any;
    storagePrefix?: string;
}
export type APIClientOptions = AxiosInstance | (AxiosRequestConfig & ExtendedOptions);
export declare class APIClient {
    options?: APIClientOptions;
    axios: AxiosInstance;
    auth: Auth;
    storage: Storage;
    storagePrefix: string;
    getHeaders(): {};
    constructor(options?: APIClientOptions);
    private initStorage;
    interceptors(): void;
    request<T = any, R = AxiosResponse<T>, D = any>(config: (AxiosRequestConfig<D> | ResourceActionOptions) & {
        skipNotify?: boolean | ((error: any) => boolean);
        skipAuth?: boolean;
    }): Promise<R>;
    resource(name: string, of?: any, headers?: RawAxiosRequestHeaders, cancel?: boolean): IResource;
}
export {};
