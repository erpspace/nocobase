/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { CollectionFieldInterface } from '@nocobase/client';
export declare class FormulaFieldInterface extends CollectionFieldInterface {
    name: string;
    type: string;
    group: string;
    order: number;
    title: string;
    description: string;
    sortable: boolean;
    default: {
        type: string;
        uiSchema: {
            type: string;
            'x-component': string;
            'x-component-props': {
                stringMode: boolean;
                step: string;
            };
            'x-read-pretty': boolean;
        };
    };
    properties: {
        engine: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            enum: unknown;
            required: boolean;
            default: string;
        };
        expression: {
            type: string;
            title: string;
            required: boolean;
            'x-component': string;
            'x-decorator': string;
            'x-component-props': {
                useCurrentFields: string;
            };
            'x-reactions': {
                dependencies: string[];
                fulfill: {
                    schema: {
                        description: string;
                    };
                };
            };
            "x-validator"(value: any, rules: any, { form }: {
                form: any;
            }): string;
        };
        'uiSchema.x-component-props.dateFormat': any;
        'uiSchema.x-component-props.showTime': any;
        'uiSchema.x-component-props.timeFormat': any;
        dataType: {
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            'x-disabled': string;
            enum: {
                value: string;
                label: string;
            }[];
            required: boolean;
            default: string;
        };
        'uiSchema.x-component-props.step': {
            type: string;
            title: string;
            'x-component': string;
            'x-decorator': string;
            required: boolean;
            default: string;
            enum: {
                value: string;
                label: string;
            }[];
            'x-reactions': {
                dependencies: string[];
                fulfill: {
                    state: {
                        display: string;
                    };
                };
            }[];
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
    titleUsable: boolean;
}
