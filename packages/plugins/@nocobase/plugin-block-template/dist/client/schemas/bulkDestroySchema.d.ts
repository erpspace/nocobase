/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const bulkDestroySchema: {
    name: string;
    type: string;
    'x-component': string;
    'x-component-props': {
        openSize: string;
        icon: string;
    };
    title: string;
    properties: {
        modal: {
            type: string;
            'x-component': string;
            'x-decorator': string;
            'x-use-decorator-props': () => {
                form: import("@formily/core").Form<any>;
            };
            title: string;
            properties: {
                keepBlocks: {
                    type: string;
                    'x-decorator': string;
                    'x-component': string;
                    'x-content': string;
                    default: boolean;
                };
                footer: {
                    type: string;
                    'x-component': string;
                    properties: {
                        cancel: {
                            type: string;
                            title: string;
                            'x-component': string;
                            'x-component-props': {
                                useAction: string;
                            };
                        };
                        submit: {
                            type: string;
                            title: string;
                            'x-component': string;
                            'x-component-props': {
                                type: string;
                                useAction: string;
                            };
                        };
                    };
                };
            };
        };
    };
};
