/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const executionCollection: {
    name: string;
    fields: {
        interface: string;
        type: string;
        name: string;
        uiSchema: import("@formily/react").Stringify<{
            [key: symbol]: any;
            [key: `x-${string}`]: any;
            [key: `x-${number}`]: any;
            version?: string;
            name?: import("@formily/react").SchemaKey;
            title?: any;
            description?: any;
            default?: any;
            readOnly?: boolean;
            writeOnly?: boolean;
            type?: import("@formily/react").SchemaTypes;
            enum?: import("@formily/react").SchemaEnum<any>;
            const?: any;
            multipleOf?: number;
            maximum?: number;
            exclusiveMaximum?: number;
            minimum?: number;
            exclusiveMinimum?: number;
            maxLength?: number;
            minLength?: number;
            pattern?: string | RegExp;
            maxItems?: number;
            minItems?: number;
            uniqueItems?: boolean;
            maxProperties?: number;
            minProperties?: number;
            required?: string | boolean | string[];
            format?: string;
            $ref?: string;
            $namespace?: string;
            definitions?: import("@formily/react").SchemaProperties<any, any, any, any, any, any, any, any>;
            properties?: import("@formily/react").SchemaProperties<any, any, any, any, any, any, any, any>;
            items?: import("@formily/react").SchemaItems<any, any, any, any, any, any, any, any>;
            additionalItems?: import("@formily/react").Stringify<any>;
            patternProperties?: import("@formily/react").SchemaProperties<any, any, any, any, any, any, any, any>;
            additionalProperties?: import("@formily/react").Stringify<any>;
            "x-value"?: any;
            "x-index"?: number;
            "x-pattern"?: any;
            "x-display"?: any;
            "x-validator"?: any;
            "x-decorator"?: any;
            "x-decorator-props"?: any;
            "x-component"?: any;
            "x-component-props"?: any;
            "x-reactions"?: import("@formily/react").SchemaReactions<any>;
            "x-content"?: any;
            "x-data"?: any;
            "x-visible"?: boolean;
            "x-hidden"?: boolean;
            "x-disabled"?: boolean;
            "x-editable"?: boolean;
            "x-read-only"?: boolean;
            "x-read-pretty"?: boolean;
            "x-compile-omitted"?: string[];
        }>;
    }[];
};
export declare const executionSchema: {
    type: string;
    name: string;
    title: string;
    'x-component': string;
    properties: {
        content: {
            type: string;
            'x-decorator': string;
            'x-decorator-props': {
                collection: {
                    name: string;
                    fields: {
                        interface: string;
                        type: string;
                        name: string;
                        uiSchema: import("@formily/react").Stringify<{
                            [key: symbol]: any;
                            [key: `x-${string}`]: any;
                            [key: `x-${number}`]: any;
                            version?: string;
                            name?: import("@formily/react").SchemaKey;
                            title?: any;
                            description?: any;
                            default?: any;
                            readOnly?: boolean;
                            writeOnly?: boolean;
                            type?: import("@formily/react").SchemaTypes;
                            enum?: import("@formily/react").SchemaEnum<any>;
                            const?: any;
                            multipleOf?: number;
                            maximum?: number;
                            exclusiveMaximum?: number;
                            minimum?: number;
                            exclusiveMinimum?: number;
                            maxLength?: number;
                            minLength?: number;
                            pattern?: string | RegExp;
                            maxItems?: number;
                            minItems?: number;
                            uniqueItems?: boolean;
                            maxProperties?: number;
                            minProperties?: number;
                            required?: string | boolean | string[];
                            format?: string;
                            $ref?: string;
                            $namespace?: string;
                            definitions?: import("@formily/react").SchemaProperties<any, any, any, any, any, any, any, any>;
                            properties?: import("@formily/react").SchemaProperties<any, any, any, any, any, any, any, any>;
                            items?: import("@formily/react").SchemaItems<any, any, any, any, any, any, any, any>;
                            additionalItems?: import("@formily/react").Stringify<any>;
                            patternProperties?: import("@formily/react").SchemaProperties<any, any, any, any, any, any, any, any>;
                            additionalProperties?: import("@formily/react").Stringify<any>;
                            "x-value"?: any;
                            "x-index"?: number;
                            "x-pattern"?: any;
                            "x-display"?: any;
                            "x-validator"?: any;
                            "x-decorator"?: any;
                            "x-decorator-props"?: any;
                            "x-component"?: any;
                            "x-component-props"?: any;
                            "x-reactions"?: import("@formily/react").SchemaReactions<any>;
                            "x-content"?: any;
                            "x-data"?: any;
                            "x-visible"?: boolean;
                            "x-hidden"?: boolean;
                            "x-disabled"?: boolean;
                            "x-editable"?: boolean;
                            "x-read-only"?: boolean;
                            "x-read-pretty"?: boolean;
                            "x-compile-omitted"?: string[];
                        }>;
                    }[];
                };
                resourceName: string;
                request: {
                    resource: string;
                    action: string;
                    params: {
                        appends: string[];
                        pageSize: number;
                        sort: string[];
                        filter: {};
                    };
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
                        refresher: {
                            type: string;
                            title: string;
                            'x-component': string;
                            'x-use-component-props': string;
                            'x-component-props': {
                                icon: string;
                            };
                        };
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
                        clear: {
                            type: string;
                            title: string;
                            'x-component': string;
                            'x-component-props': {
                                useAction(): {
                                    run(): Promise<void>;
                                };
                                confirm: {
                                    title: string;
                                    content: string;
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
                        createdAt: {
                            type: string;
                            'x-decorator': string;
                            'x-component': string;
                            properties: {
                                createdAt: {
                                    type: string;
                                    'x-component': string;
                                    'x-component-props': {
                                        showTime: boolean;
                                    };
                                    'x-read-pretty': boolean;
                                };
                            };
                        };
                        workflowId: {
                            type: string;
                            'x-decorator': string;
                            'x-component': string;
                            properties: {
                                workflowId: {
                                    type: string;
                                    'x-component': string;
                                    'x-read-pretty': boolean;
                                };
                            };
                        };
                        status: {
                            type: string;
                            'x-decorator': string;
                            'x-component': string;
                            title: string;
                            properties: {
                                status: {
                                    type: string;
                                    'x-decorator': string;
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
                                        link: {
                                            type: string;
                                            'x-component': string;
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
                                            'x-reactions': {
                                                dependencies: string[];
                                                fulfill: {
                                                    state: {
                                                        visible: string;
                                                    };
                                                };
                                            }[];
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
