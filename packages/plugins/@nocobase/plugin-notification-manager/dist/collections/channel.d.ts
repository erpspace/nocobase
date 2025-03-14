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
    filterTargetKey: string;
    autoGenId: boolean;
    createdAt: boolean;
    createdBy: boolean;
    updatedAt: boolean;
    updatedBy: boolean;
    fields: ({
        name: string;
        type: string;
        prefix: string;
        primaryKey: boolean;
        interface: string;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            required: boolean;
            description: string;
            enum?: undefined;
        };
    } | {
        name: string;
        type: string;
        interface: string;
        uiSchema: {
            type: string;
            'x-component': string;
            title: string;
            required: boolean;
            description?: undefined;
            enum?: undefined;
        };
        prefix?: undefined;
        primaryKey?: undefined;
    } | {
        name: string;
        type: string;
        interface: string;
        uiSchema: {
            type: string;
            'x-component': string;
            title?: undefined;
            required?: undefined;
            description?: undefined;
            enum?: undefined;
        };
        prefix?: undefined;
        primaryKey?: undefined;
    } | {
        name: string;
        type: string;
        interface: string;
        prefix?: undefined;
        primaryKey?: undefined;
        uiSchema?: undefined;
    } | {
        interface: string;
        type: string;
        name: string;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            enum: string;
            required: boolean;
            description?: undefined;
        };
        prefix?: undefined;
        primaryKey?: undefined;
    } | {
        name: string;
        type: string;
        interface: string;
        uiSchema: {
            type: string;
            'x-component': string;
            title: string;
            required?: undefined;
            description?: undefined;
            enum?: undefined;
        };
        prefix?: undefined;
        primaryKey?: undefined;
    })[];
};
export default _default;
