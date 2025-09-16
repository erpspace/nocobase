/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
import { useCollectionDataSource } from '@nocobase/client';
import { AssignedFieldsFormSchemaConfig } from '../components/AssignedFieldsFormSchemaConfig';
import { FilterDynamicComponent } from '../components/FilterDynamicComponent';
import { RadioWithTooltip } from '../components/RadioWithTooltip';
import { Instruction, useNodeSavedConfig } from '.';
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
        params: {
            type: string;
            properties: {
                individualHooks: {
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
                    default: boolean;
                };
                filter: {
                    title: string;
                    "x-validator"(value: any): string;
                    type: string;
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
                values: {
                    'x-reactions': {
                        dependencies: string[];
                        fulfill: {
                            state: {
                                display: string;
                            };
                        };
                    }[];
                    type: string;
                    title: string;
                    description: string;
                    'x-decorator': string;
                    'x-decorator-props': {
                        labelAlign: string;
                        className: string;
                    };
                    'x-component': string;
                };
            };
        };
        usingAssignFormSchema: {
            type: string;
        };
        assignFormSchema: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            'x-reactions': {
                dependencies: string[];
                fulfill: {
                    state: {
                        display: string;
                    };
                };
            }[];
        };
    };
    createDefaultConfig(): {
        usingAssignFormSchema: boolean;
        assignFormSchema: {};
    };
    scope: {
        useCollectionDataSource: typeof useCollectionDataSource;
        useNodeSavedConfig: typeof useNodeSavedConfig;
    };
    components: {
        FilterDynamicComponent: typeof FilterDynamicComponent;
        CollectionFieldset: React.MemoExoticComponent<import("@formily/reactive-react").ReactFC<Omit<any, "ref">>>;
        AssignedFieldsFormSchemaConfig: typeof AssignedFieldsFormSchemaConfig;
        RadioWithTooltip: typeof RadioWithTooltip;
    };
}
