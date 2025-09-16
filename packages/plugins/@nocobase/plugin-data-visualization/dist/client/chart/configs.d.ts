/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { SchemaProperties } from '@formily/react';
export type FieldConfigProps = Partial<{
    name: string;
    title: string;
    required: boolean;
    defaultValue: any;
    description: string;
    options: {
        label: string;
        value: any;
    }[];
    componentProps: Record<string, any>;
}>;
export type AnySchemaProperties = SchemaProperties<any, any, any, any, any, any, any, any>;
export type ConfigType = (FieldConfigProps & {
    configType?: string;
}) | ((props?: FieldConfigProps) => AnySchemaProperties) | AnySchemaProperties;
export type Config = string | ConfigType;
declare const _default: {
    field: ({ name, title, required, defaultValue, description }: Partial<{
        name: string;
        title: string;
        required: boolean;
        defaultValue: any;
        description: string;
        options: {
            label: string;
            value: any;
        }[];
        componentProps: Record<string, any>;
    }>) => {
        [x: string]: {
            title: string;
            type: string;
            'x-decorator': string;
            'x-component': string;
            'x-reactions': string;
            required: boolean;
            description: string;
            default: any;
        };
    };
    input: ({ name, title, required, defaultValue, description }: Partial<{
        name: string;
        title: string;
        required: boolean;
        defaultValue: any;
        description: string;
        options: {
            label: string;
            value: any;
        }[];
        componentProps: Record<string, any>;
    }>) => {
        [x: string]: {
            title: string;
            type: string;
            'x-decorator': string;
            'x-component': string;
            required: boolean;
            default: any;
            description: string;
        };
    };
    boolean: ({ name, title, defaultValue, description }: Partial<{
        name: string;
        title: string;
        required: boolean;
        defaultValue: any;
        description: string;
        options: {
            label: string;
            value: any;
        }[];
        componentProps: Record<string, any>;
    }>) => {
        [x: string]: {
            'x-content': string;
            type: string;
            'x-decorator': string;
            'x-component': string;
            default: any;
            description: string;
        };
    };
    select: ({ name, title, required, defaultValue, options, description }: Partial<{
        name: string;
        title: string;
        required: boolean;
        defaultValue: any;
        description: string;
        options: {
            label: string;
            value: any;
        }[];
        componentProps: Record<string, any>;
    }>) => {
        [x: string]: {
            title: string;
            type: string;
            'x-decorator': string;
            'x-component': string;
            required: boolean;
            default: any;
            description: string;
            enum: {
                label: string;
                value: any;
            }[];
        };
    };
    radio: ({ name, title, defaultValue, options, description, componentProps }: Partial<{
        name: string;
        title: string;
        required: boolean;
        defaultValue: any;
        description: string;
        options: {
            label: string;
            value: any;
        }[];
        componentProps: Record<string, any>;
    }>) => {
        [x: string]: {
            title: string;
            type: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                [x: string]: any;
            };
            default: any;
            description: string;
            enum: {
                label: string;
                value: any;
            }[];
        };
    };
    percent: ({ name, title, defaultValue, description }: Partial<{
        name: string;
        title: string;
        required: boolean;
        defaultValue: any;
        description: string;
        options: {
            label: string;
            value: any;
        }[];
        componentProps: Record<string, any>;
    }>) => {
        [x: string]: {
            title: string;
            type: string;
            'x-decorator': string;
            'x-component': string;
            default: any;
            description: string;
            'x-component-props': {
                suffix: string;
            };
        };
    };
    xField: {
        configType: string;
        name: string;
        title: string;
        required: boolean;
    };
    yField: {
        configType: string;
        name: string;
        title: string;
        required: boolean;
    };
    seriesField: {
        configType: string;
        name: string;
        title: string;
    };
    colorField: {
        configType: string;
        name: string;
        title: string;
        required: boolean;
    };
    isStack: {
        configType: string;
        name: string;
        title: string;
    };
    smooth: {
        configType: string;
        name: string;
        title: string;
    };
    isPercent: {
        configType: string;
        name: string;
        title: string;
    };
    isGroup: {
        configType: string;
        name: string;
        title: string;
    };
    size: () => {
        size: {
            title: string;
            type: string;
            'x-decorator': string;
            'x-component': string;
            properties: {
                type: {
                    'x-component': string;
                    'x-component-props': {
                        allowClear: boolean;
                    };
                    default: string;
                    enum: {
                        label: string;
                        value: string;
                    }[];
                };
                fixed: {
                    type: string;
                    'x-component': string;
                    'x-component-props': {
                        min: number;
                        addonAfter: string;
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
                ratio: {
                    type: string;
                    'x-component': string;
                    'x-reactions': {
                        dependencies: string[];
                        fulfill: {
                            state: {
                                visible: string;
                            };
                        };
                    }[];
                    properties: {
                        width: {
                            type: string;
                            'x-component': string;
                            'x-component-props': {
                                placeholder: string;
                                min: number;
                            };
                        };
                        colon: {
                            type: string;
                            'x-component': string;
                            'x-component-props': {
                                children: string;
                            };
                        };
                        height: {
                            type: string;
                            'x-component': string;
                            'x-component-props': {
                                placeholder: string;
                                min: number;
                            };
                        };
                    };
                };
            };
        };
    };
};
export default _default;
