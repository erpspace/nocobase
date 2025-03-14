/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { NocoBaseDesktopRouteType } from '@nocobase/client';
import React from 'react';
export declare const createRoutesTableSchema: (collectionName: string, basename: string) => {
    type: string;
    name: any;
    'x-decorator': string;
    'x-decorator-props': {
        collection: string;
        action: string;
        dragSort: boolean;
        params: {
            sort: string[];
            pageSize: number;
            filter: {
                'hidden.$ne': boolean;
            };
        };
        treeTable: boolean;
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
                refresh: {
                    title: string;
                    'x-action': string;
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
                    'x-use-component-props': () => {
                        onClick(): Promise<void>;
                    };
                    'x-component-props': {
                        confirm: {
                            title: string;
                            content: string;
                        };
                        icon: string;
                    };
                };
                hide: {
                    type: string;
                    title: string;
                    'x-component': string;
                    'x-use-component-props': () => {
                        onClick(): Promise<void>;
                    };
                    'x-component-props': {
                        icon: string;
                        confirm: {
                            title: string;
                            content: string;
                        };
                    };
                };
                show: {
                    type: string;
                    title: string;
                    'x-component': string;
                    'x-use-component-props': () => {
                        onClick(): Promise<void>;
                    };
                    'x-component-props': {
                        icon: string;
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
                                useValues(options: any): {};
                            };
                            title: string;
                            properties: {
                                formSchema: {
                                    type: string;
                                    properties: {
                                        [x: string]: {
                                            type: string;
                                            title: string;
                                            'x-decorator': string;
                                            'x-component': (props: any) => React.JSX.Element;
                                            default: NocoBaseDesktopRouteType;
                                            required: boolean;
                                            'x-reactions'?: undefined;
                                            description?: undefined;
                                            items?: undefined;
                                            properties?: undefined;
                                            'x-decorator-props'?: undefined;
                                        } | {
                                            type: string;
                                            title: string;
                                            'x-decorator': string;
                                            'x-component': string;
                                            required: boolean;
                                            default?: undefined;
                                            'x-reactions'?: undefined;
                                            description?: undefined;
                                            items?: undefined;
                                            properties?: undefined;
                                            'x-decorator-props'?: undefined;
                                        } | {
                                            type: string;
                                            title: string;
                                            'x-decorator': string;
                                            'x-component': string;
                                            'x-reactions': {
                                                dependencies: string[];
                                                fulfill: {
                                                    state: {
                                                        required: string;
                                                        hidden?: undefined;
                                                    };
                                                };
                                            };
                                            default?: undefined;
                                            required?: undefined;
                                            description?: undefined;
                                            items?: undefined;
                                            properties?: undefined;
                                            'x-decorator-props'?: undefined;
                                        } | {
                                            title: string;
                                            type: string;
                                            'x-decorator': string;
                                            'x-component': (props: any) => React.JSX.Element;
                                            description: string;
                                            'x-reactions': {
                                                dependencies: string[];
                                                fulfill: {
                                                    state: {
                                                        hidden: string;
                                                        required?: undefined;
                                                    };
                                                };
                                            };
                                            default?: undefined;
                                            required?: undefined;
                                            items?: undefined;
                                            properties?: undefined;
                                            'x-decorator-props'?: undefined;
                                        } | {
                                            type: string;
                                            'x-component': string;
                                            'x-decorator': string;
                                            title: string;
                                            items: {
                                                type: string;
                                                properties: {
                                                    space: {
                                                        type: string;
                                                        'x-component': string;
                                                        'x-component-props': {
                                                            style: {
                                                                flexWrap: string;
                                                                maxWidth: string;
                                                            };
                                                            className: string;
                                                        };
                                                        properties: {
                                                            name: {
                                                                type: string;
                                                                'x-decorator': string;
                                                                'x-component': string;
                                                                'x-component-props': {
                                                                    placeholder: string;
                                                                };
                                                            };
                                                            value: {
                                                                type: string;
                                                                'x-decorator': string;
                                                                'x-component': (props: any) => React.JSX.Element;
                                                                'x-component-props': {
                                                                    placeholder: string;
                                                                    useTypedConstant: boolean;
                                                                    changeOnSelect: boolean;
                                                                };
                                                            };
                                                            remove: {
                                                                type: string;
                                                                'x-decorator': string;
                                                                'x-component': string;
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                            'x-reactions': {
                                                dependencies: string[];
                                                fulfill: {
                                                    state: {
                                                        hidden: string;
                                                        required?: undefined;
                                                    };
                                                };
                                            };
                                            properties: {
                                                add: {
                                                    type: string;
                                                    title: string;
                                                    'x-component': string;
                                                };
                                            };
                                            default?: undefined;
                                            required?: undefined;
                                            description?: undefined;
                                            'x-decorator-props'?: undefined;
                                        } | {
                                            type: string;
                                            title: string;
                                            'x-decorator': string;
                                            'x-decorator-props': {
                                                tooltip: string;
                                            };
                                            'x-component': (props: any) => React.JSX.Element;
                                            default: boolean;
                                            required?: undefined;
                                            'x-reactions'?: undefined;
                                            description?: undefined;
                                            items?: undefined;
                                            properties?: undefined;
                                        } | {
                                            type: string;
                                            title: string;
                                            'x-decorator': string;
                                            'x-decorator-props': {
                                                tooltip: string;
                                            };
                                            'x-component': (props: any) => React.JSX.Element;
                                            'x-reactions': {
                                                dependencies: string[];
                                                fulfill: {
                                                    state: {
                                                        hidden: string;
                                                        required?: undefined;
                                                    };
                                                };
                                            };
                                            default: boolean;
                                            required?: undefined;
                                            description?: undefined;
                                            items?: undefined;
                                            properties?: undefined;
                                        };
                                        type: {
                                            type: string;
                                            title: string;
                                            'x-decorator': string;
                                            'x-component': (props: any) => React.JSX.Element;
                                            default: NocoBaseDesktopRouteType;
                                            required: boolean;
                                        };
                                        title: {
                                            type: string;
                                            title: string;
                                            'x-decorator': string;
                                            'x-component': string;
                                            required: boolean;
                                        };
                                        icon: {
                                            type: string;
                                            title: string;
                                            'x-decorator': string;
                                            'x-component': string;
                                            'x-reactions': {
                                                dependencies: string[];
                                                fulfill: {
                                                    state: {
                                                        required: string;
                                                    };
                                                };
                                            };
                                        };
                                        params: {
                                            type: string;
                                            'x-component': string;
                                            'x-decorator': string;
                                            title: string;
                                            items: {
                                                type: string;
                                                properties: {
                                                    space: {
                                                        type: string;
                                                        'x-component': string;
                                                        'x-component-props': {
                                                            style: {
                                                                flexWrap: string;
                                                                maxWidth: string;
                                                            };
                                                            className: string;
                                                        };
                                                        properties: {
                                                            name: {
                                                                type: string;
                                                                'x-decorator': string;
                                                                'x-component': string;
                                                                'x-component-props': {
                                                                    placeholder: string;
                                                                };
                                                            };
                                                            value: {
                                                                type: string;
                                                                'x-decorator': string;
                                                                'x-component': (props: any) => React.JSX.Element;
                                                                'x-component-props': {
                                                                    placeholder: string;
                                                                    useTypedConstant: boolean;
                                                                    changeOnSelect: boolean;
                                                                };
                                                            };
                                                            remove: {
                                                                type: string;
                                                                'x-decorator': string;
                                                                'x-component': string;
                                                            };
                                                        };
                                                    };
                                                };
                                            };
                                            'x-reactions': {
                                                dependencies: string[];
                                                fulfill: {
                                                    state: {
                                                        hidden: string;
                                                    };
                                                };
                                            };
                                            properties: {
                                                add: {
                                                    type: string;
                                                    title: string;
                                                    'x-component': string;
                                                };
                                            };
                                        };
                                        hideInMenu: {
                                            type: string;
                                            title: string;
                                            'x-decorator': string;
                                            'x-decorator-props': {
                                                tooltip: string;
                                            };
                                            'x-component': (props: any) => React.JSX.Element;
                                            default: boolean;
                                        };
                                        enableTabs: {
                                            type: string;
                                            title: string;
                                            'x-decorator': string;
                                            'x-decorator-props': {
                                                tooltip: string;
                                            };
                                            'x-component': (props: any) => React.JSX.Element;
                                            'x-reactions': {
                                                dependencies: string[];
                                                fulfill: {
                                                    state: {
                                                        hidden: string;
                                                    };
                                                };
                                            };
                                            default: boolean;
                                        };
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
                                                useAction: (actionCallback?: (values: any) => void) => {
                                                    run(): Promise<void>;
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                filter: {
                    'x-action': string;
                    type: string;
                    'x-component': string;
                    title: string;
                    'x-use-component-props': string;
                    'x-component-props': {
                        icon: string;
                    };
                    'x-align': string;
                };
            };
        };
        table: {
            type: string;
            'x-component': string;
            'x-use-component-props': () => {
                optimizeTextCellRender: boolean;
                value: any;
                loading: any;
                showIndex: boolean;
                dragSort: boolean;
                rowKey: string;
                pagination: boolean | {
                    pageSize: any;
                    total: any;
                    current: any;
                };
                onRowSelectionChange: (selectedRowKeys: any, selectedRows: any, setSelectedRowKeys: any) => void;
                onChange: ({ current, pageSize }: {
                    current: any;
                    pageSize: any;
                }, filters: any, sorter: any) => void;
            };
            'x-component-props': {
                rowKey: string;
                rowSelection: {
                    type: string;
                };
            };
            properties: {
                title: {
                    type: string;
                    'x-component': string;
                    title: string;
                    'x-component-props': {
                        width: number;
                    };
                    properties: {
                        title: {
                            type: string;
                            'x-component': (props: any) => React.JSX.Element;
                            'x-read-pretty': boolean;
                            'x-component-props': {
                                ellipsis: boolean;
                            };
                        };
                    };
                };
                type: {
                    type: string;
                    'x-component': string;
                    title: string;
                    'x-component-props': {
                        width: number;
                    };
                    properties: {
                        type: {
                            type: string;
                            'x-component': (props: any) => React.JSX.Element;
                            'x-read-pretty': boolean;
                            'x-component-props': {
                                ellipsis: boolean;
                            };
                        };
                    };
                };
                hideInMenu: {
                    type: string;
                    'x-component': string;
                    title: string;
                    'x-component-props': {
                        width: number;
                    };
                    properties: {
                        hideInMenu: {
                            type: string;
                            'x-component': (props: any) => React.JSX.Element;
                            'x-read-pretty': boolean;
                            'x-component-props': {
                                ellipsis: boolean;
                            };
                        };
                    };
                };
                path: {
                    title: string;
                    type: string;
                    'x-component': string;
                    'x-component-props': {
                        width: number;
                    };
                    properties: {
                        path: {
                            type: string;
                            'x-component': () => React.JSX.Element;
                            'x-read-pretty': boolean;
                        };
                    };
                };
                actions: {
                    type: string;
                    title: string;
                    'x-component': string;
                    properties: {
                        addChild: {
                            type: string;
                            title: string;
                            'x-component': string;
                            'x-use-component-props': () => {
                                disabled: boolean;
                                openMode: string;
                            };
                            'x-decorator': string;
                            properties: {
                                drawer: {
                                    type: string;
                                    'x-component': string;
                                    'x-decorator': string;
                                    'x-decorator-props': {
                                        useValues(options: any): {};
                                    };
                                    title: string;
                                    properties: {
                                        formSchema: {
                                            type: string;
                                            properties: {
                                                [x: string]: {
                                                    type: string;
                                                    title: string;
                                                    'x-decorator': string;
                                                    'x-component': (props: any) => React.JSX.Element;
                                                    required: boolean;
                                                    default: NocoBaseDesktopRouteType;
                                                    'x-reactions'?: undefined;
                                                    description?: undefined;
                                                    items?: undefined;
                                                    properties?: undefined;
                                                    'x-decorator-props'?: undefined;
                                                } | {
                                                    type: string;
                                                    title: string;
                                                    'x-decorator': string;
                                                    'x-component': string;
                                                    required: boolean;
                                                    default?: undefined;
                                                    'x-reactions'?: undefined;
                                                    description?: undefined;
                                                    items?: undefined;
                                                    properties?: undefined;
                                                    'x-decorator-props'?: undefined;
                                                } | {
                                                    type: string;
                                                    title: string;
                                                    'x-decorator': string;
                                                    'x-component': string;
                                                    'x-reactions': {
                                                        dependencies: string[];
                                                        fulfill: {
                                                            state: {
                                                                required: string;
                                                                hidden?: undefined;
                                                            };
                                                        };
                                                    };
                                                    required?: undefined;
                                                    default?: undefined;
                                                    description?: undefined;
                                                    items?: undefined;
                                                    properties?: undefined;
                                                    'x-decorator-props'?: undefined;
                                                } | {
                                                    title: string;
                                                    type: string;
                                                    'x-decorator': string;
                                                    'x-component': (props: any) => React.JSX.Element;
                                                    description: string;
                                                    'x-reactions': {
                                                        dependencies: string[];
                                                        fulfill: {
                                                            state: {
                                                                hidden: string;
                                                                required?: undefined;
                                                            };
                                                        };
                                                    };
                                                    required?: undefined;
                                                    default?: undefined;
                                                    items?: undefined;
                                                    properties?: undefined;
                                                    'x-decorator-props'?: undefined;
                                                } | {
                                                    type: string;
                                                    'x-component': string;
                                                    'x-decorator': string;
                                                    title: string;
                                                    items: {
                                                        type: string;
                                                        properties: {
                                                            space: {
                                                                type: string;
                                                                'x-component': string;
                                                                'x-component-props': {
                                                                    style: {
                                                                        flexWrap: string;
                                                                        maxWidth: string;
                                                                    };
                                                                    className: string;
                                                                };
                                                                properties: {
                                                                    name: {
                                                                        type: string;
                                                                        'x-decorator': string;
                                                                        'x-component': string;
                                                                        'x-component-props': {
                                                                            placeholder: string;
                                                                        };
                                                                    };
                                                                    value: {
                                                                        type: string;
                                                                        'x-decorator': string;
                                                                        'x-component': (props: any) => React.JSX.Element;
                                                                        'x-component-props': {
                                                                            placeholder: string;
                                                                            useTypedConstant: boolean;
                                                                            changeOnSelect: boolean;
                                                                        };
                                                                    };
                                                                    remove: {
                                                                        type: string;
                                                                        'x-decorator': string;
                                                                        'x-component': string;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                    'x-reactions': {
                                                        dependencies: string[];
                                                        fulfill: {
                                                            state: {
                                                                hidden: string;
                                                                required?: undefined;
                                                            };
                                                        };
                                                    };
                                                    properties: {
                                                        add: {
                                                            type: string;
                                                            title: string;
                                                            'x-component': string;
                                                        };
                                                    };
                                                    required?: undefined;
                                                    default?: undefined;
                                                    description?: undefined;
                                                    'x-decorator-props'?: undefined;
                                                } | {
                                                    type: string;
                                                    title: string;
                                                    'x-decorator': string;
                                                    'x-decorator-props': {
                                                        tooltip: string;
                                                    };
                                                    'x-component': (props: any) => React.JSX.Element;
                                                    default: boolean;
                                                    required?: undefined;
                                                    'x-reactions'?: undefined;
                                                    description?: undefined;
                                                    items?: undefined;
                                                    properties?: undefined;
                                                } | {
                                                    type: string;
                                                    title: string;
                                                    'x-decorator': string;
                                                    'x-decorator-props': {
                                                        tooltip: string;
                                                    };
                                                    'x-component': (props: any) => React.JSX.Element;
                                                    'x-reactions': {
                                                        dependencies: string[];
                                                        fulfill: {
                                                            state: {
                                                                hidden: string;
                                                                required?: undefined;
                                                            };
                                                        };
                                                    };
                                                    default: boolean;
                                                    required?: undefined;
                                                    description?: undefined;
                                                    items?: undefined;
                                                    properties?: undefined;
                                                };
                                                type: {
                                                    type: string;
                                                    title: string;
                                                    'x-decorator': string;
                                                    'x-component': (props: any) => React.JSX.Element;
                                                    required: boolean;
                                                    default: NocoBaseDesktopRouteType;
                                                };
                                                title: {
                                                    type: string;
                                                    title: string;
                                                    'x-decorator': string;
                                                    'x-component': string;
                                                    required: boolean;
                                                };
                                                icon: {
                                                    type: string;
                                                    title: string;
                                                    'x-decorator': string;
                                                    'x-component': string;
                                                    'x-reactions': {
                                                        dependencies: string[];
                                                        fulfill: {
                                                            state: {
                                                                required: string;
                                                            };
                                                        };
                                                    };
                                                };
                                                params: {
                                                    type: string;
                                                    'x-component': string;
                                                    'x-decorator': string;
                                                    title: string;
                                                    items: {
                                                        type: string;
                                                        properties: {
                                                            space: {
                                                                type: string;
                                                                'x-component': string;
                                                                'x-component-props': {
                                                                    style: {
                                                                        flexWrap: string;
                                                                        maxWidth: string;
                                                                    };
                                                                    className: string;
                                                                };
                                                                properties: {
                                                                    name: {
                                                                        type: string;
                                                                        'x-decorator': string;
                                                                        'x-component': string;
                                                                        'x-component-props': {
                                                                            placeholder: string;
                                                                        };
                                                                    };
                                                                    value: {
                                                                        type: string;
                                                                        'x-decorator': string;
                                                                        'x-component': (props: any) => React.JSX.Element;
                                                                        'x-component-props': {
                                                                            placeholder: string;
                                                                            useTypedConstant: boolean;
                                                                            changeOnSelect: boolean;
                                                                        };
                                                                    };
                                                                    remove: {
                                                                        type: string;
                                                                        'x-decorator': string;
                                                                        'x-component': string;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                    'x-reactions': {
                                                        dependencies: string[];
                                                        fulfill: {
                                                            state: {
                                                                hidden: string;
                                                            };
                                                        };
                                                    };
                                                    properties: {
                                                        add: {
                                                            type: string;
                                                            title: string;
                                                            'x-component': string;
                                                        };
                                                    };
                                                };
                                                hideInMenu: {
                                                    type: string;
                                                    title: string;
                                                    'x-decorator': string;
                                                    'x-decorator-props': {
                                                        tooltip: string;
                                                    };
                                                    'x-component': (props: any) => React.JSX.Element;
                                                    default: boolean;
                                                };
                                                enableTabs: {
                                                    type: string;
                                                    title: string;
                                                    'x-decorator': string;
                                                    'x-decorator-props': {
                                                        tooltip: string;
                                                    };
                                                    'x-component': (props: any) => React.JSX.Element;
                                                    'x-reactions': {
                                                        dependencies: string[];
                                                        fulfill: {
                                                            state: {
                                                                hidden: string;
                                                            };
                                                        };
                                                    };
                                                    default: boolean;
                                                };
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
                                                        useAction: () => {
                                                            run(): Promise<void>;
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        edit: {
                            type: string;
                            title: string;
                            'x-component': string;
                            'x-component-props': {
                                openMode: string;
                            };
                            'x-decorator': string;
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
                                        formSchema: {
                                            type: string;
                                            properties: {
                                                [x: string]: {
                                                    type: string;
                                                    title: string;
                                                    'x-decorator': string;
                                                    'x-component': (props: any) => React.JSX.Element;
                                                    default: NocoBaseDesktopRouteType;
                                                    required?: undefined;
                                                    'x-reactions'?: undefined;
                                                    description?: undefined;
                                                    items?: undefined;
                                                    properties?: undefined;
                                                    'x-decorator-props'?: undefined;
                                                } | {
                                                    type: string;
                                                    title: string;
                                                    'x-decorator': string;
                                                    'x-component': string;
                                                    required: boolean;
                                                    default?: undefined;
                                                    'x-reactions'?: undefined;
                                                    description?: undefined;
                                                    items?: undefined;
                                                    properties?: undefined;
                                                    'x-decorator-props'?: undefined;
                                                } | {
                                                    type: string;
                                                    title: string;
                                                    'x-decorator': string;
                                                    'x-component': string;
                                                    'x-reactions': {
                                                        dependencies: string[];
                                                        fulfill: {
                                                            state: {
                                                                required: string;
                                                                hidden?: undefined;
                                                            };
                                                        };
                                                    };
                                                    default?: undefined;
                                                    required?: undefined;
                                                    description?: undefined;
                                                    items?: undefined;
                                                    properties?: undefined;
                                                    'x-decorator-props'?: undefined;
                                                } | {
                                                    title: string;
                                                    type: string;
                                                    'x-decorator': string;
                                                    'x-component': (props: any) => React.JSX.Element;
                                                    description: string;
                                                    'x-reactions': {
                                                        dependencies: string[];
                                                        fulfill: {
                                                            state: {
                                                                hidden: string;
                                                                required?: undefined;
                                                            };
                                                        };
                                                    };
                                                    default?: undefined;
                                                    required?: undefined;
                                                    items?: undefined;
                                                    properties?: undefined;
                                                    'x-decorator-props'?: undefined;
                                                } | {
                                                    type: string;
                                                    'x-component': string;
                                                    'x-decorator': string;
                                                    title: string;
                                                    items: {
                                                        type: string;
                                                        properties: {
                                                            space: {
                                                                type: string;
                                                                'x-component': string;
                                                                'x-component-props': {
                                                                    style: {
                                                                        flexWrap: string;
                                                                        maxWidth: string;
                                                                    };
                                                                    className: string;
                                                                };
                                                                properties: {
                                                                    name: {
                                                                        type: string;
                                                                        'x-decorator': string;
                                                                        'x-component': string;
                                                                        'x-component-props': {
                                                                            placeholder: string;
                                                                        };
                                                                    };
                                                                    value: {
                                                                        type: string;
                                                                        'x-decorator': string;
                                                                        'x-component': (props: any) => React.JSX.Element;
                                                                        'x-component-props': {
                                                                            placeholder: string;
                                                                            useTypedConstant: boolean;
                                                                            changeOnSelect: boolean;
                                                                        };
                                                                    };
                                                                    remove: {
                                                                        type: string;
                                                                        'x-decorator': string;
                                                                        'x-component': string;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                    'x-reactions': {
                                                        dependencies: string[];
                                                        fulfill: {
                                                            state: {
                                                                hidden: string;
                                                                required?: undefined;
                                                            };
                                                        };
                                                    };
                                                    properties: {
                                                        add: {
                                                            type: string;
                                                            title: string;
                                                            'x-component': string;
                                                        };
                                                    };
                                                    default?: undefined;
                                                    required?: undefined;
                                                    description?: undefined;
                                                    'x-decorator-props'?: undefined;
                                                } | {
                                                    type: string;
                                                    title: string;
                                                    'x-decorator': string;
                                                    'x-decorator-props': {
                                                        tooltip: string;
                                                    };
                                                    'x-component': (props: any) => React.JSX.Element;
                                                    default: boolean;
                                                    required?: undefined;
                                                    'x-reactions'?: undefined;
                                                    description?: undefined;
                                                    items?: undefined;
                                                    properties?: undefined;
                                                } | {
                                                    type: string;
                                                    title: string;
                                                    'x-decorator': string;
                                                    'x-decorator-props': {
                                                        tooltip: string;
                                                    };
                                                    'x-component': (props: any) => React.JSX.Element;
                                                    'x-reactions': {
                                                        dependencies: string[];
                                                        fulfill: {
                                                            state: {
                                                                hidden: string;
                                                                required?: undefined;
                                                            };
                                                        };
                                                    };
                                                    default: boolean;
                                                    required?: undefined;
                                                    description?: undefined;
                                                    items?: undefined;
                                                    properties?: undefined;
                                                };
                                                type: {
                                                    type: string;
                                                    title: string;
                                                    'x-decorator': string;
                                                    'x-component': (props: any) => React.JSX.Element;
                                                    default: NocoBaseDesktopRouteType;
                                                };
                                                title: {
                                                    type: string;
                                                    title: string;
                                                    'x-decorator': string;
                                                    'x-component': string;
                                                    required: boolean;
                                                };
                                                icon: {
                                                    type: string;
                                                    title: string;
                                                    'x-decorator': string;
                                                    'x-component': string;
                                                    'x-reactions': {
                                                        dependencies: string[];
                                                        fulfill: {
                                                            state: {
                                                                required: string;
                                                            };
                                                        };
                                                    };
                                                };
                                                params: {
                                                    type: string;
                                                    'x-component': string;
                                                    'x-decorator': string;
                                                    title: string;
                                                    items: {
                                                        type: string;
                                                        properties: {
                                                            space: {
                                                                type: string;
                                                                'x-component': string;
                                                                'x-component-props': {
                                                                    style: {
                                                                        flexWrap: string;
                                                                        maxWidth: string;
                                                                    };
                                                                    className: string;
                                                                };
                                                                properties: {
                                                                    name: {
                                                                        type: string;
                                                                        'x-decorator': string;
                                                                        'x-component': string;
                                                                        'x-component-props': {
                                                                            placeholder: string;
                                                                        };
                                                                    };
                                                                    value: {
                                                                        type: string;
                                                                        'x-decorator': string;
                                                                        'x-component': (props: any) => React.JSX.Element;
                                                                        'x-component-props': {
                                                                            placeholder: string;
                                                                            useTypedConstant: boolean;
                                                                            changeOnSelect: boolean;
                                                                        };
                                                                    };
                                                                    remove: {
                                                                        type: string;
                                                                        'x-decorator': string;
                                                                        'x-component': string;
                                                                    };
                                                                };
                                                            };
                                                        };
                                                    };
                                                    'x-reactions': {
                                                        dependencies: string[];
                                                        fulfill: {
                                                            state: {
                                                                hidden: string;
                                                            };
                                                        };
                                                    };
                                                    properties: {
                                                        add: {
                                                            type: string;
                                                            title: string;
                                                            'x-component': string;
                                                        };
                                                    };
                                                };
                                                hideInMenu: {
                                                    type: string;
                                                    title: string;
                                                    'x-decorator': string;
                                                    'x-decorator-props': {
                                                        tooltip: string;
                                                    };
                                                    'x-component': (props: any) => React.JSX.Element;
                                                    default: boolean;
                                                };
                                                enableTabs: {
                                                    type: string;
                                                    title: string;
                                                    'x-decorator': string;
                                                    'x-decorator-props': {
                                                        tooltip: string;
                                                    };
                                                    'x-component': (props: any) => React.JSX.Element;
                                                    'x-reactions': {
                                                        dependencies: string[];
                                                        fulfill: {
                                                            state: {
                                                                hidden: string;
                                                            };
                                                        };
                                                    };
                                                    default: boolean;
                                                };
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
                                                        useAction: (actionCallback?: (values: any) => void) => {
                                                            run(): Promise<void>;
                                                        };
                                                    };
                                                };
                                            };
                                        };
                                    };
                                };
                            };
                        };
                        access: {
                            type: string;
                            title: string;
                            'x-component': string;
                            'x-use-component-props': () => {
                                onClick: () => void;
                                disabled: boolean;
                            };
                            'x-decorator': string;
                        };
                        delete: {
                            type: string;
                            title: string;
                            'x-decorator': string;
                            'x-component': string;
                            'x-use-component-props': () => {
                                onClick: () => Promise<void>;
                            };
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
