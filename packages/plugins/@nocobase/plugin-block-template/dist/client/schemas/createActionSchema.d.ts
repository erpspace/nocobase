/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const createActionSchema: {
    type: string;
    'x-component': string;
    title: string;
    'x-align': string;
    'x-component-props': {
        type: string;
        icon: string;
        openMode: string;
    };
    properties: {
        drawer: {
            type: string;
            'x-component': string;
            title: string;
            'x-decorator': string;
            'x-use-decorator-props': () => {
                form: any;
            };
            properties: {
                form: {
                    type: string;
                    properties: {
                        title: {
                            type: string;
                            'x-decorator': string;
                            'x-component': string;
                        };
                        key: {
                            type: string;
                            'x-decorator': string;
                            'x-component': string;
                            'x-validator': string;
                            description: string;
                        };
                        type: {
                            type: string;
                            'x-decorator': string;
                            'x-component': string;
                        };
                        description: {
                            type: string;
                            'x-decorator': string;
                            'x-component': string;
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
