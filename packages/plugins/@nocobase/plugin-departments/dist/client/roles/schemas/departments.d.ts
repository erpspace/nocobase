/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const getDepartmentsSchema: () => {
    type: string;
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
                [x: string]: {
                    type: string;
                    title: string;
                    'x-action': string;
                    'x-component': string;
                    'x-use-component-props': string;
                    'x-component-props': {
                        icon: string;
                    };
                    'x-align': string;
                    properties?: undefined;
                } | {
                    type: string;
                    'x-component': string;
                    properties: {
                        remove: {
                            type: string;
                            title: string;
                            'x-component': string;
                            'x-component-props': {
                                icon: string;
                                confirm: {
                                    title: string;
                                    content: string;
                                };
                                style: {
                                    marginRight: number;
                                };
                                useAction: string;
                            };
                        };
                        create: {
                            type: string;
                            title: string;
                            'x-component': string;
                            'x-component-props': {
                                type: string;
                                icon: string;
                            };
                            properties: {
                                drawer: {
                                    type: string;
                                    'x-component': string;
                                    'x-decorator': string;
                                    title: string;
                                    properties: {
                                        table: {
                                            type: string;
                                            'x-decorator': string;
                                            'x-component': string;
                                            'x-component-props': {
                                                useDataSource: string;
                                                useDisabled: string;
                                            };
                                        };
                                        footer: {
                                            type: string;
                                            'x-component': string;
                                            properties: {
                                                cancel: {
                                                    title: string;
                                                    'x-component': string;
                                                    'x-component-props': {
                                                        useAction: string;
                                                    };
                                                };
                                                submit: {
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
                    };
                    title?: undefined;
                    'x-action'?: undefined;
                    'x-use-component-props'?: undefined;
                    'x-component-props'?: undefined;
                    'x-align'?: undefined;
                };
                actions: {
                    type: string;
                    'x-component': string;
                    properties: {
                        remove: {
                            type: string;
                            title: string;
                            'x-component': string;
                            'x-component-props': {
                                icon: string;
                                confirm: {
                                    title: string;
                                    content: string;
                                };
                                style: {
                                    marginRight: number;
                                };
                                useAction: string;
                            };
                        };
                        create: {
                            type: string;
                            title: string;
                            'x-component': string;
                            'x-component-props': {
                                type: string;
                                icon: string;
                            };
                            properties: {
                                drawer: {
                                    type: string;
                                    'x-component': string;
                                    'x-decorator': string;
                                    title: string;
                                    properties: {
                                        table: {
                                            type: string;
                                            'x-decorator': string;
                                            'x-component': string;
                                            'x-component-props': {
                                                useDataSource: string;
                                                useDisabled: string;
                                            };
                                        };
                                        footer: {
                                            type: string;
                                            'x-component': string;
                                            properties: {
                                                cancel: {
                                                    title: string;
                                                    'x-component': string;
                                                    'x-component-props': {
                                                        useAction: string;
                                                    };
                                                };
                                                submit: {
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
                    };
                };
            };
        };
        table: {
            type: string;
            'x-component': string;
            'x-component-props': {
                rowKey: string;
                rowSelection: {
                    type: string;
                };
                useDataSource: string;
            };
            properties: {
                title: {
                    type: string;
                    title: string;
                    'x-decorator': string;
                    'x-component': string;
                    properties: {
                        title: {
                            type: string;
                            'x-component': string;
                        };
                    };
                };
                actions: {
                    type: string;
                    title: string;
                    'x-component': string;
                    properties: {
                        actions: {
                            type: string;
                            'x-component': string;
                            'x-component-props': {
                                split: string;
                            };
                            properties: {
                                remove: {
                                    type: string;
                                    title: string;
                                    'x-component': string;
                                    'x-component-props': {
                                        confirm: {
                                            title: string;
                                            content: string;
                                        };
                                        useAction: string;
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
