/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/// <reference types="react" />
export declare const LLMProviderContext: import("react").Context<{
    provider: string;
}>;
export declare const LLMProvidersContext: import("react").Context<{
    providers: {
        key: string;
        label: string;
        value: string;
    }[];
}>;
export declare const useLLMProviders: () => {
    key: string;
    label: string;
    value: string;
}[];
