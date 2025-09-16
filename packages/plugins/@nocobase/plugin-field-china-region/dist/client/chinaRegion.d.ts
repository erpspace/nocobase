/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { CollectionFieldInterface } from '@nocobase/client';
export declare class ChinaRegionFieldInterface extends CollectionFieldInterface {
    name: string;
    type: string;
    group: string;
    order: number;
    title: string;
    isAssociation: boolean;
    default: {
        interface: string;
        type: string;
        target: string;
        targetKey: string;
        sortBy: string;
        uiSchema: {
            type: string;
            'x-component': string;
            'x-component-props': {
                useDataSource: string;
                useLoadData: string;
                changeOnSelectLast: boolean;
                labelInValue: boolean;
                maxLevel: number;
                fieldNames: {
                    label: string;
                    value: string;
                    children: string;
                };
            };
        };
    };
    availableTypes: string[];
    initialize(values: any): void;
    properties: {
        'uiSchema.x-component-props.maxLevel': {
            type: string;
            'x-component': string;
            'x-decorator': string;
            title: string;
            default: number;
            enum: ({
                value: number;
                label: string;
                disabled?: undefined;
            } | {
                value: number;
                label: string;
                disabled: boolean;
            })[];
        };
        'uiSchema.x-component-props.changeOnSelectLast': {
            type: string;
            'x-component': string;
            'x-content': string;
            'x-decorator': string;
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
