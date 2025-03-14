/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const createLLMSchema: {
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
                };
                title: {
                    type: string;
                    'x-decorator': string;
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
export declare const llmsSchema: {
    type: string;
    properties: {
        card: {
            type: string;
            'x-component': string;
            'x-component-props': {
                heightMode: string;
            };
            'x-decorator': string;
            'x-decorator-props': {
                collection: string;
                action: string;
            };
            properties: {
                actions: {
                    type: string;
                    'x-component': string;
                    'x-component-props': {
                        style: {
                            marginBottom: number;
                        };
                    };
                    properties: {
                        filter: {
                            'x-component': string;
                            'x-use-component-props': string;
                            title: string;
                            'x-component-props': {
                                icon: string;
                            };
                            'x-align': string;
                        };
                        refresh: {
                            title: string;
                            'x-component': string;
                            'x-use-component-props': string;
                            'x-component-props': {
                                icon: string;
                            };
                        };
                        bulkDelete: {
                            title: string;
                            'x-action': string;
                            'x-component': string;
                            'x-use-component-props': string;
                            'x-component-props': {
                                icon: string;
                                confirm: {
                                    title: string;
                                    content: string;
                                };
                            };
                        };
                        add: {
                            type: string;
                            'x-component': string;
                            title: string;
                            'x-align': string;
                        };
                    };
                };
                table: {
                    type: string;
                    'x-component': string;
                    'x-use-component-props': string;
                    'x-component-props': {
                        rowKey: string;
                        rowSelection: {
                            type: string;
                        };
                    };
                    properties: {
                        column1: {
                            type: string;
                            title: string;
                            'x-component': string;
                            properties: {
                                name: {
                                    type: string;
                                    'x-component': string;
                                    'x-read-pretty': boolean;
                                };
                            };
                        };
                        column2: {
                            type: string;
                            title: string;
                            'x-component': string;
                            properties: {
                                title: {
                                    type: string;
                                    'x-component': string;
                                    'x-read-pretty': boolean;
                                };
                            };
                        };
                        column3: {
                            type: string;
                            title: string;
                            'x-component': string;
                            properties: {
                                provider: {
                                    type: string;
                                    'x-component': string;
                                    'x-read-pretty': boolean;
                                    enum: string;
                                };
                            };
                        };
                        column4: {
                            type: string;
                            title: string;
                            'x-decorator': string;
                            'x-component': string;
                            properties: {
                                actions: {
                                    type: string;
                                    'x-component': string;
                                    'x-component-props': {
                                        split: string;
                                    };
                                    properties: {
                                        edit: {
                                            type: string;
                                            title: string;
                                            'x-action': string;
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
                                                        title: {
                                                            type: string;
                                                            'x-decorator': string;
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
                                        destroy: {
                                            type: string;
                                            title: string;
                                            'x-action': string;
                                            'x-component': string;
                                            'x-use-component-props': string;
                                            'x-component-props': {
                                                confirm: {
                                                    title: string;
                                                    content: string;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
            };
        };
    };
};
