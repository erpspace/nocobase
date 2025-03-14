/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
export declare const useAuditLogsCollection: () => {
    name: string;
    title: string;
    fields: ({
        name: string;
        type: string;
        interface: string;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            'x-component-props': {
                showTime: boolean;
                ellipsis: boolean;
                fieldNames?: undefined;
            };
            'x-read-pretty': boolean;
            enum?: undefined;
        };
        collectionName?: undefined;
        target?: undefined;
        targetKey?: undefined;
        sourceKey?: undefined;
        foreignKey?: undefined;
    } | {
        name: string;
        type: string;
        interface: string;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            'x-component-props': {
                ellipsis: boolean;
                showTime?: undefined;
                fieldNames?: undefined;
            };
            'x-read-pretty': boolean;
            enum: {
                label: string;
                value: string;
                color: string;
            }[];
        };
        collectionName?: undefined;
        target?: undefined;
        targetKey?: undefined;
        sourceKey?: undefined;
        foreignKey?: undefined;
    } | {
        name: string;
        type: string;
        interface: string;
        uiSchema: {
            title: string;
            type: string;
            'x-component': string;
            'x-component-props': {
                ellipsis: boolean;
                showTime?: undefined;
                fieldNames?: undefined;
            };
            'x-read-pretty'?: undefined;
            enum?: undefined;
        };
        collectionName?: undefined;
        target?: undefined;
        targetKey?: undefined;
        sourceKey?: undefined;
        foreignKey?: undefined;
    } | {
        collectionName: string;
        name: string;
        type: string;
        interface: string;
        target: string;
        targetKey: string;
        sourceKey: string;
        foreignKey: string;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            'x-component-props': {
                fieldNames: {
                    value: string;
                    label: string;
                };
                ellipsis: boolean;
                showTime?: undefined;
            };
            'x-read-pretty': boolean;
            enum?: undefined;
        };
    } | {
        name: string;
        collectionName: string;
        type: string;
        interface: string;
        targetKey: string;
        foreignKey: string;
        target: string;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            'x-component-props': {
                fieldNames: {
                    value: string;
                    label: string;
                };
                ellipsis: boolean;
                showTime?: undefined;
            };
            'x-read-pretty': boolean;
            enum?: undefined;
        };
        sourceKey?: undefined;
    } | {
        name: string;
        collectionName: string;
        type: string;
        interface: string;
        target: string;
        foreignKey: string;
        targetKey: string;
        uiSchema: {
            type: string;
            title: string;
            'x-component'?: undefined;
            'x-component-props'?: undefined;
            'x-read-pretty'?: undefined;
            enum?: undefined;
        };
        sourceKey?: undefined;
    })[];
};
export declare const useAuditChangesCollection: () => {
    name: string;
    title: string;
    fields: {
        name: string;
        type: string;
        interface: string;
        uiSchema: {
            title: string;
            'x-component': string;
        };
    }[];
};
export declare const useCollectionsCollection: () => {
    name: string;
    title: string;
    fields: {
        name: string;
        type: string;
        interface: string;
        uiSchema: {
            title: string;
            type: string;
            'x-component': string;
            'x-component-props': {
                ellipsis: boolean;
            };
        };
    }[];
};
