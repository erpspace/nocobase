/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
import { Authenticator } from '../authenticator';
export declare function useRedirect(next?: string): () => void;
export declare const useSignIn: (authenticator: string) => {
    run(): Promise<void>;
};
export declare const SignInForm: (props: {
    authenticator: Authenticator;
}) => React.JSX.Element;
