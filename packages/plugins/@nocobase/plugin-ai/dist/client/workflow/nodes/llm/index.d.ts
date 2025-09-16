/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
import { Instruction } from '@nocobase/plugin-workflow/client';
export declare class LLMInstruction extends Instruction {
    title: string;
    type: string;
    group: string;
    icon: React.JSX.Element;
    fieldset: {
        llmService: {
            type: string;
            title: any;
            name: string;
            required: boolean;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                manual: boolean;
                fieldNames: {
                    label: string;
                    value: string;
                };
                service: {
                    resource: string;
                    action: string;
                    params: {
                        fields: string[];
                    };
                };
            };
        };
        options: {
            type: string;
            'x-component': string;
        };
    };
    components: {
        Settings: React.MemoExoticComponent<import("@formily/reactive-react").ReactFC<unknown>>;
    };
    isAvailable({ engine, workflow }: {
        engine: any;
        workflow: any;
    }): boolean;
    useVariables(node: any, options: any): {
        label: any;
        value: any;
        children: {
            value: string;
            label: string;
        }[];
    };
}
