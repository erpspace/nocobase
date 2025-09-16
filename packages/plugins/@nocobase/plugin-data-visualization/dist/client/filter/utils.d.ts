/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { VariablesContextType } from '@nocobase/client';
import { Schema } from '@formily/react';
export declare const getOptionsSchema: () => {
    title: string;
    type: string;
    'x-decorator': string;
    'x-component': string;
    items: {
        type: string;
        'x-decorator': string;
        properties: {
            space: {
                type: string;
                'x-component': string;
                properties: {
                    label: {
                        type: string;
                        'x-decorator': string;
                        'x-component': string;
                        'x-component-props': {
                            placeholder: string;
                        };
                        required: boolean;
                    };
                    value: {
                        type: string;
                        'x-decorator': string;
                        'x-component': string;
                        'x-component-props': {
                            placeholder: string;
                        };
                        required: boolean;
                    };
                    remove: {
                        type: string;
                        'x-decorator': string;
                        'x-component': string;
                    };
                };
            };
        };
    };
    properties: {
        add: {
            type: string;
            title: string;
            'x-component': string;
        };
    };
};
export declare const getPropsSchemaByComponent: (component: string) => any;
export declare const transformValue: (value: any, props: any) => any;
export declare const setDefaultValue: (field: any, variablesCtx: VariablesContextType, localVariables?: any) => Promise<void>;
export declare const FILTER_FIELD_PREFIX_SEPARATOR = "-";
export declare const getFilterFieldPrefix: (dataSource: string, fieldName: string) => string;
export declare const parseFilterFieldName: (name: string) => {
    dataSource: string;
    fieldName: string;
};
export declare const findSchema: (schema: Schema, key: string, targetName: string) => any;
