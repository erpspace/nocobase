/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ISchema } from '@formily/react';
export declare const useGeneralVariableOptions: (schema: ISchema, operator?: {
    value: string;
}) => (import("@nocobase/client/es/schema-settings/VariableInput/type").Option | {
    label: string;
    value: string;
    key: string;
    disabled: boolean;
    children: {
        key: string;
        value: string;
        label: string;
        disabled: boolean;
    }[];
})[];
export declare const useVariableOptions: () => ({
    label: string;
    value: string;
    key: string;
    children: {
        key: string;
        value: string;
        label: string;
    }[];
} | import("@nocobase/client/es/schema-settings/VariableInput/type").Option)[];
