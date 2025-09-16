/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
import { VariableOption, WorkflowVariableInput, WorkflowVariableTextArea, Instruction, RadioWithTooltip, CalculationConfig } from '@nocobase/plugin-workflow/client';
declare function LoopCondition({ value, onChange }: {
    value: any;
    onChange: any;
}): React.JSX.Element;
declare function useScopeVariables(node: any, options: any): VariableOption[];
declare function LoopVariableTextArea({ variableOptions, ...props }: {
    [x: string]: any;
    variableOptions: any;
}): JSX.Element;
export default class extends Instruction {
    title: string;
    type: string;
    group: string;
    description: string;
    icon: React.JSX.Element;
    fieldset: {
        target: {
            type: string;
            title: string;
            description: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                changeOnSelect: boolean;
                nullable: boolean;
                useTypedConstant: (string | (string | {
                    step: number;
                    min: number;
                    precision: number;
                })[])[];
                className: string;
            };
            required: boolean;
            default: number;
            'x-reactions': {
                target: string;
                effects: string[];
                fulfill: {
                    state: {
                        value: string;
                    };
                };
            }[];
        };
        condition: {
            type: string;
            'x-decorator': string;
            'x-component': string;
            'x-reactions': {
                dependencies: string[];
                fulfill: {
                    state: {
                        visible: string;
                    };
                };
            }[];
            default: boolean;
        };
        exit: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                direction: string;
                options: {
                    label: string;
                    value: number;
                }[];
            };
            default: number;
        };
    };
    branching: boolean;
    scope: {
        renderEngineReference: (key: string) => React.JSX.Element;
    };
    components: {
        LoopCondition: typeof LoopCondition;
        WorkflowVariableInput: typeof WorkflowVariableInput;
        WorkflowVariableTextArea: typeof WorkflowVariableTextArea;
        LoopVariableTextArea: typeof LoopVariableTextArea;
        RadioWithTooltip: typeof RadioWithTooltip;
        CalculationConfig: typeof CalculationConfig;
    };
    Component({ data }: {
        data: any;
    }): React.JSX.Element;
    useScopeVariables: typeof useScopeVariables;
}
export {};
