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
import { Instruction, WorkflowVariableInput } from '@nocobase/plugin-workflow/client';
declare function DynamicExpression({ value, onChange }: {
    value: any;
    onChange: any;
}): React.JSX.Element;
export default class extends Instruction {
    title: string;
    type: string;
    group: string;
    description: string;
    icon: React.JSX.Element;
    fieldset: {
        expression: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            required: boolean;
        };
        scope: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                changeOnSelect: boolean;
                variableOptions: {
                    types: {
                        type: string;
                        options: {
                            collection: string;
                            entity: boolean;
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
            };
        };
    };
    components: {
        DynamicExpression: typeof DynamicExpression;
        WorkflowVariableInput: typeof WorkflowVariableInput;
        ValueBlock: (() => JSX.Element) & {
            Initializer: () => JSX.Element;
            Result: (props: any) => JSX.Element;
            Designer: () => JSX.Element;
        };
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
    useInitializers(node: any): SchemaInitializerItemType;
}
export {};
