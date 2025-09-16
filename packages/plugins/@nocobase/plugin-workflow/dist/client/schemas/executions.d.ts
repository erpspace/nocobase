/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
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
                    dumpRules: {
                        group: string;
                    };
                    migrationRules: string[];
                    name: string;
                    shared: boolean;
                    fields: ({
                        type: string;
                        name: string;
                        interface: string;
                        uiSchema: {
                            type: string;
                            title: string;
                            'x-component': string;
                            'x-component-props': {
                                fieldNames?: undefined;
                            };
                            'x-read-pretty': boolean;
                            'x-decorator'?: undefined;
                            enum?: undefined;
                        };
                        primaryKey: boolean;
                        autoIncrement: boolean;
                        target?: undefined;
                        foreignKey?: undefined;
                        unique?: undefined;
                        onDelete?: undefined;
                    } | {
                        type: string;
                        name: string;
                        target: string;
                        foreignKey: string;
                        interface: string;
                        uiSchema: {
                            type: string;
                            title: string;
                            'x-component': string;
                            'x-component-props': {
                                fieldNames: {
                                    label: string;
                                    value: string;
                                };
                            };
                            'x-read-pretty': boolean;
                            'x-decorator'?: undefined;
                            enum?: undefined;
                        };
                        primaryKey?: undefined;
                        autoIncrement?: undefined;
                        unique?: undefined;
                        onDelete?: undefined;
                    } | {
                        type: string;
                        name: string;
                        interface?: undefined;
                        uiSchema?: undefined;
                        primaryKey?: undefined;
                        autoIncrement?: undefined;
                        target?: undefined;
                        foreignKey?: undefined;
                        unique?: undefined;
                        onDelete?: undefined;
                    } | {
                        type: string;
                        name: string;
                        unique: boolean;
                        interface?: undefined;
                        uiSchema?: undefined;
                        primaryKey?: undefined;
                        autoIncrement?: undefined;
                        target?: undefined;
                        foreignKey?: undefined;
                        onDelete?: undefined;
                    } | {
                        type: string;
                        name: string;
                        onDelete: string;
                        interface?: undefined;
                        uiSchema?: undefined;
                        primaryKey?: undefined;
                        autoIncrement?: undefined;
                        target?: undefined;
                        foreignKey?: undefined;
                        unique?: undefined;
                    } | {
                        type: string;
                        name: string;
                        interface: string;
                        uiSchema: {
                            title: string;
                            type: string;
                            'x-component': string;
                            'x-decorator': string;
                            enum: string;
                            'x-component-props'?: undefined;
                            'x-read-pretty'?: undefined;
                        };
                        primaryKey?: undefined;
                        autoIncrement?: undefined;
                        target?: undefined;
                        foreignKey?: undefined;
                        unique?: undefined;
                        onDelete?: undefined;
                    } | {
                        interface: string;
                        type: string;
                        name: string;
                        uiSchema: {
                            type: string;
                            title: string;
                            'x-component': string;
                            'x-component-props': {
                                fieldNames?: undefined;
                            };
                            'x-read-pretty': boolean;
                            'x-decorator'?: undefined;
                            enum?: undefined;
                        };
                        primaryKey?: undefined;
                        autoIncrement?: undefined;
                        target?: undefined;
                        foreignKey?: undefined;
                        unique?: undefined;
                        onDelete?: undefined;
                    })[];
                };
                resourceName: string;
                request: {
                    resource: string;
                    action: string;
                    params: {
                        appends: string[];
                        pageSize: number;
                        sort: string[];
                        except: string[];
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
                            title: string;
                            properties: {
                                workflowId: {
                                    type: string;
                                    "x-component"({ value }: {
                                        value: any;
                                    }): React.JSX.Element;
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
