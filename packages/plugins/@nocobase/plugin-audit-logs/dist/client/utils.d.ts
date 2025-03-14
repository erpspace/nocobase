/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const createSchema: () => {
    type: string;
    name: string;
    'x-decorator': string;
    'x-decorator-props': {
        collection: string;
        dragSort: boolean;
        request: {
            resource: string;
            action: string;
            params: {
                pageSize: number;
                filter: {};
                appends: any[];
            };
        };
    };
    'x-designer': string;
    'x-component': string;
    properties: {
        actions: {
            type: string;
            'x-component': string;
            'x-component-props': {
                layout: string;
                style: {
                    marginBottom: number;
                };
            };
            properties: {
                [x: string]: {
                    'x-component': string;
                    'x-component-props': {
                        popover: boolean;
                    };
                    type: string;
                    title: string;
                    properties: {
                        popover: {
                            type: string;
                            'x-decorator': string;
                            'x-decorator-props': {};
                            'x-component': string;
                            'x-component-props': {
                                trigger: string;
                                placement: string;
                            };
                            properties: {
                                filter: {
                                    type: string;
                                    default: {
                                        $and: {}[];
                                    };
                                    'x-component': string;
                                    'x-component-props': {
                                        useDataSource: string;
                                    };
                                };
                                footer: {
                                    type: string;
                                    'x-component': string;
                                    properties: {
                                        actions: {
                                            type: string;
                                            'x-component': string;
                                            properties: {
                                                saveDefault: {
                                                    type: string;
                                                    'x-component': string;
                                                    'x-component-props': {};
                                                };
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
                    };
                };
            };
        };
        table: {
            type: string;
            'x-component': string;
            'x-component-props': {
                rowKey: string;
                useDataSource: string;
            };
            properties: {
                [x: string]: {
                    type: string;
                    title: string;
                    'x-component': string;
                    properties: {
                        created_at: {
                            type: string;
                            'x-component': string;
                            'x-read-pretty': boolean;
                            'x-component-props': {
                                format: string;
                            };
                        };
                        'user.nickname'?: undefined;
                        'collection.title'?: undefined;
                        type?: undefined;
                    };
                    'x-component-props'?: undefined;
                } | {
                    type: string;
                    title: string;
                    'x-component': string;
                    properties: {
                        'user.nickname': {
                            type: string;
                            'x-component': string;
                            'x-read-pretty': boolean;
                        };
                        created_at?: undefined;
                        'collection.title'?: undefined;
                        type?: undefined;
                    };
                    'x-component-props'?: undefined;
                } | {
                    type: string;
                    title: string;
                    'x-component': string;
                    properties: {
                        'collection.title': {
                            type: string;
                            'x-component': string;
                            'x-read-pretty': boolean;
                        };
                        created_at?: undefined;
                        'user.nickname'?: undefined;
                        type?: undefined;
                    };
                    'x-component-props'?: undefined;
                } | {
                    type: string;
                    title: string;
                    'x-component': string;
                    properties: {
                        type: {
                            type: string;
                            'x-component': string;
                            'x-read-pretty': boolean;
                            enum: {
                                label: string;
                                value: string;
                                color: string;
                            }[];
                        };
                        created_at?: undefined;
                        'user.nickname'?: undefined;
                        'collection.title'?: undefined;
                    };
                    'x-component-props'?: undefined;
                } | {
                    type: string;
                    title: string;
                    'x-component': string;
                    'x-component-props': {
                        width: number;
                        align: string;
                    };
                    properties: {
                        [x: string]: {
                            title: string;
                            type: string;
                            'x-action': string;
                            'x-component': string;
                            'x-component-props': {
                                openMode: string;
                            };
                            properties: {
                                drawer: {
                                    type: string;
                                    'x-component': string;
                                    'x-component-props': {
                                        className: string;
                                    };
                                    title: string;
                                    properties: {
                                        created_at: {
                                            type: string;
                                            title: string;
                                            'x-decorator': string;
                                            'x-component': string;
                                            'x-read-pretty': boolean;
                                            'x-component-props': {
                                                format: string;
                                            };
                                        };
                                        'user.nickname': {
                                            type: string;
                                            title: string;
                                            'x-decorator': string;
                                            'x-component': string;
                                            'x-read-pretty': boolean;
                                        };
                                        'collection.title': {
                                            type: string;
                                            title: string;
                                            'x-decorator': string;
                                            'x-component': string;
                                            'x-read-pretty': boolean;
                                        };
                                        type: {
                                            type: string;
                                            title: string;
                                            'x-decorator': string;
                                            'x-component': string;
                                            'x-read-pretty': boolean;
                                            enum: {
                                                label: string;
                                                value: string;
                                                color: string;
                                            }[];
                                        };
                                        changes: {
                                            type: string;
                                            title: string;
                                            'x-decorator': string;
                                            'x-component': string;
                                            'x-component-props': {
                                                pagination: boolean;
                                                showIndex: boolean;
                                            };
                                            items: {
                                                type: string;
                                                properties: {
                                                    column1: {
                                                        type: string;
                                                        'x-component': string;
                                                        'x-component-props': {
                                                            title: string;
                                                        };
                                                        properties: {
                                                            field: {
                                                                type: string;
                                                                'x-decorator': string;
                                                                'x-component': string;
                                                            };
                                                        };
                                                    };
                                                    column2: {
                                                        type: string;
                                                        'x-component': string;
                                                        'x-component-props': {
                                                            title: string;
                                                        };
                                                        properties: {
                                                            before: {
                                                                type: string;
                                                                'x-decorator': string;
                                                                'x-component': string;
                                                            };
                                                        };
                                                    };
                                                    column3: {
                                                        type: string;
                                                        'x-component': string;
                                                        'x-component-props': {
                                                            title: string;
                                                        };
                                                        properties: {
                                                            after: {
                                                                type: string;
                                                                'x-decorator': string;
                                                                'x-component': string;
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
                        created_at?: undefined;
                        'user.nickname'?: undefined;
                        'collection.title'?: undefined;
                        type?: undefined;
                    };
                };
                column1: {
                    type: string;
                    title: string;
                    'x-component': string;
                    properties: {
                        created_at: {
                            type: string;
                            'x-component': string;
                            'x-read-pretty': boolean;
                            'x-component-props': {
                                format: string;
                            };
                        };
                    };
                };
                column2: {
                    type: string;
                    title: string;
                    'x-component': string;
                    properties: {
                        'user.nickname': {
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
                        'collection.title': {
                            type: string;
                            'x-component': string;
                            'x-read-pretty': boolean;
                        };
                    };
                };
                column4: {
                    type: string;
                    title: string;
                    'x-component': string;
                    properties: {
                        type: {
                            type: string;
                            'x-component': string;
                            'x-read-pretty': boolean;
                            enum: {
                                label: string;
                                value: string;
                                color: string;
                            }[];
                        };
                    };
                };
            };
        };
    };
};
