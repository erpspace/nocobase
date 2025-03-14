/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { Instruction } from '.';
import { WorkflowVariableInput } from '../variable';
export default class extends Instruction {
    title: string;
    type: string;
    group: string;
    description: string;
    fieldset: {
        result: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                useTypedConstant: boolean;
            };
            required: boolean;
        };
    };
    components: {
        WorkflowVariableInput: typeof WorkflowVariableInput;
    };
}
