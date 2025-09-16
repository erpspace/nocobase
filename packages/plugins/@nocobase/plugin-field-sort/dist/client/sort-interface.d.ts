/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { CollectionFieldInterface } from '@nocobase/client';
export declare class SortFieldInterface extends CollectionFieldInterface {
    name: string;
    type: string;
    group: string;
    order: number;
    title: string;
    sortable: boolean;
    titleUsable: boolean;
    description: string;
    default: {
        type: string;
        uiSchema: {
            type: string;
            'x-component': string;
            'x-component-props': {
                stringMode: boolean;
                step: string;
            };
            'x-validator': string;
        };
    };
    availableTypes: string[];
    hasDefaultValue: boolean;
    properties: {
        scopeKey: {
            type: string;
            title: string;
            'x-disabled': string;
            'x-decorator': string;
            'x-component': string;
            enum: string;
            description: string;
        };
        'uiSchema.title': {
            type: string;
            title: string;
            required: boolean;
            'x-decorator': string;
            'x-component': string;
        };
        name: {
            type: string;
            title: string;
            required: boolean;
            'x-disabled': string;
            'x-decorator': string;
            'x-component': string;
            'x-validator': string;
            description: string;
        };
    };
    filterable: {
        operators: ({
            label: string;
            value: string;
            selected: boolean;
            noValue?: undefined;
        } | {
            label: string;
            value: string;
            selected?: undefined;
            noValue?: undefined;
        } | {
            label: string;
            value: string;
            noValue: boolean;
            selected?: undefined;
        })[];
    };
    validateSchema: (fieldSchema: any) => {
        maximum: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                precision: number;
            };
            'x-reactions': string;
        };
        minimum: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                precision: number;
            };
            'x-reactions': {
                dependencies: string[];
                fulfill: {
                    state: {
                        selfErrors: string;
                    };
                };
            };
        };
        format: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                allowClear: boolean;
            };
            enum: {
                label: string;
                value: string;
            }[];
        };
        pattern: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                prefix: string;
                suffix: string;
            };
        };
    };
}
