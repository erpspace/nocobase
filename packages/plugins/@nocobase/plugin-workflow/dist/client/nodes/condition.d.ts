/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
import { Instruction } from '.';
import { RadioWithTooltip } from '../components/RadioWithTooltip';
import { useWorkflowVariableOptions, WorkflowVariableTextArea } from '../variable';
import { CalculationConfig } from '../components/Calculation';
export default class extends Instruction {
    title: string;
    type: string;
    group: string;
    description: string;
    icon: React.JSX.Element;
    fieldset: {
        rejectOnFalse: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                disabled: boolean;
            };
            enum: {
                value: boolean;
                label: string;
            }[];
        };
        engine: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                options: unknown;
            };
            required: boolean;
            default: string;
        };
        calculation: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            'x-reactions': {
                dependencies: string[];
                fulfill: {
                    state: {
                        visible: string;
                    };
                };
            };
            required: boolean;
        };
        expression: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                changeOnSelect: boolean;
            };
            "x-validator"(value: any, rules: any, { form }: {
                form: any;
            }): string;
            'x-reactions': {
                dependencies: string[];
                fulfill: {
                    state: {
                        visible: string;
                    };
                    schema: {
                        description: string;
                    };
                };
            };
            required: boolean;
        };
    };
    presetFieldset: {
        rejectOnFalse: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            enum: {
                label: string;
                value: boolean;
            }[];
            default: boolean;
        };
    };
    branching: ({ rejectOnFalse }?: {
        rejectOnFalse?: boolean;
    }) => false | ({
        label: string;
        value: boolean;
    } | {
        label: string;
        value: 1;
    } | {
        label: string;
        value: 0;
    })[];
    scope: {
        renderEngineReference: (key: string) => React.JSX.Element;
        useWorkflowVariableOptions: typeof useWorkflowVariableOptions;
    };
    components: {
        CalculationConfig: typeof CalculationConfig;
        WorkflowVariableTextArea: typeof WorkflowVariableTextArea;
        RadioWithTooltip: typeof RadioWithTooltip;
    };
    Component({ data }: {
        data: any;
    }): React.JSX.Element;
}
