/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const CustomRequestConfigurationFieldsSchema: {
    type: string;
    properties: {
        method: {
            type: string;
            required: boolean;
            title: string;
            'x-decorator-props': {
                tooltip: string;
            };
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                showSearch: boolean;
                allowClear: boolean;
                className: string;
            };
            enum: {
                label: string;
                value: string;
            }[];
            default: string;
        };
        url: {
            type: string;
            required: boolean;
            title: string;
            'x-decorator': string;
            'x-component': string;
            'x-use-component-props': () => {
                scope: any[];
                fieldNames: {
                    value: string;
                    label: string;
                };
                useTypedConstant: boolean;
            };
            'x-component-props': {
                placeholder: string;
            };
        };
        headers: {
            type: string;
            'x-component': string;
            'x-decorator': string;
            title: string;
            description: string;
            items: {
                type: string;
                properties: {
                    space: {
                        type: string;
                        'x-component': string;
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
                                'x-component': string;
                                'x-use-component-props': () => {
                                    scope: any[];
                                    fieldNames: {
                                        value: string;
                                        label: string;
                                    };
                                    useTypedConstant: boolean;
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
            properties: {
                add: {
                    type: string;
                    title: string;
                    'x-component': string;
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
                                'x-component': string;
                                'x-use-component-props': () => {
                                    scope: any[];
                                    fieldNames: {
                                        value: string;
                                        label: string;
                                    };
                                    useTypedConstant: boolean;
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
            properties: {
                add: {
                    type: string;
                    title: string;
                    'x-component': string;
                };
            };
        };
        data: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-decorator-props': {};
            'x-component': string;
            'x-component-props': {
                scope: string;
                fieldNames: {
                    value: string;
                    label: string;
                };
                changeOnSelect: boolean;
                autoSize: {
                    minRows: number;
                };
                placeholder: string;
            };
            description: string;
        };
        timeout: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-decorator-props': {};
            'x-component': string;
            'x-component-props': {
                addonAfter: string;
                min: number;
                step: number;
                defaultValue: number;
            };
        };
        responseType: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-decorator-props': {};
            'x-component': string;
            default: string;
            enum: {
                value: string;
                label: string;
            }[];
        };
    };
};
