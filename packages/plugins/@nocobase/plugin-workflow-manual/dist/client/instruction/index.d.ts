/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
import { SchemaInitializerItemType } from '@nocobase/client';
import { Instruction, WorkflowVariableTextArea, useNodeContext } from '@nocobase/plugin-workflow/client';
import { SchemaConfig, SchemaConfigButton } from './SchemaConfig';
import { ModeConfig } from './ModeConfig';
import { AssigneesSelect } from './AssigneesSelect';
declare function useVariables({ key, title, config }: {
    key: any;
    title: any;
    config: any;
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
    children: {
        key: string;
        value: string;
        label: any;
        title: any;
        children: import("@nocobase/plugin-workflow/client").VariableOption[];
    }[];
};
declare function useInitializers(node: any): SchemaInitializerItemType | null;
export default class extends Instruction {
    title: string;
    type: string;
    group: string;
    description: string;
    icon: React.JSX.Element;
    fieldset: {
        assignees: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {};
            required: boolean;
            default: any[];
        };
        mode: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            default: number;
            'x-reactions': {
                dependencies: string[];
                fulfill: {
                    state: {
                        visible: string;
                    };
                };
            };
        };
        title: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            description: string;
            default: string;
        };
        schema: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            properties: {
                schema: {
                    type: string;
                    'x-component': string;
                    default: any;
                };
            };
        };
        forms: {
            type: string;
            default: {};
        };
    };
    scope: {
        useNodeContext: typeof useNodeContext;
    };
    components: {
        SchemaConfigButton: typeof SchemaConfigButton;
        SchemaConfig: typeof SchemaConfig;
        ModeConfig: typeof ModeConfig;
        AssigneesSelect: typeof AssigneesSelect;
        WorkflowVariableTextArea: typeof WorkflowVariableTextArea;
    };
    useVariables: typeof useVariables;
    useInitializers: typeof useInitializers;
    isAvailable({ engine, workflow, upstream, branchIndex }: {
        engine: any;
        workflow: any;
        upstream: any;
        branchIndex: any;
    }): boolean;
}
export {};
