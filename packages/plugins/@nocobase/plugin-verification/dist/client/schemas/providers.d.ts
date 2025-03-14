/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
declare const _default: {
    type: string;
    name: string;
    'x-decorator': string;
    'x-decorator-props': {
        collection: {
            name: string;
            fields: ({
                type: string;
                name: string;
                interface: string;
                uiSchema: {
                    title: string;
                    type: string;
                    'x-component': string;
                    required: boolean;
                    enum?: undefined;
                };
            } | {
                type: string;
                name: string;
                interface: string;
                uiSchema: {
                    title: string;
                    type: string;
                    'x-component': string;
                    required: boolean;
                    enum: {
                        label: string;
                        value: string;
                    }[];
                };
            } | {
                type: string;
                name: string;
                interface: string;
                uiSchema: {
                    title: string;
                    type: string;
                    'x-component': string;
                    required?: undefined;
                    enum?: undefined;
                };
            })[];
        };
        resourceName: string;
        request: {
            resource: string;
            action: string;
            params: {
                pageSize: number;
                sort: string[];
                appends: any[];
            };
        };
    };
    'x-component': string;
    'x-component-props': {
        collection: {
            name: string;
            fields: ({
                type: string;
                name: string;
                interface: string;
                uiSchema: {
                    title: string;
                    type: string;
                    'x-component': string;
                    required: boolean;
                    enum?: undefined;
                };
            } | {
                type: string;
                name: string;
                interface: string;
                uiSchema: {
                    title: string;
                    type: string;
                    'x-component': string;
                    required: boolean;
                    enum: {
                        label: string;
                        value: string;
                    }[];
                };
            } | {
                type: string;
                name: string;
                interface: string;
                uiSchema: {
                    title: string;
                    type: string;
                    'x-component': string;
                    required?: undefined;
                    enum?: undefined;
                };
            })[];
        };
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
                delete: {
                    type: string;
                    title: string;
                    'x-component': string;
                    'x-component-props': {
                        icon: string;
                        useAction: string;
                        confirm: {
                            title: string;
                            content: string;
                        };
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
                            'x-decorator-props': {
                                useValues(options: any): import("@nocobase/client").UseRequestResult<unknown>;
                            };
                            title: string;
                            properties: {
                                id: {
                                    'x-component': string;
                                    'x-decorator': string;
                                    description: string;
                                };
                                title: {
                                    'x-component': string;
                                    'x-decorator': string;
                                };
                                type: {
                                    'x-component': string;
                                    'x-decorator': string;
                                };
                                options: {
                                    type: string;
                                    'x-component': string;
                                };
                                default: {
                                    'x-component': string;
                                    'x-decorator': string;
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
        table: {
            type: string;
            'x-uid': string;
            'x-component': string;
            'x-component-props': {
                rowKey: string;
                rowSelection: {
                    type: string;
                };
                useDataSource: string;
            };
            properties: {
                id: {
                    type: string;
                    'x-decorator': string;
                    'x-component': string;
                    properties: {
                        id: {
                            type: string;
                            'x-component': string;
                            'x-read-pretty': boolean;
                        };
                    };
                };
                title: {
                    type: string;
                    'x-decorator': string;
                    'x-component': string;
                    properties: {
                        title: {
                            type: string;
                            'x-component': string;
                            'x-read-pretty': boolean;
                        };
                    };
                };
                type: {
                    type: string;
                    'x-decorator': string;
                    'x-component': string;
                    properties: {
                        type: {
                            type: string;
                            'x-component': string;
                            'x-read-pretty': boolean;
                        };
                    };
                };
                default: {
                    type: string;
                    'x-decorator': string;
                    'x-component': string;
                    properties: {
                        default: {
                            type: string;
                            'x-component': string;
                            'x-read-pretty': boolean;
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
                                update: {
                                    type: string;
                                    title: string;
                                    'x-component': string;
                                    'x-component-props': {
                                        type: string;
                                    };
                                    properties: {
                                        drawer: {
                                            type: string;
                                            'x-component': string;
                                            'x-decorator': string;
                                            'x-decorator-props': {
                                                useValues: string;
                                            };
                                            title: string;
                                            properties: {
                                                id: {
                                                    'x-component': string;
                                                    'x-decorator': string;
                                                    'x-disabled': boolean;
                                                };
                                                title: {
                                                    'x-component': string;
                                                    'x-decorator': string;
                                                };
                                                type: {
                                                    'x-component': string;
                                                    'x-decorator': string;
                                                    'x-disabled': boolean;
                                                };
                                                options: {
                                                    type: string;
                                                    'x-component': string;
                                                };
                                                default: {
                                                    'x-component': string;
                                                    'x-decorator': string;
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
                                delete: {
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
export default _default;
