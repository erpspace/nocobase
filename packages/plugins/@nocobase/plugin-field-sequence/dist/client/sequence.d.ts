/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { CollectionFieldInterface } from '@nocobase/client';
import React from 'react';
declare function RuleTypeSelect(props: any): React.JSX.Element;
declare function RuleOptions(): React.JSX.Element;
export declare function RuleConfigForm(): React.JSX.Element;
export declare class SequenceFieldInterface extends CollectionFieldInterface {
    name: string;
    type: string;
    group: string;
    order: number;
    title: string;
    description: string;
    sortable: boolean;
    default: {
        type: string;
        uiSchema: {
            type: string;
            'x-component': string;
            'x-component-props': {};
        };
    };
    availableTypes: string[];
    hasDefaultValue: boolean;
    filterable: {
        operators: ({
            label: string;
            value: string;
            selected: boolean;
            noValue?: undefined;
        } | {
            label: string;
            value: string;
            selected?: undefined;
            noValue?: undefined;
        } | {
            label: string;
            value: string;
            noValue: boolean;
            selected?: undefined;
        })[];
    };
    titleUsable: boolean;
    properties: {
        unique: {
            type: string;
            'x-content': string;
            'x-decorator': string;
            'x-component': string;
            'x-disabled': string;
            'x-reactions': {
                dependencies: string[];
                when: string;
                fulfill: {
                    state: {
                        value: boolean;
                    };
                };
            }[];
        };
        patterns: {
            type: string;
            title: string;
            required: boolean;
            'x-decorator': string;
            'x-component': string;
            items: {
                type: string;
                properties: {
                    sort: {
                        type: string;
                        'x-component': string;
                        'x-component-props': {
                            width: number;
                            title: string;
                            align: string;
                        };
                        properties: {
                            sort: {
                                type: string;
                                'x-component': string;
                            };
                        };
                    };
                    type: {
                        type: string;
                        'x-component': string;
                        'x-component-props': {
                            title: string;
                        };
                        properties: {
                            type: {
                                type: string;
                                name: string;
                                required: boolean;
                                'x-decorator': string;
                                'x-component': typeof RuleTypeSelect;
                            };
                        };
                    };
                    options: {
                        type: string;
                        'x-component': string;
                        'x-component-props': {
                            title: string;
                        };
                        properties: {
                            options: {
                                type: string;
                                name: string;
                                'x-component': typeof RuleOptions;
                            };
                        };
                    };
                    operations: {
                        type: string;
                        'x-component': string;
                        'x-component-props': {
                            title: string;
                            dataIndex: string;
                            fixed: string;
                            className: string;
                        };
                        properties: {
                            config: {
                                type: string;
                                properties: {
                                    options: {
                                        type: string;
                                        'x-component': typeof RuleConfigForm;
                                    };
                                };
                            };
                            remove: {
                                type: string;
                                'x-component': string;
                            };
                        };
                    };
                };
            };
            properties: {
                add: {
                    type: string;
                    'x-component': string;
                    'x-component-props': {
                        defaultValue: {
                            type: string;
                            options: {
                                digits: number;
                                start: number;
                            };
                        };
                    };
                    title: string;
                };
            };
        };
        inputable: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
        };
        match: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            'x-reactions': {
                dependencies: string[];
                fulfill: {
                    state: {
                        value: string;
                        visible: string;
                    };
                };
            };
        };
        'uiSchema.title': {
            type: string;
            title: string;
            required: boolean;
            'x-decorator': string;
            'x-component': string;
        };
        name: {
            type: string;
            title: string;
            required: boolean;
            'x-disabled': string;
            'x-decorator': string;
            'x-component': string;
            'x-validator': string;
            description: string;
        };
    };
}
export {};
