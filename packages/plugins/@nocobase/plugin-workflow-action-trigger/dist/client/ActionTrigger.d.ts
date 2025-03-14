/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { SchemaInitializerItemType, useCollectionDataSource } from '@nocobase/client';
import { Trigger, useWorkflowAnyExecuted, CheckboxGroupWithTooltip, RadioWithTooltip, TriggerCollectionRecordSelect, WorkflowVariableWrapper } from '@nocobase/plugin-workflow/client';
import React from 'react';
declare function useVariables(config: any, options: any): import("@nocobase/plugin-workflow/client").VariableOption[];
export default class extends Trigger {
    title: string;
    description: string;
    fieldset: {
        collection: {
            type: string;
            required: boolean;
            'x-decorator': string;
            'x-decorator-props': {
                tooltip: string;
            };
            'x-component': string;
            'x-disabled': string;
            title: string;
            'x-reactions': {
                target: string;
                effects: string[];
                fulfill: {
                    state: {
                        value: any[];
                    };
                };
            }[];
        };
        global: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                direction: string;
                options: {
                    label: string;
                    value: boolean;
                }[];
            };
            default: boolean;
            'x-reactions': {
                dependencies: string[];
                fulfill: {
                    state: {
                        visible: string;
                    };
                };
            }[];
        };
        actions: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                direction: string;
                options: {
                    label: string;
                    value: string;
                }[];
            };
            required: boolean;
            'x-reactions': {
                dependencies: string[];
                fulfill: {
                    state: {
                        visible: string;
                    };
                };
            }[];
        };
        appends: {
            type: string;
            title: string;
            description: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
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
    triggerFieldset: {
        data: {
            type: string;
            title: string;
            description: string;
            'x-decorator': string;
            'x-component': string;
            default: any;
            required: boolean;
        };
        userId: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                nullable: boolean;
                changeOnSelect: boolean;
                variableOptions: {
                    types: ((field: any) => boolean)[];
                };
                render(props: any): React.JSX.Element;
            };
            default: any;
            required: boolean;
        };
        roleName: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                nullable: boolean;
                changeOnSelect: boolean;
                variableOptions: {
                    types: ((field: any) => boolean)[];
                };
                render(props: any): React.JSX.Element;
            };
            default: any;
        };
    };
    validate(values: any): any;
    scope: {
        useCollectionDataSource: typeof useCollectionDataSource;
        useWorkflowAnyExecuted: typeof useWorkflowAnyExecuted;
    };
    components: {
        RadioWithTooltip: typeof RadioWithTooltip;
        CheckboxGroupWithTooltip: typeof CheckboxGroupWithTooltip;
        TriggerCollectionRecordSelect: typeof TriggerCollectionRecordSelect;
        WorkflowVariableWrapper: typeof WorkflowVariableWrapper;
    };
    isActionTriggerable: (config: any, context: any) => boolean;
    useVariables: typeof useVariables;
    useInitializers(config: any): SchemaInitializerItemType | null;
}
export {};
