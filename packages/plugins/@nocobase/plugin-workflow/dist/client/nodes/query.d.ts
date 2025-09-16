/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
import { SchemaInitializerItemType, useCollectionDataSource } from '@nocobase/client';
import { FilterDynamicComponent } from '../components/FilterDynamicComponent';
import { WorkflowVariableInput } from '../variable';
import { Instruction, useNodeSavedConfig } from '.';
import { RadioWithTooltip } from '../components';
declare function useVariables({ key: name, title, config }: {
    key: any;
    title: any;
    config: any;
}, options: any): import("../variable").VariableOption;
export default class extends Instruction {
    title: string;
    type: string;
    group: string;
    description: string;
    icon: React.JSX.Element;
    fieldset: {
        collection: {
            'x-disabled': string;
            'x-reactions': any[];
            type: string;
            title: string;
            required: boolean;
            'x-decorator': string;
            'x-component': string;
        };
        multiple: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                options: {
                    label: string;
                    value: boolean;
                    tooltip: string;
                }[];
            };
            required: boolean;
            default: boolean;
        };
        params: {
            type: string;
            'x-component': string;
            properties: {
                filter: {
                    type: string;
                    title: string;
                    'x-decorator': string;
                    'x-component': string;
                    'x-use-component-props': () => {
                        options: any[];
                        className: string;
                    };
                    'x-component-props': {
                        dynamicComponent: string;
                    };
                };
                sort: {
                    type: string;
                    title: string;
                    'x-decorator': string;
                    'x-component': string;
                    items: {
                        type: string;
                        properties: {
                            space: {
                                type: string;
                                'x-component': string;
                                properties: {
                                    sort: {
                                        type: string;
                                        'x-decorator': string;
                                        'x-component': string;
                                    };
                                    field: {
                                        type: string;
                                        enum: string;
                                        required: boolean;
                                        'x-decorator': string;
                                        'x-component': string;
                                        'x-component-props': {
                                            style: {
                                                width: number;
                                            };
                                        };
                                    };
                                    direction: {
                                        type: string;
                                        'x-decorator': string;
                                        'x-component': string;
                                        'x-component-props': {
                                            optionType: string;
                                        };
                                        enum: {
                                            label: string;
                                            value: string;
                                        }[];
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
                pagination: {
                    type: string;
                    title: string;
                    'x-decorator': string;
                    'x-decorator-props': {
                        value: {
                            designable: boolean;
                        };
                    };
                    'x-component': string;
                    properties: {
                        row: {
                            type: string;
                            'x-component': string;
                            properties: {
                                page: {
                                    type: string;
                                    'x-component': string;
                                    properties: {
                                        page: {
                                            type: string;
                                            title: string;
                                            'x-decorator': string;
                                            'x-component': string;
                                            'x-component-props': {
                                                useTypedConstant: string[];
                                            };
                                            default: number;
                                        };
                                    };
                                };
                                pageSize: {
                                    type: string;
                                    'x-component': string;
                                    properties: {
                                        pageSize: {
                                            type: string;
                                            title: string;
                                            'x-decorator': string;
                                            'x-component': string;
                                            'x-component-props': {
                                                min: number;
                                            };
                                            default: number;
                                        };
                                    };
                                };
                            };
                        };
                    };
                };
                appends: {
                    type: string;
                    title: string;
                    description: string;
                    'x-decorator': string;
                    'x-component': string;
                    'x-component-props': {
                        title: string;
                        multiple: boolean;
                        useCollection(): any;
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
            'x-reactions': {
                dependencies: string[];
                fulfill: {
                    state: {
                        visible: string;
                    };
                };
            }[];
        };
        failOnEmpty: {
            type: string;
            'x-decorator': string;
            'x-component': string;
            'x-content': string;
        };
    };
    scope: {
        useNodeSavedConfig: typeof useNodeSavedConfig;
        useCollectionDataSource: typeof useCollectionDataSource;
        useSortableFields(): {
            value: any;
            label: any;
        }[];
    };
    components: {
        ArrayItems: import("@formily/react").ReactFC<React.HTMLAttributes<HTMLDivElement>> & import("@formily/antd-v5").ArrayBaseMixins & {
            Item: import("@formily/react").ReactFC<React.HTMLAttributes<HTMLDivElement> & {
                type?: "divide" | "card";
            }>;
        };
        FilterDynamicComponent: typeof FilterDynamicComponent;
        SchemaComponentContext: React.Context<import("@nocobase/client").ISchemaComponentContext>;
        WorkflowVariableInput: typeof WorkflowVariableInput;
        RadioWithTooltip: typeof RadioWithTooltip;
    };
    useVariables: typeof useVariables;
    useInitializers(node: any): SchemaInitializerItemType | null;
}
export {};
