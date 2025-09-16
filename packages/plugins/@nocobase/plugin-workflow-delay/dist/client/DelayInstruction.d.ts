/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
import { Instruction, WorkflowVariableInput } from '@nocobase/plugin-workflow/client';
export default class extends Instruction {
    title: string;
    type: string;
    group: string;
    description: string;
    icon: React.JSX.Element;
    fieldset: {
        duration: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            required: boolean;
            properties: {
                unit: {
                    type: string;
                    'x-decorator': string;
                    'x-component': string;
                    'x-component-props': {
                        placeholder: string;
                        className: string;
                        allowClear: boolean;
                    };
                    enum: {
                        value: number;
                        label: string;
                    }[];
                    default: number;
                };
                duration: {
                    type: string;
                    'x-decorator': string;
                    'x-component': string;
                    'x-component-props': {
                        placeholder: string;
                        useTypedConstant: (string | {
                            min: number;
                        })[][];
                        nullable: boolean;
                        parseOptions: {
                            defaultTypeOnNull: string;
                        };
                    };
                    default: number;
                    required: boolean;
                };
            };
        };
        endStatus: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            enum: {
                label: string;
                value: number;
            }[];
            required: boolean;
            default: number;
        };
    };
    components: {
        WorkflowVariableInput: typeof WorkflowVariableInput;
        Space: React.ForwardRefExoticComponent<import("antd").SpaceProps & React.RefAttributes<HTMLDivElement>> & {
            Compact: React.FC<import("antd/es/space/Compact").SpaceCompactProps>;
        };
    };
    isAvailable({ engine, workflow, upstream, branchIndex }: {
        engine: any;
        workflow: any;
        upstream: any;
        branchIndex: any;
    }): boolean;
}
