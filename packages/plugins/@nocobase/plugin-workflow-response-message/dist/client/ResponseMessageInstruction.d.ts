/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This program is offered under a commercial license.
 * For more information, see <https://www.nocobase.com/agreement>
 */
import React from 'react';
import { Instruction, RadioWithTooltip, WorkflowVariableInput, WorkflowVariableTextArea } from '@nocobase/plugin-workflow/client';
export default class extends Instruction {
    title: string;
    type: string;
    group: string;
    description: string;
    icon: React.JSX.Element;
    fieldset: {
        message: {
            type: string;
            title: string;
            description: string;
            'x-decorator': string;
            'x-component': string;
        };
        info: {
            type: string;
            'x-component': string;
            'x-component-props': {
                direction: string;
            };
            properties: {
                success: {
                    type: string;
                    'x-component': string;
                    'x-component-props': {
                        type: string;
                        showIcon: boolean;
                        description: string;
                    };
                };
                failure: {
                    type: string;
                    'x-component': string;
                    'x-component-props': {
                        type: string;
                        showIcon: boolean;
                        description: string;
                    };
                };
            };
        };
    };
    scope: {};
    components: {
        RadioWithTooltip: typeof RadioWithTooltip;
        WorkflowVariableTextArea: typeof WorkflowVariableTextArea;
        WorkflowVariableInput: typeof WorkflowVariableInput;
        Alert: React.ForwardRefExoticComponent<import("antd").AlertProps & React.RefAttributes<import("antd/es/alert/Alert").AlertRef>> & {
            ErrorBoundary: typeof import("antd/es/alert/ErrorBoundary").default;
        };
        Space: React.ForwardRefExoticComponent<import("antd").SpaceProps & React.RefAttributes<HTMLDivElement>> & {
            Compact: React.FC<import("antd/es/space/Compact").SpaceCompactProps>;
        };
    };
    isAvailable({ workflow, upstream, branchIndex }: {
        workflow: any;
        upstream: any;
        branchIndex: any;
    }): any;
}
