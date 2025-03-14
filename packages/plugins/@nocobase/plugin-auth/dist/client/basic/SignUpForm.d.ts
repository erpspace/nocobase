/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
export interface UseSignupProps {
    authenticator?: string;
    message?: {
        success?: string;
    };
}
export declare const useSignUp: (props?: UseSignupProps) => {
    run(): Promise<void>;
};
export declare const SignUpForm: ({ authenticatorName: name }: {
    authenticatorName: string;
}) => React.JSX.Element;
