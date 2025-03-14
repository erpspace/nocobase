/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ISchema } from '@formily/react';
import { CollectionFieldInterface } from '@nocobase/client';
export declare class AttachmentFieldInterface extends CollectionFieldInterface {
    name: string;
    type: string;
    group: string;
    title: string;
    isAssociation: boolean;
    default: {
        type: string;
        target: string;
        uiSchema: {
            type: string;
            'x-component': string;
            'x-use-component-props': string;
        };
    };
    availableTypes: string[];
    schemaInitialize(schema: ISchema, { block, field }: {
        block: any;
        field: any;
    }): void;
    initialize(values: any): void;
    properties: {
        'uiSchema.x-component-props.accept': {
            type: string;
            title: string;
            'x-component': string;
            'x-component-props': {
                placeholder: string;
            };
            'x-decorator': string;
            description: string;
        };
        'uiSchema.x-component-props.multiple': {
            type: string;
            'x-content': string;
            'x-decorator': string;
            'x-component': string;
            default: boolean;
        };
        storage: {
            type: string;
            title: string;
            description: string;
            'x-decorator': string;
            'x-component': string;
            'x-component-props': {
                service: {
                    resource: string;
                    params: {};
                };
                manual: boolean;
                fieldNames: {
                    label: string;
                    value: string;
                };
            };
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
        children: {
            name: string;
            title: string;
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
            schema: {
                title: string;
                type: string;
                'x-component': string;
            };
        }[];
    };
}
