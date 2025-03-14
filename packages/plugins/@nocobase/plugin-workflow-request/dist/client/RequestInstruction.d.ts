/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
import { Instruction, WorkflowVariableJSON, WorkflowVariableRawTextArea, WorkflowVariableTextArea } from '@nocobase/plugin-workflow/client';
declare function BodyComponent(props: any): React.JSX.Element;
export default class extends Instruction {
    title: string;
    type: string;
    group: string;
    description: string;
    icon: React.JSX.Element;
    fieldset: {
        method: {
            type: string;
            required: boolean;
            title: string;
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
            'x-decorator-props': {};
            'x-component': string;
            'x-component-props': {
                placeholder: string;
            };
        };
        contentType: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                allowClear: boolean;
            };
            enum: {
                label: string;
                value: string;
            }[];
            default: string;
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
                                'x-component': string;
                                'x-component-props': {
                                    useTypedConstant: boolean;
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
                                'x-component': string;
                                'x-component-props': {
                                    useTypedConstant: boolean;
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
                };
            };
        };
        data: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-decorator-props': {};
            'x-component': string;
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
        ignoreFail: {
            type: string;
            'x-content': string;
            'x-decorator': string;
            'x-component': string;
        };
    };
    components: {
        ArrayItems: import("@formily/react").ReactFC<React.HTMLAttributes<HTMLDivElement>> & import("@formily/antd-v5").ArrayBaseMixins & {
            Item: import("@formily/react").ReactFC<React.HTMLAttributes<HTMLDivElement> & {
                type?: "card" | "divide";
            }>;
        };
        BodyComponent: typeof BodyComponent;
        WorkflowVariableJSON: typeof WorkflowVariableJSON;
        WorkflowVariableTextArea: typeof WorkflowVariableTextArea;
        WorkflowVariableRawTextArea: typeof WorkflowVariableRawTextArea;
    };
    useVariables({ key, title, config }: {
        key: any;
        title: any;
        config: any;
    }, { types }: {
        types: any;
    }): {
        value: any;
        label: any;
        children: {
            value: string;
            label: string;
        }[];
    };
    testable: boolean;
}
export {};
