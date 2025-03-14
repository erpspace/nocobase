/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const editActionSchema: {
    type: string;
    title: string;
    'x-component': string;
    'x-component-props': {
        openMode: string;
        icon: string;
    };
    properties: {
        drawer: {
            type: string;
            title: string;
            'x-component': string;
            'x-decorator': string;
            'x-use-decorator-props': string;
            properties: {
                form: {
                    type: string;
                    properties: {
                        title: {
                            type: string;
                            'x-decorator': string;
                            'x-component': string;
                        };
                        collection: {
                            type: string;
                            'x-decorator': string;
                            'x-component': string;
                            'x-component-props': {
                                disabled: boolean;
                            };
                        };
                        type: {
                            type: string;
                            'x-decorator': string;
                            title: string;
                            'x-component': string;
                            default: string;
                            enum: string;
                        };
                        description: {
                            type: string;
                            'x-decorator': string;
                            'x-component': string;
                        };
                        password: {
                            type: string;
                            'x-decorator': string;
                            'x-component': string;
                        };
                        enabled: {
                            type: string;
                            'x-decorator': string;
                            'x-component': string;
                            default: boolean;
                        };
                    };
                };
                footer: {
                    type: string;
                    'x-component': string;
                    properties: {
                        submit: {
                            title: string;
                            'x-component': string;
                            'x-use-component-props': string;
                        };
                    };
                };
            };
        };
    };
};
