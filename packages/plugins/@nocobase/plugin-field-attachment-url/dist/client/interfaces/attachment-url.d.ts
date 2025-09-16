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
export declare class AttachmentURLFieldInterface extends CollectionFieldInterface {
    name: string;
    type: string;
    group: string;
    title: string;
    default: {
        type: string;
        uiSchema: {
            type: string;
            'x-component': string;
            'x-use-component-props': string;
        };
    };
    availableTypes: string[];
    properties: {
        target: {
            required: boolean;
            type: string;
            title: string;
            'x-decorator': string;
            'x-component': string;
            'x-use-component-props': () => {
                service: {
                    resource: string;
                    params: {
                        paginate: boolean;
                    };
                };
                manual: boolean;
                fieldNames: {
                    label: string;
                    value: string;
                };
                onSuccess: (data: any) => void;
            };
            'x-reactions': (field: any) => void;
        };
        targetKey: {
            'x-hidden': boolean;
            default: string;
            type: string;
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
        nested: boolean;
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
