/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Plugin } from '@nocobase/client';
import { ComponentType } from 'react';
import type { Authenticator as AuthenticatorType } from './authenticator';
declare const AuthenticatorsContextProvider: import("react").FC<{
    children: import("react").ReactNode;
}>, ExportAuthLayout: typeof import("./pages").AuthLayout;
export { ExportAuthLayout as AuthLayout, AuthenticatorsContextProvider };
export type AuthOptions = {
    components: Partial<{
        SignInForm: ComponentType<{
            authenticator: AuthenticatorType;
        }>;
        SignInButton: ComponentType<{
            authenticator: AuthenticatorType;
        }>;
        SignUpForm: ComponentType<{
            authenticatorName: string;
        }>;
        AdminSettingsForm: ComponentType;
    }>;
};
export declare class PluginAuthClient extends Plugin {
    authTypes: any;
    registerType(authType: string, options: AuthOptions): void;
    load(): Promise<void>;
}
export { AuthenticatorsContext, useAuthenticator } from './authenticator';
export type { Authenticator } from './authenticator';
declare const useSignIn: (name: string) => {
    run(): Promise<void>;
};
export { useSignIn };
export default PluginAuthClient;
