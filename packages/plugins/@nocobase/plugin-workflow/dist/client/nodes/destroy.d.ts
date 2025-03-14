/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import React from 'react';
import { useCollectionDataSource } from '@nocobase/client';
import { FilterDynamicComponent } from '../components/FilterDynamicComponent';
import { Instruction, useNodeSavedConfig } from '.';
export default class extends Instruction {
    title: string;
    type: string;
    group: string;
    description: string;
    icon: React.JSX.Element;
    fieldset: {
        collection: {
            'x-disabled': string;
            'x-reactions': any[];
            type: string;
            title: string;
            required: boolean;
            'x-decorator': string;
            'x-component': string;
        };
        params: {
            type: string;
            properties: {
                filter: {
                    "x-validator"(value: any): string;
                    type: string;
                    title: string;
                    'x-decorator': string;
                    'x-component': string;
                    'x-use-component-props': () => {
                        options: any[];
                        className: string;
                    };
                    'x-component-props': {
                        dynamicComponent: string;
                    };
                };
            };
        };
    };
    scope: {
        useNodeSavedConfig: typeof useNodeSavedConfig;
        useCollectionDataSource: typeof useCollectionDataSource;
    };
    components: {
        FilterDynamicComponent: typeof FilterDynamicComponent;
    };
}
