/**
 * This file is part of the NocoBase (R) project.
 * Copyright (c) 2020-2024 NocoBase Co., Ltd.
 * Authors: NocoBase Team.
 *
 * This project is dual-licensed under AGPL-3.0 and NocoBase Commercial License.
 * For more information, please refer to: https://www.nocobase.com/agreement.
 */
declare const _default: {
    name: string;
    dumpRules: {
        group: string;
    };
    migrationRules: string[];
    shared: boolean;
    createdAt: boolean;
    updatedAt: boolean;
    fields: ({
        type: string;
        name: string;
        primaryKey: boolean;
        autoIncrement: boolean;
        target?: undefined;
        foreignKey?: undefined;
        interface?: undefined;
        uiSchema?: undefined;
        onDelete?: undefined;
        defaultValue?: undefined;
    } | {
        type: string;
        name: string;
        target: string;
        foreignKey: string;
        primaryKey: boolean;
        autoIncrement?: undefined;
        interface?: undefined;
        uiSchema?: undefined;
        onDelete?: undefined;
        defaultValue?: undefined;
    } | {
        type: string;
        name: string;
        interface: string;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            'x-component-props'?: undefined;
            enum?: undefined;
        };
        primaryKey?: undefined;
        autoIncrement?: undefined;
        target?: undefined;
        foreignKey?: undefined;
        onDelete?: undefined;
        defaultValue?: undefined;
    } | {
        type: string;
        name: string;
        onDelete: string;
        primaryKey?: undefined;
        autoIncrement?: undefined;
        target?: undefined;
        foreignKey?: undefined;
        interface?: undefined;
        uiSchema?: undefined;
        defaultValue?: undefined;
    } | {
        type: string;
        name: string;
        target: string;
        primaryKey?: undefined;
        autoIncrement?: undefined;
        foreignKey?: undefined;
        interface?: undefined;
        uiSchema?: undefined;
        onDelete?: undefined;
        defaultValue?: undefined;
    } | {
        type: string;
        name: string;
        target: string;
        foreignKey: string;
        onDelete: string;
        interface: string;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            'x-component-props': {
                fieldNames: {
                    label: string;
                    value: string;
                };
                showTime?: undefined;
            };
            enum?: undefined;
        };
        primaryKey?: undefined;
        autoIncrement?: undefined;
        defaultValue?: undefined;
    } | {
        type: string;
        name: string;
        interface: string;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            enum: {
                label: string;
                value: number;
                color: string;
            }[];
            'x-component-props'?: undefined;
        };
        defaultValue: number;
        primaryKey?: undefined;
        autoIncrement?: undefined;
        target?: undefined;
        foreignKey?: undefined;
        onDelete?: undefined;
    } | {
        type: string;
        name: string;
        interface: string;
        uiSchema: {
            type: string;
            title: string;
            'x-component': string;
            'x-component-props': {
                showTime: boolean;
                fieldNames?: undefined;
            };
            enum?: undefined;
        };
        primaryKey?: undefined;
        autoIncrement?: undefined;
        target?: undefined;
        foreignKey?: undefined;
        onDelete?: undefined;
        defaultValue?: undefined;
    })[];
};
export default _default;
