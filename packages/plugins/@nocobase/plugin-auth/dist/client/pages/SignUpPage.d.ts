/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React, { FunctionComponent } from 'react';
import { AuthOptions } from '..';
export declare const SignupPageContext: React.Context<{
    [authType: string]: {
        component: FunctionComponent<{
            name: string;
        }>;
    };
}>;
export declare const SignupPageProvider: React.FC<{
    authType: string;
    component: FunctionComponent<{
        name: string;
    }>;
}>;
export declare const useSignUpForms: () => {
    [authType: string]: React.ComponentType<{
        authenticatorName: string;
    }>;
};
export declare const SignUpPage: () => React.JSX.Element;
