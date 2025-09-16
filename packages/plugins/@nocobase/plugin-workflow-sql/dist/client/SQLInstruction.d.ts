/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Instruction, WorkflowVariableRawTextArea } from '@nocobase/plugin-workflow/client';
import React from 'react';
export default class extends Instruction {
    title: string;
    type: string;
    group: string;
    description: string;
    icon: React.JSX.Element;
    fieldset: {
        dataSource: {
            type: string;
            required: boolean;
            title: string;
            description: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                className: string;
                filter(item: any): any;
            };
            default: string;
        };
        sql: {
            type: string;
            required: boolean;
            title: string;
            description: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                rows: number;
                className: string;
            };
        };
        withMeta: {
            type: string;
            'x-decorator': string;
            'x-component': string;
            'x-content': string;
        };
    };
    scope: {
        sqlDescription(): React.JSX.Element;
    };
    components: {
        WorkflowVariableRawTextArea: typeof WorkflowVariableRawTextArea;
    };
    useVariables({ key, title }: {
        key: any;
        title: any;
    }, { types, fieldNames }: {
        types: any;
        fieldNames?: {
            readonly label: "label";
            readonly value: "value";
            readonly children: "children";
        };
    }): {
        value: any;
        label: any;
    };
    testable: boolean;
}
