/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
import { AuthOptions } from '..';
import { Authenticator } from '../authenticator';
export declare const useSignInForms: () => {
    [authType: string]: React.ComponentType<{
        authenticator: Authenticator;
    }>;
};
export declare const useSignInButtons: (authenticators?: any[]) => React.CElement<{
    key: number;
    authenticator: any;
}, React.Component<{
    key: number;
    authenticator: any;
}, any, any>>[];
export declare const SignInPage: () => React.JSX.Element;
