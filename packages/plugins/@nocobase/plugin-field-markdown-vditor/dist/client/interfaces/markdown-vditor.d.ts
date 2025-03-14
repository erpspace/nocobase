/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { CollectionFieldInterface } from '@nocobase/client';
import { ISchema } from '@formily/react';
export declare const defaultToolbar: string[];
export declare class MarkdownVditorFieldInterface extends CollectionFieldInterface {
    name: string;
    type: string;
    group: string;
    order: number;
    title: any;
    sortable: boolean;
    default: {
        type: string;
        length: string;
        uiSchema: {
            type: string;
            'x-component': string;
        };
    };
    availableTypes: string[];
    properties: {
        'uiSchema.x-component-props.fileCollection': {
            type: string;
            title: any;
            'x-component': string;
            'x-component-props': {
                filter: (collection: any) => boolean;
            };
            'x-decorator': string;
            default: string;
            'x-reactions': {
                fulfill: {
                    schema: {
                        description: any;
                    };
                };
            };
        };
        'uiSchema.x-component-props.toolbar': {
            type: string;
            title: any;
            'x-component': string;
            'x-component-props': {
                mode: string;
            };
            'x-decorator': string;
            default: string[];
            enum: {
                value: string;
                label: any;
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
    schemaInitialize(schema: ISchema, { block }: {
        block: any;
    }): void;
    filterable: {
        operators: ({
            label: string;
            value: string;
            selected: boolean;
            schema: {
                type: string;
                'x-component': string;
            };
            noValue?: undefined;
        } | {
            label: string;
            value: string;
            schema: {
                type: string;
                'x-component': string;
            };
            selected?: undefined;
            noValue?: undefined;
        } | {
            label: string;
            value: string;
            noValue: boolean;
            schema: {
                type: string;
                'x-component': string;
            };
            selected?: undefined;
        })[];
    };
    titleUsable: boolean;
}
