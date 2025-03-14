/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/// <reference types="react" />
export declare const useShared: () => {
    schema: {
        type: string;
        'x-component': string;
        properties: {
            exportSettings: {
                type: string;
                'x-component': string;
                'x-decorator': string;
                items: {
                    type: string;
                    properties: {
                        space: {
                            type: string;
                            'x-component': string;
                            'x-component-props': {
                                className: string;
                            };
                            properties: {
                                sort: {
                                    type: string;
                                    'x-decorator': string;
                                    'x-component': string;
                                };
                                dataIndex: {
                                    type: string;
                                    'x-decorator': string;
                                    'x-component': import("react").FunctionComponent<Partial<import("@nocobase/client").CascaderProps<any>> & import("react").RefAttributes<unknown>>;
                                    required: boolean;
                                    enum: any[];
                                    'x-component-props': {
                                        fieldNames: {
                                            label: string;
                                            value: string;
                                            children: string;
                                        };
                                        changeOnSelect: boolean;
                                    };
                                };
                                title: {
                                    type: string;
                                    'x-decorator': string;
                                    'x-component': string;
                                    'x-component-props': {
                                        placeholder: string;
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
                        'x-component-props': {
                            className: string;
                        };
                    };
                };
            };
        };
    };
};
