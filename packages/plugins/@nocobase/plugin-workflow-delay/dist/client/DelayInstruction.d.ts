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
declare function Duration({ value, onChange }: {
    value?: number;
    onChange: any;
}): React.JSX.Element;
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
            default: number;
            required: boolean;
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
        Duration: typeof Duration;
    };
    isAvailable({ engine, workflow, upstream, branchIndex }: {
        engine: any;
        workflow: any;
        upstream: any;
        branchIndex: any;
    }): boolean;
}
export {};
