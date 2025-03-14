/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
import { RadioWithTooltip, Instruction } from '@nocobase/plugin-workflow/client';
export default class extends Instruction {
    title: string;
    type: string;
    group: string;
    description: string;
    icon: React.JSX.Element;
    fieldset: {
        mode: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                options: {
                    value: string;
                    label: string;
                    tooltip: string;
                }[];
            };
            default: string;
        };
    };
    branching: boolean;
    components: {
        RadioWithTooltip: typeof RadioWithTooltip;
    };
    Component({ data }: {
        data: any;
    }): React.JSX.Element;
}
