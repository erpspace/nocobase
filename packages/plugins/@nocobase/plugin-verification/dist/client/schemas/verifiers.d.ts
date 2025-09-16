/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ISchema } from '@formily/react';
export declare const createVerifierSchema: {
    type: string;
    properties: {
        drawer: {
            type: string;
            title: string;
            'x-component': string;
            'x-decorator': string;
            'x-use-decorator-props': string;
            properties: {
                name: {
                    type: string;
                    'x-decorator': string;
                    title: string;
                    'x-component': string;
                    'x-validator': (value: string) => "" | "a-z, A-Z, 0-9, _, -";
                };
                title: {
                    type: string;
                    'x-decorator': string;
                    title: string;
                    'x-component': string;
                };
                description: {
                    'x-decorator': string;
                    type: string;
                    title: string;
                    'x-component': string;
                };
                options: {
                    type: string;
                    'x-component': string;
                };
                footer: {
                    type: string;
                    'x-component': string;
                    properties: {
                        cancel: {
                            title: string;
                            'x-component': string;
                            'x-use-component-props': string;
                        };
                        submit: {
                            title: string;
                            'x-component': string;
                            'x-component-props': {
                                type: string;
                            };
                            'x-use-component-props': string;
                        };
                    };
                };
            };
        };
    };
};
export declare const verifiersSchema: ISchema;
