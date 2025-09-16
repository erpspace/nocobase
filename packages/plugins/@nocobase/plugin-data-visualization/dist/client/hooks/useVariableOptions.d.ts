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
    children: {
        key: string;
        value: string;
        label: string;
        operators: ({
            label: string;
            value: string;
            selected: boolean;
            schema: {
                'x-component': string;
                'x-component-props': {
                    isRange: boolean;
                };
            };
            onlyFilterAction: boolean;
            noValue?: undefined;
        } | {
            label: string;
            value: string;
            schema: {
                'x-component': string;
                'x-component-props': {
                    isRange: boolean;
                };
            };
            onlyFilterAction: boolean;
            selected?: undefined;
            noValue?: undefined;
        } | {
            label: string;
            value: string;
            schema: {
                'x-component': string;
                'x-component-props': {
                    isRange: boolean;
                };
            };
            selected?: undefined;
            onlyFilterAction?: undefined;
            noValue?: undefined;
        } | {
            label: string;
            value: string;
            noValue: boolean;
            selected?: undefined;
            schema?: undefined;
            onlyFilterAction?: undefined;
        })[];
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
