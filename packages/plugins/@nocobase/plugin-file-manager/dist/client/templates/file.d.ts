/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { CollectionTemplate } from '@nocobase/client';
export declare class FileCollectionTemplate extends CollectionTemplate {
    name: string;
    title: string;
    order: number;
    color: string;
    default: {
        createdBy: boolean;
        updatedBy: boolean;
        fields: ({
            interface: string;
            type: string;
            name: string;
            deletable: boolean;
            uiSchema: {
                type: string;
                title: string;
                'x-component': string;
                'x-read-pretty'?: undefined;
                'x-component-props'?: undefined;
            };
            field?: undefined;
            target?: undefined;
            foreignKey?: undefined;
            defaultValue?: undefined;
        } | {
            interface: string;
            type: string;
            name: string;
            deletable: boolean;
            uiSchema: {
                type: string;
                title: string;
                'x-component': string;
                'x-read-pretty': boolean;
                'x-component-props'?: undefined;
            };
            field?: undefined;
            target?: undefined;
            foreignKey?: undefined;
            defaultValue?: undefined;
        } | {
            interface: string;
            type: string;
            name: string;
            deletable: boolean;
            uiSchema: {
                type: string;
                title: string;
                'x-component': string;
                'x-read-pretty': boolean;
                'x-component-props': {
                    stringMode: boolean;
                    step: string;
                    fieldNames?: undefined;
                };
            };
            field?: undefined;
            target?: undefined;
            foreignKey?: undefined;
            defaultValue?: undefined;
        } | {
            interface: string;
            type: string;
            name: string;
            field: string;
            deletable: boolean;
            uiSchema: {
                type: string;
                title: string;
                'x-component': string;
                'x-read-pretty': boolean;
                'x-component-props'?: undefined;
            };
            target?: undefined;
            foreignKey?: undefined;
            defaultValue?: undefined;
        } | {
            type: string;
            name: string;
            target: string;
            foreignKey: string;
            deletable: boolean;
            interface: string;
            uiSchema: {
                type: string;
                title: string;
                'x-component': string;
                'x-component-props': {
                    fieldNames: {
                        value: string;
                        label: string;
                    };
                    stringMode?: undefined;
                    step?: undefined;
                };
                'x-read-pretty': boolean;
            };
            field?: undefined;
            defaultValue?: undefined;
        } | {
            type: string;
            name: string;
            deletable: boolean;
            defaultValue: {};
            interface?: undefined;
            uiSchema?: undefined;
            field?: undefined;
            target?: undefined;
            foreignKey?: undefined;
        })[];
    };
    presetFieldsDisabled: boolean;
    configurableProperties: {
        name: any;
        createdAt: any;
        updatedAt: any;
        title: any;
        description: any;
        inherits: any;
        category: any;
        autoGenId: any;
        createdBy: any;
        updatedBy: any;
        sortable: any;
        simplePaginate: any;
        presetFields: any;
        storage: {
            type: string;
            name: string;
            title: string;
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
    };
}
