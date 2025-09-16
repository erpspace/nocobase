/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { ISchema } from '@nocobase/client';
export declare const sourceCollection: {
    name: string;
    sortable: boolean;
    filterTargetKey: string;
    fields: ({
        name: string;
        type: string;
        interface: string;
        uiSchema?: undefined;
        allowNull?: undefined;
    } | {
        interface: string;
        type: string;
        name: string;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            required: boolean;
            dataSource?: undefined;
        };
        allowNull?: undefined;
    } | {
        interface: string;
        type: string;
        name: string;
        allowNull: boolean;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            required: boolean;
            dataSource: string;
        };
    } | {
        type: string;
        name: string;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            required?: undefined;
            dataSource?: undefined;
        };
        interface?: undefined;
        allowNull?: undefined;
    })[];
};
export declare const taskCollection: {
    name: string;
    filterTargetKey: string;
    fields: ({
        name: string;
        type: string;
        interface: string;
        allowNull?: undefined;
        uiSchema?: undefined;
        target?: undefined;
        targetKey?: undefined;
        foreignKey?: undefined;
    } | {
        name: string;
        interface: string;
        type: string;
        allowNull: boolean;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            required: boolean;
            'x-component-props'?: undefined;
            'x-read-pretty'?: undefined;
            enum?: undefined;
        };
        target?: undefined;
        targetKey?: undefined;
        foreignKey?: undefined;
    } | {
        name: string;
        interface: string;
        type: string;
        target: string;
        targetKey: string;
        foreignKey: string;
        allowNull: boolean;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            'x-component-props': {
                fieldNames: {
                    value: string;
                    label: string;
                };
                precision?: undefined;
            };
            required: boolean;
            'x-read-pretty': boolean;
            enum?: undefined;
        };
    } | {
        name: string;
        interface: string;
        type: string;
        allowNull: boolean;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            required: boolean;
            enum: {
                label: string;
                value: string;
                color: string;
            }[];
            'x-component-props'?: undefined;
            'x-read-pretty'?: undefined;
        };
        target?: undefined;
        targetKey?: undefined;
        foreignKey?: undefined;
    } | {
        name: string;
        interface: string;
        type: string;
        allowNull: boolean;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            'x-component-props': {
                precision: number;
                fieldNames?: undefined;
            };
            required: boolean;
            'x-read-pretty'?: undefined;
            enum?: undefined;
        };
        target?: undefined;
        targetKey?: undefined;
        foreignKey?: undefined;
    })[];
};
export declare const createFormSchema: ISchema;
export declare const tasksTableBlockSchema: ISchema;
export declare const userDataSyncSourcesSchema: ISchema;
