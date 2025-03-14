/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
import { COLLECTION_NAME } from '../constant';
declare const _default: {
    name: COLLECTION_NAME;
    migrationRules: string[];
    title: string;
    fields: ({
        name: string;
        type: string;
        primaryKey: boolean;
        allowNull: boolean;
        interface: string;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            'x-read-pretty': boolean;
            enum?: undefined;
            required?: undefined;
            'x-component-props'?: undefined;
            autoSize?: undefined;
        };
        field?: undefined;
    } | {
        name: string;
        type: string;
        interface: string;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            'x-read-pretty'?: undefined;
            enum?: undefined;
            required?: undefined;
            'x-component-props'?: undefined;
            autoSize?: undefined;
        };
        primaryKey?: undefined;
        allowNull?: undefined;
        field?: undefined;
    } | {
        name: string;
        type: string;
        interface: string;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            enum: string;
            required: boolean;
            'x-read-pretty'?: undefined;
            'x-component-props'?: undefined;
            autoSize?: undefined;
        };
        primaryKey?: undefined;
        allowNull?: undefined;
        field?: undefined;
    } | {
        name: string;
        type: string;
        interface: string;
        uiSchema: {
            type: string;
            'x-component': string;
            enum: {
                label: string;
                value: string;
                color: string;
            }[];
            title: string;
            'x-read-pretty'?: undefined;
            required?: undefined;
            'x-component-props'?: undefined;
            autoSize?: undefined;
        };
        primaryKey?: undefined;
        allowNull?: undefined;
        field?: undefined;
    } | {
        name: string;
        type: string;
        interface: string;
        uiSchema: {
            'x-component': string;
            title: string;
            'x-component-props': {
                autoSize: {
                    minRows: number;
                };
            };
            autoSize: {
                minRows: number;
            };
            type?: undefined;
            'x-read-pretty'?: undefined;
            enum?: undefined;
            required?: undefined;
        };
        primaryKey?: undefined;
        allowNull?: undefined;
        field?: undefined;
    } | {
        name: string;
        type: string;
        interface: string;
        field: string;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            'x-component-props': {
                autoSize?: undefined;
            };
            'x-read-pretty': boolean;
            enum?: undefined;
            required?: undefined;
            autoSize?: undefined;
        };
        primaryKey?: undefined;
        allowNull?: undefined;
    })[];
};
export default _default;
